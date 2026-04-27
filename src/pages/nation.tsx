import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { BADGES } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import squad from "@/assets/characters/squad.png";
import logo from "@assets/45375_1777311860118.png";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ConfettiBurst, StarField } from "@/components/ui/particles";

const MISSIONS = [
  {
    title: "Operation: Open Source Atlas",
    squad: "8 builders · 2 mentors",
    type: "Open Source",
    status: "Active",
    accent: "from-pink-500 to-orange-400",
  },
  {
    title: "AI Agent Build Week",
    squad: "12 builders · 3 mentors",
    type: "Hackathon",
    status: "48h left",
    accent: "from-violet-500 to-blue-500",
  },
  {
    title: "Indie Founders Studio",
    squad: "6 builders · 1 mentor",
    type: "Startup Sprint",
    status: "Recruiting",
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    title: "DesignLab Residency",
    squad: "5 builders · 2 mentors",
    type: "Design",
    status: "Active",
    accent: "from-fuchsia-500 to-pink-500",
  },
];

export const Nation = () => {
  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <StarField count={80} />
        <ConfettiBurst count={18} />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] bg-gradient-to-b from-violet-500/15 via-pink-500/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="The Nation"
            title="A community that |actually ships.|"
            subtitle="Open source vibes, gamified missions, real friendships. Less Slack noise, more launches."
          />
        </div>
      </section>

      {/* ─── SEASON OF CREATION 2026 BANNER ──────────────────────── */}
      <section className="relative py-6 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="neon-border group relative overflow-hidden rounded-3xl p-6 sm:p-10 hover:shadow-[0_12px_60px_-8px_rgba(255,61,160,0.4)] transition-shadow duration-500"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/8 via-orange-400/4 to-violet-500/8" />
            <div className="pointer-events-none absolute -top-24 -right-24 size-[400px] rounded-full bg-gradient-to-br from-pink-500/20 via-orange-400/10 to-transparent blur-3xl group-hover:from-pink-500/35 transition-all duration-700" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-lg opacity-80" />
                  <img
                    src={logo}
                    alt="CoLab Nation"
                    className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl border border-white/20 object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1 text-[10px] font-display uppercase tracking-[0.3em] text-pink-300 mb-2">
                    <HiSparkles className="size-2.5" />
                    Flagship · Coming Soon
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black uppercase leading-tight">
                    Season of <span className="gradient-text">Creation 2026</span>
                  </h3>
                  <p className="text-text-dim text-xs sm:text-sm mt-1">
                    12 weeks · 5 missions · Global Demo Day · Opens Aug 2026
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link to="/join">
                  <Button rightIcon={TiLocationArrow} className="px-6 py-3 text-xs whitespace-nowrap">
                    Join Waitlist
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button variant="ghost" className="px-6 py-3 text-xs whitespace-nowrap">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── LIVE MISSIONS ────────────────────────────────────────── */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
              Live Missions
            </h3>
            <p className="text-text-dim text-sm font-display uppercase tracking-widest">
              <span className="text-emerald-400">●</span>{" "}
              <span className="text-white font-bold">84</span> missions across{" "}
              <span className="text-white font-bold">27</span> timezones
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {MISSIONS.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group neon-border relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_8px_40px_-8px_rgba(255,61,160,0.25)]"
              >
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br ${m.accent} opacity-15 blur-3xl group-hover:opacity-40 transition-opacity duration-500`}
                />
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.35em] text-neon-pink mb-1">
                      {m.type}
                    </p>
                    <h4 className="font-display text-xl font-black leading-tight">{m.title}</h4>
                    <p className="mt-2 text-sm text-text-dim">{m.squad}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-display uppercase tracking-widest ${
                      m.status === "Active"
                        ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
                        : m.status === "Recruiting"
                        ? "text-violet-300 border-violet-400/30 bg-violet-400/5"
                        : "text-orange-400 border-orange-400/30 bg-orange-400/5"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`grid size-9 place-items-center rounded-full border-2 border-bg bg-gradient-to-br ${m.accent} text-[11px] font-display font-black text-white`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                    ))}
                  </div>
                  <button className="text-sm font-display uppercase tracking-widest text-white/70 hover:text-neon-pink transition-colors duration-200">
                    Enlist →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BADGES ───────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />
        <SectionHeading
          eyebrow="Achievements"
          title="Earn |badges.| Unlock the future."
          subtitle="Every milestone unlocks a permanent, verifiable badge on your profile."
        />
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-6 px-6 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ y: -10, rotate: 5, scale: 1.05 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={`relative grid size-20 sm:size-24 place-items-center clip-hex bg-gradient-to-br ${b.color} text-2xl sm:text-3xl text-white pulse-glow`}
              >
                <span className="relative z-10">{b.icon}</span>
                <div className={`absolute inset-0 clip-hex bg-gradient-to-br ${b.color} opacity-50 blur-md`} />
              </div>
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-center text-white/85 leading-tight">
                {b.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── COMMUNITY FEED ──────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <SectionHeading
          eyebrow="Live Feed"
          title="The nation moves |out loud.|"
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1 flex items-center justify-center"
          >
            <img
              src={squad}
              alt="Squad"
              className="float-y w-full max-w-xs drop-shadow-[0_0_50px_rgba(255,61,160,0.4)]"
              draggable={false}
            />
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {[
              {
                user: "@aria.builds",
                text: "Just shipped my AI study buddy MVP 🎉 Mentor said it's production-ready!",
                time: "2m",
                tag: "LAUNCH",
                color: "from-pink-500 to-orange-400",
              },
              {
                user: "@kenji.codes",
                text: "Squad locked in for AI Agent Build Week. 12 humans. 1 mission. LET'S GO 🚀",
                time: "14m",
                tag: "SQUAD",
                color: "from-violet-500 to-blue-500",
              },
              {
                user: "@nova.research",
                text: "Mentor's Pick badge unlocked! Months of papers finally paid off.",
                time: "1h",
                tag: "BADGE",
                color: "from-amber-400 to-rose-500",
              },
              {
                user: "@team-atlas",
                text: "Open Source Atlas hit 1.2k stars overnight. The nation showed up ⚡",
                time: "3h",
                tag: "MILESTONE",
                color: "from-emerald-400 to-cyan-400",
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
                className="neon-border flex items-start gap-4 rounded-2xl p-5 transition-shadow duration-300 hover:shadow-[0_4px_30px_-8px_rgba(255,61,160,0.2)]"
              >
                <div
                  className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${post.color} font-display text-sm font-black shrink-0`}
                >
                  {post.user[1]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <p className="font-display font-semibold text-sm">{post.user}</p>
                    <span className="text-xs text-text-dim">{post.time} ago</span>
                  </div>
                  <p className="text-text-dim text-sm leading-relaxed">{post.text}</p>
                  <span
                    className={`mt-3 inline-block rounded-full bg-gradient-to-r ${post.color} px-3 py-0.5 text-[10px] font-display uppercase tracking-widest`}
                  >
                    {post.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
