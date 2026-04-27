import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";
import rocket from "@/assets/characters/rocket.png";
import logo from "@assets/45375_1777311860118.png";

const HERO_VIDEOS = ["/videos/hero-1.mp4", "/videos/hero-2.mp4", "/videos/hero-3.mp4", "/videos/hero-4.mp4"];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yOverlay = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_VIDEOS.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-28 min-h-[100dvh] w-full overflow-hidden"
    >
      {/* Looping video backdrop */}
      <motion.div className="absolute inset-0 -z-30" style={{ y: yBg }}>
        {HERO_VIDEOS.map((src, i) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-60" : "opacity-0"
            }`}
          />
        ))}
      </motion.div>

      {/* Color & grain overlays */}
      <motion.div
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 -z-20 bg-gradient-to-b from-bg/85 via-bg/55 to-bg"
      />
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="absolute inset-0 -z-10 scan-lines" />
      <StarField count={120} />

      {/* Glow orb */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/30 via-violet-500/20 to-blue-500/30 blur-3xl" />

      {/* Background rocket trail */}
      <img
        src={rocket}
        alt=""
        className="rocket-rise pointer-events-none absolute right-[8%] bottom-0 -z-10 h-[70vh] w-auto opacity-70"
      />
      <img
        src={rocket}
        alt=""
        className="rocket-rise pointer-events-none absolute left-[6%] bottom-0 -z-10 h-[50vh] w-auto opacity-50"
        style={{ animationDelay: "5s" }}
      />

      {/* Massive corner words (Nova-game inspired backdrop) */}
      <motion.span
        aria-hidden
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ y: yOverlay }}
        className="pointer-events-none absolute left-[3%] top-[14%] z-0 select-none font-display text-[16vw] sm:text-[12vw] lg:text-[11rem] font-black uppercase leading-[0.8] text-transparent text-stroke-white/15"
      >
        CREATE.
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{ y: yOverlay }}
        className="pointer-events-none absolute right-[3%] bottom-[16%] z-0 select-none font-display text-[16vw] sm:text-[12vw] lg:text-[11rem] font-black uppercase leading-[0.8] text-transparent text-stroke-pink"
      >
        LAUNCH.
      </motion.span>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-2 text-xs font-display uppercase tracking-[0.3em] text-white/85"
        >
          <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500">
            <HiSparkles className="size-3" />
          </span>
          Season of Creation 2026 · Coming Soon
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="relative mb-4"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-2xl opacity-60" />
          <img
            src={logo}
            alt="CoLab Nation"
            className="relative h-24 w-24 rounded-2xl border border-white/15 object-cover sm:h-28 sm:w-28"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Build. <span className="gradient-text text-glow">Be Verified.</span> Be Hired.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-text-dim"
        >
          A digital universe where students become builders, builders become heroes,
          and your contributions are <span className="text-white">impossible to fake.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/join">
            <Button rightIcon={TiLocationArrow}>Join as Builder</Button>
          </Link>
          <Link to="/programs">
            <Button variant="ghost">Explore Programs</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs"
        >
          {[
            { label: "Online builders", value: "2,431", dot: "bg-emerald-400" },
            { label: "Live missions", value: "84", dot: "bg-pink-500" },
            { label: "Launching today", value: "9", dot: "bg-violet-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"
            >
              <span className={`size-2 rounded-full ${s.dot} animate-pulse`} />
              <span className="text-white font-semibold">{s.value}</span>
              <span className="text-text-dim uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Floating side characters (desktop only) */}
        <motion.img
          src={builder}
          alt="The Builder"
          initial={{ opacity: 0, x: -60, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="float-y pointer-events-none absolute bottom-0 left-0 hidden h-[55vh] max-h-[520px] w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.5)] xl:block"
          draggable={false}
        />
        <motion.img
          src={mentor}
          alt="The Mentor"
          initial={{ opacity: 0, x: 60, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="float-slow pointer-events-none absolute bottom-0 right-0 hidden h-[55vh] max-h-[520px] w-auto drop-shadow-[0_0_40px_rgba(139,92,246,0.5)] xl:block"
          draggable={false}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute right-4 top-32 hidden md:flex flex-col items-end gap-2"
        >
          <div className="glass max-w-[220px] rounded-2xl rounded-br-sm px-4 py-3 text-left text-sm">
            <p className="text-xs uppercase tracking-widest text-neon-cyan font-display">
              Nova · AI guide
            </p>
            <p className="mt-1 text-white/90">Hey! Tap a section — I'll show you around 🚀</p>
          </div>
          <img
            src={aibot}
            alt="AI bot"
            className="float-y h-24 w-auto drop-shadow-[0_0_24px_rgba(56,240,255,0.6)]"
          />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-display">Scroll</span>
          <span className="h-10 w-[2px] bg-gradient-to-b from-pink-500 to-transparent animate-pulse" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative border-y border-white/10 bg-bg-soft/60 py-3 overflow-hidden">
        <div className="marquee flex w-max items-center gap-12 whitespace-nowrap px-6 text-xs uppercase tracking-[0.4em] text-text-dim font-display">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span>★ Build in public</span>
              <span className="text-neon-pink">/ Be Verified</span>
              <span>★ Get Drafted</span>
              <span className="text-neon-violet">/ Ship Together</span>
              <span>★ Mentor Network</span>
              <span className="text-neon-cyan">/ Real Missions</span>
              <span>★ Squad Up</span>
              <span className="text-neon-orange">/ Launch Loud</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
