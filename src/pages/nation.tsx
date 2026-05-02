import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import {
  FaRocket, FaUsers, FaMedal, FaCode, FaPen,
  FaPaintBrush, FaComments, FaCheckCircle,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

import squad  from "@/assets/characters/squad.png";
import mentor from "@/assets/characters/mentor.png";
import aibot  from "@/assets/characters/aibot.png";

import { Button } from "@/components/ui/button";
import { StarField, ShootingStars } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BADGES } from "@/constants";

const logo      = "/img/logo.png";
const entrance  = "/img/entrance.webp";

/* ─── animation helper ───────────────────────────────────────────── */
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── data ───────────────────────────────────────────────────────── */
const STATS = [
  { value: "500",      label: "Founding Seats" },
  { value: "12 Wks",   label: "Season Length"  },
  { value: "100+",     label: "Recruiters"     },
  { value: "May '26",  label: "Season Opens"   },
];

const ROLES = [
  { icon: FaCode,        title: "Builder",          desc: "Engineers and makers who ship real products.", gradient: "from-pink-500 to-orange-500"  },
  { icon: FaPaintBrush,  title: "Designer",          desc: "Visual artists and UI/UX specialists.",       gradient: "from-violet-500 to-blue-500"  },
  { icon: FaPen,         title: "Content Creator",   desc: "Writers, editors, and social storytellers.",  gradient: "from-cyan-400 to-violet-500"  },
  { icon: FaComments,    title: "Community Lead",    desc: "Connectors who keep the squad thriving.",     gradient: "from-orange-400 to-pink-500"  },
];

const STEPS = [
  { n: "01", icon: FaRocket, title: "Apply",          desc: "Tell us your role and vision. No résumé — we evaluate you on what you want to build.",                            color: "from-pink-500 to-orange-400",  glow: "rgba(255,61,160,0.5)"   },
  { n: "02", icon: FaUsers,  title: "Join a Squad",   desc: "Get matched with builders and mentors across design, engineering, and content for 12 weeks of real missions.",    color: "from-violet-500 to-blue-500",  glow: "rgba(139,92,246,0.5)"   },
  { n: "03", icon: FaMedal,  title: "Earn Badges",    desc: "Every mission earns a cryptographically signed badge — permanent proof that companies actually trust.",           color: "from-cyan-400 to-violet-500",  glow: "rgba(56,240,255,0.5)"   },
];

const PERKS = [
  "Live mission queue from day one",
  "Direct 1:1 mentor pairing",
  "Cryptographic badges per mission",
  "Auto-generated public portfolio",
  "Priority company draft access",
  "Season 1 Founder status — permanent",
];

const BADGE_META: Record<string, { tier: string; border: string; glow: string }> = {
  "First Commit":  { tier: "BRONZE",   border: "border-amber-600/40",  glow: "rgba(251,191,36,0.3)"  },
  "Squad Captain": { tier: "SILVER",   border: "border-slate-400/40",  glow: "rgba(148,163,184,0.3)" },
  "Mentor's Pick": { tier: "GOLD",     border: "border-yellow-400/50", glow: "rgba(234,179,8,0.4)"   },
  "Launch Hero":   { tier: "PLATINUM", border: "border-cyan-400/50",   glow: "rgba(56,240,255,0.4)"  },
  "100x Streak":   { tier: "DIAMOND",  border: "border-emerald-400/50",glow: "rgba(52,211,153,0.4)"  },
  "Verified":      { tier: "S-RANK",   border: "border-pink-400/60",   glow: "rgba(255,61,160,0.45)" },
};

/* ─── component ──────────────────────────────────────────────────── */
export const Nation = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yL  = useTransform(scrollYProgress, [0,1], ["0%","-12%"]);
  const yR  = useTransform(scrollYProgress, [0,1], ["0%","-18%"]);
  const opc = useTransform(scrollYProgress, [0,0.75], [1, 0]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-0 pt-28"
      >
        <StarField count={60} />
        <ShootingStars count={4} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.18]" />
        <div className="aurora   pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="scan-lines pointer-events-none absolute inset-0 opacity-50" />

        {/* top radial glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[55vh] w-[90vw] max-w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-600/22 via-pink-500/10 to-transparent blur-3xl" />

        {/* horizontal speed-line accents */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {[24, 40, 56].map((top, i) => (
            <div key={i} className="absolute h-px w-full bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"
              style={{ top: `${top}%`, opacity: 0.6 - i * 0.15 }} />
          ))}
        </div>

        {/* ── Characters ── */}
        {/* LEFT — squad */}
        <motion.div style={{ y: yL, opacity: opc }}
          className="pointer-events-none absolute bottom-0 left-0 z-10 hidden lg:block xl:-left-8 2xl:-left-16"
        >
          <motion.img src={squad} alt=""
            initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22,1,0.36,1] }}
            className="float-slow h-[65vh] max-h-[620px] w-auto drop-shadow-[0_0_70px_rgba(255,61,160,0.5)]"
            draggable={false}
          />
        </motion.div>

        {/* RIGHT — mentor */}
        <motion.div style={{ y: yR, opacity: opc }}
          className="pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-4 2xl:-right-12"
        >
          <motion.img src={mentor} alt=""
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22,1,0.36,1] }}
            className="float-y h-[68vh] max-h-[640px] w-auto drop-shadow-[0_0_70px_rgba(139,92,246,0.55)]"
            draggable={false}
          />
        </motion.div>

        {/* ── Content ── */}
        <motion.div style={{ opacity: opc }}
          className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity:0, scale:0.7, y:-16 }}
            animate={{ opacity:1, scale:1, y:0 }}
            transition={{ duration:0.8, delay:0.2, ease:[0.22,1,0.36,1] }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-[1.4] rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-50 blur-xl" />
              <img src={logo} alt="CoLab Nation" className="relative h-14 w-14 rounded-2xl object-contain" />
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.35, ease:[0.22,1,0.36,1] }}
            className="mb-6 flex justify-center"
          >
            <span className="font-display inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-2 text-[10px] tracking-[0.45em] text-violet-300 uppercase backdrop-blur-md">
              <motion.span className="size-1.5 rounded-full bg-violet-400"
                animate={{ scale:[1,1.6,1], opacity:[0.5,1,0.5] }}
                transition={{ repeat:Infinity, duration:1.6 }}
              />
              Season 1 · Founding Cohort · May 2026
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-impact mb-6 text-[clamp(3rem,11vw,7.5rem)] leading-[0.86] tracking-tight uppercase">
            {(["Build Together.", "Prove Everything."] as const).map((line, li) => (
              <motion.span key={line} className="block"
                initial={{ opacity:0, y:60, skewY:4 }}
                animate={{ opacity:1, y:0, skewY:0 }}
                transition={{ duration:0.9, delay:0.5 + li*0.18, ease:[0.22,1,0.36,1] }}
              >
                <span className={li===0
                  ? "bg-gradient-to-r from-pink-400 via-fuchsia-200 to-pink-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-violet-400 via-pink-200 to-violet-400 bg-clip-text text-transparent"
                }>{line}</span>
              </motion.span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p {...up(0.9)}
            className="text-text-dim mx-auto mb-8 max-w-[480px] text-sm leading-relaxed sm:text-base"
          >
            CoLab Nation is where ambitious builders, designers, and creators join
            real squads, ship real work, and earn verified proof of their skills —
            no résumé required.
          </motion.p>

          {/* CTAs */}
          <motion.div {...up(1.05)} className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/join">
              <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_55px_rgba(255,61,160,0.45)]">
                Claim Your Seat
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="ghost" className="px-8 py-4">Explore Programs</Button>
            </Link>
          </motion.div>

          {/* Mobile characters */}
          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, delay:0.9, ease:[0.22,1,0.36,1] }}
            className="mt-10 flex w-full items-end justify-center gap-4 lg:hidden"
          >
            <img src={squad}  alt="" className="float-slow h-52 w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.55)] sm:h-64" draggable={false} />
            <img src={mentor} alt="" className="float-y  h-52 w-auto drop-shadow-[0_0_40px_rgba(139,92,246,0.55)] sm:h-64" draggable={false} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.06] py-10">
        <div className="scan-lines pointer-events-none absolute inset-0 opacity-40" />
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...up(i * 0.08)}
                className="flex flex-col items-center gap-1 px-6 py-2 text-center"
              >
                <p className="font-impact text-[clamp(1.8rem,4vw,3rem)] leading-none bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="font-display text-[9px] tracking-[0.35em] text-white/35 uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MANIFESTO / IMAGE SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Image panel */}
            <motion.div {...up(0)}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-violet-500/20 mix-blend-overlay z-10 rounded-3xl" />
              <div className="scan-lines absolute inset-0 z-10 rounded-3xl opacity-40" />
              <img
                src={entrance}
                alt="CoLab Nation Entrance"
                className="h-full w-full object-cover rounded-3xl aspect-[4/3]"
                style={{ filter: "brightness(0.75) saturate(1.3)" }}
              />
              {/* Corner tag */}
              <div className="absolute bottom-5 left-5 z-20 font-display rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-[10px] tracking-[0.35em] text-white/70 uppercase backdrop-blur-md">
                Season 1 · May 2026
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div {...up(0.1)}>
              <p className="font-display text-neon-pink mb-4 text-[10px] tracking-[0.5em] uppercase">The Movement</p>
              <h2 className="font-impact mb-6 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-tight uppercase">
                Skills are only real{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  when proven.
                </span>
              </h2>
              <p className="text-text-dim mb-5 text-sm leading-loose sm:text-base">
                CoLab Nation exists because talent is everywhere but proof is rare.
                Traditional résumés tell companies where you studied. We show
                them what you actually built — with real teammates, under real
                pressure, verified by real mentors.
              </p>
              <p className="text-text-dim mb-8 text-sm leading-loose sm:text-base">
                Season 1 is 500 builders, designers, and creators who are done
                waiting for permission. Join a squad. Ship a mission. Earn your badge.
              </p>
              <Link to="/join">
                <Button rightIcon={HiArrowRight} variant="ghost" className="px-7 py-3.5">
                  Read Our Manifesto
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — vertical timeline
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/4 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.08]" />

        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div {...up()} className="mb-16 text-center">
            <p className="font-display text-neon-violet mb-3 text-[10px] tracking-[0.5em] uppercase">The Process</p>
            <h2 className="font-impact text-[clamp(2.2rem,5vw,4rem)] leading-tight uppercase">
              From application{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                to legend.
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical spine */}
            <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-pink-500/50 via-violet-500/50 to-cyan-500/50 hidden sm:block" />

            <div className="space-y-6">
              {STEPS.map((s, i) => (
                <motion.div key={s.n} {...up(i * 0.14)}
                  className="group relative flex items-start gap-6"
                >
                  {/* Icon node */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                      style={{ boxShadow: `0 0 28px ${s.glow}` }}
                    >
                      <s.icon className="text-lg text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 group-hover:border-white/[0.14] group-hover:bg-white/[0.05]">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-impact text-4xl leading-none text-white/[0.07] select-none">{s.n}</span>
                      <h3 className="font-display text-base font-black tracking-wider uppercase sm:text-lg">{s.title}</h3>
                    </div>
                    <p className="text-text-dim text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHO BELONGS — roles grid
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/4 to-transparent" />

        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...up()} className="mb-14 text-center">
            <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.5em] uppercase">Who Belongs Here</p>
            <h2 className="font-impact text-[clamp(2.2rem,5vw,4rem)] leading-tight uppercase">
              Every role.{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                One nation.
              </span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-md text-sm sm:text-base">
              Not just coders. A full creative ecosystem where every discipline matters.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((r, i) => (
              <motion.div key={r.title} {...up(i * 0.1)}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] cursor-default"
              >
                {/* background glow */}
                <div className={`pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br ${r.gradient} opacity-[0.12] blur-3xl transition-opacity duration-500 group-hover:opacity-25`} />

                {/* icon */}
                <div className={`mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${r.gradient} shadow-lg`}>
                  <r.icon className="text-sm text-white" />
                </div>

                <h3 className="font-display mb-2 text-sm font-black tracking-wider uppercase sm:text-[0.95rem]">{r.title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{r.desc}</p>

                {/* bottom line */}
                <div className={`mt-6 h-px w-full bg-gradient-to-r ${r.gradient} opacity-20 transition-opacity duration-500 group-hover:opacity-50`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER PERKS — 2-col
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent" />
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">

            {/* Left */}
            <motion.div {...up()}>
              <p className="font-display text-neon-cyan mb-4 text-[10px] tracking-[0.5em] uppercase">Founder Benefits</p>
              <h2 className="font-impact mb-6 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-tight uppercase">
                What you unlock{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  inside.
                </span>
              </h2>
              <p className="text-text-dim mb-8 text-sm leading-loose sm:text-base">
                Season 1 is the ground floor. 500 seats, permanent Founder status,
                and exclusive access to every feature we ship for as long as CoLab
                Nation exists.
              </p>
              <Link to="/join">
                <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_40px_rgba(255,61,160,0.4)]">
                  Apply Now
                </Button>
              </Link>
            </motion.div>

            {/* Right — perk list */}
            <div className="space-y-2.5">
              {PERKS.map((p, i) => (
                <motion.div key={p}
                  initial={{ opacity:0, x:28 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:"-40px" }}
                  transition={{ duration:0.55, delay:i*0.07, ease:[0.22,1,0.36,1] }}
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-emerald-500/25 hover:bg-white/[0.05]"
                >
                  <FaCheckCircle className="shrink-0 text-base text-emerald-400/60 transition-colors duration-300 group-hover:text-emerald-400" />
                  <p className="text-sm text-white/80 transition-colors duration-300 group-hover:text-white">{p}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BADGE SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/4 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.08]" />

        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <motion.div {...up()} className="mb-14 text-center">
            <p className="font-display text-neon-cyan mb-3 text-[10px] tracking-[0.5em] uppercase">Achievement System</p>
            <h2 className="font-impact text-[clamp(2.2rem,5vw,4rem)] leading-tight uppercase">
              Badges recruiters{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                actually trust.
              </span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-sm text-sm sm:text-base">
              Cryptographically signed. Tied to real work — not a quiz you passed.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b, i) => {
              const meta = BADGE_META[b.name] ?? { tier:"RANK", border:"border-white/15", glow:"rgba(255,255,255,0.1)" };
              return (
                <motion.div key={b.name}
                  initial={{ opacity:0, y:32, scale:0.9 }}
                  whileInView={{ opacity:1, y:0, scale:1 }}
                  viewport={{ once:true, margin:"-30px" }}
                  transition={{ duration:0.55, delay:i*0.07, ease:[0.22,1,0.36,1] }}
                  whileHover={{ y:-7, scale:1.05, transition:{ duration:0.2 } }}
                  className={`group relative overflow-hidden rounded-2xl border ${meta.border} bg-white/[0.03] p-5 text-center cursor-default`}
                >
                  {/* glow */}
                  <div className={`pointer-events-none absolute -top-8 left-1/2 size-20 -translate-x-1/2 rounded-full bg-gradient-to-br ${b.color} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-50`} />
                  {/* holographic overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background:"linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 50%,rgba(255,255,255,0.03) 100%)" }} />

                  <div className={`relative mx-auto mb-3 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${b.color} shadow-lg`}
                    style={{ boxShadow:`0 0 18px ${meta.glow}` }}
                  >
                    <span className="text-base font-bold text-white">{b.icon}</span>
                  </div>

                  <p className="font-display mb-1 text-[8px] tracking-[0.4em] text-white/30 uppercase">{meta.tier}</p>
                  <p className="font-display text-[10px] font-black tracking-wide uppercase text-white/90">{b.name}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA CARD
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div {...up()}
            className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.03] p-12 text-center sm:p-16"
          >
            <div className="aurora pointer-events-none absolute inset-0 rounded-3xl opacity-15" />
            <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/20 blur-3xl" />

            {/* Nova */}
            <motion.img src={aibot} alt=""
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
              className="float-y pointer-events-none mx-auto mb-6 h-20 w-auto drop-shadow-[0_0_40px_rgba(56,240,255,0.7)]"
              draggable={false}
            />

            <div className="relative">
              <p className="font-display mb-4 text-[10px] tracking-[0.5em] text-pink-400 uppercase">500 Seats · Season 1</p>
              <h3 className="font-impact mb-4 text-[clamp(2rem,6vw,4rem)] leading-tight uppercase">
                Citizenship opens{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  May 2026.
                </span>
              </h3>
              <p className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base">
                Verified work. Direct draft to companies that hire on proof, not promises.
                Reserve your spot before they&apos;re gone.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/join">
                  <Button rightIcon={TiLocationArrow} className="px-8 py-4 shadow-[0_0_55px_rgba(255,61,160,0.5)]">
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
