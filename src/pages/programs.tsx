import mentor from "@/assets/characters/mentor.png";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { PROGRAMS } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { StarField, ConfettiBurst } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import seasonHero from "@/assets/scenes/season-launch.png";
import rocket from "@/assets/characters/rocket.png";
import logo from "@assets/45375_1777311860118.png";

const TARGET_DATE = new Date("2026-08-01T00:00:00Z").getTime();

function useCountdown() {
  const [time, setTime] = useState(() => {
    const diff = Math.max(0, TARGET_DATE - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_DATE - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export const Programs = () => {
  const { d, h, m, s } = useCountdown();
  const reduced = useReducedMotion();

  const units = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Mins" },
    { v: s, l: "Secs" },
  ];

  // PATCH: Add Coming Soon section at the top
  // (You can style this further as needed)
  const ComingSoonSection = () => (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center py-32">
      <StarField count={80} />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-100 w-150 -translate-x-1/2 bg-linear-to-b from-pink-500/15 via-violet-500/10 to-transparent blur-3xl" />
      {/* Animated character */}
      <img
        src={mentor}
        alt="Mentor Character"
        className="animate-float pointer-events-none absolute bottom-0 left-10 hidden h-64 w-auto drop-shadow-xl md:block"
        style={{ animationDuration: "4.2s" }}
      />
      <div className="relative z-10 text-center">
        <h1 className="font-impact gradient-text mb-6 text-5xl font-black tracking-tight uppercase sm:text-7xl">
          Programs Section
        </h1>
        <p className="text-text-dim mb-8 text-xl sm:text-2xl">
          Launching May 2026. The next era of programs is almost here.
        </p>
        <Link to="/join">
          <Button className="px-8 py-4 text-lg">Get Early Access</Button>
        </Link>
      </div>
    </section>
  );

  return (
    <>
      {/* ─── FLAGSHIP HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        {/* Bg image */}
        <div className="absolute inset-0 -z-30">
          <img
            src={seasonHero}
            alt=""
            className="h-full w-full scale-105 object-cover object-center opacity-35"
          />
        </div>
        <div className="from-bg via-bg/60 to-bg absolute inset-0 -z-20 bg-gradient-to-b" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-20" />
        <div className="scan-lines absolute inset-0 -z-10" />
        <StarField count={100} />
        <ConfettiBurst count={14} />

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -top-20 left-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/25 via-violet-500/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-violet-500/20 via-blue-500/10 to-transparent blur-3xl" />

        {/* Floating rocket */}
        <motion.img
          src={rocket}
          alt=""
          initial={reduced ? {} : { opacity: 0, y: 80 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="float-y pointer-events-none absolute right-[-2%] bottom-[-8%] hidden h-[100%] max-h-[700px] w-auto lg:block"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-28 sm:py-36 lg:py-40">
          {/* Eyebrow badge */}
          <motion.div
            {...fadeUp(0.1)}
            className="font-display mb-6 inline-flex items-center gap-2.5 rounded-full border border-pink-500/40 bg-pink-500/10 px-5 py-2.5 text-xs tracking-[0.35em] text-white uppercase backdrop-blur-sm"
          >
            <span className="size-2 animate-pulse rounded-full bg-pink-500" />
            Flagship Program · 2026
          </motion.div>

          {/* Logo + title row */}
          <motion.div
            {...fadeUp(0.2)}
            className="mb-2 flex flex-wrap items-center gap-5"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-70 blur-xl" />
              <img
                src={logo}
                alt="CoLab Nation"
                className="relative h-16 w-16 rounded-2xl border border-white/20 object-cover sm:h-20 sm:w-20"
              />
            </div>
            <span className="font-display text-text-dim text-xs tracking-[0.3em] uppercase sm:text-sm">
              CoLab Nation Presents
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.3)}
            className="font-display mb-6 text-5xl leading-[0.9] font-black uppercase sm:text-7xl lg:text-8xl"
          >
            Season of <br />
            <span className="gradient-text text-glow">Creation 2026</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className="text-text-dim mb-10 max-w-lg text-base leading-relaxed sm:text-lg"
          >
            12 weeks · 5 missions · One global launch night. The flagship CoLab
            Nation cohort opens this May — your shot to build, get verified, and
            get hired.
          </motion.p>

          {/* Live Countdown */}
          <motion.div {...fadeUp(0.5)} className="mb-10">
            <p className="font-display text-text-dim mb-4 flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-pink-500" />
              Launching in
            </p>
            <div className="inline-flex flex-wrap items-stretch gap-3 sm:gap-4">
              {units.map((u, i) => (
                <div key={u.l} className="flex items-center gap-3 sm:gap-4">
                  <div className="countdown-cell neon-border flex min-w-[72px] flex-col items-center justify-center rounded-2xl bg-white/[0.04] px-5 py-4 backdrop-blur-sm sm:min-w-[84px]">
                    <motion.span
                      key={u.v}
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-display gradient-text text-2xl font-black tabular-nums sm:text-4xl"
                    >
                      {String(u.v).padStart(2, "0")}
                    </motion.span>
                    <span className="font-display text-text-dim mt-1.5 text-[9px] tracking-[0.3em] uppercase sm:text-[10px]">
                      {u.l}
                    </span>
                  </div>
                  {i < units.length - 1 && (
                    <span className="font-display animate-pulse self-center pb-4 text-2xl font-black text-pink-500/60 sm:text-3xl">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <Link to="/join">
              <Button rightIcon={TiLocationArrow} className="px-8 py-4 text-sm">
                Join the Waitlist
              </Button>
            </Link>
            <a href="#all-programs">
              <Button variant="ghost" className="px-8 py-4 text-sm">
                All Programs
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.75)}
            className="font-display text-text-dim mt-12 flex flex-wrap gap-6 text-xs tracking-widest uppercase"
          >
            {[
              { v: "500", l: "Builder seats" },
              { v: "12 wks", l: "Duration" },
              { v: "100+", l: "Recruiters on Demo Day" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-pink-500" />
                <span className="font-bold text-white">{s.v}</span>
                <span>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="from-bg pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
      </section>

      {/* ─── SEASON HIGHLIGHTS ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="What's Inside"
            title="Season of Creation |2026|"
            subtitle="A flagship 12-week experience designed to turn builders into verified professionals."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "⚡",
                title: "Squad Missions",
                desc: "Join a cross-functional squad and ship real work every week.",
              },
              {
                icon: "🧭",
                title: "Mentor Verification",
                desc: "Senior engineers and founders sign off on every milestone.",
              },
              {
                icon: "🚀",
                title: "Demo Day",
                desc: "Launch in front of 100+ recruiters on global Demo Night.",
              },
              {
                icon: "✓",
                title: "Verified Badge",
                desc: "A permanent, signed Season 2026 badge on your profile.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="neon-border group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br from-pink-500/15 via-violet-500/10 to-transparent blur-2xl transition-all duration-500 group-hover:from-pink-500/30" />
                <span className="mb-4 block text-3xl">{item.icon}</span>
                <h4 className="font-display mb-2 text-sm font-black tracking-wider text-white uppercase">
                  {item.title}
                </h4>
                <p className="text-text-dim text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALL PROGRAMS ──────────────────────────────────────────── */}
      <section id="all-programs" className="relative overflow-hidden py-20">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
        <SectionHeading
          eyebrow="2026 Lineup"
          title="Every season, |new missions.|"
          subtitle="Pick the program that matches your fire. Some are open. Some are coming. All are real."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-6 sm:grid-cols-2">
          {PROGRAMS.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="neon-border group relative overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[0_8px_60px_-10px_rgba(255,61,160,0.25)] sm:p-8"
            >
              <div
                className={`pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-gradient-to-br ${p.accent} opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35`}
              />

              {/* Header row */}
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <span className="font-display text-neon-pink text-[10px] tracking-[0.35em] uppercase">
                  {p.eyebrow}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${p.accent} font-display px-3.5 py-1 text-[10px] font-black tracking-widest uppercase`}
                >
                  {p.status === "Coming Soon" && (
                    <span className="size-1.5 animate-pulse rounded-full bg-white" />
                  )}
                  {p.status}
                </span>
              </div>

              <h3 className="font-display mb-1 text-2xl leading-tight font-black uppercase sm:text-3xl">
                {p.title}
              </h3>
              <p className="text-text-dim mb-4 text-sm italic">{p.tagline}</p>
              <p className="text-text-dim mb-6 text-sm leading-relaxed">
                {p.description}
              </p>

              <ul className="mb-8 space-y-2 text-sm">
                {p.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2.5 text-white/90"
                  >
                    <span className="bg-neon-pink mt-1.5 size-1.5 shrink-0 rounded-full" />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
                <div className="text-text-dim font-display text-xs tracking-widest uppercase">
                  <span className="font-bold text-white">{p.when}</span>
                  <span className="mx-2 opacity-40">·</span>
                  {p.cohort}
                </div>
                <Link to="/join">
                  <Button
                    variant={p.status === "Coming Soon" ? "outline" : "primary"}
                    className="px-5 py-2.5 text-xs"
                  >
                    {p.status === "Coming Soon" ? "Notify me →" : "Apply now →"}
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── COMING SOON BANNER ────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-500/5 via-violet-500/8 to-blue-500/5" />
        <StarField count={40} />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-display mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-xs tracking-[0.3em] text-violet-300 uppercase">
              <HiSparkles className="size-3" />
              Coming Soon
            </div>
            <h2 className="font-display mb-6 text-4xl leading-[0.95] font-black uppercase sm:text-5xl lg:text-6xl">
              More programs <br />
              <span className="gradient-text">launching soon</span>
            </h2>
            <p className="text-text-dim mx-auto mb-10 max-w-xl text-base leading-relaxed sm:text-lg">
              AI Agent Build Week · DesignLab Residency · Indie Founders Studio
              — and more programs are being finalized. Join the waitlist to get
              early access before they open.
            </p>
            <Link to="/join">
              <Button rightIcon={TiLocationArrow} className="px-10 py-4">
                Get Early Access
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
