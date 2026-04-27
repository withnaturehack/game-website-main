import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import rocket from "@/assets/characters/rocket.png";
import logo from "@assets/45375_1777311860118.png";

const HERO_VIDEOS = ["/videos/hero-1.mp4", "/videos/hero-2.mp4", "/videos/hero-3.mp4", "/videos/hero-4.mp4"];

const TAGLINES = ["Build In Public.", "Get Verified.", "Get Hired."];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [tagline, setTagline] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % HERO_VIDEOS.length), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTagline((c) => (c + 1) % TAGLINES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-28 min-h-[100dvh] w-full overflow-hidden flex items-center"
    >
      {/* ── VIDEO BACKDROP ── */}
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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1500 ${
              i === current ? "opacity-50" : "opacity-0"
            }`}
          />
        ))}
      </motion.div>

      {/* ── OVERLAYS ── */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-bg/90 via-bg/50 to-bg" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/70 via-transparent to-bg/70" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="absolute inset-0 -z-10 scan-lines" />
      <StarField count={130} />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/3 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/20 via-violet-500/15 to-blue-500/20 blur-[80px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-violet-500/15 to-transparent blur-[60px]" />

      {/* Rocket bg decoration */}
      <img
        src={rocket}
        alt=""
        className="rocket-rise pointer-events-none absolute right-[6%] bottom-0 -z-10 h-[55vh] w-auto opacity-55"
      />
      <img
        src={rocket}
        alt=""
        className="rocket-rise pointer-events-none absolute left-[4%] bottom-0 -z-10 h-[38vh] w-auto opacity-35"
        style={{ animationDelay: "6s" }}
      />

      {/* Massive backdrop text */}
      <motion.span
        aria-hidden
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{ y: yContent }}
        className="pointer-events-none absolute left-0 top-[12%] z-0 select-none font-display text-[18vw] sm:text-[13vw] lg:text-[12rem] font-black uppercase leading-[0.85] text-transparent text-stroke-white/15"
      >
        BUILD.
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        style={{ y: yContent }}
        className="pointer-events-none absolute right-0 bottom-[14%] z-0 select-none font-display text-[18vw] sm:text-[13vw] lg:text-[12rem] font-black uppercase leading-[0.85] text-transparent text-stroke-pink"
      >
        HIRE.
      </motion.span>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex min-h-[100dvh] max-w-7xl w-full flex-col items-center justify-center px-6 pt-36 pb-24 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-2xl opacity-70 scale-110" />
          <img
            src={logo}
            alt="CoLab Nation"
            className="relative h-20 w-20 rounded-2xl border border-white/20 object-cover sm:h-24 sm:w-24 shadow-[0_0_40px_rgba(255,61,160,0.4)]"
          />
        </motion.div>

        {/* Season badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl px-5 py-2.5 text-xs font-display uppercase tracking-[0.3em] text-white/90"
        >
          <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500">
            <HiSparkles className="size-3" />
          </span>
          Season of Creation 2026 · Coming Soon
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.92]"
        >
          Build.{" "}
          <span
            className="gradient-text text-glow"
            style={{ display: "inline-block" }}
          >
            Be Verified.
          </span>
          <br />
          Be Hired.
        </motion.h1>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-5 h-7 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={tagline}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-sm sm:text-base uppercase tracking-[0.3em] text-text-dim"
            >
              {TAGLINES[tagline]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-text-dim leading-relaxed"
        >
          A builder community where students do real missions, get{" "}
          <span className="text-white font-medium">mentor-verified,</span> and get{" "}
          <span className="text-white font-medium">drafted by recruiters</span> — no fake resume needed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/join">
            <Button rightIcon={TiLocationArrow} className="px-8 py-4 text-sm">
              Join as Founder Member
            </Button>
          </Link>
          <Link to="/programs">
            <Button variant="ghost" className="px-8 py-4 text-sm">
              Explore Programs
            </Button>
          </Link>
        </motion.div>

        {/* Live stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          {[
            { label: "Founding Season", value: "Season 1", dot: "bg-pink-500" },
            { label: "Builder Seats", value: "500", dot: "bg-violet-400" },
            { label: "Launching", value: "Aug 2026", dot: "bg-emerald-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md px-4 py-2 text-xs"
            >
              <span className={`size-2 rounded-full ${s.dot} animate-pulse shrink-0`} />
              <span className="text-white font-bold font-display">{s.value}</span>
              <span className="text-text-dim uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Floating characters – desktop only */}
        <motion.img
          src={builder}
          alt="The Builder"
          initial={{ opacity: 0, x: -50, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="float-y pointer-events-none absolute bottom-0 left-0 hidden h-[52vh] max-h-[500px] w-auto drop-shadow-[0_0_48px_rgba(255,61,160,0.5)] xl:block"
          draggable={false}
        />
        <motion.img
          src={mentor}
          alt="The Mentor"
          initial={{ opacity: 0, x: 50, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="float-slow pointer-events-none absolute bottom-0 right-0 hidden h-[52vh] max-h-[500px] w-auto drop-shadow-[0_0_48px_rgba(139,92,246,0.5)] xl:block"
          draggable={false}
        />

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim"
        >
          <span className="font-display text-[9px] uppercase tracking-[0.5em]">Scroll</span>
          <motion.span
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-10 w-px bg-gradient-to-b from-pink-500 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* ── MARQUEE STRIP ── */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.07] bg-bg/50 backdrop-blur-sm py-3 overflow-hidden">
        <div className="marquee flex w-max items-center gap-12 whitespace-nowrap px-6 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-text-dim font-display">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-neon-pink">★ Season of Creation 2026</span>
              <span>/ Build In Public</span>
              <span className="text-neon-violet">★ Get Verified</span>
              <span>/ Mentor Network</span>
              <span className="text-neon-cyan">★ Get Drafted</span>
              <span>/ Squad Missions</span>
              <span className="text-neon-orange">★ Real Builds</span>
              <span>/ Global Demo Day</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
