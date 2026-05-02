import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import {
  FaRocket, FaUsers, FaMedal, FaCode, FaPen,
  FaPaintBrush, FaComments, FaCheckCircle,
  FaGem, FaBolt, FaCrown, FaStar,
} from "react-icons/fa";

import squad  from "@/assets/characters/squad.png";
import mentor from "@/assets/characters/mentor.png";
import aibot  from "@/assets/characters/aibot.png";
import builder from "@/assets/characters/builder.png";

import { Button } from "@/components/ui/button";
import { StarField, ShootingStars } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BADGES } from "@/constants";

const logo     = "/img/logo.png";
const entrance = "/img/entrance.webp";

/* ── animation helpers ───────────────────────────────────────────── */
const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── page data ───────────────────────────────────────────────────── */
const TICKER = [
  "Builders", "Designers", "Creators", "Verified Badges",
  "Real Squads", "Real Missions", "No Résumé", "Season 1",
  "Ship Real Work", "Get Drafted", "CoLab Nation",
];

const STATS = [
  { value: "500",     label: "Founding Seats", icon: FaGem,   color: "from-pink-500 to-orange-400",  text: "text-pink-400"   },
  { value: "12 Wks",  label: "Season Length",  icon: FaBolt,  color: "from-violet-500 to-blue-500",  text: "text-violet-400" },
  { value: "100+",    label: "Recruiters",     icon: FaCrown, color: "from-cyan-400 to-violet-500",  text: "text-cyan-400"   },
  { value: "May '26", label: "Season Opens",   icon: FaStar,  color: "from-orange-400 to-rose-500",  text: "text-orange-400" },
];

const ROLES = [
  { icon: FaCode,       title: "Builder",         desc: "Engineers and makers who ship real products during the season.", gradient: "from-pink-500 to-orange-500",  glow: "rgba(255,61,160,0.35)"  },
  { icon: FaPaintBrush, title: "Designer",         desc: "Visual artists, UI/UX specialists, and brand creatives.",       gradient: "from-violet-500 to-blue-500",  glow: "rgba(139,92,246,0.35)"  },
  { icon: FaPen,        title: "Content Creator",  desc: "Writers, video producers, and social storytellers.",            gradient: "from-cyan-400 to-violet-500",  glow: "rgba(56,240,255,0.35)"  },
  { icon: FaComments,   title: "Community Lead",   desc: "Connectors and event organizers who keep squads thriving.",     gradient: "from-orange-400 to-pink-500",  glow: "rgba(255,138,61,0.35)"  },
];

const STEPS = [
  { n: "01", icon: FaRocket, title: "Apply",        desc: "Tell us your role and vision. No résumé — we evaluate you on what you want to build.",                              color: "from-pink-500 to-orange-400",  glow: "rgba(255,61,160,0.5)"  },
  { n: "02", icon: FaUsers,  title: "Join a Squad", desc: "Get matched with builders and mentors across design, engineering, and content for 12 weeks of real missions.",      color: "from-violet-500 to-blue-500",  glow: "rgba(139,92,246,0.5)"  },
  { n: "03", icon: FaMedal,  title: "Earn Badges",  desc: "Every mission earns a cryptographically signed badge — permanent proof that companies and recruiters actually trust.", color: "from-cyan-400 to-violet-500",  glow: "rgba(56,240,255,0.5)"  },
];

const PERKS = [
  { label: "Live mission queue from day one",          color: "text-pink-400" },
  { label: "Direct 1:1 mentor pairing",                color: "text-violet-400" },
  { label: "Cryptographic badge per mission",          color: "text-cyan-400" },
  { label: "Auto-generated public portfolio",          color: "text-orange-400" },
  { label: "Priority company draft access",            color: "text-emerald-400" },
  { label: "Season 1 Founder status — permanent",      color: "text-pink-400" },
];

const BADGE_META: Record<string, { tier: string; border: string; glow: string }> = {
  "First Commit":  { tier: "BRONZE",   border: "border-amber-600/45",   glow: "rgba(251,191,36,0.35)"  },
  "Squad Captain": { tier: "SILVER",   border: "border-slate-400/45",   glow: "rgba(148,163,184,0.35)" },
  "Mentor's Pick": { tier: "GOLD",     border: "border-yellow-400/55",  glow: "rgba(234,179,8,0.45)"   },
  "Launch Hero":   { tier: "PLATINUM", border: "border-cyan-400/55",    glow: "rgba(56,240,255,0.45)"  },
  "100x Streak":   { tier: "DIAMOND",  border: "border-emerald-400/55", glow: "rgba(52,211,153,0.45)"  },
  "Verified":      { tier: "S-RANK",   border: "border-pink-400/65",    glow: "rgba(255,61,160,0.5)"   },
};

/* ── component ───────────────────────────────────────────────────── */
export const Nation = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yL  = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yR  = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opc = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-0"
      >
        <StarField count={65} />
        <ShootingStars count={4} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.16]" />
        <div className="aurora   pointer-events-none absolute inset-0 opacity-[0.14]" />
        <div className="scan-lines pointer-events-none absolute inset-0 opacity-40" />

        {/* top radial glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[60vh] w-[85vw] max-w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-600/20 via-pink-500/8 to-transparent blur-3xl" />

        {/* Dark radial backdrop — makes center text readable against characters */}
        <div
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{ background: "radial-gradient(ellipse 62% 72% at 50% 46%, rgba(5,2,15,0.82) 30%, rgba(5,2,15,0.4) 58%, transparent 80%)" }}
        />

        {/* Horizontal accent lines */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {[22, 38, 54].map((top, i) => (
            <div key={i} className="absolute h-px w-full bg-gradient-to-r from-transparent via-pink-500/18 to-transparent"
              style={{ top: `${top}%`, opacity: 0.7 - i * 0.15 }} />
          ))}
        </div>

        {/* ── LEFT character — Squad (masked to fade right) ── */}
        <motion.div style={{ y: yL, opacity: opc }}
          className="pointer-events-none absolute bottom-0 left-0 z-10 hidden lg:block xl:-left-4 2xl:-left-10"
        >
          <motion.img src={squad} alt=""
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="float-slow h-[62vh] max-h-[580px] w-auto drop-shadow-[0_0_60px_rgba(255,61,160,0.55)]"
            draggable={false}
            style={{ maskImage: "linear-gradient(to right, black 50%, transparent 92%)", WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 92%)" }}
          />
        </motion.div>

        {/* ── RIGHT character — Mentor (masked to fade left) ── */}
        <motion.div style={{ y: yR, opacity: opc }}
          className="pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-2 2xl:-right-8"
        >
          <motion.img src={mentor} alt=""
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="float-y h-[65vh] max-h-[610px] w-auto drop-shadow-[0_0_60px_rgba(139,92,246,0.6)]"
            draggable={false}
            style={{ maskImage: "linear-gradient(to left, black 50%, transparent 92%)", WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 92%)" }}
          />
        </motion.div>

        {/* ── Main content ── */}
        <motion.div style={{ opacity: opc }}
          className="relative z-20 mx-auto max-w-2xl px-5 text-center sm:px-10"
        >
          {/* Logo badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: -14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-[1.5] rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-55 blur-xl" />
              <img src={logo} alt="CoLab Nation" className="relative h-14 w-14 rounded-2xl object-contain shadow-2xl" />
            </div>
          </motion.div>

          {/* Eyebrow chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex justify-center"
          >
            <span className="font-display inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/12 px-4 py-2 text-[10px] tracking-[0.42em] text-violet-200 uppercase backdrop-blur-md">
              <motion.span className="size-1.5 rounded-full bg-violet-400"
                animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
              Season 1 · Founding Cohort · May 2026
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-impact mb-6 text-[clamp(3rem,10.5vw,7rem)] leading-[0.87] tracking-tight uppercase">
            {(["Build Together.", "Prove Everything."] as const).map((line, li) => (
              <motion.span key={line} className="block"
                initial={{ opacity: 0, y: 52, skewY: 3 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.9, delay: 0.48 + li * 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={li === 0
                    ? "bg-gradient-to-r from-pink-400 via-fuchsia-200 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(255,61,160,0.35)]"
                    : "bg-gradient-to-r from-violet-300 via-pink-200 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(139,92,246,0.35)]"
                  }
                >
                  {line}
                </span>
              </motion.span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-8 max-w-[460px] text-sm leading-relaxed text-white/80 sm:text-base"
          >
            CoLab Nation is where ambitious builders, designers, and creators join
            real squads, ship real work, and earn verified proof of their skills —
            no résumé required.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.02, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/join">
              <Button rightIcon={TiLocationArrow} className="px-8 py-4 text-base shadow-[0_0_50px_rgba(255,61,160,0.5)]">
                Claim Your Seat
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="ghost" className="px-8 py-4 text-base">
                Explore Programs
              </Button>
            </Link>
          </motion.div>

          {/* Mobile characters */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex w-full items-end justify-center gap-3 lg:hidden"
          >
            <img src={squad}  alt="" className="float-slow h-52 w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.6)] sm:h-64" draggable={false} />
            <img src={mentor} alt="" className="float-y  h-52 w-auto drop-shadow-[0_0_40px_rgba(139,92,246,0.6)] sm:h-64" draggable={false} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MARQUEE TICKER
      ═══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.02] py-3.5">
        <div className="scan-lines pointer-events-none absolute inset-0 opacity-50" />
        <div className="marquee flex gap-10 whitespace-nowrap">
          {Array.from({ length: 5 }).flatMap(() => TICKER).map((item, i) => (
            <span key={i} className="font-display shrink-0 text-[10px] tracking-[0.45em] text-white/45 uppercase">
              {item}
              <span className="ml-10 text-pink-500/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          STATS BAND
      ═══════════════════════════════════════════════════════ */}
      <section className="relative border-b border-white/[0.06] py-12">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...up(i * 0.09)}
                className="flex flex-col items-center gap-3 bg-bg px-8 py-6 text-center"
              >
                <div className={`flex size-9 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} shadow-md`}>
                  <s.icon className="text-xs text-white" />
                </div>
                <p className={`font-impact text-[clamp(2rem,4.5vw,3.2rem)] leading-none ${s.text}`}>
                  {s.value}
                </p>
                <p className="font-display text-[10px] tracking-[0.32em] text-white/55 uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MANIFESTO — image + copy
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Image */}
            <motion.div {...up(0)} className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 z-10 rounded-3xl bg-gradient-to-tr from-pink-500/25 via-transparent to-violet-500/25 mix-blend-overlay" />
              <div className="scan-lines absolute inset-0 z-10 rounded-3xl opacity-35" />
              <img src={entrance} alt="CoLab Nation"
                className="aspect-[4/3] h-full w-full rounded-3xl object-cover"
                style={{ filter: "brightness(0.72) saturate(1.4)" }}
              />
              <div className="absolute inset-0 z-10 rounded-3xl bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 z-20">
                <span className="font-display rounded-xl border border-white/25 bg-black/65 px-4 py-2 text-[10px] tracking-[0.35em] text-white/80 uppercase backdrop-blur-md">
                  Season 1 · May 2026
                </span>
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div {...up(0.1)}>
              <p className="font-display text-neon-pink mb-4 text-[11px] tracking-[0.45em] uppercase">The Movement</p>
              <h2 className="font-impact mb-6 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.92] uppercase">
                Skills are only real{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  when proven.
                </span>
              </h2>
              <p className="mb-5 text-sm leading-loose text-white/70 sm:text-base">
                CoLab Nation exists because talent is everywhere but proof is rare.
                Traditional résumés tell companies where you studied. We show
                them what you actually built — with real teammates, under real
                pressure, verified by real mentors.
              </p>
              <p className="mb-8 text-sm leading-loose text-white/70 sm:text-base">
                Season 1 is 500 builders, designers, and creators who are done
                waiting for permission. Join a squad. Ship a mission. Earn your badge.
              </p>
              <div className="flex items-center gap-3">
                <Link to="/join">
                  <Button rightIcon={TiLocationArrow} className="px-7 py-3.5">
                    Claim a Seat
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="ghost" className="px-7 py-3.5">Our Story</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS — vertical timeline
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.1]" />

        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div {...up()} className="mb-16 text-center">
            <p className="font-display text-neon-violet mb-3 text-[11px] tracking-[0.45em] uppercase">The Process</p>
            <h2 className="font-impact text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.92] uppercase">
              From application{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                to legend.
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical spine */}
            <div className="absolute left-7 top-10 bottom-10 hidden w-px bg-gradient-to-b from-pink-500/60 via-violet-500/60 to-cyan-500/60 sm:block" />

            <div className="space-y-5">
              {STEPS.map((s, i) => (
                <motion.div key={s.n} {...up(i * 0.14)}
                  className="group relative flex items-start gap-6"
                >
                  {/* Icon node */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-xl transition-all duration-300 group-hover:scale-110`}
                      style={{ boxShadow: `0 0 30px ${s.glow}` }}
                    >
                      <s.icon className="text-xl text-white" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.04] p-6 transition-all duration-300 group-hover:border-white/[0.18] group-hover:bg-white/[0.07]">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-impact text-5xl leading-none text-white/[0.08] select-none">{s.n}</span>
                      <h3 className="font-display text-base font-black tracking-wider uppercase sm:text-lg">{s.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-white/65">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHO BELONGS — roles grid
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />

        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...up()} className="mb-14 text-center">
            <p className="font-display text-neon-pink mb-3 text-[11px] tracking-[0.45em] uppercase">Who Belongs Here</p>
            <h2 className="font-impact text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.92] uppercase">
              Every role.{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                One nation.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/65 sm:text-base">
              Not just coders. A full creative ecosystem where every discipline
              earns real proof.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((r, i) => (
              <motion.div key={r.title} {...up(i * 0.1)}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.04] p-7 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.07] cursor-default"
              >
                {/* Glow blob */}
                <div
                  className={`pointer-events-none absolute -top-8 -right-8 size-40 rounded-full bg-gradient-to-br ${r.gradient} opacity-[0.14] blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
                />
                {/* Icon */}
                <div
                  className={`relative mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${r.gradient} shadow-lg`}
                  style={{ boxShadow: `0 0 20px ${r.glow}` }}
                >
                  <r.icon className="text-sm text-white" />
                </div>
                <h3 className="font-display mb-2.5 text-sm font-black tracking-wider uppercase sm:text-[0.95rem]">{r.title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{r.desc}</p>
                <div className={`mt-6 h-px w-full bg-gradient-to-r ${r.gradient} opacity-25 transition-opacity duration-500 group-hover:opacity-55`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOUNDER PERKS — 2-col with character
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/4 to-transparent" />

        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* Left copy + character */}
            <motion.div {...up()}>
              <p className="font-display text-neon-cyan mb-4 text-[11px] tracking-[0.45em] uppercase">Founder Benefits</p>
              <h2 className="font-impact mb-6 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.92] uppercase">
                What you unlock{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  inside.
                </span>
              </h2>
              <p className="mb-8 text-sm leading-loose text-white/70 sm:text-base">
                Season 1 is the ground floor. 500 seats, permanent Founder status,
                and exclusive access to every feature we ship.
              </p>
              <Link to="/join">
                <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_40px_rgba(255,61,160,0.42)]">
                  Apply Now
                </Button>
              </Link>

              {/* Builder character — desktop only */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 hidden lg:block"
              >
                <img src={builder} alt=""
                  className="float-y h-60 w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.55)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Right perks list */}
            <div className="space-y-2.5">
              {PERKS.map((p, i) => (
                <motion.div key={p.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.09] bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.07]"
                >
                  <FaCheckCircle className={`shrink-0 text-sm ${p.color} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
                  <p className="text-sm text-white/75 transition-colors duration-300 group-hover:text-white">{p.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BADGE SHOWCASE
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.1]" />

        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <motion.div {...up()} className="mb-14 text-center">
            <p className="font-display text-neon-cyan mb-3 text-[11px] tracking-[0.45em] uppercase">Achievement System</p>
            <h2 className="font-impact text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.92] uppercase">
              Badges recruiters{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                actually trust.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/65 sm:text-base">
              Cryptographically signed. Tied to real work — not a quiz you passed.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b, i) => {
              const meta = BADGE_META[b.name] ?? { tier: "RANK", border: "border-white/15", glow: "rgba(255,255,255,0.1)" };
              return (
                <motion.div key={b.name}
                  initial={{ opacity: 0, y: 30, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, scale: 1.06, transition: { duration: 0.2 } }}
                  className={`group relative overflow-hidden rounded-2xl border ${meta.border} bg-white/[0.04] p-5 text-center cursor-default`}
                >
                  {/* Glow */}
                  <div className={`pointer-events-none absolute -top-8 left-1/2 size-24 -translate-x-1/2 rounded-full bg-gradient-to-br ${b.color} opacity-22 blur-2xl transition-opacity duration-500 group-hover:opacity-55`} />
                  {/* Holographic shimmer */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.07) 0%,transparent 50%,rgba(255,255,255,0.03) 100%)" }} />

                  <div className={`relative mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.color} shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${meta.glow}` }}
                  >
                    <span className="text-lg font-bold text-white">{b.icon}</span>
                  </div>

                  <p className="font-display mb-1 text-[9px] tracking-[0.38em] text-white/40 uppercase">{meta.tier}</p>
                  <p className="font-display text-[11px] font-black tracking-wide uppercase text-white/90">{b.name}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA CARD
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div {...up()}
            className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.04] p-12 text-center sm:p-16"
          >
            {/* Backgrounds */}
            <div className="aurora pointer-events-none absolute inset-0 rounded-3xl opacity-18" />
            <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/35 to-violet-500/20 blur-3xl" />
            <div className="scan-lines pointer-events-none absolute inset-0 rounded-3xl opacity-40" />

            {/* Nova */}
            <motion.img src={aibot} alt=""
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="float-y pointer-events-none mx-auto mb-6 h-24 w-auto drop-shadow-[0_0_45px_rgba(56,240,255,0.75)]"
              draggable={false}
            />

            <div className="relative">
              <div className="font-display mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/45 bg-pink-500/12 px-4 py-2 text-[10px] tracking-[0.4em] text-pink-300 uppercase backdrop-blur-md">
                <motion.span className="size-1.5 rounded-full bg-pink-400"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                500 Seats · Season 1
              </div>

              <h3 className="font-impact mb-4 text-[clamp(2.2rem,6.5vw,4.2rem)] leading-[0.9] uppercase">
                Citizenship opens{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  May 2026.
                </span>
              </h3>
              <p className="mx-auto mb-8 max-w-md text-sm text-white/70 sm:text-base">
                Verified work. Direct draft to companies that hire on proof, not promises.
                Reserve your spot before they&apos;re gone.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/join">
                  <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_55px_rgba(255,61,160,0.55)]">
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
