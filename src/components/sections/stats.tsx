import { motion } from "framer-motion";

const LAUNCH_STATS = [
  {
    value: "Season 1",
    label: "Founding Cohort",
    sub: "Be part of the origin story",
    accent: "from-pink-500 to-orange-400",
    dot: "bg-pink-500",
  },
  {
    value: "500",
    label: "Builder Seats",
    sub: "Limited founding member spots",
    accent: "from-violet-500 to-blue-500",
    dot: "bg-violet-400",
  },
  {
    value: "12 Weeks",
    label: "Program Duration",
    sub: "Squad missions + mentor-verified",
    accent: "from-cyan-400 to-violet-500",
    dot: "bg-cyan-400",
  },
  {
    value: "Aug 2026",
    label: "Global Launch",
    sub: "Demo Day · 100+ recruiters",
    accent: "from-orange-400 to-rose-500",
    dot: "bg-orange-400",
  },
];

export const Stats = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="font-display text-[10px] sm:text-xs uppercase tracking-[0.4em] text-neon-pink mb-3">
            Why Join Now
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase leading-tight">
            We're just getting{" "}
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
          <p className="mt-3 text-text-dim text-sm sm:text-base max-w-md mx-auto">
            Founding members shape the nation. No fake numbers — this is the real beginning.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="neon-border overflow-hidden rounded-3xl bg-white/[0.02]">
          <div className="grid divide-y divide-white/[0.06] sm:divide-y-0 sm:divide-x sm:grid-cols-2 lg:grid-cols-4">
            {LAUNCH_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center px-8 py-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div
                  className={`pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500`}
                />
                <span className={`size-2 rounded-full ${s.dot} animate-pulse mb-4`} />
                <span
                  className="font-display text-3xl sm:text-4xl font-black"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                >
                  <span
                    style={{
                      background: "linear-gradient(90deg,#fff 0%,rgba(255,255,255,0.7) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {s.value}
                  </span>
                </span>
                <span className="mt-2 font-display text-xs uppercase tracking-[0.3em] text-white/80">
                  {s.label}
                </span>
                <span className="mt-1.5 text-[11px] text-text-dim">{s.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
