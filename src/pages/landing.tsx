import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { StoryFlow } from "@/components/sections/story-flow";
import { CharacterShowcase } from "@/components/sections/character-showcase";
import { CtaBanner } from "@/components/sections/cta-banner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { POWERS } from "@/constants";
import logo from "@assets/45375_1777311860118.png";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export const Landing = () => {
  return (
    <>
      <Hero />
      <Stats />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" id="how-it-works">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[700px] bg-gradient-to-b from-violet-500/10 to-transparent blur-3xl" />

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-neon-pink mb-3">The System</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.95]">
              From builder to{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff3da0,#8b5cf6,#4fb7ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                drafted.
              </span>
            </h2>
            <p className="mt-4 text-text-dim text-base sm:text-lg max-w-lg mx-auto">
              Four steps that turn your skills into a verified identity recruiters can trust.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Join a Squad",
                desc: "Get matched with designers, devs, and researchers within 48 hours of joining.",
                accent: "from-pink-500 to-orange-400",
                icon: "🛡️",
              },
              {
                step: "02",
                title: "Ship Missions",
                desc: "Work on real problems from real companies. Every contribution is tracked and public.",
                accent: "from-orange-400 to-amber-400",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Get Verified",
                desc: "Mentors review and sign off on your work. Cryptographically permanent. Impossible to fake.",
                accent: "from-violet-500 to-fuchsia-500",
                icon: "🔐",
              },
              {
                step: "04",
                title: "Get Drafted",
                desc: "Top builders get surfaced to our recruiter network. You don't apply — they come to you.",
                accent: "from-blue-400 to-cyan-400",
                icon: "🚀",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-6 sm:p-7 transition-shadow duration-300 hover:shadow-[0_8px_40px_-8px_rgba(255,61,160,0.25)]"
              >
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br ${item.accent} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-500`}
                />
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl">{item.icon}</span>
                  <span
                    className={`font-display text-5xl font-black text-transparent bg-gradient-to-br ${item.accent} bg-clip-text opacity-30 select-none`}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-sm sm:text-base font-black uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-text-dim text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POWERS GRID ───────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-neon-violet mb-3">Superpowers</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.95]">
              Your{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#8b5cf6,#4fb7ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                builder toolkit.
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POWERS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp(i * 0.07)}
                whileHover={{ y: -5, scale: 1.01 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_6px_40px_-8px_rgba(139,92,246,0.3)]"
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-gradient-to-br from-violet-500/15 to-transparent blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
                <span className="text-4xl mb-5 block">{p.icon}</span>
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-neon-pink mb-1.5">{p.subtitle}</p>
                <h3 className="font-display text-base font-black uppercase tracking-wider mb-3">{p.title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASON OF CREATION 2026 ────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.04] to-transparent" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />

        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            {...fadeUp()}
            className="neon-border group relative overflow-hidden rounded-3xl p-8 sm:p-14 transition-shadow duration-500 hover:shadow-[0_16px_80px_-10px_rgba(255,61,160,0.4)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/8 via-orange-400/4 to-violet-500/8" />
            <div className="pointer-events-none absolute -top-32 -right-32 size-[500px] rounded-full bg-gradient-to-br from-pink-500/20 via-orange-400/10 to-transparent blur-3xl group-hover:from-pink-500/35 transition-all duration-700" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-[300px] rounded-full bg-gradient-to-tr from-violet-500/15 to-transparent blur-3xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-xl opacity-90" />
                    <img
                      src={logo}
                      alt="CoLab Nation"
                      className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border border-white/20 object-cover"
                    />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-[10px] font-display uppercase tracking-[0.3em] text-pink-300">
                    <HiSparkles className="size-3" />
                    Flagship Program · Coming Soon
                  </div>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.92] mb-5">
                  Season of <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg,#ff3da0,#ff8a3d,#8b5cf6)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Creation 2026
                  </span>
                </h2>
                <p className="text-text-dim text-base leading-relaxed max-w-md mb-8">
                  12 weeks · 5 missions · Global Demo Day. The first CoLab Nation cohort launches
                  August 2026. 500 founding builder seats — yours for the taking.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to="/join">
                    <Button rightIcon={TiLocationArrow} className="px-8 py-4">
                      Secure Your Seat
                    </Button>
                  </Link>
                  <Link to="/programs">
                    <Button variant="ghost" className="px-8 py-4">
                      View Programs
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats column */}
              <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:shrink-0 lg:gap-3">
                {[
                  { v: "500", l: "Builder seats" },
                  { v: "12 wks", l: "Duration" },
                  { v: "100+", l: "Recruiters on Demo Day" },
                  { v: "Aug 2026", l: "Cohort opens" },
                ].map((st) => (
                  <div
                    key={st.l}
                    className="neon-border rounded-2xl bg-white/[0.03] px-5 py-4 text-center min-w-[130px]"
                  >
                    <p className="font-display text-xl sm:text-2xl font-black"
                      style={{
                        background: "linear-gradient(90deg,#ff3da0,#8b5cf6)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >{st.v}</p>
                    <p className="font-display text-[10px] uppercase tracking-widest text-text-dim mt-1">{st.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIRECT HIRING ─────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-neon-orange mb-3">Career Bridge</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.95]">
              Skip the application.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff8a3d,#ff3da0)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Get drafted.
              </span>
            </h2>
            <p className="mt-4 text-text-dim text-base sm:text-lg max-w-lg mx-auto">
              CoLab's hiring network connects verified builders directly with companies — no cold emails, no ghosting.
            </p>
          </motion.div>

          {/* How hiring works */}
          <div className="grid gap-5 sm:grid-cols-3 mb-10">
            {[
              {
                step: "01",
                icon: "🔐",
                title: "Earn Your Verified Badge",
                desc: "Complete a season, get mentor sign-off, and receive a cryptographically-verified builder profile.",
                accent: "from-pink-500 to-orange-400",
              },
              {
                step: "02",
                icon: "📡",
                title: "Get Surfaced to Companies",
                desc: "Verified builders are shared with our hiring network after Demo Day. Companies browse, filter, and reach out.",
                accent: "from-orange-400 to-amber-400",
              },
              {
                step: "03",
                icon: "🤝",
                title: "Direct Offer, No Resume Needed",
                desc: "Your work is the pitch. Your badge is the proof. Companies make direct offers — no ATS, no filtering.",
                accent: "from-violet-500 to-blue-500",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-7 hover:shadow-[0_8px_40px_-8px_rgba(255,138,61,0.25)] transition-shadow duration-300"
              >
                <div className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${item.accent} opacity-10 blur-2xl group-hover:opacity-25 transition-opacity duration-500`} />
                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`font-display text-5xl font-black text-transparent bg-gradient-to-br ${item.accent} bg-clip-text opacity-20 select-none`}>{item.step}</span>
                </div>
                <h3 className="font-display text-sm font-black uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Hiring partner slots */}
          <motion.div
            {...fadeUp(0.2)}
            className="neon-border relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-white/[0.02]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.05] via-transparent to-violet-500/[0.05]" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-neon-orange mb-2">Hiring Network</p>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase mb-2">
                  Companies joining <span className="gradient-text">Season 1</span>
                </h3>
                <p className="text-text-dim text-sm leading-relaxed max-w-md">
                  Partner slots are opening for companies that want first access to verified CoLab builders at Demo Day.
                  Startups, scale-ups, and product studios welcome.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link to="/join">
                  <Button rightIcon={TiLocationArrow} className="whitespace-nowrap">
                    Join as a Builder
                  </Button>
                </Link>
                <a href="mailto:team@colabnation.com">
                  <Button variant="outline" className="whitespace-nowrap text-xs px-5 py-2.5">
                    Partner with CoLab →
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Startups", "Scale-ups", "Tech Labs", "Product Studios", "Venture-backed Teams", "+ You?"].map((co) => (
                <span key={co} className="font-display text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-4 py-2 hover:text-white/60 hover:border-white/25 transition-colors cursor-default">
                  {co}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <StoryFlow />
      <CharacterShowcase />
      <CtaBanner />
    </>
  );
};
