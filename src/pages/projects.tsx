import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { PROJECTS } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBanner } from "@/components/sections/cta-banner";
import { StarField } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
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

export const Projects = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24">
        <StarField count={70} />
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Project Drops"
            title="Real builds. |Real rockets.|"
            subtitle="Every project here was shipped by a CoLab squad — verified by mentors, launched in public."
          />
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -10 }}
              className="neon-border group relative overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG_MAP[p.img] || projAi}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                <div
                  className={`pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-3xl group-hover:opacity-50 transition-opacity`}
                />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-3">
                  <span className="font-display text-xs uppercase tracking-[0.3em] text-text-dim">
                    {p.by}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full bg-gradient-to-r ${p.accent} px-2.5 py-0.5 text-[10px] font-display uppercase tracking-widest`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                  {p.title}
                </h3>
                <p className="mt-3 text-text-dim">{p.blurb}</p>

                <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-text-dim">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Verified launch
                  </div>
                  <Link to="/join">
                    <Button variant="outline" className="px-5 py-2 text-xs">
                      Build like this →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
