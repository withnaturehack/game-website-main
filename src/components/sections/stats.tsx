import { motion } from "framer-motion";
import { STATS } from "@/constants";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export const Stats = () => {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="neon-border overflow-hidden rounded-3xl bg-bg-soft/60 p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="font-display text-5xl sm:text-6xl font-black gradient-text">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-2 text-xs uppercase tracking-[0.3em] text-text-dim font-display">
                  {s.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block absolute right-0 top-1/2 h-12 -translate-y-1/2 w-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
