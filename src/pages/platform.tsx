import { motion } from "framer-motion";
import { POWERS } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import aibot from "@/assets/characters/aibot.png";
import builder from "@/assets/characters/builder.png";
import { CtaBanner } from "@/components/sections/cta-banner";
import { StarField } from "@/components/ui/particles";

export const Platform = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24">
        <StarField count={60} />
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Platform"
            title="Six |powers.| One launchpad."
            subtitle="The CoLab Nation platform isn't features. It's a stack of superpowers that turn quiet ambition into very loud results."
          />
        </div>
      </section>

      <section className="relative py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {POWERS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -10, rotate: -0.5 }}
              className="group neon-border relative overflow-hidden rounded-2xl p-6"
            >
              <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
              <div className="grid size-14 place-items-center rounded-2xl gradient-bg text-2xl font-black shadow-lg pulse-glow">
                {p.icon}
              </div>
              <p className="mt-5 font-display text-xs uppercase tracking-[0.3em] text-neon-pink">
                {p.subtitle}
              </p>
              <h3 className="mt-1 font-display text-2xl font-black">{p.title}</h3>
              <p className="mt-3 text-text-dim">{p.description}</p>

              <div className="mt-5 flex items-center gap-2 text-sm font-display uppercase tracking-wider text-white/80">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo profile card */}
      <section className="relative py-24">
        <SectionHeading
          eyebrow="Profile Preview"
          title="Your contributions become |a public superpower.|"
          subtitle="A tiny preview of how a builder profile looks once you start shipping."
        />

        <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 px-6 lg:grid-cols-[280px,1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-72 lg:h-auto"
          >
            <img
              src={builder}
              alt="Builder profile"
              className="float-y mx-auto h-full max-h-80 w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.5)]"
              draggable={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="neon-border rounded-3xl p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-neon-cyan">
                  @aria.builds
                </p>
                <h3 className="font-display text-3xl font-black">Aria K.</h3>
                <p className="text-text-dim text-sm">Full-stack · CoLab Class of '26</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-display uppercase tracking-widest">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Drafted by 4 teams
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-xs uppercase tracking-widest text-text-dim">XP</p>
                <p className="mt-1 font-display text-3xl font-black gradient-text">14,820</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-xs uppercase tracking-widest text-text-dim">Streak</p>
                <p className="mt-1 font-display text-3xl font-black">📅 64d</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-xs uppercase tracking-widest text-text-dim">Missions</p>
                <p className="mt-1 font-display text-3xl font-black">12</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-display text-xs uppercase tracking-widest text-text-dim mb-3">XP to Mentor Tier</p>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "78%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="h-full gradient-bg"
                />
              </div>
              <p className="mt-2 text-xs text-text-dim">78% · 3,200 XP to Tier 5 · Mentor Apprentice</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-20 flex max-w-3xl flex-col items-center text-center"
        >
          <img src={aibot} alt="Nova" className="float-y h-28 drop-shadow-[0_0_30px_rgba(56,240,255,0.6)]" />
          <p className="mt-6 max-w-md text-text-dim">
            <span className="font-display uppercase tracking-widest text-neon-cyan">
              Nova says:
            </span>{" "}
            "Recruiters spend 6 seconds on resumes. They spend 6 minutes on a
            CoLab profile. That's the only stat that matters."
          </p>
        </motion.div>
      </section>

      <CtaBanner />
    </>
  );
};
