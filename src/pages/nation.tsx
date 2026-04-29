import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";
import { FaBolt, FaStar } from "react-icons/fa";

import squad from "@/assets/characters/squad.png";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BADGES } from "@/constants";

const FEED = [
  {
    who: "@aria.builds",
    accent: "from-pink-500 to-orange-400",
    text: "Just shipped v0.2 of the AI study buddy 🚀 — mentor verified by @kenji_dev",
    time: "2m",
  },
  {
    who: "@team-atlas",
    accent: "from-cyan-400 to-violet-500",
    text: "Atlas crossed 1k stars on GitHub. Squad earned the Launch Hero badge ✺",
    time: "14m",
  },
  {
    who: "@designlab",
    accent: "from-fuchsia-500 to-pink-500",
    text: "Co-Drafts squad just got mentor sign-off on Mission 03 — moving to Mission 04 ✓",
    time: "32m",
  },
  {
    who: "@forge.lab",
    accent: "from-amber-400 to-rose-500",
    text: "First open-hardware kit shipped to a beta builder in Tokyo 🤖",
    time: "1h",
  },
  {
    who: "@kenji_dev",
    accent: "from-violet-500 to-blue-500",
    text: "Just verified 3 squads this morning. Coffee count: 4 ☕",
    time: "2h",
  },
];

const MISSIONS = [
  {
    code: "M01",
    title: "Pitch the Vision",
    status: "OPEN",
    accent: "from-pink-500 to-orange-400",
    desc: "Ship a 2-min pitch video + a 1-page brief. XP +50",
  },
  {
    code: "M02",
    title: "Assemble the Squad",
    status: "OPEN",
    accent: "from-violet-500 to-blue-500",
    desc: "Recruit 3 teammates with complementary skills. XP +75",
  },
  {
    code: "M03",
    title: "Build the MVP",
    status: "QUEUED",
    accent: "from-cyan-400 to-violet-500",
    desc: "12-day sprint. Mentor sign-off required. XP +200",
  },
  {
    code: "M04",
    title: "Verify & Polish",
    status: "QUEUED",
    accent: "from-fuchsia-500 to-pink-500",
    desc: "Mentors review, you iterate, badge unlocks. XP +150",
  },
  {
    code: "M05",
    title: "Demo Day Launch",
    status: "LOCKED",
    accent: "from-amber-400 to-rose-500",
    desc: "Live to 100+ recruiters at the global Demo Day. XP +500",
  },
];

const SQUAD_DIALOGUE = [
  { left: "Squad assembled. Mission queue loaded.", right: "Verified. Locked. Loaded." },
  { left: "Welcome to the Nation.", right: "Where every commit becomes proof." },
  { left: "We don't apply. We ship.", right: "And the world watches us launch." },
];

export const Nation = () => {
  const [d, setD] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setD((c) => (c + 1) % SQUAD_DIALOGUE.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        <StarField count={120} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-violet-500/20 via-pink-500/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-500/15 to-transparent blur-3xl" />

        {/* Manga speed lines */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-32 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
              style={{ top: `${15 + i * 14}%`, left: i % 2 ? "65%" : "-10%" }}
              animate={{ x: ["0%", "120%"] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "linear" }}
            />
          ))}
        </div>

        {/* Squad character left */}
        <motion.div
          initial={{ opacity: 0, x: -60, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="float-slow pointer-events-none absolute bottom-12 left-4 z-10 hidden md:block lg:left-12"
        >
          <img
            src={squad}
            alt="Squad"
            className="h-72 w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.55)] lg:h-[26rem]"
            draggable={false}
          />
          {/* Speech bubble */}
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
                  {SQUAD_DIALOGUE[d].left}
                </p>
                <div className="absolute -left-3 bottom-3 h-0 w-0 border-y-[8px] border-r-[14px] border-y-transparent border-r-pink-400/70" />
                <div className="absolute -top-2 -left-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-[9px] text-white">
                  <FaBolt />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mentor character right */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="float-y pointer-events-none absolute right-4 bottom-12 z-10 hidden md:block lg:right-12"
        >
          <img
            src={mentor}
            alt="Mentor"
            className="h-72 w-auto drop-shadow-[0_0_50px_rgba(139,92,246,0.55)] lg:h-[26rem]"
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
                  {SQUAD_DIALOGUE[d].right}
                </p>
                <div className="absolute -right-3 bottom-3 h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-violet-400/70" />
                <div className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[9px] text-white">
                  <FaStar />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="relative z-20 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1.5 text-[10px] tracking-[0.4em] text-violet-200 uppercase backdrop-blur-md"
          >
            <FaBolt className="size-3 text-violet-300" />
            The CoLab Nation · Live Soon
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-impact mb-6 text-[clamp(2.8rem,9vw,6.25rem)] leading-[0.92] tracking-tight uppercase"
          >
            <span className="shimmer-text block drop-shadow-[0_0_32px_rgba(255,61,160,0.55)]">
              Find your squad.
            </span>
            <span className="shimmer-text block drop-shadow-[0_0_32px_rgba(139,92,246,0.55)]">
              Join the nation.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-text-dim mx-auto mb-8 max-w-xl text-base sm:text-lg"
          >
            12,500+ builders worldwide. Live missions, public badges, and a feed
            that reads like a launch room. This is the citizen layer of CoLab.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/join">
              <Button rightIcon={TiLocationArrow} className="px-7 py-3.5">
                Become a Citizen
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="ghost" className="px-7 py-3.5">
                Explore Missions
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── LIVE FEED + MISSIONS ─────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.2fr,1fr]">
          {/* Live missions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-neon-pink mb-3 text-xs tracking-[0.4em] uppercase">
              ✦ Mission Queue
            </p>
            <h2 className="font-display mb-8 text-3xl font-black uppercase sm:text-4xl">
              Season 1 <span className="gradient-text">missions.</span>
            </h2>

            <div className="space-y-4">
              {MISSIONS.map((m, i) => (
                <motion.div
                  key={m.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="neon-border group relative overflow-hidden rounded-2xl p-5 transition-all hover:translate-x-1"
                >
                  <div
                    className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${m.accent} opacity-15 blur-2xl transition-opacity group-hover:opacity-30`}
                  />
                  <div className="relative flex items-center gap-5">
                    <div
                      className={`font-display flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${m.accent} text-sm font-black text-white shadow-lg`}
                    >
                      {m.code}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-black uppercase sm:text-lg">
                          {m.title}
                        </h3>
                        <span
                          className={`font-display rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase ${
                            m.status === "OPEN"
                              ? "border border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                              : m.status === "QUEUED"
                                ? "border border-amber-400/40 bg-amber-500/10 text-amber-300"
                                : "border border-white/10 bg-white/5 text-white/40"
                          }`}
                        >
                          {m.status === "OPEN" && (
                            <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-emerald-400" />
                          )}
                          {m.status}
                        </span>
                      </div>
                      <p className="text-text-dim mt-1 text-xs sm:text-sm">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-display text-neon-violet mb-3 text-xs tracking-[0.4em] uppercase">
              ✦ Live Nation Feed
            </p>
            <h2 className="font-display mb-8 text-3xl font-black uppercase sm:text-4xl">
              The <span className="gradient-text">launch room.</span>
            </h2>
            <div className="neon-border relative overflow-hidden rounded-3xl p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-pink-500/5" />
              <div className="relative space-y-4">
                {FEED.map((f, i) => (
                  <motion.div
                    key={f.who + i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <div
                      className={`size-9 shrink-0 rounded-full bg-gradient-to-br ${f.accent} shadow-lg`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-display text-sm font-bold text-white">
                          {f.who}
                        </p>
                        <span className="text-text-dim text-[10px] tracking-wider uppercase">
                          {f.time} ago
                        </span>
                      </div>
                      <p className="text-text-dim mt-1 text-sm leading-relaxed">
                        {f.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center border-t border-white/10 pt-5">
                <span className="text-text-dim font-display flex items-center gap-2 text-[10px] tracking-widest uppercase">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live · 12.5K+ active citizens
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BADGES ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/4 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <p className="font-display text-neon-cyan mb-3 text-xs tracking-[0.4em] uppercase">
              ✦ Citizenship
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
              Badges <span className="gradient-text">recruiters trust.</span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-lg text-base sm:text-lg">
              Cryptographically signed. Mentor verified. Public on your profile,
              forever.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-5 text-center"
              >
                <div
                  className={`pointer-events-none absolute -top-10 left-1/2 size-24 -translate-x-1/2 rounded-full bg-gradient-to-br ${b.color} opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60`}
                />
                <div
                  className={`mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} text-2xl text-white shadow-lg`}
                >
                  {b.icon}
                </div>
                <p className="font-display text-xs font-black tracking-wider uppercase">
                  {b.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CITIZENSHIP CTA ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="neon-border relative overflow-hidden rounded-3xl p-10 sm:p-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/8 via-violet-500/5 to-blue-500/8" />
            <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-gradient-to-br from-pink-500/25 to-transparent blur-3xl" />
            <img
              src={aibot}
              alt="Nova"
              className="float-y pointer-events-none absolute -top-6 right-12 hidden h-40 w-auto drop-shadow-[0_0_40px_rgba(56,240,255,0.6)] sm:block"
              draggable={false}
            />

            <div className="relative max-w-2xl">
              <p className="font-display text-neon-pink mb-3 text-xs tracking-[0.4em] uppercase">
                <HiSparkles className="mr-1.5 inline" />
                Apply for Citizenship
              </p>
              <h3 className="font-impact mb-4 text-3xl leading-[0.92] font-black uppercase sm:text-5xl">
                The nation is{" "}
                <span className="gradient-text">accepting citizens.</span>
              </h3>
              <p className="text-text-dim mb-8 max-w-md text-base">
                500 founding builder seats for Season 1. One verified badge. One
                global Demo Day. Zero résumé games.
              </p>
              <Link to="/join">
                <Button
                  rightIcon={TiLocationArrow}
                  className="px-8 py-4 shadow-[0_0_40px_rgba(255,61,160,0.45)]"
                >
                  Become a Citizen
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
