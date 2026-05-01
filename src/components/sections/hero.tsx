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
import { useMotionBudget } from "@/lib/motion";

const HERO_VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
];

const TAGLINE = "Where creators become legends.";

export const Hero = () => {
  const { shouldReduceEffects } = useMotionBudget();
  const [frontVideo, setFrontVideo] = useState(0);
  const [backVideo, setBackVideo] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);

  const frontVideoRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    frontVideoRef.current = frontVideo;
  }, [frontVideo]);

  useEffect(() => {
    if (shouldReduceEffects) return;

    const transitionMs = 1500;

    const transitionToNext = () => {
      const next = (frontVideoRef.current + 1) % HERO_VIDEOS.length;

      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

      setBackVideo(next);
      // Let the "back" video mount at opacity 0, then trigger the fade.
      requestAnimationFrame(() => setIsFading(true));

      fadeTimerRef.current = setTimeout(() => {
        setFrontVideo(next);
        setBackVideo(null);
        setIsFading(false);
      }, transitionMs);
    };

    const t = setInterval(transitionToNext, 7000);
    return () => {
      clearInterval(t);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [shouldReduceEffects]);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-28 flex min-h-dvh w-full items-center overflow-hidden"
    >
      {/* ── VIDEO BACKDROP ── */}
      <motion.div className="absolute inset-0 -z-30" style={{ y: yBg }}>
        <video
          key={`front-${frontVideo}`}
          src={HERO_VIDEOS[frontVideo]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${
            isFading ? "opacity-0" : "opacity-45"
          }`}
        />
        {backVideo !== null && (
          <video
            key={`back-${backVideo}`}
            src={HERO_VIDEOS[backVideo]}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${
              isFading ? "opacity-45" : "opacity-0"
            }`}
          />
        )}
      </motion.div>

      {/* ── OVERLAYS ── */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-bg/90 via-bg/50 to-bg" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/70 via-transparent to-bg/70" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-25" />
      <div className="scan-lines absolute inset-0 -z-10" />
      <StarField count={140} />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/3 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/25 via-violet-500/15 to-blue-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-orange-500/20 to-transparent blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-cyan-500/15 to-transparent blur-[80px]" />

      {/* Manga speed lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
            style={{
              top: `${10 + i * 11}%`,
              left: i % 2 === 0 ? "-10%" : "60%",
            }}
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

      {/* Animated radial rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [0.6 + i * 0.3, 1.4 + i * 0.4],
            opacity: [0.18, 0],
          }}
          transition={{
            duration: 4 + i * 1.5,
            delay: i * 1.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/20"
          style={{ width: 400 + i * 200, height: 400 + i * 200 }}
        />
      ))}

      {/* Rocket bg decoration */}
      <img
        src={rocket}
        alt=""
        className="rocket-rise pointer-events-none absolute right-[6%] bottom-0 -z-10 h-[55vh] w-auto opacity-50"
      />
      <img
        src={rocket}
        alt=""
        className="rocket-rise pointer-events-none absolute bottom-0 left-[4%] -z-10 h-[38vh] w-auto opacity-30"
        style={{ animationDelay: "6s" }}
      />

      {/* ── TWO CHARACTERS WITH DIALOGUE ── */}
      {/* LEFT character — Builder */}
      <motion.div
        style={{ y: yLeft }}
        className="pointer-events-none absolute bottom-0 left-0 z-10 hidden lg:block xl:-left-10 2xl:-left-20"
      >
        <motion.img
          src={builder}
          alt="The Builder"
          initial={{ opacity: 0, x: -80, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="float-y h-[68vh] max-h-[640px] w-auto drop-shadow-[0_0_60px_rgba(255,61,160,0.55)]"
          draggable={false}
        />
        {/* Builder energy aura */}
        <motion.div
          className="pointer-events-none absolute bottom-1/3 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/30 blur-3xl"
          animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* RIGHT character — Mentor */}
      <motion.div
        style={{ y: yRight }}
        className="pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-10 2xl:-right-20"
      >
        <motion.img
          src={mentor}
          alt="The Mentor"
          initial={{ opacity: 0, x: 80, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="float-slow h-[68vh] max-h-[640px] w-auto drop-shadow-[0_0_60px_rgba(139,92,246,0.55)]"
          draggable={false}
        />
        {/* Mentor energy aura */}
        <motion.div
          className="pointer-events-none absolute bottom-1/3 right-1/2 -z-10 h-72 w-72 translate-x-1/2 rounded-full bg-violet-500/30 blur-3xl"
          animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        />
      </motion.div>

      {/* Floating Nova bot — peeking from above */}
      <motion.img
        src={aibot}
        alt="Nova"
        initial={{ opacity: 0, y: -60, scale: 0.6 }}
        animate={{ opacity: 0.9, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="float-y pointer-events-none absolute top-[18%] right-[12%] z-10 hidden h-32 w-auto drop-shadow-[0_0_30px_rgba(56,240,255,0.7)] md:block lg:right-[28%]"
        style={{ animationDuration: "4s" }}
        draggable={false}
      />

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col items-center justify-center px-6 pt-36 pb-32 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 scale-110 rounded-3xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-70 blur-2xl" />
          <img
            src={logo}
            alt="CoLab Nation"
            className="relative h-20 w-20 rounded-2xl border border-white/20 object-cover shadow-[0_0_40px_rgba(255,61,160,0.4)] sm:h-24 sm:w-24"
          />
        </motion.div>

        {/* Eyebrow chip — Coming Soon (static) */}
        <div className="font-display mb-6 inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-pink-500/10 px-5 py-2 text-[10px] tracking-[0.45em] text-pink-200 uppercase backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-pink-400" />
          Coming May 2026 · Founders' Cohort
          <HiSparkles className="size-3 text-pink-300" />
        </div>

        {/* Headline (static) */}
        <h1 className="font-impact relative mb-3 text-[clamp(3rem,9vw,6.75rem)] leading-[0.92] tracking-tight uppercase">
          <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,61,160,0.55)]">
            Dream. Build.
          </span>
          <span className="block bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(139,92,246,0.55)]">
            Shine. Repeat.
          </span>
        </h1>

        {/* Calm sub headline (static) */}
        <p className="font-display mb-3 max-w-2xl text-sm tracking-[0.22em] text-white/85 uppercase sm:text-base">
          {TAGLINE}
        </p>

        {/* Static sub-tagline */}
        <p className="text-text-dim mt-1 mb-2 max-w-md text-sm sm:text-base">
          A new world for builders. Drops May 2026.
        </p>

        {/* CTAs (static) */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link to="/join">
            <Button
              rightIcon={TiLocationArrow}
              className="px-8 py-4 text-sm shadow-[0_0_40px_rgba(255,61,160,0.45)]"
            >
              Join as Founder Member
            </Button>
          </Link>
          <Link to="/programs">
            <Button variant="ghost" className="px-8 py-4 text-sm">
              Explore Programs
            </Button>
          </Link>
        </div>

        {/* Live stats row (static) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {[
            {
              label: "Founding Season",
              value: "Season 1",
              dot: "bg-pink-500",
            },
            { label: "Builder Seats", value: "500", dot: "bg-violet-400" },
            { label: "Launching", value: "May 2026", dot: "bg-emerald-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs backdrop-blur-md"
            >
              <span
                className={`size-2 shrink-0 animate-pulse rounded-full ${s.dot}`}
              />
              <span className="font-display font-bold text-white">
                {s.value}
              </span>
              <span className="text-text-dim tracking-wider uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile-only character row */}
        <div className="mt-12 flex w-full items-end justify-center gap-2 lg:hidden">
          <img
            src={builder}
            alt="Builder"
            className="float-y h-44 w-auto drop-shadow-[0_0_30px_rgba(255,61,160,0.5)] sm:h-56"
          />
          <img
            src={mentor}
            alt="Mentor"
            className="float-slow h-44 w-auto drop-shadow-[0_0_30px_rgba(139,92,246,0.5)] sm:h-56"
          />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="text-text-dim absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-display text-[9px] tracking-[0.5em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-pink-500 to-transparent"
        />
      </motion.div>

      {/* ── MARQUEE STRIP ── */}
      <div className="absolute right-0 bottom-0 left-0 z-20 overflow-hidden border-t border-white/[0.08] bg-bg/70 py-3 backdrop-blur-md">
        <div className="marquee font-syne text-text-dim flex w-max items-center gap-10 px-6 text-[10px] tracking-[0.38em] whitespace-nowrap uppercase sm:text-[11px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-neon-pink font-bold">
                ✦ Season of Creation 2026
              </span>
              <span className="text-white/30">·</span>
              <span>Proof Beats Pedigree</span>
              <span className="text-white/30">·</span>
              <span className="text-neon-violet font-bold">
                ✦ Real Missions · Real Badges
              </span>
              <span className="text-white/30">·</span>
              <span>No Résumé Required</span>
              <span className="text-white/30">·</span>
              <span className="text-neon-cyan font-bold">
                ✦ Get Drafted Direct
              </span>
              <span className="text-white/30">·</span>
              <span>500 Builder Seats</span>
              <span className="text-white/30">·</span>
              <span className="text-neon-orange font-bold">
                ✦ May 2026 · Global Demo Day
              </span>
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
