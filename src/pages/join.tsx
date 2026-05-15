import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import {
  FaRocket,
  FaMedal,
  FaStar,
  FaBolt,
  FaCode,
  FaPaintBrush,
  FaPen,
  FaComments,
  FaBrain,
  FaCubes,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import rocket from "@/assets/characters/rocket.png";

const logo = "/img/logo.png";

/* ─── data ────────────────────────────────────────────────────────── */
const ROLES = [
  {
    value: "builder",
    label: "Builder",
    sub: "Engineers & makers",
    icon: FaCode,
    color: "from-pink-500 to-orange-400",
    glow: "rgba(255,61,160,0.4)",
  },
  {
    value: "designer",
    label: "Designer",
    sub: "UI/UX & visual artists",
    icon: FaPaintBrush,
    color: "from-violet-500 to-blue-500",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    value: "content",
    label: "Content Creator",
    sub: "Writers & video producers",
    icon: FaPen,
    color: "from-cyan-400 to-violet-500",
    glow: "rgba(56,240,255,0.4)",
  },
  {
    value: "community",
    label: "Community Lead",
    sub: "Discord & event organizers",
    icon: FaComments,
    color: "from-orange-400 to-pink-500",
    glow: "rgba(255,138,61,0.4)",
  },
  {
    value: "ai-ml",
    label: "AI / ML Engineer",
    sub: "Models, LLMs & pipelines",
    icon: FaBrain,
    color: "from-emerald-400 to-cyan-400",
    glow: "rgba(52,211,153,0.4)",
  },
  {
    value: "product",
    label: "Product / Growth",
    sub: "Strategy, SEO & analytics",
    icon: FaCubes,
    color: "from-fuchsia-500 to-pink-500",
    glow: "rgba(217,70,239,0.4)",
  },
];

const SEASON_DETAILS = [
  {
    icon: FaStar,
    label: "Founder Seats",
    value: "500 total",
    color: "text-pink-400",
  },
  {
    icon: FaBolt,
    label: "Season Length",
    value: "12 weeks",
    color: "text-violet-400",
  },
  {
    icon: FaRocket,
    label: "Launch Date",
    value: "May 2026",
    color: "text-cyan-400",
  },
  {
    icon: FaMedal,
    label: "Verification",
    value: "Badge per mission",
    color: "text-orange-400",
  },
];

const NEXT_STEPS = [
  "Team reviews your application within 72 hours",
  "Squad placement & onboarding kit sent by email",
  "Season 1 kicks off May 2026 — mark your calendar",
];

/* ─── slide variants ─────────────────────────────────────────────── */
const slide = {
  enter: { opacity: 0, x: 28 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -28 },
};

/* ─── component ──────────────────────────────────────────────────── */
export const Join = () => {
  const [step, setStep] = useState(0); // 0 = role, 1 = details
  const [role, setRole] = useState("builder");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const selectedRole = ROLES.find((r) => r.value === role) ?? ROLES[0];

  /* ─── handlers ─────────────────────────────────────────────────── */
  const advance = () => {
    setError(null);
    setStep(1);
  };

  const back = () => {
    setError(null);
    setStep(0);
  };

  const submit = async () => {
    if (!name.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid name and email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name: name.trim(),
          email: email.trim(),
          message,
          skills: [],
          source: "join-form",
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          (json as { error?: string }).error ?? "Submission failed"
        );
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── success screen ────────────────────────────────────────────── */
  if (done) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-20 text-center">
        <StarField count={35} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-pink-500/10" />
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-md"
        >
          <img
            src={rocket}
            alt=""
            className="float-y mx-auto mb-6 h-32 w-auto drop-shadow-[0_0_50px_rgba(255,138,61,0.65)]"
          />
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <FaCheckCircle className="text-emerald-400" />
            Application submitted
          </div>
          <h2 className="font-impact mb-4 text-4xl uppercase sm:text-5xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              CoLab Nation
            </span>
          </h2>
          <p className="text-text-dim mb-8 leading-relaxed">
            Hey{" "}
            <span className="font-semibold text-white">
              {name || "Builder"}
            </span>{" "}
            — your squad is being assembled. Check{" "}
            <span className="font-medium text-white">{email}</span> for your
            mission briefing.
          </p>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-left">
            <p className="font-display text-neon-pink mb-4 text-[10px] tracking-[0.4em] uppercase">
              What Happens Next
            </p>
            <div className="space-y-3">
              {NEXT_STEPS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span className="font-display mt-0.5 shrink-0 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] tracking-wider text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ─── main page ─────────────────────────────────────────────────── */
  return (
    <>
      {/* ══════════ HERO ══════════════════════════════════════════════ */}
      <section className="relative flex min-h-[46vh] flex-col items-center justify-center overflow-hidden pt-32 pb-12">
        <StarField count={35} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[320px] w-[700px] -translate-x-1/2 bg-gradient-to-b from-pink-500/18 via-violet-500/8 to-transparent blur-3xl" />

        <div className="relative z-10 mx-auto max-w-lg px-5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-125 rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-40 blur-xl" />
              <img
                src={logo}
                alt="CoLab Nation"
                className="relative h-12 w-12 rounded-2xl object-contain sm:h-14 sm:w-14"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-5 flex justify-center"
          >
            <span className="font-display inline-flex items-center gap-2 rounded-full border border-pink-400/35 bg-pink-500/10 px-4 py-2 text-[10px] tracking-[0.4em] text-pink-200 uppercase backdrop-blur-md">
              <motion.span
                className="size-1.5 rounded-full bg-pink-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              Founder Cohort · 500 Seats Only
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-impact mb-4 text-[clamp(2.2rem,8vw,4.5rem)] leading-[0.9] tracking-tight uppercase"
          >
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              Choose Your Role.
            </span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent">
              Earn Your Badge.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-text-dim text-sm leading-relaxed sm:text-base"
          >
            Apply in two steps. No résumé required.
          </motion.p>
        </div>
      </section>

      {/* ══════════ FORM ══════════════════════════════════════════════ */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
            {/* ── MAIN CARD ── */}
            <div className="neon-border overflow-hidden rounded-3xl">
              {/* Step bar */}
              <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-6 py-4">
                {["Select Role", "Your Details"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    {i > 0 && (
                      <div
                        className={`h-px w-6 rounded-full transition-all duration-500 ${step >= i ? "bg-pink-500" : "bg-white/10"}`}
                      />
                    )}
                    <div
                      className={`flex items-center gap-2 transition-all duration-300 ${i === step ? "opacity-100" : i < step ? "opacity-60" : "opacity-25"}`}
                    >
                      <div
                        className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                          i < step
                            ? "bg-emerald-500 text-white"
                            : i === step
                              ? "gradient-bg text-white"
                              : "border border-white/20 text-white/40"
                        }`}
                      >
                        {i < step ? (
                          <FaCheckCircle className="text-[9px]" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span
                        className={`font-display text-[10px] tracking-[0.3em] uppercase ${i === step ? "text-white" : "text-white/40"}`}
                      >
                        {s}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step content */}
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {/* ── STEP 0: ROLE ── */}
                    {step === 0 && (
                      <div>
                        <h3 className="font-display mb-1 text-lg font-black uppercase sm:text-xl">
                          What's your role?
                        </h3>
                        <p className="text-text-dim mb-7 text-sm">
                          Pick the category that best describes how you create
                          and build.
                        </p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {ROLES.map((r) => (
                            <button
                              key={r.value}
                              onClick={() => setRole(r.value)}
                              className={`group relative flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                                role === r.value
                                  ? "border-pink-500/70 bg-pink-500/8 shadow-[0_0_24px_rgba(255,61,160,0.18)]"
                                  : "border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                              }`}
                            >
                              {/* gradient glow on selected */}
                              {role === r.value && (
                                <div
                                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${r.color} opacity-[0.07]`}
                                />
                              )}
                              <div
                                className={`relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${r.color} shadow-md transition-transform duration-200 group-hover:scale-105`}
                                style={{
                                  boxShadow:
                                    role === r.value
                                      ? `0 0 16px ${r.glow}`
                                      : undefined,
                                }}
                              >
                                <r.icon className="text-sm text-white" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-display text-[11px] font-black tracking-wider uppercase">
                                  {r.label}
                                </p>
                                <p className="text-text-dim mt-0.5 text-[10px] leading-snug">
                                  {r.sub}
                                </p>
                              </div>
                              {role === r.value && (
                                <FaCheckCircle className="absolute top-3 right-3 text-xs text-pink-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── STEP 1: DETAILS ── */}
                    {step === 1 && (
                      <form
                        id="join-form"
                        ref={formRef}
                        onSubmit={(e) => {
                          e.preventDefault();
                          submit();
                        }}
                      >
                        <h3 className="font-display mb-1 text-lg font-black uppercase sm:text-xl">
                          Your Details
                        </h3>
                        <p className="text-text-dim mb-7 text-sm">
                          No résumé — just the essentials. We'll reach out
                          within 72 hours.
                        </p>

                        <div className="space-y-5">
                          {/* Role summary chip */}
                          <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                            <div
                              className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${selectedRole.color}`}
                            >
                              <selectedRole.icon className="text-xs text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {selectedRole.label}
                              </p>
                              <p className="text-text-dim text-xs">
                                {selectedRole.sub}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={back}
                              className="font-display ml-auto text-[9px] tracking-widest text-white/30 uppercase transition-colors hover:text-white/70"
                            >
                              Change
                            </button>
                          </div>

                          <div>
                            <label className="font-display mb-2 flex items-center gap-2 text-[10px] tracking-[0.35em] text-white/40 uppercase">
                              <FaUser className="text-[8px] text-pink-400" />{" "}
                              Full Name
                            </label>
                            <input
                              name="name-display"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your name"
                              autoComplete="name"
                              className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 transition-all outline-none focus:border-pink-500/50 focus:shadow-[0_0_0_3px_rgba(255,61,160,0.08)]"
                            />
                          </div>

                          <div>
                            <label className="font-display mb-2 flex items-center gap-2 text-[10px] tracking-[0.35em] text-white/40 uppercase">
                              <FaEnvelope className="text-[8px] text-violet-400" />{" "}
                              Email Address
                            </label>
                            <input
                              name="email-display"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              autoComplete="email"
                              className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 transition-all outline-none focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                            />
                          </div>

                          <div>
                            <label className="font-display mb-2 flex items-center justify-between text-[10px] tracking-[0.35em] text-white/40 uppercase">
                              What do you want to build?
                              <span className="text-white/20">Optional</span>
                            </label>
                            <textarea
                              name="message-display"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Tell us what problems you want to solve or what you're most excited to build with your squad."
                              rows={4}
                              className="w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 transition-all outline-none focus:border-pink-500/50 focus:shadow-[0_0_0_3px_rgba(255,61,160,0.08)]"
                            />
                          </div>

                          <p className="text-[11px] leading-relaxed text-white/25">
                            By submitting you agree to our terms. Our team
                            reviews every application — if you&apos;re a Season
                            1 fit, you&apos;ll hear from us at the email above.
                          </p>
                        </div>
                      </form>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3"
                  >
                    <span className="text-sm text-rose-400">!</span>
                    <p className="text-sm text-rose-200">{error}</p>
                  </motion.div>
                )}

                {/* Nav */}
                <div className="mt-8 flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      onClick={back}
                      className="font-display flex items-center gap-1.5 text-[10px] tracking-widest text-white/30 uppercase transition-colors hover:text-white/70"
                    >
                      <FaArrowLeft className="text-[8px]" /> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step === 0 ? (
                    <Button
                      onClick={advance}
                      rightIcon={TiLocationArrow}
                      className="px-8 py-3.5"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      form="join-form"
                      rightIcon={FaRocket}
                      variant="glow"
                      className="px-8 py-3.5 shadow-[0_0_35px_rgba(255,61,160,0.4)]"
                    >
                      {submitting ? "Submitting…" : "Launch Application"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="flex flex-col gap-4">
              {/* Season details */}
              <div className="neon-border rounded-2xl p-6">
                <p className="font-display text-neon-violet mb-5 text-[10px] tracking-[0.4em] uppercase">
                  Season 1 Details
                </p>
                <div className="space-y-4">
                  {SEASON_DETAILS.map((d) => (
                    <div
                      key={d.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <d.icon className={`shrink-0 text-xs ${d.color}`} />
                        <span className="text-text-dim text-xs">{d.label}</span>
                      </div>
                      <span className="font-display text-[11px] font-bold text-white">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* No résumé callout */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-400" />
                  <p className="font-display text-[11px] font-black tracking-wider text-emerald-300 uppercase">
                    No Résumé Required
                  </p>
                </div>
                <p className="text-text-dim text-xs leading-relaxed">
                  We evaluate you on what you want to build — not where you've
                  been. Every accepted member gets a verified proof portfolio
                  automatically generated.
                </p>
              </div>

              {/* Selected role preview */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${selectedRole.color} p-5`}
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
                    borderImage: "none",
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${selectedRole.color} opacity-[0.08]`}
                  />
                  <div className="relative flex items-center gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${selectedRole.color} shadow-lg`}
                    >
                      <selectedRole.icon className="text-sm text-white" />
                    </div>
                    <div>
                      <p className="font-display text-[10px] tracking-[0.3em] text-white/40 uppercase">
                        Selected role
                      </p>
                      <p className="font-display text-sm font-black uppercase">
                        {selectedRole.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Contact */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <p className="font-display text-text-dim mb-2 text-[10px] tracking-[0.35em] uppercase">
                  Questions?
                </p>
                <a
                  href="mailto:support@colabnation.live"
                  className="text-neon-cyan hover:text-neon-pink text-sm font-medium transition-colors"
                >
                  support@colabnation.live
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
