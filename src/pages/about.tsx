import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { TIMELINE } from "@/constants";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import squad from "@/assets/characters/squad.png";
import spaceBg from "@/assets/scenes/space-bg.png";
import { StarField } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";

export const About = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 -z-20 opacity-50"
          style={{
            backgroundImage: `url(${spaceBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/70 to-bg" />
        <StarField count={70} />

        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Story Mode"
            title="We started this because |the resume game is broken.|"
            subtitle="CoLab Nation isn't a job board. It's a movement of students, builders, and mentors building proof together — out loud, in public, on real missions."
          />
        </div>
      </section>

      {/* Founders */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[420px] grid place-items-center"
          >
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <div className="relative neon-border overflow-hidden rounded-3xl">
                <img src={builder} alt="" className="h-full w-full object-cover float-y" />
              </div>
              <div className="relative neon-border overflow-hidden rounded-3xl mt-12">
                <img src={mentor} alt="" className="h-full w-full object-cover float-slow" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-xs uppercase tracking-[0.4em] text-neon-pink">
              The Founders
            </p>
            <h3 className="mt-3 font-display text-4xl sm:text-5xl font-black uppercase">
              Builders who refused <span className="gradient-text">to ask for permission.</span>
            </h3>
            <p className="mt-5 text-text-dim text-lg leading-relaxed">
              We were the students sending 200 cold emails. The interns who were
              smarter than the system. The ones who learned 3 stacks on weekends
              and still got told "we need more experience."
            </p>
            <p className="mt-4 text-text-dim text-lg leading-relaxed">
              So we stopped asking. We built a place where{" "}
              <span className="text-white">work speaks for itself</span>, mentors
              vouch with their reputation, and every commit is a ticket to the
              next mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24">
        <SectionHeading eyebrow="The Journey" title="A four-year |takeoff.|" />
        <div className="relative mx-auto mt-16 max-w-4xl px-6">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-pink-500 via-violet-500 to-cyan-400 sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative grid items-start gap-4 sm:grid-cols-2 ${
                  i % 2 === 1 ? "sm:[direction:rtl]" : ""
                }`}
              >
                <span className="absolute left-8 top-2 sm:left-1/2 sm:-translate-x-1/2 z-10 grid size-12 place-items-center rounded-full gradient-bg font-display text-xs font-black text-white pulse-glow">
                  {t.year}
                </span>
                <div className="pl-20 sm:px-10 [direction:ltr]">
                  <h4 className="font-display text-2xl font-black uppercase">
                    {t.title}
                  </h4>
                  <p className="mt-2 text-text-dim">{t.text}</p>
                </div>
                <div className="hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.img
          src={squad}
          alt="Squad"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="float-y mx-auto mt-20 w-full max-w-3xl drop-shadow-[0_0_60px_rgba(255,61,160,0.35)]"
          draggable={false}
        />
      </section>

      <CtaBanner />
    </>
  );
};
