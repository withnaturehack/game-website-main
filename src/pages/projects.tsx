import aibot from "@/assets/characters/aibot.png";
import builder from "@/assets/characters/builder.png";
import rocket from "@/assets/characters/rocket.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";
import { FaBolt } from "react-icons/fa";
import { useEffect, useState } from "react";

import { PROJECTS } from "@/constants";
import { CtaBanner } from "@/components/sections/cta-banner";
import { StarField } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import projAi from "@/assets/projects/project-ai.png";
import projOpen from "@/assets/projects/project-open.png";
import projDesign from "@/assets/projects/project-design.png";
import projRobotics from "@/assets/projects/project-robotics.png";

const IMG_MAP: Record<string, string> = {
  ai: projAi,
  open: projOpen,
  design: projDesign,
  robotics: projRobotics,
};

const NOVA_LINES = [
  "Initiating project scan… 4 verified builds detected.",
  "Each project = real squad, real mentor sign-off.",
  "Drop yours next season. The feed is hungry.",
  "Recruiters are already lurking these pages.",
];

export const Projects = () => {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLine((l) => (l + 1) % NOVA_LINES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden pt-32 pb-20">
        <StarField count={100} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-pink-500/20 via-violet-500/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-cyan-500/15 to-transparent blur-3xl" />

        {/* Floating Nova bot */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="float-y pointer-events-none absolute right-4 bottom-20 z-10 hidden md:block lg:right-16"
          style={{ animationDuration: "4.5s" }}
        >
          <img
            src={aibot}
            alt="Nova AI"
            className="h-72 w-auto drop-shadow-[0_0_50px_rgba(56,240,255,0.6)] lg:h-96"
            draggable={false}
          />
          {/* Nova speech bubble */}
          <div className="absolute -top-4 -left-44 hidden w-56 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl border-2 border-cyan-400/60 bg-bg/90 px-4 py-3 shadow-[0_0_30px_rgba(56,240,255,0.4)] backdrop-blur-md"
              >
                <p className="font-comic text-sm leading-tight text-white">
                  {NOVA_LINES[line]}
                </p>
                <div className="absolute -right-3 bottom-3 h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-cyan-400/60" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Builder character on left */}
        <motion.img
          src={builder}
          alt="Builder"
          initial={{ opacity: 0, x: -60, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="float-slow pointer-events-none absolute bottom-16 left-4 z-10 hidden h-72 w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.55)] md:block lg:left-16 lg:h-96"
          draggable={false}
        />

        <div className="relative z-20 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 text-[10px] tracking-[0.4em] text-pink-200 uppercase backdrop-blur-md"
          >
            <FaBolt className="size-3 text-pink-300" />
            Verified Project Drops
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-impact mb-6 text-[clamp(2.8rem,9vw,6rem)] leading-[0.92] tracking-tight uppercase"
          >
            <span className="shimmer-text block drop-shadow-[0_0_32px_rgba(255,61,160,0.55)]">
              Real squads.
            </span>
            <span className="shimmer-text block drop-shadow-[0_0_32px_rgba(139,92,246,0.55)]">
              Real ships.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-text-dim mx-auto mb-8 max-w-xl text-base sm:text-lg"
          >
            Every project below is built by a verified CoLab squad, signed off
            by a mentor, and shipped to the world. No mocks. No vapor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/join">
              <Button rightIcon={TiLocationArrow} className="px-7 py-3.5">
                Ship Your Project
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="ghost" className="px-7 py-3.5">
                See Programs
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECT GALLERY ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <p className="font-display text-neon-pink mb-3 text-xs tracking-[0.4em] uppercase">
              ✦ Featured Drops
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
              Season 0 <span className="gradient-text">showcase.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="neon-border group relative overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-[0_12px_60px_-10px_rgba(255,61,160,0.35)]"
              >
                <div
                  className={`pointer-events-none absolute -top-32 -right-32 size-80 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50`}
                />
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                  <img
                    src={IMG_MAP[p.img]}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-display rounded-full border border-white/20 bg-bg/70 px-2.5 py-1 text-[9px] tracking-widest uppercase backdrop-blur-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-300 backdrop-blur-md">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                    VERIFIED
                  </div>
                </div>

                <div className="relative p-6 sm:p-7">
                  <p className="font-display text-text-dim mb-1 text-[10px] tracking-[0.3em] uppercase">
                    {p.by}
                  </p>
                  <h3 className="font-display mb-3 text-xl font-black uppercase sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="text-text-dim mb-5 text-sm leading-relaxed">
                    {p.blurb}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[
                          "from-pink-500 to-orange-400",
                          "from-violet-500 to-blue-500",
                          "from-cyan-400 to-violet-500",
                        ].map((g, idx) => (
                          <div
                            key={idx}
                            className={`size-7 rounded-full border-2 border-bg bg-gradient-to-br ${g}`}
                          />
                        ))}
                      </div>
                      <span className="font-display text-text-dim text-[10px] tracking-widest uppercase">
                        Squad of 4
                      </span>
                    </div>
                    <span className="font-display text-neon-pink inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase">
                      View drop <TiLocationArrow />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEXT WAVE ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="mb-14 text-center"
          >
            <p className="font-display text-neon-violet mb-3 text-xs tracking-[0.4em] uppercase">
              ✦ Coming May 2026
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
              The next <span className="gradient-text">wave</span> launches.
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-lg text-base sm:text-lg">
              Season 1 squads ship 5 missions across 12 weeks. Demo Day is
              global. Be on the rocket.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="neon-border relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-10 text-center sm:p-14"
          >
            <div className="pointer-events-none absolute -top-32 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/25 via-orange-400/15 to-violet-500/20 blur-3xl" />
            <img
              src={rocket}
              alt="Rocket"
              className="float-y mx-auto mb-6 h-44 w-auto drop-shadow-[0_0_50px_rgba(255,138,61,0.6)]"
              draggable={false}
            />
            <p className="font-display text-neon-pink mb-2 text-xs tracking-[0.4em] uppercase">
              <HiSparkles className="mr-1.5 inline" />T-minus 12 weeks
            </p>
            <h3 className="font-impact mb-4 text-3xl font-black uppercase sm:text-5xl">
              Your name on the <span className="gradient-text">rocket.</span>
            </h3>
            <p className="text-text-dim mx-auto mb-8 max-w-lg text-base">
              500 founding builder seats. One global Demo Day. One verified
              badge that opens every door.
            </p>
            <Link to="/join">
              <Button
                rightIcon={TiLocationArrow}
                className="px-8 py-4 shadow-[0_0_40px_rgba(255,61,160,0.45)]"
              >
                Claim Your Seat
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
