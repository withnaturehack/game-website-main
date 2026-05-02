import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import {
  FaRocket,
  FaUsers,
  FaMedal,
  FaCode,
  FaPen,
  FaPaintBrush,
  FaComments,
  FaShieldAlt,
  FaCheckCircle,
  FaGem,
  FaCrown,
  FaBolt,
  FaStar,
  FaInfinity,
} from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";

import squad from "@/assets/characters/squad.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";
import builder from "@/assets/characters/builder.png";

import { Button } from "@/components/ui/button";
import { StarField, ShootingStars } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BADGES } from "@/constants";

const logo = "/img/logo.png";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const ROLES = [
  {
    icon: FaCode,
    title: "Builder",
    rank: "S",
    rankColor: "text-pink-400 border-pink-400/50 bg-pink-400/10",
    desc: "Engineers, researchers, and makers who ship real products during the season.",
    color: "from-pink-500 to-orange-400",
    glowColor: "rgba(255,61,160,0.35)",
    accent: "border-pink-500/25",
  },
  {
    icon: FaPaintBrush,
    title: "Designer",
    rank: "A",
    rankColor: "text-violet-400 border-violet-400/50 bg-violet-400/10",
    desc: "Visual artists, UI/UX designers, and brand specialists who make ideas beautiful.",
    color: "from-violet-500 to-blue-500",
    glowColor: "rgba(139,92,246,0.35)",
    accent: "border-violet-500/25",
  },
  {
    icon: FaPen,
    title: "Content Creator",
    rank: "A",
    rankColor: "text-cyan-400 border-cyan-400/50 bg-cyan-400/10",
    desc: "Writers, video producers, and social storytellers who amplify the mission.",
    color: "from-cyan-400 to-violet-500",
    glowColor: "rgba(56,240,255,0.35)",
    accent: "border-cyan-500/25",
  },
  {
    icon: FaComments,
    title: "Community Lead",
    rank: "B",
    rankColor: "text-orange-400 border-orange-400/50 bg-orange-400/10",
    desc: "Connectors, discord leads, and event organizers who keep the squad thriving.",
    color: "from-orange-400 to-pink-500",
    glowColor: "rgba(255,138,61,0.35)",
    accent: "border-orange-500/25",
  },
];

const ARCS = [
  {
    step: "01",
    title: "Apply & Get Accepted",
    desc: "Submit your role, skills, and vision. No résumé needed — we evaluate based on what you want to build.",
    icon: FaRocket,
    color: "from-pink-500 to-orange-400",
    glowColor: "rgba(255,61,160,0.5)",
  },
  {
    step: "02",
    title: "Join Your Squad",
    desc: "Get matched with builders, designers, and mentors who complement your skills. Collaborate on real missions across 12 weeks.",
    icon: FaUsers,
    color: "from-violet-500 to-blue-500",
    glowColor: "rgba(139,92,246,0.5)",
  },
  {
    step: "03",
    title: "Earn Verified Badges",
    desc: "Every mission earns cryptographically signed badges. Permanent proof of your skills that recruiters actually trust.",
    icon: FaMedal,
    color: "from-cyan-400 to-violet-500",
    glowColor: "rgba(56,240,255,0.5)",
  },
];

const STATS = [
  { value: "500", label: "Founding Seats", sublabel: "Season One", icon: FaGem, barPct: 100, color: "from-pink-500 to-orange-400", textColor: "text-pink-400" },
  { value: "12", label: "Week Season", sublabel: "Mission Duration", icon: FaBolt, barPct: 80, color: "from-violet-500 to-blue-500", textColor: "text-violet-400" },
  { value: "100+", label: "Recruiters", sublabel: "Demo Day Access", icon: FaCrown, barPct: 90, color: "from-cyan-400 to-violet-500", textColor: "text-cyan-400" },
  { value: "May '26", label: "Launch Date", sublabel: "Season Opens", icon: FaStar, barPct: 60, color: "from-orange-400 to-rose-500", textColor: "text-orange-400" },
];

const PERKS = [
  { text: "Access to live mission queue from day one", icon: FaBolt },
  { text: "Direct mentor pairing with verified industry experts", icon: FaShieldAlt },
  { text: "Cryptographic badges for every mission completed", icon: FaMedal },
  { text: "Public portfolio auto-generated from your work", icon: FaStar },
  { text: "Priority access to company draft pipeline", icon: FaRocket },
  { text: "Season 1 Founder status — permanent recognition", icon: FaCrown },
];

const BADGE_TIERS: Record<string, { tier: string; color: string; border: string }> = {
  "First Commit": { tier: "BRONZE", color: "from-orange-700 to-amber-500", border: "border-amber-600/40" },
  "Squad Captain": { tier: "SILVER", color: "from-slate-400 to-zinc-300", border: "border-slate-400/40" },
  "Mentor's Pick": { tier: "GOLD", color: "from-yellow-500 to-amber-400", border: "border-yellow-400/50" },
  "Launch Hero": { tier: "PLATINUM", color: "from-cyan-400 to-violet-500", border: "border-cyan-400/50" },
  "100x Streak": { tier: "DIAMOND", color: "from-emerald-400 to-cyan-400", border: "border-emerald-400/50" },
  "Verified": { tier: "S-RANK", color: "from-pink-500 to-fuchsia-500", border: "border-pink-400/60" },
};

export const Nation = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yLeft  = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[96vh] flex-col items-center justify-center overflow-hidden pt-32 pb-20"
      >
        <StarField count={55} />
        <ShootingStars count={3} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" />
        <div className="aurora pointer-events-none absolute inset-0 opacity-20" />
        <div className="scan-lines pointer-events-none absolute inset-0" />
        <div className="speed-lines pointer-events-none absolute inset-0 opacity-30" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-violet-500/18 via-pink-500/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-pink-500/14 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-gradient-to-tl from-violet-500/14 to-transparent blur-3xl" />

        {/* Speed lines – desktop bg decoration */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"
              style={{ top: `${28 + i * 18}%`, left: "5%", right: "5%", opacity: 0.5 - i * 0.12 }}
            />
          ))}
        </div>

        {/* LEFT character — Squad */}
        <motion.div
          style={{ y: yLeft, opacity }}
          className="pointer-events-none absolute bottom-0 left-0 z-10 hidden lg:block xl:-left-12 2xl:-left-24"
        >
          <motion.img
            src={squad}
            alt="Squad"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="float-slow h-[60vh] max-h-[560px] w-auto drop-shadow-[0_0_60px_rgba(255,61,160,0.5)]"
            draggable={false}
          />
        </motion.div>

        {/* RIGHT character — Mentor */}
        <motion.div
          style={{ y: yRight, opacity }}
          className="pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-8 2xl:-right-16"
        >
          <motion.img
            src={mentor}
            alt="Mentor"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="float-y h-[62vh] max-h-[580px] w-auto drop-shadow-[0_0_60px_rgba(139,92,246,0.55)]"
            draggable={false}
          />
        </motion.div>

        {/* Main content */}
        <motion.div
          style={{ opacity }}
          className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-8"
        >
          {/* Logo + rank badge row */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-125 rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-55 blur-xl" />
              <img src={logo} alt="CoLab Nation" className="relative h-14 w-14 rounded-2xl object-contain sm:h-16 sm:w-16" />
            </div>
            <div className="font-display flex flex-col items-start gap-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-[9px] tracking-[0.45em] text-violet-300 uppercase backdrop-blur-md">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="size-1.5 rounded-full bg-violet-400"
                />
                Season 1 · Founding Cohort
              </span>
            </div>
          </motion.div>

          {/* Headline — staggered word reveal */}
          <h1 className="font-impact mb-5 text-[clamp(2.8rem,10vw,7rem)] leading-[0.88] tracking-tight uppercase">
            {["Build Together.", "Prove Everything."].map((line, li) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 55, skewY: 3 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.9, delay: 0.45 + li * 0.17, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  data-text={line}
                  className={`glitch ${li === 0
                    ? "bg-gradient-to-r from-pink-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,61,160,0.5)]"
                    : "bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                  }`}
                >
                  {line}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.85)}
            className="text-text-dim mx-auto mb-8 max-w-lg text-sm leading-relaxed sm:text-base"
          >
            CoLab Nation is where ambitious builders, designers, and creators
            join real squads, ship real work, and earn verified proof of their
            skills — no résumé required.
          </motion.p>

          <motion.div
            {...fadeUp(1.0)}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/join">
              <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_50px_rgba(255,61,160,0.45)]">
                Claim Your Seat
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="ghost" className="px-8 py-4">Explore Programs</Button>
            </Link>
          </motion.div>

          {/* Mobile characters */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex w-full items-end justify-center gap-3 lg:hidden"
          >
            <img src={squad} alt="Squad" className="float-slow h-48 w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.55)] sm:h-60" draggable={false} />
            <img src={mentor} alt="Mentor" className="float-y h-48 w-auto drop-shadow-[0_0_40px_rgba(139,92,246,0.55)] sm:h-60" draggable={false} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          POWER STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.07] bg-white/[0.015] py-12">
        <div className="scan-lines pointer-events-none absolute inset-0 opacity-60" />
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp(i * 0.09)}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-center"
              >
                {/* Icon circle */}
                <div className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-lg`}>
                  <s.icon className="text-sm text-white" />
                </div>
                <p className={`font-impact text-3xl leading-none sm:text-4xl ${s.textColor}`}>{s.value}</p>
                <div>
                  <p className="font-display text-xs font-black tracking-[0.25em] text-white/90 uppercase">{s.label}</p>
                  <p className="font-display mt-0.5 text-[9px] tracking-[0.2em] text-white/30 uppercase">{s.sublabel}</p>
                </div>
                {/* Power bar */}
                <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.barPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SELECT YOUR CLASS (ROLES)
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/4 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />

        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.5em] uppercase">
              Who Belongs Here
            </p>
            <h2 className="font-impact text-4xl leading-tight uppercase sm:text-5xl lg:text-6xl">
              Every role.{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                One nation.
              </span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-md text-sm sm:text-base">
              CoLab Nation isn&apos;t just for coders. We&apos;re building a full creative
              ecosystem where every skill matters.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((r, i) => (
              <motion.div
                key={r.title}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group neon-border holo-card manga-panel relative overflow-hidden rounded-2xl p-6 cursor-default"
              >
                {/* Corner rank badge */}
                <div className={`absolute right-4 top-4 font-display rounded-lg border px-2 py-0.5 text-[10px] font-black tracking-widest ${r.rankColor}`}>
                  {r.rank}
                </div>

                {/* Glow orb */}
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br ${r.color} opacity-12 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
                />

                {/* Scan line sweep on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)" }}
                />

                {/* Icon */}
                <div className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${r.color} shadow-lg`}>
                  <r.icon className="text-sm text-white" />
                  <div className="absolute inset-0 rounded-xl" style={{ boxShadow: `0 0 20px ${r.glowColor}`, opacity: 0 }} />
                </div>

                <h3 className="font-display mb-2 text-sm font-black tracking-wider uppercase sm:text-base">
                  {r.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">{r.desc}</p>

                {/* Bottom accent line */}
                <div className={`mt-5 h-px w-full bg-gradient-to-r ${r.color} opacity-20 group-hover:opacity-50 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ARC PROGRESSION (HOW IT WORKS)
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/4 to-transparent" />

        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <p className="font-display text-neon-violet mb-3 text-[10px] tracking-[0.5em] uppercase">
              The Process
            </p>
            <h2 className="font-impact text-4xl leading-tight uppercase sm:text-5xl lg:text-6xl">
              From application{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                to legend.
              </span>
            </h2>
          </motion.div>

          {/* Arc cards with connector lines */}
          <div className="relative grid gap-6 md:grid-cols-3">
            {/* Desktop connecting line */}
            <div className="absolute top-[3.5rem] left-1/6 right-1/6 hidden h-px md:block"
              style={{ background: "linear-gradient(90deg, rgba(255,61,160,0.4), rgba(139,92,246,0.4), rgba(56,240,255,0.4))" }}
            />

            {ARCS.map((arc, i) => (
              <motion.div
                key={arc.step}
                {...fadeUp(i * 0.15)}
                className="group neon-border relative overflow-hidden rounded-2xl p-7"
              >
                {/* Glow */}
                <div className={`pointer-events-none absolute -top-12 -left-12 size-40 rounded-full bg-gradient-to-br ${arc.color} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-500`} />

                {/* Step number + icon */}
                <div className="relative mb-5 flex items-start justify-between">
                  <div className={`relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${arc.color} shadow-lg`}
                    style={{ boxShadow: `0 0 24px ${arc.glowColor}`, width: "3.25rem", height: "3.25rem" }}
                  >
                    <arc.icon className="text-base text-white" />
                  </div>
                  <span className="font-impact text-6xl leading-none text-white/[0.06] select-none">
                    {arc.step}
                  </span>
                </div>

                <h3 className="font-display mb-3 text-sm font-black tracking-wider uppercase sm:text-base">
                  {arc.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">{arc.desc}</p>

                {/* Arrow — only between cards on desktop */}
                {i < ARCS.length - 1 && (
                  <div className="absolute -right-3 top-14 z-20 hidden md:flex size-6 items-center justify-center rounded-full border border-white/10 bg-bg text-white/30">
                    <HiChevronRight className="text-xs" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER ABILITIES (PERKS)
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Left copy */}
            <motion.div {...fadeUp()}>
              <p className="font-display text-neon-cyan mb-3 text-[10px] tracking-[0.5em] uppercase">
                Founder Benefits
              </p>
              <h2 className="font-impact mb-5 text-4xl leading-tight uppercase sm:text-5xl">
                What you unlock as a{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  founding member.
                </span>
              </h2>
              <p className="text-text-dim mb-8 text-sm leading-relaxed sm:text-base">
                Season 1 members get permanent Founder status and exclusive
                access to every future feature we ship. This is the ground
                floor — and there are only 500 seats.
              </p>
              <Link to="/join">
                <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_35px_rgba(255,61,160,0.4)]">
                  Apply Now
                </Button>
              </Link>

              {/* Character illustration */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 hidden lg:block"
              >
                <img
                  src={builder}
                  alt="Builder"
                  className="float-y h-56 w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.5)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Right — skill unlock list */}
            <div className="space-y-3">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-pink-500/25 hover:bg-white/[0.05]"
                >
                  {/* Icon badge */}
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-violet-500/20 border border-white/10 group-hover:border-pink-500/30 transition-colors duration-300">
                    <perk.icon className="text-xs text-pink-400" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/80 group-hover:text-white/95 transition-colors duration-300">
                    {perk.text}
                  </p>
                  <FaCheckCircle className="mt-0.5 ml-auto shrink-0 text-sm text-emerald-400/60 group-hover:text-emerald-400 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ACHIEVEMENT SYSTEM (BADGES)
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/4 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />

        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...fadeUp()} className="mb-14 text-center">
            <p className="font-display text-neon-cyan mb-3 text-[10px] tracking-[0.5em] uppercase">
              Achievement System
            </p>
            <h2 className="font-impact text-4xl leading-tight uppercase sm:text-5xl lg:text-6xl">
              Badges recruiters{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                actually trust.
              </span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-md text-sm sm:text-base">
              Cryptographically signed. Tied to real work you shipped — not a quiz you passed.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b, i) => {
              const tier = BADGE_TIERS[b.name] ?? { tier: "RANK", color: b.color, border: "border-white/20" };
              return (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, y: 40, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.25 } }}
                  className={`group holo-card manga-panel relative overflow-hidden rounded-2xl border ${tier.border} bg-white/[0.03] p-5 text-center cursor-default`}
                >
                  {/* Glow */}
                  <div className={`pointer-events-none absolute -top-10 left-1/2 size-24 -translate-x-1/2 rounded-full bg-gradient-to-br ${b.color} opacity-18 blur-2xl transition-opacity duration-500 group-hover:opacity-45`} />

                  {/* Holographic shimmer overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)" }}
                  />

                  {/* Badge icon */}
                  <div className={`relative mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} shadow-lg`}>
                    <span className="text-lg text-white font-bold">{b.icon}</span>
                  </div>

                  {/* Tier label */}
                  <p className={`font-display mb-1 text-[8px] tracking-[0.4em] uppercase`}
                    style={{ color: "rgba(255,255,255,0.35)" }}>
                    {tier.tier}
                  </p>

                  <p className="font-display text-[10px] font-black tracking-wider uppercase text-white/90">
                    {b.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CITIZENSHIP CTA (INLINE)
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <motion.div
            {...fadeUp()}
            className="neon-border relative overflow-hidden rounded-3xl p-10 text-center sm:p-16"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/10 via-violet-500/6 to-blue-500/10" />
            <div className="aurora pointer-events-none absolute inset-0 rounded-3xl opacity-20" />
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/25 to-violet-500/15 blur-3xl" />

            {/* Nova floating */}
            <motion.img
              src={aibot}
              alt="Nova"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="float-y pointer-events-none mx-auto mb-6 h-20 w-auto drop-shadow-[0_0_40px_rgba(56,240,255,0.7)]"
              draggable={false}
            />

            <div className="relative">
              <div className="font-display mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-2 text-[10px] tracking-[0.4em] text-pink-300 uppercase backdrop-blur-md">
                <FaInfinity className="text-xs text-pink-400" />
                Only 500 Founder Seats
              </div>

              <h3 className="font-impact mb-4 text-3xl leading-tight uppercase sm:text-5xl">
                Citizenship opens{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  May 2026.
                </span>
              </h3>

              <p className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base">
                Verified work. Direct draft to companies that hire on proof —
                not promises. Reserve your spot before they&apos;re gone.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/join">
                  <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_50px_rgba(255,61,160,0.5)]">
                    Reserve My Seat
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="ghost" className="px-8 py-4">Our Story</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
