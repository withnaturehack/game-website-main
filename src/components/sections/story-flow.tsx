import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { STORY_BEATS } from "@/constants";
import problemImg from "@/assets/scenes/problem.png";
import successImg from "@/assets/scenes/success.png";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import squad from "@/assets/characters/squad.png";
import rocket from "@/assets/characters/rocket.png";
import { SectionHeading } from "@/components/ui/section-heading";

const SCENE_IMAGES = [problemImg, squad, mentor, rocket, successImg];

export const StoryFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-32" id="story">
      <SectionHeading
        eyebrow="The Hero's Journey"
        title="Every builder gets their |arc|."
        subtitle="From the lonely first idea to the launch confetti — this is how legends get built inside CoLab Nation."
      />

      <div
        ref={containerRef}
        className="relative mx-auto mt-20 max-w-5xl px-6"
      >
        {/* central rail */}
        <div className="absolute left-6 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
          <motion.div
            style={{ height: railHeight }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-pink-500 via-violet-500 to-cyan-400"
          />
        </div>

        <div className="space-y-24">
          {STORY_BEATS.map((beat, i) => {
            const img = SCENE_IMAGES[i];
            const flip = i % 2 === 1;
            return (
              <motion.div
                key={beat.chapter}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid items-center gap-8 sm:grid-cols-2 ${
                  flip ? "sm:[direction:rtl]" : ""
                }`}
              >
                {/* node */}
                <span
                  className={`absolute left-6 top-6 sm:left-1/2 sm:top-10 sm:-translate-x-1/2 z-10 grid size-12 place-items-center rounded-full bg-gradient-to-br ${beat.accent} font-display text-sm font-black text-white pulse-glow`}
                >
                  {beat.chapter}
                </span>

                <div
                  className={`pl-20 sm:px-10 [direction:ltr] ${
                    flip ? "sm:order-1" : ""
                  }`}
                >
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase">
                    {beat.title}
                  </h3>
                  <p className="mt-3 text-text-dim text-base sm:text-lg leading-relaxed max-w-md">
                    {beat.description}
                  </p>
                </div>

                <div className="pl-20 sm:px-6 [direction:ltr]">
                  <motion.div
                    whileHover={{ rotate: flip ? -2 : 2, scale: 1.02 }}
                    className="neon-border overflow-hidden aspect-[4/3]"
                  >
                    <img
                      src={img}
                      alt={beat.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-bg/70 via-transparent to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final celebration character */}
        <motion.img
          src={builder}
          alt="The Builder triumphant"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="float-y mx-auto mt-16 h-72 w-auto drop-shadow-[0_0_40px_rgba(255,138,61,0.5)]"
          draggable={false}
        />
      </div>
    </section>
  );
};
