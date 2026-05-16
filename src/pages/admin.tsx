import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";

const logo = "/img/logo.png";

const TOKEN_KEY = "colab.admin.token";
// Hardcoded admin password for client-only auth (per request)
const ADMIN_PASSWORD = "Kartik";

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

const useToken = () => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const save = (t: string | null) => {
    setToken(t);
    try {
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  };
  return [token, save] as const;
};

export const Admin = () => {
  const [token, setToken] = useToken();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [subs, setSubs] = useState<Submission[]>([]);
  const [outbox, setOutbox] = useState<OutboxItem[]>([]);
  const [filter, setFilter] = useState("");
  const [composeFor, setComposeFor] = useState<Submission | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sentNote, setSentNote] = useState<string | null>(null);

  const headers = useCallback((): HeadersInit => {
    return token
      ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      : { "Content-Type": "application/json" };
  }, [token]);

  const loadAll = useCallback(async () => {
    if (!token) return;
    try {
      const [s, o] = await Promise.all([
        fetch("/api/admin/submissions", { headers: headers() }),
        fetch("/api/admin/outbox", { headers: headers() }),
      ]);
      if (s.status === 401 || o.status === 401) {
        setToken(null);
        return;
      }
      const sj = await s.json();
      const oj = await o.json();
      setSubs(sj.submissions || []);
      setOutbox(oj.outbox || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, [token, headers, setToken]);

  useEffect(() => {
    if (token) loadAll();
  }, [token, loadAll]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Client-only authentication: compare directly to hardcoded password.
      // This avoids relying on a server API in production deployments.
      if (password !== ADMIN_PASSWORD) {
        throw new Error("Invalid password");
      }
      // generate a lightweight client token and persist it
      const clientToken = `local-${Date.now()}`;
      setToken(clientToken);
      setPassword("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (token) {
      await fetch("/api/admin/logout", { method: "POST", headers: headers() });
    }
    setToken(null);
    setSubs([]);
    setOutbox([]);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/admin/submissions/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    setSubs((p) => p.filter((s) => s.id !== id));
  };

  const startCompose = (s: Submission) => {
    setComposeFor(s);
    setSubject(`Welcome to CoLab Nation, ${s.name}!`);
    setBody(
      `Hey ${s.name},\n\nThanks for joining CoLab Nation as a ${s.role}. Your skills look 🔥 — we'll match you to a squad in less than 24 hours.\n\nReply to this email if you have any questions.\n\n— The CoLab Crew`
    );
    setSentNote(null);
  };

  const send = async () => {
    if (!composeFor) return;
    const payload = { to: composeFor.email, subject, body };
    const res = await fetch("/api/admin/email", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setSentNote("Failed to log email.");
      return;
    }
    const mailto = `mailto:${encodeURIComponent(composeFor.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
    setSentNote("Email logged & opened in your mail client.");
    loadAll();
  };

  const exportCsv = () => {
    const header = "id,createdAt,role,name,email,skills,message\n";
    const rows = subs
      .map((s) =>
        [
          s.id,
          s.createdAt,
          s.role,
          JSON.stringify(s.name),
          s.email,
          JSON.stringify(s.skills.join("|")),
          JSON.stringify(s.message || ""),
        ].join(",")
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `colab-submissions-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = subs.filter((s) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.skills.some((sk) => sk.toLowerCase().includes(q))
    );
  });

  if (!token) {
    return (
      <section className="relative grid min-h-[100dvh] place-items-center overflow-hidden px-6 py-24">
        <StarField count={80} />
        <div className="grid-bg absolute inset-0 -z-10 opacity-30" />
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={login}
          className="neon-border relative w-full max-w-md rounded-3xl p-8"
        >
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="CoLab"
              className="h-14 w-14 rounded-xl border border-white/10 object-cover"
            />
            <div>
              <p className="font-display text-neon-pink text-xs tracking-widest uppercase">
                Mission control
              </p>
              <h1 className="font-display text-2xl font-black uppercase">
                Admin Access
              </h1>
            </div>
          </div>
          <label className="mt-8 block">
            <span className="font-display text-text-dim text-xs tracking-widest uppercase">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
              placeholder="••••••••"
            />
          </label>
          {error && (
            <p className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="mt-6 w-full justify-center"
            rightIcon={TiLocationArrow}
          >
            {loading ? "Authorizing…" : "Enter"}
          </Button>
          <p className="text-text-dim mt-4 text-center text-[11px]">
            Admin password is configurable via the{" "}
            <span className="font-mono text-white">ADMIN_PASSWORD</span>{" "}
            environment variable.
          </p>
        </motion.form>
      </section>
    );
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden px-6 py-12">
      <div className="grid-bg absolute inset-0 -z-10 opacity-20" />
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="CoLab"
              className="h-12 w-12 rounded-xl border border-white/10 object-cover"
            />
            <div>
              <p className="font-display text-neon-pink text-xs tracking-widest uppercase">
                Mission control
              </p>
              <h1 className="font-display text-2xl font-black uppercase sm:text-3xl">
                CoLab · Admin
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={exportCsv}
              className="px-4 py-2 text-xs"
            >
              Export CSV
            </Button>
            <Button
              variant="ghost"
              onClick={loadAll}
              className="px-4 py-2 text-xs"
            >
              Refresh
            </Button>
            <Button
              variant="ghost"
              onClick={logout}
              className="px-4 py-2 text-xs"
            >
              Logout
            </Button>
          </div>
        </header>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Stat label="Submissions" value={subs.length} />
          <Stat label="Emails sent" value={outbox.length} />
          <Stat
            label="Today"
            value={
              subs.filter(
                (s) =>
                  new Date(s.createdAt).toDateString() ===
                  new Date().toDateString()
              ).length
            }
          />
        </div>

        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name, email, role, skill…"
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
        />

        <div className="neon-border overflow-hidden rounded-2xl">
          <div className="font-display text-text-dim hidden grid-cols-[1fr_1.4fr_0.8fr_2fr_1.4fr] gap-3 border-b border-white/10 bg-white/5 px-4 py-3 text-xs tracking-widest uppercase md:grid">
            <span>Name</span>
            <span>Email</span>
            <span>Class</span>
            <span>Skills</span>
            <span className="text-right">Actions</span>
          </div>
          {filtered.length === 0 && (
            <div className="text-text-dim px-6 py-10 text-center">
              No submissions yet — they'll appear here as soon as builders
              apply.
            </div>
          )}
          {filtered.map((s) => (
            <div
              key={s.id}
              className="grid gap-2 border-b border-white/5 px-4 py-4 last:border-b-0 md:grid-cols-[1fr_1.4fr_0.8fr_2fr_1.4fr] md:items-center"
            >
              <div>
                <p className="font-medium text-white">{s.name}</p>
                <p className="text-text-dim text-[11px]">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
              </div>
              <a
                href={`mailto:${s.email}`}
                className="text-neon-cyan text-sm break-all hover:underline"
              >
                {s.email}
              </a>
              <span className="font-display inline-flex w-fit rounded-full bg-pink-500/15 px-3 py-1 text-[10px] tracking-widest text-pink-200 uppercase">
                {s.role}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {s.skills.map((sk) => (
                  <span
                    key={sk}
                    className="font-display rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] tracking-wider text-violet-200 uppercase"
                  >
                    {sk}
                  </span>
                ))}
                {s.message && (
                  <span className="text-text-dim basis-full text-xs italic">
                    "{s.message}"
                  </span>
                )}
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  variant="outline"
                  className="px-3 py-1.5 text-[11px]"
                  onClick={() => startCompose(s)}
                >
                  Email
                </Button>
                <Button
                  variant="ghost"
                  className="px-3 py-1.5 text-[11px]"
                  onClick={() => remove(s.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {composeFor && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="neon-border mt-8 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-black uppercase">
                Email · {composeFor.name}
              </h2>
              <button
                onClick={() => setComposeFor(null)}
                className="font-display text-text-dim text-xs tracking-widest uppercase hover:text-white"
              >
                Close
              </button>
            </div>
            <p className="text-text-dim mt-2 text-xs">
              To: <span className="text-white">{composeFor.email}</span>
            </p>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
              placeholder="Subject"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
              placeholder="Body"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-text-dim text-xs">
                Click send → your default mail app opens prefilled, and we log
                the message in the outbox.
              </p>
              <Button onClick={send} rightIcon={TiLocationArrow}>
                Send
              </Button>
            </div>
            {sentNote && (
              <p className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                {sentNote}
              </p>
            )}
          </motion.div>
        )}

        {outbox.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display mb-4 text-xl font-black uppercase">
              Recent outbox
            </h2>
            <div className="neon-border divide-y divide-white/5 overflow-hidden rounded-2xl">
              {outbox.slice(0, 10).map((o) => (
                <div key={o.id} className="px-4 py-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-white">{o.subject}</span>
                    <span className="text-text-dim text-[11px]">
                      {new Date(o.sentAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-text-dim mt-1 text-xs">→ {o.to}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="neon-border rounded-2xl p-5">
    <p className="font-display text-text-dim text-xs tracking-widest uppercase">
      {label}
    </p>
    <p className="font-display gradient-text mt-1 text-3xl font-black">
      {value}
    </p>
  </div>
);
