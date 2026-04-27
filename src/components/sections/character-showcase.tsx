import { motion } from "framer-motion";
import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";
import squad from "@/assets/characters/squad.png";
import rocket from "@/assets/characters/rocket.png";
import { SectionHeading } from "@/components/ui/section-heading";

const CHARACTERS = [
  {
    img: builder,
    name: "The Builder",
    role: "Hero / Contributor",
    blurb: "Bold, visionary, never afraid of v0.1. Ships before sleeping.",
    glow: "drop-shadow-[0_0_28px_rgba(255,138,61,0.55)]",
    accent: "from-pink-500 to-orange-400",
  },
  {
    img: mentor,
    name: "The Mentor",
    role: "Guide / Verifier",
    blurb: "Calm, sharp, decade-deep. Signs off only on real work.",
    glow: "drop-shadow-[0_0_28px_rgba(139,92,246,0.55)]",
    accent: "from-violet-500 to-blue-500",
  },
  {
    img: aibot,
    name: "Nova",
    role: "AI Co-pilot",
    blurb: "Floating helper. Whispers tips, spots blockers, ships memes.",
    glow: "drop-shadow-[0_0_28px_rgba(56,240,255,0.55)]",
    accent: "from-cyan-400 to-violet-500",
  },
  {
    img: squad,
    name: "The Creator Squad",
    role: "Your Future Co-founders",
    blurb: "Designer. Dev. Researcher. Storyteller. One mission. One launch.",
    glow: "drop-shadow-[0_0_28px_rgba(255,61,160,0.5)]",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    img: rocket,
    name: "The Rocket",
    role: "Living Symbol",
    blurb: "Every shipped project lights a rocket on the global feed.",
    glow: "drop-shadow-[0_0_28px_rgba(79,183,255,0.55)]",
    accent: "from-blue-400 to-cyan-400",
  },
];

export const CharacterShowcase = () => {
  return (
    <section className="relative py-24">
      <SectionHeading
        eyebrow="The Cast"
        title="Meet the |characters| of CoLab Nation."
        subtitle="Every great universe needs heroes, mentors, and a rocket. Ours has all three — and they show up everywhere."
      />

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {CHARACTERS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className={`group neon-border relative overflow-hidden rounded-2xl p-6 ${
              i === 3 ? "sm:col-span-2 lg:col-span-1" : ""
            } ${i === 4 ? "lg:col-span-1" : ""}`}
          >
            <div
              className={`pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-gradient-to-br ${c.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}
            />

            <div className="relative grid h-56 place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-transparent">
              <img
                src={c.img}
                alt={c.name}
                className={`h-full w-auto max-w-full object-contain ${c.glow} transition-transform duration-500 group-hover:scale-110 float-y`}
                draggable={false}
              />
            </div>

            <div className="mt-5">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-text-dim">
                {c.role}
              </p>
              <h3 className="mt-1 font-display text-2xl font-black">{c.name}</h3>
              <p className="mt-2 text-sm text-text-dim">{c.blurb}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
