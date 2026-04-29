import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import rocket from "@/assets/characters/rocket.png";
import logo from "@assets/45375_1777311860118.png";

const HERO_VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
];

const TAGLINES = [
  "Proof beats pedigree. Every time.",
  "One verified badge. Infinite doors.",
  "Your commits are your credentials.",
  "Ship loud. Get seen. Get recruited.",
  "The arena where skills speak for themselves.",
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [tagline, setTagline] = useState(0);
  // Gender-inclusive: alternate between male and female characters
  const HERO_CHARACTERS = [builder, mentor];
  const [characterIdx, setCharacterIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_VIDEOS.length);
      setCharacterIdx((i) => (i + 1) % HERO_CHARACTERS.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setTagline((c) => (c + 1) % TAGLINES.length),
      3000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} className="relative -mt-28 flex min-h-dvh w-full items-center overflow-hidden">
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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1500 ${i === current ? "opacity-50" : "opacity-0"}`}
          />
        ))}
      </motion.div>
      {/* ── OVERLAYS ── */}
      <div className="from-bg/90 via-bg/50 to-bg absolute inset-0 -z-20 bg-linear-to-b" />
      <div className="from-bg/70 to-bg/70 absolute inset-0 -z-10 bg-linear-to-r via-transparent" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-20" />
      <div className="scan-lines absolute inset-0 -z-10" />
      <StarField count={130} />
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/3 -z-10 h-175 w-175 -translate-x-1/2 rounded-full bg-linear-to-br from-pink-500/20 via-violet-500/15 to-blue-500/20 blur-[80px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-100 w-100 rounded-full bg-linear-to-tl from-violet-500/15 to-transparent blur-[60px]" />
      {/* Rocket bg decoration */}
      <img src={rocket} alt="" className="rocket-rise pointer-events-none absolute right-[6%] bottom-0 -z-10 h-[55vh] w-auto opacity-55" />
      <img src={rocket} alt="" className="rocket-rise pointer-events-none absolute bottom-0 left-[4%] -z-10 h-[38vh] w-auto opacity-35" style={{ animationDelay: "6s" }} />
      {/* Animated radial rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6 + i * 0.3, 1.4 + i * 0.4], opacity: [0.18, 0] }}
          transition={{ duration: 4 + i * 1.5, delay: i * 1.2, repeat: Infinity, ease: "easeOut" }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/20"
          style={{ width: 400 + i * 200, height: 400 + i * 200 }}
        />
      ))}
      {/* Soft centre bloom */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-125 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-pink-500/10 via-violet-500/10 to-blue-500/10 blur-3xl" />
      {/* ── MAIN CONTENT ── */}
      <motion.div style={{ opacity }} className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col items-center justify-center px-6 pt-36 pb-24 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 scale-110 rounded-3xl bg-linear-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-70 blur-2xl" />
          <img
            src={logo}
            alt="CoLab Nation"
            className="relative h-20 w-20 rounded-2xl border border-white/20 object-cover shadow-[0_0_40px_rgba(255,61,160,0.4)] sm:h-24 sm:w-24"
          />
        </motion.div>

        {/* Enhanced Character Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-8 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 rounded-3xl border-2 border-white/15 bg-white/5 shadow-[0_0_60px_10px_rgba(255,61,160,0.12)] backdrop-blur-xl"
            style={{
              boxShadow:
                "0 0 80px 0 rgba(139,92,246,0.18), 0 0 0 4px rgba(255,61,160,0.08)",
            }}
          />
          <motion.img
            src={HERO_CHARACTERS[characterIdx]}
            alt="Hero Character"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="animate-float relative z-10 h-56 w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.25)] sm:h-64 md:h-72 lg:h-80"
            style={{ maxWidth: "90vw" }}
            draggable={false}
          />
        </motion.div>

        {/* WOW Tagline + Animated Gradient */}
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-impact text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] tracking-tight uppercase mb-8"
          >
            <span
              className="block animate-gradient-x bg-linear-to-r from-pink-500 via-orange-400 to-cyan-400 bg-size-[200%_auto] bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 32px rgba(255,61,160,0.5))",
                display: "inline-block",
              }}
            >
              Dream. Build. Shine. Repeat.
            </span>
            <span className="block mt-4 text-[clamp(1.2rem,3vw,2.2rem)] font-bold tracking-wide text-white/80">
              Where creators become legends.
            </span>
          </motion.h1>
          {/* Extra WOW: Animated particles and interactive glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="pointer-events-none absolute left-1/2 top-[60%] z-10 -translate-x-1/2"
          >
            <StarField count={40} />
          </motion.div>
          <span
            style={{
              background:
                "linear-gradient(90deg,#ff3da0 0%,#ff8a3d 40%,#8b5cf6 75%,#4fb7ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 24px rgba(255,61,160,0.5))",
              display: "inline-block",
            }}
          >
            Get Verified. Get Noticed.
          </span>

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
            { label: "Launching", value: "May 2026", dot: "bg-emerald-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs backdrop-blur-md"
            >
              <span className={`size-2 rounded-full ${s.dot} shrink-0 animate-pulse`} />
              <span className="font-display font-bold text-white">{s.value}</span>
              <span className="text-text-dim tracking-wider uppercase">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-8 h-6 text-sm sm:text-base text-text-dim"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={tagline}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2"
            >
              <HiSparkles className="text-pink-400" />
              {TAGLINES[tagline]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Floating characters – desktop only */}
      <motion.img
        src={builder}
        alt="The Builder"
        initial={{ opacity: 0, x: -50, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="float-y pointer-events-none absolute bottom-0 left-0 hidden h-[52vh] max-h-125 w-auto drop-shadow-[0_0_48px_rgba(255,61,160,0.5)] xl:block"
        draggable={false}
      />
      <motion.img
        src={mentor}
        alt="The Mentor"
        initial={{ opacity: 0, x: 50, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="float-slow pointer-events-none absolute right-0 bottom-0 hidden h-[52vh] max-h-125 w-auto drop-shadow-[0_0_48px_rgba(139,92,246,0.5)] xl:block"
        draggable={false}
      />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="text-text-dim absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-display text-[9px] tracking-[0.5em] uppercase">Scroll</span>
        <motion.span
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-10 w-px bg-linear-to-b from-pink-500 to-transparent"
        />
      </motion.div>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-bg/60 absolute right-0 bottom-0 left-0 overflow-hidden border-t border-white/[0.07] py-3 backdrop-blur-md">
        <div className="marquee font-syne text-text-dim flex w-max items-center gap-10 px-6 text-[10px] tracking-[0.38em] whitespace-nowrap uppercase sm:text-[11px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-neon-pink font-bold">✦ Season of Creation 2026</span>
              <span className="text-white/30">·</span>
              <span>Proof Beats Pedigree</span>
              <span className="text-white/30">·</span>
              <span className="text-neon-violet font-bold">✦ Real Missions · Real Badges</span>
              <span className="text-white/30">·</span>
              <span>No Résumé Required</span>
              <span className="text-white/30">·</span>
              <span className="text-neon-cyan font-bold">✦ Get Drafted Direct</span>
              <span className="text-white/30">·</span>
              <span>500 Builder Seats</span>
              <span className="text-white/30">·</span>
              <span className="text-neon-orange font-bold">✦ May 2026 · Global Demo Day</span>
              <span className="text-white/30">·</span>
              <span>Mentor Verified Skills</span>
              <span className="text-white/30">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
