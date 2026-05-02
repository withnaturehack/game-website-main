import { useRef, useState } from "react";
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
    glow: "drop-shadow-[0_0_36px_rgba(255,138,61,0.65)]",
    glowColor: "rgba(255,138,61,0.65)",
    accent: "from-pink-500 to-orange-400",
    badge: "🔥 Ships Fast",
  },
  {
    img: mentor,
    name: "The Mentor",
    role: "Guide / Verifier",
    blurb: "Calm, sharp, decade-deep. Signs off only on real work.",
    glow: "drop-shadow-[0_0_36px_rgba(139,92,246,0.65)]",
    glowColor: "rgba(139,92,246,0.65)",
    accent: "from-violet-500 to-blue-500",
    badge: "✅ Verified",
  },
  {
    img: aibot,
    name: "Nova",
    role: "AI Co-pilot",
    blurb: "Floating helper. Whispers tips, spots blockers, ships memes.",
    glow: "drop-shadow-[0_0_36px_rgba(56,240,255,0.65)]",
    glowColor: "rgba(56,240,255,0.65)",
    accent: "from-cyan-400 to-violet-500",
    badge: "🤖 AI-Powered",
  },
  {
    img: squad,
    name: "The Creator Squad",
    role: "Your Future Co-founders",
    blurb: "Designer. Dev. Researcher. Storyteller. One mission. One launch.",
    glow: "drop-shadow-[0_0_36px_rgba(255,61,160,0.6)]",
    glowColor: "rgba(255,61,160,0.6)",
    accent: "from-fuchsia-500 to-pink-500",
    badge: "👥 Team Play",
  },
  {
    img: rocket,
    name: "The Rocket",
    role: "Living Symbol",
    blurb: "Every shipped project lights a rocket on the global feed.",
    glow: "drop-shadow-[0_0_36px_rgba(79,183,255,0.65)]",
    glowColor: "rgba(79,183,255,0.65)",
    accent: "from-blue-400 to-cyan-400",
    badge: "🚀 Launch Day",
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 10, y: dx * 10, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        transition: tilt.active ? "transform 0.08s ease-out" : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export const CharacterShowcase = () => {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/4 to-transparent" />
      <SectionHeading
        eyebrow="The Cast"
        title="Meet the |characters| of CoLab Nation."
        subtitle="Every great universe needs heroes, mentors, and a rocket. Ours has all three — and they show up everywhere."
      />

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 sm:px-6">
        {CHARACTERS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className={`${i === 3 ? "sm:col-span-2 lg:col-span-1" : ""} ${i === 4 ? "lg:col-span-1" : ""}`}
          >
            <TiltCard className="group neon-border relative h-full cursor-default overflow-hidden rounded-2xl p-5 sm:p-6">
              {/* Background glow */}
              <div
                className={`pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-gradient-to-br ${c.accent} opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35`}
              />

              {/* Shimmer overlay on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)"
                }}
              />

              {/* Character image */}
              <div className="relative grid h-52 place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.06] to-transparent sm:h-60">
                {/* Floating ring decoration */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 40px ${c.glowColor}` }}
                />
                <motion.img
                  src={c.img}
                  alt={c.name}
                  className={`h-full w-auto max-w-full object-contain transition-all duration-500 float-y group-hover:scale-110 ${c.glow}`}
                  style={{ animationDuration: `${4.5 + i * 0.7}s` }}
                  draggable={false}
                />
              </div>

              {/* Info */}
              <div className="mt-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-xs uppercase tracking-[0.28em] text-text-dim">
                    {c.role}
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold text-white/60">
                    {c.badge}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-xl font-black sm:text-2xl">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{c.blurb}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
