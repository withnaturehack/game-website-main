import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles, HiCheckCircle } from "react-icons/hi";
import {
  FaRocket, FaMedal, FaBolt, FaStar, FaUser, FaEnvelope,
  FaCode, FaPaintBrush, FaPen, FaComments, FaDatabase,
  FaMobile, FaCloud, FaBrain, FaChartBar, FaCube,
  FaVideo, FaShieldAlt, FaGlobe, FaLayerGroup,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { ConfettiBurst, StarField } from "@/components/ui/particles";
import rocket from "@/assets/characters/rocket.png";

const logo = "/img/logo.png";

const ROLE_CATEGORIES = [
  {
    category: "Tech & Engineering",
    color: "from-pink-500 to-orange-400",
    roles: [
      { value: "frontend", label: "Frontend Dev", emoji: "⚡", desc: "React, Vue, animations & UI engineering", icon: FaCode },
      { value: "backend", label: "Backend Dev", emoji: "🔧", desc: "APIs, databases, microservices", icon: FaDatabase },
      { value: "fullstack", label: "Full-Stack Dev", emoji: "🛠️", desc: "End-to-end product builder", icon: FaLayerGroup },
      { value: "mobile", label: "Mobile Dev", emoji: "📱", desc: "iOS, Android, React Native, Flutter", icon: FaMobile },
      { value: "ai-ml", label: "AI / ML Engineer", emoji: "🧠", desc: "Models, pipelines, LLM applications", icon: FaBrain },
      { value: "devops", label: "DevOps / Cloud", emoji: "☁️", desc: "CI/CD, infra, Kubernetes, AWS/GCP", icon: FaCloud },
      { value: "web3", label: "Web3 / Blockchain", emoji: "⛓️", desc: "Smart contracts, DeFi, NFTs", icon: FaCube },
      { value: "data", label: "Data Scientist", emoji: "📊", desc: "Analytics, visualization, ML research", icon: FaChartBar },
      { value: "security", label: "Security Engineer", emoji: "🔐", desc: "Pen testing, AppSec, threat modeling", icon: FaShieldAlt },
    ],
  },
  {
    category: "Design & Creative",
    color: "from-violet-500 to-blue-500",
    roles: [
      { value: "uiux", label: "UI/UX Designer", emoji: "🎨", desc: "Interfaces, flows, Figma, user research", icon: FaPaintBrush },
      { value: "graphic", label: "Graphic Designer", emoji: "🖼️", desc: "Branding, posters, visual identity", icon: FaLayerGroup },
      { value: "motion", label: "Motion Designer", emoji: "✨", desc: "Animations, After Effects, Lottie", icon: FaBolt },
      { value: "product-design", label: "Product Designer", emoji: "🔵", desc: "End-to-end product design & systems", icon: FaGlobe },
    ],
  },
  {
    category: "Content & Growth",
    color: "from-cyan-400 to-violet-500",
    roles: [
      { value: "content", label: "Content Creator", emoji: "🎥", desc: "Video, reels, storytelling & social", icon: FaVideo },
      { value: "writer", label: "Technical Writer", emoji: "✍️", desc: "Docs, blogs, developer content", icon: FaPen },
      { value: "community", label: "Community Manager", emoji: "💬", desc: "Discord, events, growth & outreach", icon: FaComments },
      { value: "growth", label: "Growth / Marketing", emoji: "📈", desc: "SEO, paid ads, funnels, analytics", icon: FaChartBar },
    ],
  },
];

// Flatten for lookup
const ALL_ROLES = ROLE_CATEGORIES.flatMap((c) => c.roles);

const SKILL_GROUPS = [
  {
    group: "Frontend",
    skills: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Framer Motion"],
  },
  {
    group: "Backend & Infra",
    skills: ["Node.js", "Python", "Go", "Rust", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GCP"],
  },
  {
    group: "AI & Data",
    skills: ["PyTorch", "TensorFlow", "LangChain", "OpenAI API", "Hugging Face", "Data Analysis", "ML Pipelines"],
  },
  {
    group: "Design",
    skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "After Effects", "Blender", "Procreate", "Spline"],
  },
  {
    group: "Content & Marketing",
    skills: ["Video Editing", "Copywriting", "SEO", "Social Media", "Email Marketing", "Analytics", "Community Building"],
  },
  {
    group: "Other",
    skills: ["Web3 / Solidity", "Mobile Dev", "DevOps", "Research", "Product Management", "Branding", "UI/UX Research"],
  },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills);

const STEPS = ["Role", "Skills", "Profile", "Review"];

const stepVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export const Join = () => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("frontend");
  const [skills, setSkills] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillSearch, setSkillSearch] = useState("");

  const selectedRole = ALL_ROLES.find((r) => r.value === role) || ALL_ROLES[0];
  const xp = Math.min(100, (step + (done ? 1 : 0)) * 18 + skills.length * 4);

  const toggleSkill = (s: string) => {
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < 6 ? [...prev, s] : prev
    );
  };

  const filteredSkillGroups = skillSearch.trim()
    ? [{ group: "Results", skills: ALL_SKILLS.filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase())) }]
    : SKILL_GROUPS;

  const next = () => {
    setError(null);
    if (step === 2) {
      if (!name.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        setError("Please enter a valid name and email address.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

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
        throw new Error((j as { error?: string }).error || "Submission failed");
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center">
        <StarField count={40} />
        <ConfettiBurst count={35} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-pink-500/10" />
        <div className="relative z-10 mx-auto max-w-lg">
          <img
            src={rocket}
            alt=""
            className="float-y mx-auto mb-6 h-36 w-auto drop-shadow-[0_0_50px_rgba(255,138,61,0.6)]"
          />
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <HiCheckCircle className="text-lg text-emerald-400" />
            Application submitted!
          </div>
          <h2 className="font-impact mb-4 text-4xl uppercase sm:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              CoLab Nation
            </span>{" "}
            🎉
          </h2>
          <p className="text-text-dim mb-6 leading-relaxed">
            Hey {name || "Builder"} — your squad is being assembled. A mission briefing is headed to{" "}
            <span className="font-semibold text-white">{email}</span> shortly.
          </p>
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.4em] uppercase">What happens next</p>
            <div className="space-y-2.5">
              {["Our team reviews your application within 72 hours", "You'll receive squad placement & onboarding kit by email", "Season 1 kicks off May 2026 — mark your calendar", "Check support@colabnation.live for any questions"].map((s) => (
                <div key={s} className="flex items-start gap-2.5 text-sm text-white/75">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-emerald-400" />
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="font-display mx-auto inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm tracking-wider uppercase">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            XP Earned:{" "}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text font-black text-transparent">
              +125
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ─── PAGE HERO ─────────────────────────────────────── */}
      <section className="relative flex min-h-[52vh] flex-col items-center justify-center overflow-hidden pt-32 pb-14">
        <StarField count={40} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[380px] w-[700px] -translate-x-1/2 bg-gradient-to-b from-pink-500/18 via-violet-500/8 to-transparent blur-3xl" />

        <div className="relative z-20 mx-auto max-w-2xl px-6 text-center">
          <div className="mb-5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 scale-125 rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-35 blur-xl" />
              <img src={logo} alt="CoLab Nation" className="relative h-14 w-14 rounded-2xl object-contain sm:h-16 sm:w-16" />
            </div>
          </div>

          <div className="font-display mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 text-[10px] tracking-[0.4em] text-pink-200 uppercase backdrop-blur-md">
            <HiSparkles className="size-3 text-pink-300" />
            Founder Cohort · 500 Seats Only
          </div>

          <h1 className="font-impact mb-4 text-[clamp(2.2rem,7.5vw,5rem)] leading-[0.92] tracking-tight uppercase">
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              Choose Your Role.
            </span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent">
              Earn Your Badge.
            </span>
          </h1>
          <p className="text-text-dim mx-auto max-w-md text-sm leading-relaxed sm:text-base">
            17 roles across tech, design, and content. Pick yours, select your skills,
            and apply in 4 steps. Every step earns XP.
          </p>
        </div>
      </section>

      {/* ─── FORM SECTION ──────────────────────────────────── */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr,360px] xl:grid-cols-[1fr,400px]">

            {/* ── MAIN FORM PANEL ── */}
            <div className="neon-border overflow-hidden rounded-3xl">
              {/* Step indicator */}
              <div className="border-b border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                          i < step
                            ? "bg-emerald-500 text-white"
                            : i === step
                            ? "gradient-bg text-white"
                            : "border border-white/15 bg-white/5 text-white/30"
                        }`}>
                          {i < step ? "✓" : i + 1}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className={`h-px w-4 rounded-full transition-all sm:w-8 ${i < step ? "bg-emerald-500" : "bg-white/10"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="font-display text-text-dim whitespace-nowrap text-[10px] tracking-widest uppercase">
                    {STEPS[step]} · {step + 1}/{STEPS.length}
                  </span>
                </div>
              </div>

              {/* Step content */}
              <div className="p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {/* ── STEP 0: ROLE SELECTION ── */}
                    {step === 0 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-display text-xl font-black uppercase sm:text-2xl">What's your role?</h3>
                          <p className="text-text-dim mt-1 text-sm">Pick the category that best describes how you create and build. We have 17 roles across tech, design, and content.</p>
                        </div>

                        {ROLE_CATEGORIES.map((cat) => (
                          <div key={cat.category}>
                            <div className="mb-3 flex items-center gap-2">
                              <div className={`h-px flex-1 bg-gradient-to-r ${cat.color} opacity-40`} />
                              <span className="font-display text-[10px] tracking-[0.35em] text-white/40 uppercase">{cat.category}</span>
                              <div className={`h-px flex-1 bg-gradient-to-l ${cat.color} opacity-40`} />
                            </div>
                            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                              {cat.roles.map((r) => (
                                <button
                                  key={r.value}
                                  onClick={() => setRole(r.value)}
                                  className={`relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-150 ${
                                    role === r.value
                                      ? "border-pink-500 bg-pink-500/10 shadow-[0_0_16px_rgba(255,61,160,0.2)]"
                                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                                  }`}
                                >
                                  <span className="text-xl leading-none">{r.emoji}</span>
                                  <div className="min-w-0">
                                    <p className="font-display text-xs font-black uppercase">{r.label}</p>
                                    <p className="text-text-dim mt-0.5 text-xs leading-snug">{r.desc}</p>
                                  </div>
                                  {role === r.value && (
                                    <HiCheckCircle className="absolute top-3 right-3 shrink-0 text-sm text-pink-400" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ── STEP 1: SKILLS ── */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="font-display text-xl font-black uppercase sm:text-2xl">Your skills</h3>
                          <p className="text-text-dim mt-1 text-sm">Select up to 6 skills — these shape your missions and squad match. Search or browse by category.</p>
                        </div>

                        {/* Search */}
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
                          <input
                            value={skillSearch}
                            onChange={(e) => setSkillSearch(e.target.value)}
                            placeholder="Search skills…"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pr-4 pl-10 text-sm text-white placeholder-white/25 outline-none focus:border-pink-500/50"
                          />
                          {skillSearch && (
                            <button onClick={() => setSkillSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">✕</button>
                          )}
                        </div>

                        {/* Skill groups */}
                        <div className="max-h-[55vh] space-y-4 overflow-y-auto pr-1 [-webkit-overflow-scrolling:touch]">
                          {filteredSkillGroups.map((g) => (
                            <div key={g.group}>
                              {!skillSearch && (
                                <p className="font-display mb-2 text-[10px] tracking-[0.35em] text-white/35 uppercase">{g.group}</p>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {g.skills.map((s) => {
                                  const active = skills.includes(s);
                                  const maxed = !active && skills.length >= 6;
                                  return (
                                    <button
                                      key={s}
                                      onClick={() => toggleSkill(s)}
                                      disabled={maxed}
                                      className={`font-display rounded-full border px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all duration-150 ${
                                        active
                                          ? "border-violet-400 bg-violet-500/20 text-white shadow-[0_0_10px_rgba(139,92,246,0.25)]"
                                          : "text-text-dim border-white/10 bg-white/[0.03] hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
                                      }`}
                                    >
                                      {active ? "✓ " : ""}{s}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                          <span className="font-display text-text-dim text-[10px] tracking-widest uppercase">{skills.length}/6 skills selected</span>
                          {skills.length > 0 && (
                            <button onClick={() => setSkills([])} className="font-display text-[10px] tracking-widest text-rose-400 uppercase hover:text-rose-300">Clear all</button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2: PROFILE ── */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="font-display text-xl font-black uppercase sm:text-2xl">Your profile</h3>
                          <p className="text-text-dim mt-1 text-sm">Tell us who you are. No résumé — just the essentials.</p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="font-display mb-2 flex items-center gap-2 text-xs tracking-wider text-white/50 uppercase">
                              <FaUser className="text-pink-400" /> Full Name
                            </label>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your name"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-pink-500/60 focus:shadow-[0_0_0_3px_rgba(255,61,160,0.1)]"
                            />
                          </div>
                          <div>
                            <label className="font-display mb-2 flex items-center gap-2 text-xs tracking-wider text-white/50 uppercase">
                              <FaEnvelope className="text-violet-400" /> Email Address
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                            />
                          </div>
                          <div>
                            <label className="font-display mb-2 text-xs tracking-wider text-white/50 uppercase">
                              Why join CoLab Nation? <span className="text-white/25">(optional)</span>
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="What do you want to build? What problems do you want to solve?"
                              rows={4}
                              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-pink-500/60 focus:shadow-[0_0_0_3px_rgba(255,61,160,0.1)]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3: REVIEW ── */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="font-display text-xl font-black uppercase sm:text-2xl">Review & Launch</h3>
                          <p className="text-text-dim mt-1 text-sm">Look good? Hit launch to submit your application.</p>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
                          {[
                            { label: "Role", value: selectedRole.label, icon: selectedRole.emoji },
                            { label: "Skills", value: skills.length > 0 ? skills.join("  ·  ") : "None selected", icon: "⚡" },
                            { label: "Name", value: name || "—", icon: "👤" },
                            { label: "Email", value: email || "—", icon: "📧" },
                            ...(message ? [{ label: "Note", value: message, icon: "💬" }] : []),
                          ].map((row, i) => (
                            <div key={row.label} className={`flex items-start gap-3 px-5 py-4 ${i > 0 ? "border-t border-white/[0.05]" : ""}`}>
                              <span className="text-base leading-none">{row.icon}</span>
                              <div className="min-w-0 flex-1">
                                <p className="font-display mb-0.5 text-[9px] tracking-widest text-white/35 uppercase">{row.label}</p>
                                <p className="break-words text-sm text-white/85">{row.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-text-dim rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs leading-relaxed">
                          By submitting you agree to our terms. Our team reviews every application. If you're a Season 1 fit, you'll hear from us at the email above within 72 hours.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {error && (
                  <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3">
                    <span className="mt-0.5 shrink-0 text-rose-400">⚠</span>
                    <p className="text-sm text-rose-200">{error}</p>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    onClick={back}
                    disabled={step === 0 || submitting}
                    className="font-display text-xs tracking-widest text-white/35 uppercase transition-colors hover:text-white/75 disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    ← Back
                  </button>
                  {step < 3 ? (
                    <Button onClick={next} rightIcon={TiLocationArrow} className="px-8">
                      Continue
                    </Button>
                  ) : (
                    <Button
                      onClick={submit}
                      rightIcon={FaRocket}
                      className="px-8 shadow-[0_0_30px_rgba(255,61,160,0.4)]"
                    >
                      {submitting ? "Submitting…" : "Launch Application"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="flex flex-col gap-5">
              {/* Profile card */}
              <div className="neon-border rounded-3xl p-6">
                <p className="font-display text-neon-pink mb-4 text-[10px] tracking-[0.4em] uppercase">Live Preview</p>
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-2xl shadow-lg">
                    {selectedRole.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display truncate text-base font-black">{name || "Your name"}</p>
                    <p className="text-text-dim text-xs">{selectedRole.label} · {skills.length} skill{skills.length !== 1 ? "s" : ""}</p>
                    <p className="text-text-dim mt-0.5 text-[10px]">Season 1 Applicant</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-display text-text-dim mb-1.5 flex items-center justify-between text-[10px] tracking-widest uppercase">
                    <span>XP Progress</span>
                    <span className="text-white">{xp}/100</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ width: `${xp}%` }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="gradient-bg h-full rounded-full"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.length === 0 ? (
                    <span className="text-text-dim text-xs">Select skills to populate your profile</span>
                  ) : (
                    skills.map((s) => (
                      <span key={s} className="font-display rounded-full bg-violet-500/20 px-2.5 py-1 text-[10px] tracking-wider text-violet-200 uppercase">{s}</span>
                    ))
                  )}
                </div>
              </div>

              {/* Season details */}
              <div className="neon-border rounded-3xl p-6">
                <p className="font-display text-neon-violet mb-4 text-[10px] tracking-[0.4em] uppercase">Season 1 · Details</p>
                <div className="space-y-3">
                  {[
                    { icon: FaStar, label: "Founder Seats", value: "500 total", color: "text-pink-400" },
                    { icon: FaBolt, label: "Season Length", value: "12 weeks", color: "text-violet-400" },
                    { icon: FaRocket, label: "Launch Date", value: "May 2026", color: "text-cyan-400" },
                    { icon: FaMedal, label: "Verified Badges", value: "On completion", color: "text-orange-400" },
                    { icon: FaGlobe, label: "Format", value: "Async + live", color: "text-emerald-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`shrink-0 text-xs ${item.color}`} />
                        <span className="text-text-dim text-xs">{item.label}</span>
                      </div>
                      <span className="font-display text-[11px] font-bold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* No résumé card */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <HiCheckCircle className="text-lg text-emerald-400" />
                  <p className="font-display text-[11px] font-black tracking-wider text-emerald-300 uppercase">No Résumé Required</p>
                </div>
                <p className="text-text-dim text-xs leading-relaxed">
                  We evaluate you on what you want to build — not where you've been. Every accepted member gets a verified proof portfolio automatically generated.
                </p>
              </div>

              {/* Contact */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="font-display text-text-dim mb-2 text-[10px] tracking-[0.35em] uppercase">Questions?</p>
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
