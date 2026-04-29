import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";
import { FaBolt, FaStar } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { ConfettiBurst, StarField } from "@/components/ui/particles";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";
import rocket from "@/assets/characters/rocket.png";

const JOIN_DIALOGUE = [
  { left: "Pick your class. Choose your weapon.", right: "Mentors waiting. Squads forming." },
  { left: "Every answer = +XP.", right: "Demo Day in T-minus 12 weeks." },
  { left: "No résumé. Just receipts.", right: "I'll verify everything you ship." },
];

const ROLES = [
  {
    value: "builder",
    label: "Builder",
    emoji: "⚡",
    desc: "Ship code, design, research",
  },
  {
    value: "content",
    label: "Content Creator",
    emoji: "🎥",
    desc: "Craft stories, videos, and social media",
  },
  {
    value: "designer",
    label: "Graphic Designer",
    emoji: "🎨",
    desc: "Design visuals, UI, and branding",
  },
  {
    value: "community",
    label: "Community Manager",
    emoji: "💬",
    desc: "Grow and engage the squad",
  },
];

const SKILLS = [
  "Frontend",
  "Backend",
  "Design",
  "AI/ML",
  "DevOps",
  "Mobile",
  "Research",
  "Growth",
  "Video Editing",
  "Branding",
  "Writing",
  "Social Media",
  "Community",
  "UI/UX",
  "Animation",
];

export const Join = () => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("builder");
  const [skills, setSkills] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [d, setD] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setD((c) => (c + 1) % JOIN_DIALOGUE.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Smoother XP calculation for more steps/skills
  const xp = Math.min(100, (step + (done ? 1 : 0)) * 20 + skills.length * 5);

  const toggleSkill = (s: string) => {
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const next = () => {
    setError(null);
    if (step === 2) {
      if (!name.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        setError("Add a name and a valid email to continue.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name,
          email,
          skills,
          message,
          source: "join-form",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Submission failed");
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden pt-32 pb-16">
        <StarField count={120} />
        {done && <ConfettiBurst count={40} />}
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-pink-500/22 via-violet-500/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500/15 to-transparent blur-3xl" />

        {/* Speed lines */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-32 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
              style={{ top: `${10 + i * 12}%`, left: i % 2 ? "60%" : "-10%" }}
              animate={{ x: ["0%", "120%"] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "linear" }}
            />
          ))}
        </div>

        {/* Builder character + speech bubble */}
        <motion.div
          initial={{ opacity: 0, x: -60, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="float-y pointer-events-none absolute bottom-0 left-2 z-10 hidden md:block lg:left-10"
        >
          <img
            src={builder}
            alt="Builder"
            className="h-72 w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.55)] lg:h-96"
            draggable={false}
          />
          <div className="absolute -top-2 left-32 hidden w-56 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl border-2 border-pink-400/70 bg-bg/90 px-4 py-3 shadow-[0_0_30px_rgba(255,61,160,0.4)] backdrop-blur-md"
              >
                <p className="font-comic text-sm leading-tight text-white">
                  {JOIN_DIALOGUE[d].left}
                </p>
                <div className="absolute -left-3 bottom-3 h-0 w-0 border-y-[8px] border-r-[14px] border-y-transparent border-r-pink-400/70" />
                <div className="absolute -top-2 -left-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-[9px] text-white">
                  <FaBolt />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mentor character + speech bubble */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="float-slow pointer-events-none absolute right-2 bottom-0 z-10 hidden md:block lg:right-10"
        >
          <img
            src={mentor}
            alt="Mentor"
            className="h-72 w-auto drop-shadow-[0_0_50px_rgba(139,92,246,0.55)] lg:h-96"
            draggable={false}
          />
          <div className="absolute -top-2 right-32 hidden w-56 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={d + 100}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative rounded-2xl border-2 border-violet-400/70 bg-bg/90 px-4 py-3 text-right shadow-[0_0_30px_rgba(139,92,246,0.4)] backdrop-blur-md"
              >
                <p className="font-comic text-sm leading-tight text-white">
                  {JOIN_DIALOGUE[d].right}
                </p>
                <div className="absolute -right-3 bottom-3 h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-violet-400/70" />
                <div className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[9px] text-white">
                  <FaStar />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 text-[10px] tracking-[0.4em] text-pink-200 uppercase backdrop-blur-md"
          >
            <HiSparkles className="size-3 text-pink-300" />
            Founder Cohort · 500 Seats
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-impact mb-6 text-[clamp(2.6rem,8.5vw,6rem)] leading-[0.92] tracking-tight uppercase"
          >
            <span className="shimmer-text block drop-shadow-[0_0_32px_rgba(255,61,160,0.55)]">
              Choose your class.
            </span>
            <span className="shimmer-text block drop-shadow-[0_0_32px_rgba(139,92,246,0.55)]">
              Earn your badge.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-text-dim mx-auto max-w-xl text-base sm:text-lg"
          >
            Builder, content creator, designer, or community lead. Pick your
            role, equip your skills, and apply in 4 quick steps. Every answer
            earns XP.
          </motion.p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr,420px]">
          <motion.div
            layout
            className="neon-border relative overflow-hidden rounded-3xl p-6 sm:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i <= step ? "gradient-bg w-10" : "w-6 bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <p className="font-display text-text-dim text-xs tracking-widest uppercase">
                {done ? "Complete" : `Step ${step + 1} / 4`}
              </p>
            </div>

            {done ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center"
              >
                <img
                  src={rocket}
                  alt=""
                  className="float-y mx-auto h-44 w-auto drop-shadow-[0_0_50px_rgba(255,138,61,0.6)]"
                />
                <h3 className="font-display mt-6 text-3xl font-black uppercase sm:text-5xl">
                  Welcome to <span className="gradient-text">CoLab Nation</span>{" "}
                  🎉
                </h3>
                <p className="text-text-dim mt-4">
                  Hey {name || "Builder"} — your squad is being assembled.
                  Mission briefing landing in your inbox at{" "}
                  <span className="text-white">{email || "your email"}</span>.
                </p>
                <div className="font-display mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm tracking-widest uppercase">
                  <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                  XP earned:{" "}
                  <span className="gradient-text font-black">+125</span>
                </div>
              </motion.div>
            ) : (
              <>
                {step === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-2xl font-black uppercase sm:text-3xl">
                      Choose your role
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {ROLES.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => setRole(r.value)}
                          className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                            role === r.value
                              ? "glow-pink border-pink-500 bg-pink-500/10"
                              : "border-white/10 bg-white/5 hover:border-white/30"
                          }`}
                        >
                          <span className="text-3xl">{r.emoji}</span>
                          <p className="font-display mt-3 text-lg font-black">
                            {r.label}
                          </p>
                          <p className="text-text-dim mt-1 text-xs">{r.desc}</p>
                          {r.value === "content" && (
                            <span className="text-neon-pink mt-1 inline-block text-[10px]">
                              Video, writing, or social
                            </span>
                          )}
                          {r.value === "designer" && (
                            <span className="text-neon-pink mt-1 inline-block text-[10px]">
                              UI, graphics, or animation
                            </span>
                          )}
                          {r.value === "community" && (
                            <span className="text-neon-pink mt-1 inline-block text-[10px]">
                              Discord, events, or outreach
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-2xl font-black uppercase sm:text-3xl">
                      Show your skills
                    </h3>
                    <p className="text-text-dim">
                      Select up to 4 — these unlock your starter missions or
                      team role.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {SKILLS.map((s) => {
                        const active = skills.includes(s);
                        return (
                          <button
                            key={s}
                            onClick={() => toggleSkill(s)}
                            disabled={!active && skills.length >= 4}
                            className={`font-display rounded-full border px-5 py-2.5 text-sm tracking-wider uppercase transition-all ${
                              active
                                ? "glow-violet border-violet-400 bg-violet-500/20 text-white"
                                : "text-text-dim border-white/10 bg-white/5 hover:border-white/30 disabled:opacity-30"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-2xl font-black uppercase sm:text-3xl">
                      Tell us about you
                    </h3>
                    <div className="space-y-4">
                      <Field label="Your name">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Aria the Architect"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
                        />
                      </Field>
                      <Field label="Email">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="builder@colab.nation"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
                        />
                      </Field>
                      <Field label="Why do you want to join? (optional)">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="What do you want to build with us?"
                          rows={3}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-2xl font-black uppercase sm:text-3xl">
                      Confirm application
                    </h3>
                    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <Row label="Class" value={role.toUpperCase()} />
                      <Row
                        label="Skills"
                        value={skills.join(" · ") || "None yet"}
                      />
                      <Row label="Hero name" value={name || "—"} />
                      <Row label="Email" value={email || "—"} />
                      {message && <Row label="Note" value={message} />}
                    </div>
                    <p className="text-text-dim text-sm">
                      Ready? Hitting launch saves your application. Our team
                      will review and reach out if you’re a fit!
                    </p>
                  </motion.div>
                )}

                {error && (
                  <p className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">
                    {error}
                  </p>
                )}

                <div className="mt-10 flex items-center justify-between">
                  <button
                    onClick={back}
                    disabled={step === 0 || submitting}
                    className="font-display text-text-dim text-sm tracking-widest uppercase hover:text-white disabled:opacity-30"
                  >
                    ← Back
                  </button>
                  {step < 3 ? (
                    <Button onClick={next} rightIcon={TiLocationArrow}>
                      Next
                    </Button>
                  ) : (
                    <Button onClick={submit} rightIcon={TiLocationArrow}>
                      {submitting ? "Launching…" : "Launch"}
                    </Button>
                  )}
                </div>
              </>
            )}
          </motion.div>

          <div className="space-y-6">
            <div className="neon-border rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <img
                  src={builder}
                  alt=""
                  className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
                />
                <div>
                  <p className="font-display text-neon-pink text-xs tracking-widest uppercase">
                    Profile preview
                  </p>
                  <p className="font-display text-xl font-black">
                    {name || "Unnamed Builder"}
                  </p>
                  <p className="text-text-dim text-xs">
                    {role.toUpperCase()} · {skills.length} skill
                    {skills.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="font-display text-text-dim flex items-center justify-between text-xs tracking-widest uppercase">
                  <span>XP Progress</span>
                  <span>{xp} / 100</span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${Math.min(xp, 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className="gradient-bg h-full"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {skills.length === 0 ? (
                  <span className="text-text-dim text-xs">
                    No skills equipped yet
                  </span>
                ) : (
                  skills.map((s) => (
                    <span
                      key={s}
                      className="font-display rounded-full bg-violet-500/20 px-3 py-1 text-xs tracking-wider text-white uppercase"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="neon-border flex items-center gap-4 rounded-3xl p-5">
              <img
                src={aibot}
                alt="Nova"
                className="float-y h-16 w-auto drop-shadow-[0_0_24px_rgba(56,240,255,0.6)]"
              />
              <div>
                <p className="font-display text-neon-cyan text-xs tracking-widest uppercase">
                  Nova
                </p>
                <p className="text-text-dim text-sm">
                  {step === 0 && "Pick a class — you can swap later."}
                  {step === 1 && "Squads love range. Mix two stacks."}
                  {step === 2 && "Use your real name. Builders trust builders."}
                  {step === 3 && "Hit launch. I'll match you in <24h. Promise."}
                  {done && "Your first mission drops tomorrow at 9am 🚀"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="font-display text-text-dim text-xs tracking-widest uppercase">
      {label}
    </span>
    {children}
  </label>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 text-sm">
    <span className="font-display text-text-dim shrink-0 text-xs tracking-widest uppercase">
      {label}
    </span>
    <span className="text-right font-medium break-words text-white">
      {value}
    </span>
  </div>
);
