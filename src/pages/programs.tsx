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

  return (
    <>
      {/* ─── FLAGSHIP HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] overflow-hidden flex items-center">
        {/* Bg image */}
        <div className="absolute inset-0 -z-30">
          <img
            src={seasonHero}
            alt=""
            className="h-full w-full object-cover object-center opacity-35 scale-105"
          />
        </div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-bg via-bg/60 to-bg" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <div className="absolute inset-0 -z-10 scan-lines" />
        <StarField count={100} />
        <ConfettiBurst count={14} />

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -top-20 left-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/25 via-violet-500/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-violet-500/20 via-blue-500/10 to-transparent blur-3xl" />

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
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2.5 rounded-full border border-pink-500/40 bg-pink-500/10 backdrop-blur-sm px-5 py-2.5 text-xs font-display uppercase tracking-[0.35em] text-white mb-6">
            <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
            Flagship Program · 2026
          </motion.div>

          {/* Logo + title row */}
          <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center gap-5 mb-2">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-xl opacity-70" />
              <img
                src={logo}
                alt="CoLab Nation"
                className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border border-white/20 object-cover"
              />
            </div>
            <span className="font-display text-xs sm:text-sm uppercase tracking-[0.3em] text-text-dim">
              CoLab Nation Presents
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.3)} className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-[0.9] mb-6">
            Season of <br />
            <span className="gradient-text text-glow">Creation 2026</span>
          </motion.h1>

          <motion.p {...fadeUp(0.4)} className="max-w-lg text-base sm:text-lg text-text-dim leading-relaxed mb-10">
            12 weeks · 5 missions · One global launch night. The flagship CoLab Nation
            cohort opens this August — your shot to build, get verified, and get hired.
          </motion.p>

          {/* Live Countdown */}
          <motion.div {...fadeUp(0.5)} className="mb-10">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-text-dim mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-pink-500 animate-pulse" />
              Launching in
            </p>
            <div className="inline-flex flex-wrap items-stretch gap-3 sm:gap-4">
              {units.map((u, i) => (
                <div key={u.l} className="flex items-center gap-3 sm:gap-4">
                  <div className="countdown-cell neon-border flex flex-col items-center justify-center rounded-2xl bg-white/[0.04] backdrop-blur-sm px-5 py-4 min-w-[72px] sm:min-w-[84px]">
                    <motion.span
                      key={u.v}
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-2xl sm:text-4xl font-black gradient-text tabular-nums"
                    >
                      {String(u.v).padStart(2, "0")}
                    </motion.span>
                    <span className="font-display text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-text-dim mt-1.5">
                      {u.l}
                    </span>
                  </div>
                  {i < units.length - 1 && (
                    <span className="font-display text-2xl sm:text-3xl font-black text-pink-500/60 animate-pulse self-center pb-4">:</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-3 sm:gap-4">
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
          <motion.div {...fadeUp(0.75)} className="mt-12 flex flex-wrap gap-6 text-xs font-display uppercase tracking-widest text-text-dim">
            {[
              { v: "500", l: "Builder seats" },
              { v: "12 wks", l: "Duration" },
              { v: "100+", l: "Recruiters on Demo Day" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-pink-500" />
                <span className="text-white font-bold">{s.v}</span>
                <span>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* ─── SEASON HIGHLIGHTS ─────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="What's Inside"
            title="Season of Creation |2026|"
            subtitle="A flagship 12-week experience designed to turn builders into verified professionals."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", title: "Squad Missions", desc: "Join a cross-functional squad and ship real work every week." },
              { icon: "🧭", title: "Mentor Verification", desc: "Senior engineers and founders sign off on every milestone." },
              { icon: "🚀", title: "Demo Day", desc: "Launch in front of 100+ recruiters on global Demo Night." },
              { icon: "✓", title: "Verified Badge", desc: "A permanent, signed Season 2026 badge on your profile." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="neon-border group relative overflow-hidden rounded-2xl p-6 hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br from-pink-500/15 via-violet-500/10 to-transparent blur-2xl group-hover:from-pink-500/30 transition-all duration-500" />
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h4 className="font-display text-sm font-black uppercase tracking-wider text-white mb-2">{item.title}</h4>
                <p className="text-xs text-text-dim leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALL PROGRAMS ──────────────────────────────────────────── */}
      <section id="all-programs" className="relative py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />
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
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="neon-border group relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_8px_60px_-10px_rgba(255,61,160,0.25)]"
            >
              <div
                className={`pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-gradient-to-br ${p.accent} opacity-15 blur-3xl group-hover:opacity-35 transition-opacity duration-500`}
              />

              {/* Header row */}
              <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                <span className="font-display text-[10px] uppercase tracking-[0.35em] text-neon-pink">
                  {p.eyebrow}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${p.accent} px-3.5 py-1 text-[10px] font-display font-black uppercase tracking-widest`}
                >
                  {p.status === "Coming Soon" && (
                    <span className="size-1.5 rounded-full bg-white animate-pulse" />
                  )}
                  {p.status}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight mb-1">
                {p.title}
              </h3>
              <p className="text-text-dim italic text-sm mb-4">{p.tagline}</p>
              <p className="text-text-dim text-sm leading-relaxed mb-6">{p.description}</p>

              <ul className="space-y-2 text-sm mb-8">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-white/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-pink" />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-white/[0.06]">
                <div className="text-xs text-text-dim font-display uppercase tracking-widest">
                  <span className="text-white font-bold">{p.when}</span>
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
      <section className="relative py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-500/5 via-violet-500/8 to-blue-500/5" />
        <StarField count={40} />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-xs font-display uppercase tracking-[0.3em] text-violet-300 mb-6">
              <HiSparkles className="size-3" />
              Coming Soon
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.95] mb-6">
              More programs <br />
              <span className="gradient-text">launching soon</span>
            </h2>
            <p className="text-text-dim text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              AI Agent Build Week · DesignLab Residency · Indie Founders Studio — and more programs are being finalized.
              Join the waitlist to get early access before they open.
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
