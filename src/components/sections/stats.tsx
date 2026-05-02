import { motion } from "framer-motion";

const LAUNCH_STATS = [
  {
    value: "Season 1",
    label: "Founding Cohort",
    sub: "Be part of the origin story",
    accent: "from-pink-500 to-orange-400",
    dot: "bg-pink-500",
    glowColor: "rgba(255,61,160,0.3)",
    icon: "🛡️",
  },
  {
    value: "500",
    label: "Builder Seats",
    sub: "Limited founding member spots",
    accent: "from-violet-500 to-blue-500",
    dot: "bg-violet-400",
    glowColor: "rgba(139,92,246,0.3)",
    icon: "⚡",
  },
  {
    value: "12 Weeks",
    label: "Program Duration",
    sub: "Squad missions + mentor-verified",
    accent: "from-cyan-400 to-violet-500",
    dot: "bg-cyan-400",
    glowColor: "rgba(56,240,255,0.3)",
    icon: "📅",
  },
  {
    value: "May 2026",
    label: "Global Launch",
    sub: "Demo Day · 100+ recruiters",
    accent: "from-orange-400 to-rose-500",
    dot: "bg-orange-400",
    glowColor: "rgba(255,138,61,0.3)",
    icon: "🚀",
  },
];

export const Stats = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/3 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.4em] uppercase sm:text-xs">
            Why Join Now
          </p>
          <h2 className="font-display text-3xl leading-tight font-black uppercase sm:text-4xl">
            We&apos;re just getting{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#ff3da0,#8b5cf6,#4fb7ff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              started.
            </span>
          </h2>
          <p className="text-text-dim mx-auto mt-3 max-w-md text-sm sm:text-base">
            Founding members shape the nation. No fake numbers — this is the real beginning.
          </p>
        </motion.div>

        <div className="neon-border overflow-hidden rounded-3xl bg-white/[0.02]">
          <div className="grid divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0">
            {LAUNCH_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                className="group relative flex flex-col items-center overflow-hidden px-6 py-10 text-center transition-colors duration-300 sm:px-8"
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${s.glowColor}, transparent 70%)` }}
                />

                {/* Icon */}
                <motion.span
                  className="mb-3 text-2xl"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.11 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {s.icon}
                </motion.span>

                {/* Pulse dot */}
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.4, ease: "easeInOut" }}
                  className={`size-2 rounded-full ${s.dot} mb-3`}
                />

                {/* Value */}
                <span
                  className="font-display text-3xl font-black sm:text-4xl"
                  style={{
                    background: "linear-gradient(90deg,#fff 0%,rgba(255,255,255,0.75) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: `drop-shadow(0 0 12px ${s.glowColor})`,
                  }}
                >
                  {s.value}
                </span>

                <span className="font-display mt-2 text-xs tracking-[0.3em] text-white/80 uppercase">
                  {s.label}
                </span>
                <span className="text-text-dim mt-1.5 text-[11px] leading-snug">{s.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
