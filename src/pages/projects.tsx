import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { PROJECTS } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBanner } from "@/components/sections/cta-banner";
import { StarField } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import logo from "@assets/45375_1777311860118.png";
import projAi from "@/assets/projects/project-ai.png";
import projOpen from "@/assets/projects/project-open.png";
import projDesign from "@/assets/projects/project-design.png";
import projRobotics from "@/assets/projects/project-robotics.png";

const IMG_MAP: Record<string, string> = {
  ai: projAi,
  open: projOpen,
  design: projDesign,
  robotics: projRobotics,
};

const COMING_SOON_PROGRAMS = [
  {
    title: "Season of Creation 2026",
    eyebrow: "Flagship",
    when: "Opens Aug 2026",
    desc: "12 weeks. 5 missions. One global launch night. The flagship CoLab cohort where builders get verified and hired.",
    accent: "from-pink-500 via-orange-400 to-violet-500",
    icon: "🚀",
  },
  {
    title: "AI Agent Build Week",
    eyebrow: "Sprint",
    when: "Q3 2026",
    desc: "From prompt to product in 7 days. A one-week sprint with daily mentor reviews and a live launch night demo.",
    accent: "from-violet-500 to-blue-500",
    icon: "🤖",
  },
  {
    title: "DesignLab Residency",
    eyebrow: "Design",
    when: "Winter 2026",
    desc: "An 8-week residency for designers shipping real product missions, mentored by founders and design leads.",
    accent: "from-fuchsia-500 to-pink-500",
    icon: "🎨",
  },
];

export const Projects = () => {
  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <StarField count={80} />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] bg-gradient-to-b from-pink-500/15 via-violet-500/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Project Drops"
            title="Real builds. |Real rockets.|"
            subtitle="Every project here was shipped by a CoLab squad — verified by mentors, launched in public."
          />
        </div>
      </section>

      {/* ─── PROJECTS GRID ────────────────────────────────────────── */}
      <section className="relative pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="neon-border group relative overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-[0_12px_60px_-10px_rgba(255,61,160,0.3)]"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={IMG_MAP[p.img] || projAi}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl group-hover:opacity-45 transition-opacity duration-500`}
                />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-3">
                  <span className="font-display text-xs uppercase tracking-[0.3em] text-text-dim">
                    {p.by}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full bg-gradient-to-r ${p.accent} px-3 py-0.5 text-[10px] font-display uppercase tracking-widest`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase mb-3">
                  {p.title}
                </h3>
                <p className="text-text-dim leading-relaxed mb-6">{p.blurb}</p>

                <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-text-dim">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Mentor Verified
                  </div>
                  <Link to="/join">
                    <Button variant="outline" className="px-5 py-2.5 text-xs">
                      Build like this →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── COMING SOON PROGRAMS ─────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.04] to-transparent" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />
        <StarField count={50} />

        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.3em] text-violet-300 mb-5">
                <HiSparkles className="size-3" />
                Nation Projects · Coming Soon
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.95]">
                Next drops <br />
                <span className="gradient-text">launching soon</span>
              </h2>
            </div>
            <Link to="/join" className="shrink-0">
              <Button variant="ghost" rightIcon={TiLocationArrow} className="px-6 py-3 text-xs">
                Get Early Access
              </Button>
            </Link>
          </div>

          {/* Season of Creation 2026 — hero card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="neon-border group relative overflow-hidden rounded-3xl p-8 sm:p-12 mb-6 hover:shadow-[0_16px_80px_-10px_rgba(255,61,160,0.4)] transition-shadow duration-500"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/10 via-orange-400/5 to-violet-500/10" />
            <div className="pointer-events-none absolute -top-32 -right-32 size-[500px] rounded-full bg-gradient-to-br from-pink-500/20 via-orange-400/10 to-transparent blur-3xl group-hover:from-pink-500/35 transition-all duration-700" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-[300px] rounded-full bg-gradient-to-tr from-violet-500/15 to-transparent blur-3xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-lg opacity-80" />
                    <img
                      src={logo}
                      alt="CoLab Nation"
                      className="relative h-14 w-14 rounded-xl border border-white/20 object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.35em] text-neon-pink mb-0.5">Flagship Program</p>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 px-3 py-1 text-[10px] font-display uppercase tracking-widest text-pink-300">
                      <span className="size-1.5 rounded-full bg-pink-400 animate-pulse" />
                      Coming Soon · Aug 2026
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.9] mb-4">
                  Season of <br />
                  <span className="gradient-text text-glow">Creation 2026</span>
                </h3>
                <p className="text-text-dim text-base leading-relaxed mb-8 max-w-lg">
                  12 weeks · 5 missions · One global launch night. The flagship CoLab Nation cohort where
                  builders get verified, get seen, and get drafted by the best companies.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to="/join">
                    <Button rightIcon={TiLocationArrow} className="px-7 py-3.5">
                      Join the Waitlist
                    </Button>
                  </Link>
                  <Link to="/programs">
                    <Button variant="ghost" className="px-7 py-3.5">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats column */}
              <div className="flex lg:flex-col gap-4 lg:gap-3 flex-wrap lg:shrink-0">
                {[
                  { v: "500", l: "Builder seats" },
                  { v: "12 wks", l: "Duration" },
                  { v: "100+", l: "Demo Day recruiters" },
                  { v: "Aug 2026", l: "Opens" },
                ].map((st) => (
                  <div
                    key={st.l}
                    className="neon-border rounded-2xl bg-white/[0.03] px-5 py-3 text-center min-w-[120px]"
                  >
                    <p className="font-display text-lg sm:text-xl font-black gradient-text">{st.v}</p>
                    <p className="font-display text-[10px] uppercase tracking-widest text-text-dim mt-0.5">{st.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Other coming soon programs */}
          <div className="grid gap-5 sm:grid-cols-3">
            {COMING_SOON_PROGRAMS.slice(1).map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="neon-border group relative overflow-hidden rounded-2xl p-6 hover:shadow-[0_8px_40px_-8px_rgba(139,92,246,0.3)] transition-shadow duration-300"
              >
                <div className={`pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-gradient-to-br ${p.accent} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-2xl">{p.icon}</span>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-display uppercase tracking-widest text-text-dim">
                    <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
                    {p.when}
                  </div>
                </div>
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-neon-pink mb-2">{p.eyebrow}</p>
                <h4 className="font-display text-lg font-black uppercase leading-tight mb-3">{p.title}</h4>
                <p className="text-text-dim text-xs leading-relaxed mb-5">{p.desc}</p>
                <Link to="/join">
                  <Button variant="outline" className="w-full py-2.5 text-xs">
                    Notify me →
                  </Button>
                </Link>
              </motion.div>
            ))}

            {/* Placeholder "More coming" card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="neon-border relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[220px]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <span className="text-4xl mb-4 opacity-40">＋</span>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-text-dim">
                More programs <br />being announced
              </p>
              <Link to="/join" className="mt-5">
                <Button variant="ghost" className="px-5 py-2 text-xs">
                  Stay Updated
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
