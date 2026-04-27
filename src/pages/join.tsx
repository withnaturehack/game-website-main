import { useState } from "react";
import { motion } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ConfettiBurst, StarField } from "@/components/ui/particles";
import builder from "@/assets/characters/builder.png";
import aibot from "@/assets/characters/aibot.png";
import rocket from "@/assets/characters/rocket.png";

const ROLES = [
  { value: "builder", label: "Builder", emoji: "⚡", desc: "Ship code, design, research" },
  { value: "mentor", label: "Mentor", emoji: "🧭", desc: "Verify the next generation" },
  { value: "founder", label: "Founder", emoji: "🚀", desc: "Recruit drafted talent" },
];

const SKILLS = ["Frontend", "Backend", "Design", "AI/ML", "DevOps", "Mobile", "Research", "Growth"];

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

  const xp = (step + (done ? 1 : 0)) * 25 + (skills.length > 0 ? 5 : 0);

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
        body: JSON.stringify({ role, name, email, skills, message, source: "join-form" }),
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
      <section className="relative overflow-hidden py-24">
        <StarField count={80} />
        {done && <ConfettiBurst count={40} />}
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Join the Squad"
            title="Pick your |class.| Then suit up."
            subtitle="Your initiation into CoLab Nation is the first mission. Choose wisely — every answer earns XP."
          />
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
                      i <= step ? "w-10 gradient-bg" : "w-6 bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <p className="font-display text-xs uppercase tracking-widest text-text-dim">
                {done ? "Complete" : `Step ${step + 1} / 4`}
              </p>
            </div>

            {done ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10"
              >
                <img
                  src={rocket}
                  alt=""
                  className="float-y mx-auto h-44 w-auto drop-shadow-[0_0_50px_rgba(255,138,61,0.6)]"
                />
                <h3 className="mt-6 font-display text-3xl sm:text-5xl font-black uppercase">
                  Welcome to <span className="gradient-text">CoLab Nation</span> 🎉
                </h3>
                <p className="mt-4 text-text-dim">
                  Hey {name || "Builder"} — your squad is being assembled.
                  Mission briefing landing in your inbox at{" "}
                  <span className="text-white">{email || "your email"}</span>.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-display uppercase tracking-widest text-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  XP earned: <span className="gradient-text font-black">+125</span>
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
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                      Choose your class
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {ROLES.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => setRole(r.value)}
                          className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                            role === r.value
                              ? "border-pink-500 bg-pink-500/10 glow-pink"
                              : "border-white/10 bg-white/5 hover:border-white/30"
                          }`}
                        >
                          <span className="text-3xl">{r.emoji}</span>
                          <p className="mt-3 font-display text-lg font-black">
                            {r.label}
                          </p>
                          <p className="mt-1 text-xs text-text-dim">{r.desc}</p>
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
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                      Equip your skills
                    </h3>
                    <p className="text-text-dim">Select up to 4 — these unlock your starter missions.</p>
                    <div className="flex flex-wrap gap-3">
                      {SKILLS.map((s) => {
                        const active = skills.includes(s);
                        return (
                          <button
                            key={s}
                            onClick={() => toggleSkill(s)}
                            disabled={!active && skills.length >= 4}
                            className={`rounded-full border px-5 py-2.5 text-sm font-display uppercase tracking-wider transition-all ${
                              active
                                ? "border-violet-400 bg-violet-500/20 text-white glow-violet"
                                : "border-white/10 bg-white/5 text-text-dim hover:border-white/30 disabled:opacity-30"
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
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                      Name your hero
                    </h3>
                    <div className="space-y-4">
                      <Field label="Builder name">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Aria the Architect"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
                        />
                      </Field>
                      <Field label="Comms channel (email)">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="builder@colab.nation"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500"
                        />
                      </Field>
                      <Field label="A short note (optional)">
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
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                      Confirm launch
                    </h3>
                    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <Row label="Class" value={role.toUpperCase()} />
                      <Row label="Skills" value={skills.join(" · ") || "None yet"} />
                      <Row label="Hero name" value={name || "—"} />
                      <Row label="Email" value={email || "—"} />
                      {message && <Row label="Note" value={message} />}
                    </div>
                    <p className="text-text-dim text-sm">
                      Ready? Hitting launch saves your application. Nova will match you in &lt;24h.
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
                    className="text-sm font-display uppercase tracking-widest text-text-dim hover:text-white disabled:opacity-30"
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
                  <p className="font-display text-xs uppercase tracking-widest text-neon-pink">
                    Profile preview
                  </p>
                  <p className="font-display text-xl font-black">
                    {name || "Unnamed Builder"}
                  </p>
                  <p className="text-xs text-text-dim">
                    {role.toUpperCase()} · {skills.length} skill
                    {skills.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-display uppercase tracking-widest text-text-dim">
                  <span>XP Progress</span>
                  <span>{xp} / 100</span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${Math.min(xp, 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full gradient-bg"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {skills.length === 0 ? (
                  <span className="text-xs text-text-dim">No skills equipped yet</span>
                ) : (
                  skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-display uppercase tracking-wider text-white"
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
                <p className="font-display text-xs uppercase tracking-widest text-neon-cyan">
                  Nova
                </p>
                <p className="text-sm text-text-dim">
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

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-display text-xs uppercase tracking-widest text-text-dim">{label}</span>
    {children}
  </label>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 text-sm">
    <span className="font-display uppercase tracking-widest text-text-dim text-xs shrink-0">
      {label}
    </span>
    <span className="text-white font-medium text-right break-words">{value}</span>
  </div>
);
