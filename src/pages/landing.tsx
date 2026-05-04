import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Community } from "@/components/sections/community";
import { StoryFlow } from "@/components/sections/story-flow";
import { CharacterShowcase } from "@/components/sections/character-showcase";
import { CtaBanner } from "@/components/sections/cta-banner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";
import { FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL_HREF, POWERS, SOCIAL_LINKS } from "@/constants";

const logo = "/img/logo.png";

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
      <Community />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" id="how-it-works">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-87.5 w-175 -translate-x-1/2 bg-linear-to-b from-violet-500/10 to-transparent blur-3xl" />

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <p className="font-display text-neon-pink mb-3 text-xs tracking-[0.4em] uppercase">
              The System
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
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
            <p className="text-text-dim mx-auto mt-4 max-w-lg text-base sm:text-lg">
              Four steps that turn your skills into a verified identity
              recruiters can trust.
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
                className="neon-border group relative overflow-hidden rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_-8px_rgba(255,61,160,0.25)] sm:p-7"
              >
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-linear-to-br ${item.accent} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                />
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span
                    className={`font-display bg-linear-to-br text-5xl font-black text-transparent ${item.accent} bg-clip-text opacity-30 select-none`}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display mb-2 text-sm font-black tracking-wider uppercase sm:text-base">
                  {item.title}
                </h3>
                <p className="text-text-dim text-xs leading-relaxed sm:text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POWERS GRID ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <p className="font-display text-neon-violet mb-3 text-xs tracking-[0.4em] uppercase">
              Superpowers
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
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
                className="neon-border group relative overflow-hidden rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_6px_40px_-8px_rgba(139,92,246,0.3)]"
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-linear-to-br from-violet-500/15 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-50" />
                <span className="mb-5 block text-4xl">{p.icon}</span>
                <p className="font-display text-neon-pink mb-1.5 text-[10px] tracking-[0.3em] uppercase">
                  {p.subtitle}
                </p>
                <h3 className="font-display mb-3 text-base font-black tracking-wider uppercase">
                  {p.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASON OF CREATION 2026 ────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-pink-500/4 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />

        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            {...fadeUp()}
            className="neon-border group relative overflow-hidden rounded-3xl p-8 transition-shadow duration-500 hover:shadow-[0_16px_80px_-10px_rgba(255,61,160,0.4)] sm:p-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-pink-500/8 via-orange-400/4 to-violet-500/8" />
            <div className="pointer-events-none absolute -top-32 -right-32 size-125 rounded-full bg-linear-to-br from-pink-500/20 via-orange-400/10 to-transparent blur-3xl transition-all duration-700 group-hover:from-pink-500/35" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-75 rounded-full bg-linear-to-tr from-violet-500/15 to-transparent blur-3xl" />

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
              <div className="flex-1">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-90 blur-xl" />
                    <img
                      src={logo}
                      alt="CoLab Nation"
                      className="relative h-14 w-14 rounded-2xl object-contain sm:h-16 sm:w-16"
                    />
                  </div>
                  <div className="font-display inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-[10px] tracking-[0.3em] text-pink-300 uppercase">
                    <HiSparkles className="size-3" />
                    Flagship Program · Coming Soon
                  </div>
                </div>

                <h2 className="font-display mb-5 text-3xl leading-[0.92] font-black uppercase sm:text-4xl lg:text-5xl">
                  Season of <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg,#ff3da0,#ff8a3d,#8b5cf6)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Creation 2026
                  </span>
                </h2>
                <p className="text-text-dim mb-8 max-w-md text-base leading-relaxed">
                  12 weeks · 5 missions · Global Demo Day. The first CoLab
                  Nation cohort launches May 2026. 500 founding builder seats —
                  yours for the taking.
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
              <div className="grid grid-cols-2 gap-3 lg:flex lg:shrink-0 lg:flex-col lg:gap-3">
                {[
                  { v: "500", l: "Builder seats" },
                  { v: "12 wks", l: "Duration" },
                  { v: "100+", l: "Recruiters on Demo Day" },
                  { v: "May 2026", l: "Cohort opens" },
                ].map((st) => (
                  <div
                    key={st.l}
                    className="neon-border min-w-32.5 rounded-2xl bg-white/3 px-5 py-4 text-center"
                  >
                    <p
                      className="font-display text-xl font-black sm:text-2xl"
                      style={{
                        background: "linear-gradient(90deg,#ff3da0,#8b5cf6)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {st.v}
                    </p>
                    <p className="font-display text-text-dim mt-1 text-[10px] tracking-widest uppercase">
                      {st.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIRECT HIRING ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-orange-500/3 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <p className="font-display text-neon-orange mb-3 text-xs tracking-[0.4em] uppercase">
              Career Bridge
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
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
            <p className="text-text-dim mx-auto mt-4 max-w-lg text-base sm:text-lg">
              CoLab's hiring network connects verified builders directly with
              companies — no cold emails, no ghosting.
            </p>
          </motion.div>

          {/* How hiring works */}
          <div className="mb-10 grid gap-5 sm:grid-cols-3">
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
                className="neon-border group relative overflow-hidden rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_-8px_rgba(255,138,61,0.25)]"
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-linear-to-br ${item.accent} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25`}
                />
                <div className="mb-5 flex items-start justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span
                    className={`font-display bg-linear-to-br text-5xl font-black text-transparent ${item.accent} bg-clip-text opacity-20 select-none`}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display mb-2 text-sm font-black tracking-wider uppercase">
                  {item.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Hiring partner slots */}
          <motion.div
            {...fadeUp(0.2)}
            className="neon-border relative overflow-hidden rounded-3xl bg-white/2 p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-violet-500/5" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-neon-orange mb-2 text-xs tracking-[0.3em] uppercase">
                  Hiring Network
                </p>
                <h3 className="font-display mb-2 text-xl font-black uppercase sm:text-2xl">
                  Companies joining{" "}
                  <span className="gradient-text">Season 1</span>
                </h3>
                <p className="text-text-dim max-w-md text-sm leading-relaxed">
                  Partner slots are opening for companies that want first access
                  to verified CoLab builders at Demo Day. Startups, scale-ups,
                  and product studios welcome.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <Link to="/join">
                  <Button
                    rightIcon={TiLocationArrow}
                    className="whitespace-nowrap"
                  >
                    Join as a Builder
                  </Button>
                </Link>
                <a href={CONTACT_EMAIL_HREF}>
                  <Button
                    variant="outline"
                    className="px-5 py-2.5 text-xs whitespace-nowrap"
                  >
                    Partner with CoLab →
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Startups",
                "Scale-ups",
                "Tech Labs",
                "Product Studios",
                "Venture-backed Teams",
                "+ You?",
              ].map((co) => (
                <span
                  key={co}
                  className="font-display cursor-default rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold tracking-widest text-white/30 uppercase transition-colors hover:border-white/25 hover:text-white/60 sm:text-xs"
                >
                  {co}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COMMUNITY & SOCIAL ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="mb-12 text-center">
            <p className="font-display text-neon-cyan mb-3 text-xs tracking-[0.4em] uppercase">
              Connect
            </p>
            <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
              Join the{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#38f0ff,#8b5cf6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                movement.
              </span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-md text-base">
              Follow us for launch updates, builder spotlights, and Season 1
              announcements.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-3">
            {/* Instagram */}
            <motion.a
              {...fadeUp(0)}
              href={
                SOCIAL_LINKS.find((s) => s.label === "Instagram")?.href ?? "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="neon-border group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl p-8 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_-8px_rgba(255,61,160,0.35)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/8 via-orange-400/4 to-transparent" />
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 shadow-lg">
                <FaInstagram className="text-2xl text-white" />
              </div>
              <div>
                <p className="font-display text-base font-black uppercase">
                  Instagram
                </p>
                <p className="text-text-dim text-sm">@colabnation</p>
              </div>
              <span className="font-display mt-1 inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-[10px] tracking-[0.3em] text-pink-300 uppercase">
                Follow us →
              </span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              {...fadeUp(0.08)}
              href={
                SOCIAL_LINKS.find((s) => s.label === "LinkedIn")?.href ?? "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="neon-border group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl p-8 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_-8px_rgba(79,183,255,0.35)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-cyan-400/4 to-transparent" />
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
                <FaLinkedinIn className="text-2xl text-white" />
              </div>
              <div>
                <p className="font-display text-base font-black uppercase">
                  LinkedIn
                </p>
                <p className="text-text-dim text-sm">CoLab Nation</p>
              </div>
              <span className="font-display mt-1 inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-[10px] tracking-[0.3em] text-blue-300 uppercase">
                Connect →
              </span>
            </motion.a>

            {/* Email */}
            <motion.a
              {...fadeUp(0.16)}
              href="mailto:support@colabnation.live"
              className="neon-border group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl p-8 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_-8px_rgba(139,92,246,0.35)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/8 via-fuchsia-400/4 to-transparent" />
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg">
                <FaEnvelope className="text-2xl text-white" />
              </div>
              <div>
                <p className="font-display text-base font-black uppercase">
                  Email
                </p>
                <p className="text-text-dim text-sm">
                  support@colabnation.live
                </p>
              </div>
              <span className="font-display mt-1 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-[10px] tracking-[0.3em] text-violet-300 uppercase">
                Say hello →
              </span>
            </motion.a>
          </div>

          {/* Quotes strip */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                quote: "This is what LinkedIn should have been.",
                handle: "@devbuilder_sam",
                role: "Frontend Dev",
              },
              {
                quote:
                  "Finally a platform that values what I ship, not where I went to school.",
                handle: "@ux_orla",
                role: "UX Designer",
              },
              {
                quote:
                  "Got a job offer 2 weeks after Demo Day. No résumé sent.",
                handle: "@mlhunter_k",
                role: "ML Engineer",
              },
            ].map((q, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
              >
                <p className="mb-3 text-sm leading-relaxed text-white/70 italic">
                  "{q.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-[10px] font-bold text-white">
                    {q.handle[1].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-display text-[11px] font-bold text-white/80">
                      {q.handle}
                    </p>
                    <p className="text-text-dim text-[10px]">{q.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <StoryFlow />
      <CharacterShowcase />
      <CtaBanner />
    </>
  );
};
