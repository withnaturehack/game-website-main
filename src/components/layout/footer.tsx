import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  SOCIAL_LINKS,
  NAV_ITEMS,
} from "@/constants";

const logo = "/img/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-bg-soft/50 relative mt-32 border-t border-white/10">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-pink-500/60 to-transparent" />
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
            <p className="text-text-dim mt-4 max-w-md">
              Powering ideas into reality. A movement where builders become
              heroes, mentors become legends, and rockets actually launch.
            </p>

            <a
              href={CONTACT_EMAIL_HREF}
              className="text-text-dim mt-4 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
            >
              <span className="font-display text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Email
              </span>
              <span className="font-medium">{CONTACT_EMAIL}</span>
            </a>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="hover:text-neon-pink grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-pink-500/60"
                >
                  <s.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-neon-pink text-sm tracking-widest uppercase">
              Navigate
            </h4>
            <ul className="text-text-dim mt-4 space-y-2">
              {NAV_ITEMS.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-neon-violet text-sm tracking-widest uppercase">
              Mission
            </h4>
            <ul className="text-text-dim mt-4 space-y-2">
              <li>Builders Charter</li>
              <li>Mentor Code</li>
              <li>Verification Protocol</li>
              <li>Press Kit</li>
            </ul>
          </div>
        </div>

        <div className="text-text-dim mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} CoLab Nation. All squads reserved.</p>
          <p className="font-display tracking-widest uppercase">
            Build · Verify · Launch
          </p>
        </div>
      </div>
    </footer>
  );
};
