import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  SOCIAL_LINKS,
  NAV_ITEMS,
} from "@/constants";

const logo = "/img/logo.png";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export const Footer = () => {
  return (
    <footer className="bg-bg-soft/40 relative mt-24 border-t border-white/[0.08] sm:mt-32">
      {/* Top glow line */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-pink-500/70 to-transparent" />
      <div className="absolute inset-x-0 -top-6 h-8 bg-gradient-to-b from-transparent to-bg-soft/20 blur-md" />

      {/* Subtle grid */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <motion.div {...fadeUp(0)} className="sm:col-span-2">
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-70" />
                <img
                  src={logo}
                  alt="CoLab Nation"
                  className="relative h-11 w-11 rounded-xl object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold tracking-wide">
                  CoLab{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg,#ff3da0,#ff8a3d,#8b5cf6)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Nation
                  </span>
                </span>
                <span className="font-display text-[9px] tracking-[0.25em] text-white/35 uppercase">
                  Powering Ideas into Reality
                </span>
              </div>
            </Link>

            <p className="text-text-dim mt-4 max-w-sm text-sm leading-relaxed">
              A movement where builders become heroes, mentors become legends,
              and rockets actually launch. Season of Creation 2026 — dropping soon.
            </p>

            <a
              href={CONTACT_EMAIL_HREF}
              className="text-text-dim mt-4 inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
            >
              <span className="font-display text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Email
              </span>
              <span className="font-medium">{CONTACT_EMAIL}</span>
            </a>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-white transition-colors duration-200 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-300"
                >
                  <s.icon className="size-3.5" />
                  <span className="font-display text-[10px] tracking-wider uppercase">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.div {...fadeUp(0.08)}>
            <h4 className="font-display text-neon-pink mb-4 text-xs tracking-[0.35em] uppercase">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((n, i) => (
                <motion.li
                  key={n.to}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.45 }}
                >
                  <Link
                    to={n.to}
                    className="text-text-dim group flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
                  >
                    <span className="size-1 rounded-full bg-pink-500/40 transition-all duration-200 group-hover:bg-pink-400 group-hover:scale-150" />
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Mission */}
          <motion.div {...fadeUp(0.14)}>
            <h4 className="font-display text-neon-violet mb-4 text-xs tracking-[0.35em] uppercase">
              Mission
            </h4>
            <ul className="space-y-2.5">
              {[
                "Builders Charter",
                "Mentor Code",
                "Verification Protocol",
                "Press Kit",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + i * 0.05, duration: 0.45 }}
                >
                  <span className="text-text-dim group flex cursor-default items-center gap-2 text-sm transition-colors duration-200 hover:text-white/70">
                    <span className="size-1 rounded-full bg-violet-500/40 transition-all duration-200 group-hover:bg-violet-400 group-hover:scale-150" />
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Season badge */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-3.5 py-2"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="size-1.5 rounded-full bg-emerald-400"
              />
              <span className="font-display text-[9px] tracking-[0.3em] text-emerald-400 uppercase">
                Season 1 · May 2026
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          {...fadeUp(0.2)}
          className="text-text-dim mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 text-xs sm:flex-row"
        >
          <p>© {new Date().getFullYear()} CoLab Nation. All squads reserved.</p>
          <div className="flex items-center gap-2">
            <span className="font-display tracking-[0.3em] uppercase opacity-50">
              Build · Verify · Launch
            </span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="size-1.5 rounded-full bg-pink-500"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
