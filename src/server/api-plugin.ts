import type { Plugin, ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.resolve(process.cwd(), ".data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const OUTBOX_FILE = path.join(DATA_DIR, "outbox.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "colab2026";

interface Submission {
  id: string;
  createdAt: string;
  role: string;
  name: string;
  email: string;
  skills: string[];
  message?: string;
  source?: string;
}

interface OutboxItem {
  id: string;
  sentAt: string;
  to: string;
  subject: string;
  body: string;
}

interface Session {
  token: string;
  expires: number;
}

const ensureDir = () => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (error) {
    console.error(`[ensureDir] Failed to create directory ${DATA_DIR}:`, error);
    throw new Error(`Failed to create data directory: ${DATA_DIR}`);
  }
};
const readJson = <T>(file: string, fallback: T): T => {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
};
const writeJson = (file: string, data: unknown) => {
  try {
    ensureDir();
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error(`[writeJson] Failed to write ${file}:`, error);
    throw new Error(`Failed to write file: ${file}`);
  }
};

const getSessions = (): Session[] => {
  const all = readJson<Session[]>(SESSIONS_FILE, []);
  const now = Date.now();
  return all.filter((s) => s.expires > now);
};
const saveSessions = (sessions: Session[]) =>
  writeJson(SESSIONS_FILE, sessions);

const isAuthed = (req: express.Request) => {
  const header = req.header("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return false;
  const sessions = getSessions();
  return sessions.some((s) => s.token === token && s.expires > Date.now());
};

const buildApi = () => {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.post("/api/join", (req, res) => {
    try {
      const body = (req.body || {}) as Partial<Submission>;
      if (!body.name || !body.email) {
        return res.status(400).json({ error: "name and email are required" });
      }
      const submission: Submission = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        role: body.role || "builder",
        name: body.name,
        email: body.email,
        skills: Array.isArray(body.skills) ? body.skills : [],
        message: body.message,
        source: body.source || "join-form",
      };
      const all = readJson<Submission[]>(SUBMISSIONS_FILE, []);
      all.unshift(submission);
      writeJson(SUBMISSIONS_FILE, all);
      res.json({ ok: true, id: submission.id });
    } catch (error) {
      console.error("[/api/join] Error:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { password } = (req.body || {}) as { password?: string };
    if (!password || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = crypto.randomBytes(24).toString("hex");
    const expires = Date.now() + 1000 * 60 * 60 * 8;
    const sessions = getSessions();
    sessions.push({ token, expires });
    saveSessions(sessions);
    res.json({ token, expires });
  });

  app.post("/api/admin/logout", (req, res) => {
    const header = req.header("authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    const sessions = getSessions().filter((s) => s.token !== token);
    saveSessions(sessions);
    res.json({ ok: true });
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ authed: isAuthed(req) });
  });

  app.get("/api/admin/submissions", (req, res) => {
    if (!isAuthed(req)) return res.status(401).json({ error: "Unauthorized" });
    const all = readJson<Submission[]>(SUBMISSIONS_FILE, []);
    res.json({ submissions: all });
  });

  app.delete("/api/admin/submissions/:id", (req, res) => {
    if (!isAuthed(req)) return res.status(401).json({ error: "Unauthorized" });
    const all = readJson<Submission[]>(SUBMISSIONS_FILE, []);
    const next = all.filter((s) => s.id !== req.params.id);
    writeJson(SUBMISSIONS_FILE, next);
    res.json({ ok: true });
  });

  app.post("/api/admin/email", (req, res) => {
    if (!isAuthed(req)) return res.status(401).json({ error: "Unauthorized" });
    const { to, subject, body } = (req.body || {}) as {
      to?: string;
      subject?: string;
      body?: string;
    };
    if (!to || !subject || !body) {
      return res.status(400).json({ error: "to, subject, body required" });
    }
    const item: OutboxItem = {
      id: crypto.randomUUID(),
      sentAt: new Date().toISOString(),
      to,
      subject,
      body,
    };
    const all = readJson<OutboxItem[]>(OUTBOX_FILE, []);
    all.unshift(item);
    writeJson(OUTBOX_FILE, all);
    res.json({ ok: true, item });
  });

  app.get("/api/admin/outbox", (req, res) => {
    if (!isAuthed(req)) return res.status(401).json({ error: "Unauthorized" });
    const all = readJson<OutboxItem[]>(OUTBOX_FILE, []);
    res.json({ outbox: all });
  });

  return app;
};

export const apiPlugin = (): Plugin => {
  const app = buildApi();
  return {
    name: "colab-api-plugin",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(
        (req: IncomingMessage, res: ServerResponse, next) => {
          if (req.url && req.url.startsWith("/api/")) {
            return app(req as express.Request, res as express.Response, next);
          }
          next();
        }
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith("/api/")) {
          return app(req as express.Request, res as express.Response, next);
        }
        next();
      });
    },
  };
};
