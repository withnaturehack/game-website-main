import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TIMELINE } from "@/constants";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import squad from "@/assets/characters/squad.png";
import spaceBg from "@/assets/scenes/space-bg.png";
import logo from "@assets/45375_1777311860118.png";
import { StarField } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const VALUES = [
  {
    icon: "🔐",
    title: "Proof Over Promises",
    desc: "Every skill claim is mentor-verified. Cryptographically signed. Impossible to fake.",
  },
  {
    icon: "🌍",
    title: "Build in Public",
    desc: "All work is visible. All missions are real. No closed-door projects, no fake portfolios.",
  },
  {
    icon: "🛡️",
    title: "Squad Over Solo",
    desc: "Cross-functional teams of designers, devs and researchers — because real products aren't solo.",
  },
  {
    icon: "⚡",
    title: "Ship, Don't Study",
    desc: "We believe in learning by launching. Every season ends with a real product in the world.",
  },
  {
    icon: "🚀",
    title: "Ambition is Default",
    desc: "We don't cap dreams here. Founders, engineers, designers — all aiming at something big.",
  },
  {
    icon: "🤝",
    title: "Mentors With Stakes",
    desc: "Our mentors vouch for builders with their reputation — so they only sign off on real excellence.",
  },
];

export const About = () => {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden py-32">
        <div className="absolute inset-0 -z-20 opacity-40">
          <img
            src={spaceBg}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="from-bg/90 via-bg/60 to-bg absolute inset-0 -z-10 bg-linear-to-b" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-20" />
        <StarField count={70} />
        <div className="pointer-events-none absolute top-0 left-1/2 h-100 w-175 -translate-x-1/2 bg-linear-to-b from-pink-500/15 via-violet-500/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 inline-block"
          >
            <div className="absolute inset-0 scale-110 rounded-3xl bg-linear-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-80 blur-2xl" />
            <img
              src={logo}
              alt="CoLab Nation"
              className="relative h-20 w-20 rounded-3xl border border-white/20 object-cover sm:h-24 sm:w-24"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-neon-pink mb-4 text-xs tracking-[0.4em] uppercase"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl leading-[0.92] font-black uppercase sm:text-5xl lg:text-6xl"
          >
            We started this because{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#ff3da0,#8b5cf6,#4fb7ff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              the resume game is broken.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-text-dim mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
          >
            CoLab Nation isn't a job board. It's a movement where students,
            builders, and mentors prove their skills together — out loud, in
            public, on real missions that matter.
          </motion.p>
        </div>
      </section>

      {/* ─── FOUNDERS STORY ──────────────────────────────────────── */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <motion.div
            {...fade()}
            className="relative grid h-110 place-items-center"
          >
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <div className="neon-border overflow-hidden rounded-3xl">
                <img
                  src={builder}
                  alt="Builder"
                  className="float-y h-full w-full object-cover"
                />
              </div>
              <div className="neon-border mt-14 overflow-hidden rounded-3xl">
                <img
                  src={mentor}
                  alt="Mentor"
                  className="float-slow h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.1)}>
            <p className="font-display text-neon-pink mb-4 text-xs tracking-[0.4em] uppercase">
              The Founders
            </p>
            <h2 className="font-display text-3xl leading-[0.92] font-black uppercase sm:text-4xl lg:text-5xl">
              Builders who refused{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff3da0,#ff8a3d)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                to ask permission.
              </span>
            </h2>
            <p className="text-text-dim mt-5 text-base leading-relaxed sm:text-lg">
              We were the students sending 200 cold emails. The interns who were
              smarter than the system. The ones who learned 3 stacks on weekends
              and still got told "we need more experience."
            </p>
            <p className="text-text-dim mt-4 text-base leading-relaxed sm:text-lg">
              So we stopped asking. We built a place where{" "}
              <span className="font-medium text-white">
                work speaks for itself
              </span>
              , mentors vouch with their reputation, and every commit is a
              ticket to the next mission.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/join">
                <Button rightIcon={TiLocationArrow}>Join the Movement</Button>
              </Link>
              <Link to="/programs">
                <Button variant="ghost">See Programs</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION STATEMENT ───────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-pink-500/5 via-transparent to-violet-500/5" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div {...fade()}>
            <p className="font-display text-neon-violet mb-6 text-xs tracking-[0.4em] uppercase">
              Mission
            </p>
            <blockquote className="font-display text-2xl leading-[1.1] font-black uppercase sm:text-3xl lg:text-4xl">
              "To make{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff3da0,#8b5cf6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                verified skills
              </span>{" "}
              the only currency that matters —{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#8b5cf6,#4fb7ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                not pedigree, not connections, not luck."
              </span>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES GRID ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fade()} className="mb-14 text-center">
            <p className="font-display text-neon-cyan mb-3 text-xs tracking-[0.4em] uppercase">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl">
              Six rules we{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#38f0ff,#8b5cf6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                don't break.
              </span>
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fade(i * 0.07)}
                whileHover={{ y: -5 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_6px_40px_-8px_rgba(139,92,246,0.3)]"
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-linear-to-br from-violet-500/10 to-transparent blur-2xl transition-all duration-500 group-hover:from-violet-500/25" />
                <span className="mb-5 block text-3xl">{v.icon}</span>
                <h3 className="font-display mb-2 text-sm font-black tracking-wider text-white uppercase">
                  {v.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
        <SectionHeading eyebrow="The Journey" title="A four-year |takeoff.|" />
        <div className="relative mx-auto mt-16 max-w-4xl px-6">
          <div className="absolute top-0 left-8 h-full w-px bg-linear-to-b from-pink-500 via-violet-500 to-cyan-400 sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-14">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                {...fade(i * 0.1)}
                className={`relative grid items-start gap-4 sm:grid-cols-2 ${i % 2 === 1 ? "sm:[direction:rtl]" : ""}`}
              >
                <span className="gradient-bg font-display pulse-glow absolute top-2 left-8 z-10 grid size-12 place-items-center rounded-full text-xs font-black text-white sm:left-1/2 sm:-translate-x-1/2">
                  {t.year}
                </span>
                <div className="pl-20 [direction:ltr] sm:px-10">
                  <h4 className="font-display text-2xl font-black uppercase">
                    {t.title}
                  </h4>
                  <p className="text-text-dim mt-2 leading-relaxed">{t.text}</p>
                </div>
                <div className="hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.img
          src={squad}
          alt="The Squad"
          {...fade(0.2)}
          className="float-y mx-auto mt-20 w-full max-w-2xl drop-shadow-[0_0_60px_rgba(255,61,160,0.35)]"
          draggable={false}
        />
      </section>

      {/* ─── DIRECT HIRING ───────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-violet-500/4 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fade()} className="mb-14 text-center">
            <p className="font-display text-neon-orange mb-3 text-xs tracking-[0.4em] uppercase">
              Career Path
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
              CoLab builders get{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff8a3d,#ff3da0)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                drafted directly.
              </span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-xl text-base sm:text-lg">
              Companies in our network don't wait for applications — they come
              to us. When you're verified, you're visible.
            </p>
          </motion.div>

          <div className="mb-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: "🎯",
                title: "Direct Outreach",
                desc: "Recruiters message verified builders directly. No applications. No ghosting.",
              },
              {
                icon: "✅",
                title: "Verified = Trusted",
                desc: "Your mentor-signed profile speaks louder than any resume ever could.",
              },
              {
                icon: "🌐",
                title: "Global Network",
                desc: "Startups, scale-ups, and companies across the globe — all looking for proof-based talent.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fade(i * 0.1)}
                whileHover={{ y: -5 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-7 text-center transition-shadow duration-300 hover:shadow-[0_6px_40px_-8px_rgba(255,138,61,0.25)]"
              >
                <div className="pointer-events-none absolute -top-10 left-1/2 size-32 -translate-x-1/2 rounded-full bg-linear-to-b from-orange-400/10 to-transparent blur-2xl transition-all duration-500 group-hover:from-orange-400/25" />
                <span className="mb-5 block text-4xl">{item.icon}</span>
                <h3 className="font-display mb-2 text-sm font-black tracking-wider uppercase">
                  {item.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Company logos placeholder */}
          <motion.div
            {...fade(0.2)}
            className="neon-border rounded-3xl bg-white/2 p-8 text-center sm:p-10"
          >
            <p className="font-display text-text-dim mb-6 text-xs tracking-[0.3em] uppercase">
              Companies joining our hiring network · More announced soon
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {[
                "Startups",
                "Scale-ups",
                "Tech Labs",
                "Product Studios",
                "Venture-backed Teams",
              ].map((co) => (
                <span
                  key={co}
                  className="font-display rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold tracking-widest text-white/30 uppercase sm:text-sm"
                >
                  {co}
                </span>
              ))}
            </div>
            <p className="text-text-dim mt-6 text-xs">
              Partner company slots opening with Season 1 ·{" "}
              <Link to="/join" className="text-neon-pink hover:underline">
                Apply to be a hiring partner →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CULTURE ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-12" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fade()} className="mb-14 text-center">
            <p className="font-display text-neon-pink mb-3 text-xs tracking-[0.4em] uppercase">
              Culture
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl">
              What it actually{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff3da0,#8b5cf6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                feels like.
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "Day 1", label: "You get squad-matched", icon: "🤝" },
              { stat: "Week 2", label: "You ship your first PR", icon: "💻" },
              {
                stat: "Week 8",
                label: "A mentor signs your badge",
                icon: "🏆",
              },
              {
                stat: "Week 12",
                label: "Demo Day. Recruiters. Offers.",
                icon: "🚀",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                {...fade(i * 0.1)}
                className="neon-border group relative overflow-hidden rounded-2xl p-6 text-center transition-colors duration-300 hover:bg-white/2"
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/2 to-transparent" />
                <span className="mb-4 block text-3xl">{item.icon}</span>
                <p className="font-display gradient-text mb-2 text-xl font-black sm:text-2xl">
                  {item.stat}
                </p>
                <p className="font-display text-xs tracking-wider text-white/80 uppercase">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
