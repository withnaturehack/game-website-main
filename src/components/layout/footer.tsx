import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SOCIAL_LINKS, NAV_ITEMS } from "@/constants";
import logo from "@assets/45375_1777311860118.png";

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-bg-soft/50">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="CoLab Nation"
                className="h-12 w-12 rounded-full border border-white/15"
              />
              <span className="font-display text-xl font-bold">
                CoLab<span className="gradient-text">Nation</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-text-dim">
              Powering ideas into reality. A movement where builders become
              heroes, mentors become legends, and rockets actually launch.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:border-pink-500/60 hover:text-neon-pink transition-colors"
                >
                  <s.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-neon-pink">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2 text-text-dim">
              {NAV_ITEMS.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-neon-violet">
              Mission
            </h4>
            <ul className="mt-4 space-y-2 text-text-dim">
              <li>Builders Charter</li>
              <li>Mentor Code</li>
              <li>Verification Protocol</li>
              <li>Press Kit</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-text-dim sm:flex-row">
          <p>© {new Date().getFullYear()} CoLab Nation. All squads reserved.</p>
          <p className="font-display tracking-widest uppercase">
            Build · Verify · Launch
          </p>
        </div>
      </div>
    </footer>
  );
};
