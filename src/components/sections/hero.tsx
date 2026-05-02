import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { StarField, ShootingStars } from "@/components/ui/particles";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";
import rocket from "@/assets/characters/rocket.png";
import { useMotionBudget } from "@/lib/motion";

const logo = "/img/logo.png";

const HERO_VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
];

const HEADLINE_LINES = [
  { text: "Dream. Build.", gradient: "from-pink-400 via-fuchsia-300 to-pink-400", glow: "rgba(255,61,160,0.55)" },
  { text: "Shine. Repeat.", gradient: "from-violet-400 via-pink-300 to-violet-400", glow: "rgba(139,92,246,0.55)" },
];

const STATS_ROW = [
  { label: "Founding Season", value: "Season 1", dot: "bg-pink-500" },
  { label: "Builder Seats", value: "500", dot: "bg-violet-400" },
  { label: "Launching", value: "May 2026", dot: "bg-emerald-400" },
];

export const Hero = () => {
  const { shouldReduceEffects, shouldReduceVideo } = useMotionBudget();
  const [frontVideo, setFrontVideo] = useState(0);
  const [backVideo, setBackVideo] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [headlineReady, setHeadlineReady] = useState(false);

  const frontVideoRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yBg    = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yLeft  = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-9%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  useEffect(() => {
    frontVideoRef.current = frontVideo;
  }, [frontVideo]);

  useEffect(() => {
    if (shouldReduceVideo) return;
    const transitionMs = 1400;
    const transitionToNext = () => {
      const next = (frontVideoRef.current + 1) % HERO_VIDEOS.length;
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      setBackVideo(next);
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
  }, [shouldReduceVideo]);

  useEffect(() => {
    const t = setTimeout(() => setHeadlineReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-28 flex min-h-dvh w-full items-center overflow-hidden"
    >
      {/* ── VIDEO BACKDROP ── */}
      {!shouldReduceVideo && (
        <motion.div className="absolute inset-0 -z-30 gpu" style={{ y: yBg }}>
          <video
            key={`front-${frontVideo}`}
            src={HERO_VIDEOS[frontVideo]}
            autoPlay muted loop playsInline preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
              isFading ? "opacity-0" : "opacity-40"
            }`}
          />
          {backVideo !== null && (
            <video
              key={`back-${backVideo}`}
              src={HERO_VIDEOS[backVideo]}
              autoPlay muted loop playsInline preload="auto"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
                isFading ? "opacity-40" : "opacity-0"
              }`}
            />
          )}
        </motion.div>
      )}

      {/* ── OVERLAYS ── */}
      <div className="from-bg/95 via-bg/55 to-bg absolute inset-0 -z-20 bg-gradient-to-b" />
      <div className="from-bg/65 to-bg/65 absolute inset-0 -z-10 bg-gradient-to-r via-transparent" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-20" />
      <div className="scan-lines absolute inset-0 -z-10" />

      {/* Aurora glow */}
      <div className="aurora pointer-events-none absolute inset-0 -z-20 opacity-35" />

      <StarField count={70} />
      <ShootingStars count={5} />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/3 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/22 via-violet-500/14 to-blue-500/18 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-orange-500/18 to-transparent blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-cyan-500/14 to-transparent blur-[90px]" />

      {/* Speed lines */}
      {!shouldReduceEffects && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-25">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="marquee absolute h-px w-48 bg-gradient-to-r from-transparent via-pink-500/60 to-transparent"
              style={{
                top: `${14 + i * 22}%`,
                left: i % 2 === 0 ? "-10%" : "40%",
                animationDuration: `${5 + i * 2}s`,
                animationDelay: `${i * 1.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Rocket bg decoration */}
      <img src={rocket} alt="" className="rocket-rise pointer-events-none absolute right-[6%] bottom-0 -z-10 h-[55vh] w-auto opacity-45" />
      <img src={rocket} alt="" className="rocket-rise pointer-events-none absolute bottom-0 left-[4%] -z-10 h-[38vh] w-auto opacity-25" style={{ animationDelay: "6s" }} />

      {/* ── LEFT character — Builder ── */}
      <motion.div
        style={{ y: yLeft }}
        className="pointer-events-none absolute bottom-0 left-0 z-10 hidden lg:block xl:-left-6 2xl:-left-16"
      >
        <motion.img
          src={builder}
          alt="The Builder"
          initial={{ opacity: 0, x: -100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="float-y h-[72vh] max-h-[680px] w-auto drop-shadow-[0_0_70px_rgba(255,61,160,0.6)]"
          draggable={false}
        />
      </motion.div>

      {/* ── RIGHT character — Mentor ── */}
      <motion.div
        style={{ y: yRight }}
        className="pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-6 2xl:-right-16"
      >
        <motion.img
          src={mentor}
          alt="The Mentor"
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="float-slow h-[72vh] max-h-[680px] w-auto drop-shadow-[0_0_70px_rgba(139,92,246,0.6)]"
          draggable={false}
        />
      </motion.div>

      {/* Nova bot */}
      <motion.img
        src={aibot}
        alt="Nova"
        initial={{ opacity: 0, y: -70, scale: 0.5 }}
        animate={{ opacity: 0.9, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="float-y pointer-events-none absolute top-[18%] right-[12%] z-10 hidden h-32 w-auto drop-shadow-[0_0_36px_rgba(56,240,255,0.8)] md:block lg:right-[27%]"
        style={{ animationDuration: "4s" }}
        draggable={false}
      />

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col items-center justify-center px-5 pt-36 pb-28 text-center sm:px-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mb-5"
        >
          <div className="absolute inset-0 scale-125 rounded-3xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-65 blur-2xl" />
          <img
            src={logo}
            alt="CoLab Nation"
            className="relative h-20 w-20 rounded-2xl object-contain shadow-[0_0_50px_rgba(255,61,160,0.45)] sm:h-24 sm:w-24"
          />
        </motion.div>

        {/* Eyebrow chip */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mb-6 inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-pink-500/10 px-5 py-2 text-[10px] tracking-[0.45em] text-pink-200 uppercase backdrop-blur-md"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-pink-400"
          />
          Coming May 2026 · Founders&apos; Cohort
          <HiSparkles className="size-3 text-pink-300" />
        </motion.div>

        {/* Animated Headline */}
        <h1 className="font-impact relative mb-4 text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-tight uppercase">
          <AnimatePresence>
            {HEADLINE_LINES.map((line, li) => (
              <motion.span
                key={line.text}
                className="block"
                initial={{ opacity: 0, y: 60, skewY: 4 }}
                animate={headlineReady ? { opacity: 1, y: 0, skewY: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + li * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span
                  className={`bg-gradient-to-r ${line.gradient} bg-clip-text text-transparent`}
                  style={{ filter: `drop-shadow(0 0 36px ${line.glow})` }}
                >
                  {line.text}
                </span>
              </motion.span>
            ))}
          </AnimatePresence>
        </h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mb-2 max-w-2xl text-sm tracking-[0.22em] text-white/90 uppercase sm:text-base"
        >
          Where creators become legends.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="text-text-dim mb-0 mt-1 max-w-md text-sm sm:text-base"
        >
          A new world for builders. Drops May 2026.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/join">
            <Button
              rightIcon={TiLocationArrow}
              className="px-8 py-4 text-sm shadow-[0_0_50px_rgba(255,61,160,0.5)]"
            >
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {STATS_ROW.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs backdrop-blur-md"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.6 + i * 0.3, ease: "easeInOut" }}
                className={`size-2 shrink-0 rounded-full ${s.dot}`}
              />
              <span className="font-display font-bold text-white">{s.value}</span>
              <span className="text-text-dim tracking-wider uppercase">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile character row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full items-end justify-center gap-4 lg:hidden"
        >
          <img
            src={builder}
            alt="Builder"
            className="float-y h-52 w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.6)] sm:h-64"
            draggable={false}
          />
          <img
            src={aibot}
            alt="Nova"
            className="float-slow mb-6 h-24 w-auto drop-shadow-[0_0_30px_rgba(56,240,255,0.7)] sm:h-32"
            draggable={false}
          />
          <img
            src={mentor}
            alt="Mentor"
            className="float-slow h-52 w-auto drop-shadow-[0_0_40px_rgba(139,92,246,0.6)] sm:h-64"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="text-text-dim absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-display text-[9px] tracking-[0.55em] uppercase">Scroll</span>
        <motion.span
          animate={{ scaleY: [1, 0.35, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
          className="h-11 w-px bg-gradient-to-b from-pink-500 to-transparent"
        />
      </motion.div>

      {/* Marquee strip */}
      <div className="bg-bg/70 absolute right-0 bottom-0 left-0 z-20 overflow-hidden border-t border-white/[0.07] py-3 backdrop-blur-md">
        <div className="marquee font-syne text-text-dim flex w-max items-center gap-10 px-6 text-[10px] tracking-[0.38em] whitespace-nowrap uppercase sm:text-[11px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-neon-pink font-bold">✦ Season of Creation 2026</span>
              <span className="text-white/25">·</span>
              <span>Proof Beats Pedigree</span>
              <span className="text-white/25">·</span>
              <span className="text-neon-violet font-bold">✦ Real Missions · Real Badges</span>
              <span className="text-white/25">·</span>
              <span>No Résumé Required</span>
              <span className="text-white/25">·</span>
              <span className="text-neon-cyan font-bold">✦ Get Drafted Direct</span>
              <span className="text-white/25">·</span>
              <span>500 Builder Seats</span>
              <span className="text-white/25">·</span>
              <span className="text-neon-orange font-bold">✦ May 2026 · Global Demo Day</span>
              <span className="text-white/25">·</span>
              <span>Mentor Verified Skills</span>
              <span className="text-white/25">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
