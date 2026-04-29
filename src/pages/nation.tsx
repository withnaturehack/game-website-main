import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";
import { FaBolt, FaStar } from "react-icons/fa";

import squad from "@/assets/characters/squad.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BADGES } from "@/constants";

const SQUAD_DIALOGUE = [
  { left: "Squad assembling soon.", right: "Verified. Locked. Launching." },
  { left: "Welcome to the Nation.", right: "Where every commit becomes proof." },
  { left: "We don't apply. We ship.", right: "And the world watches us launch." },
];

const PREVIEW_BEATS = [
  {
    code: "01",
    title: "Citizens Onboarding",
    desc: "Builders, designers, mentors — all welcomed in one feed.",
    accent: "from-pink-500 to-orange-400",
  },
  {
    code: "02",
    title: "Live Mission Queue",
    desc: "Pitch, build, verify, launch — five missions, one cohort.",
    accent: "from-violet-500 to-blue-500",
  },
  {
    code: "03",
    title: "Public Badge Wall",
    desc: "Cryptographically signed proof. Permanent. Verifiable.",
    accent: "from-cyan-400 to-violet-500",
  },
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
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        <StarField count={130} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-gradient-to-b from-violet-500/22 via-pink-500/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-500/15 to-transparent blur-3xl" />

        {/* Speed lines */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-32 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
              style={{ top: `${15 + i * 14}%`, left: i % 2 ? "65%" : "-10%" }}
              animate={{ x: ["0%", "120%"] }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Squad character left — pushed off-screen so they frame, not fight */}
        <motion.div
          initial={{ opacity: 0, x: -60, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="float-slow pointer-events-none absolute -bottom-4 left-0 z-10 hidden lg:block xl:-left-32 2xl:-left-40"
        >
          <img
            src={squad}
            alt="Squad"
            className="h-[58vh] max-h-[540px] w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.45)]"
            draggable={false}
          />
          <div className="absolute top-12 left-[60%] hidden w-56 xl:block">
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
          className="float-y pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-8 2xl:-right-16"
        >
          <img
            src={mentor}
            alt="Mentor"
            className="h-[60vh] max-h-[560px] w-auto drop-shadow-[0_0_50px_rgba(139,92,246,0.55)]"
            draggable={false}
          />
          <div className="absolute top-10 right-44 hidden w-56 xl:block">
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

        <div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/10 px-5 py-2 text-[10px] tracking-[0.45em] text-violet-200 uppercase backdrop-blur-md"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-violet-400" />
            Coming May 2026
            <HiSparkles className="size-3 text-violet-300" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-impact mb-6 text-[clamp(2.6rem,8.5vw,6rem)] leading-[0.92] tracking-tight uppercase"
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
            className="font-display mx-auto mb-3 max-w-xl text-sm tracking-[0.22em] text-white/85 uppercase sm:text-base"
          >
            The citizen layer goes live in May.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base"
          >
            A live launch room of builders, mentors, and missions. Get early
            access — citizenship slots are limited.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/join">
              <Button
                rightIcon={TiLocationArrow}
                className="px-7 py-3.5 shadow-[0_0_40px_rgba(255,61,160,0.45)]"
              >
                Get Early Access
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

      {/* ─── PREVIEW BEATS ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <p className="font-display text-neon-violet mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ What's Coming
            </p>
            <h2 className="font-display text-2xl leading-tight font-black uppercase sm:text-3xl lg:text-4xl">
              The nation, <span className="gradient-text">step by step.</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {PREVIEW_BEATS.map((b, i) => (
              <motion.div
                key={b.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${b.accent} opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-35`}
                />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`font-display flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.accent} text-xs font-black text-white shadow-lg`}
                    >
                      {b.code}
                    </div>
                    <span className="font-display rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] tracking-widest text-white/50 uppercase">
                      Soon
                    </span>
                  </div>
                  <h3 className="font-display mb-2 text-base font-black uppercase sm:text-lg">
                    {b.title}
                  </h3>
                  <p className="text-text-dim text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BADGE PREVIEW ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/4 to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <p className="font-display text-neon-cyan mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ Badge Preview
            </p>
            <h2 className="font-display text-2xl leading-tight font-black uppercase sm:text-3xl lg:text-4xl">
              Earn what <span className="gradient-text">recruiters trust.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-5 text-center"
              >
                <div
                  className={`pointer-events-none absolute -top-10 left-1/2 size-24 -translate-x-1/2 rounded-full bg-gradient-to-br ${b.color} opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-55`}
                />
                <div
                  className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} text-xl text-white shadow-lg`}
                >
                  {b.icon}
                </div>
                <p className="font-display text-[11px] font-black tracking-wider uppercase">
                  {b.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CITIZENSHIP CTA ─────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-3xl px-6">
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
              className="float-y pointer-events-none absolute -top-6 right-8 hidden h-32 w-auto drop-shadow-[0_0_40px_rgba(56,240,255,0.6)] sm:block"
              draggable={false}
            />

            <div className="relative max-w-xl">
              <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.45em] uppercase">
                <HiSparkles className="mr-1.5 inline" />
                Founders' Cohort
              </p>
              <h3 className="font-impact mb-4 text-2xl leading-tight font-black uppercase sm:text-4xl">
                Citizenship opens{" "}
                <span className="gradient-text">May 2026.</span>
              </h3>
              <p className="text-text-dim mb-7 max-w-md text-sm sm:text-base">
                500 founder seats. Verified work. Direct draft to companies that
                hire on proof — not promises.
              </p>
              <Link to="/join">
                <Button
                  rightIcon={TiLocationArrow}
                  className="px-8 py-4 shadow-[0_0_40px_rgba(255,61,160,0.45)]"
                >
                  Reserve My Seat
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
