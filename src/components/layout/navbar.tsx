import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

import { NAV_ITEMS } from "@/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@assets/45375_1777311860118.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-4 sm:mx-6 flex max-w-[1360px] xl:mx-auto items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500",
          scrolled
            ? "bg-[rgba(5,2,15,0.75)] backdrop-blur-2xl border border-white/[0.09] shadow-[0_8px_60px_-8px_rgba(139,92,246,0.35)]"
            : "bg-transparent"
        )}
      >
        {/* ── Logo ── */}
        <Link to="/" className="group flex items-center gap-3 shrink-0">
          <span className="relative">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-md opacity-50 group-hover:opacity-90 transition-opacity duration-300" />
            <img
              src={logo}
              alt="CoLab Nation"
              className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-white/15 object-cover"
            />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-sm sm:text-base font-bold tracking-wider">
              CoLab
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
            <span className="font-display text-[8px] uppercase tracking-[0.25em] text-white/35">
              Powered by Ideas
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative px-3.5 py-2 text-xs font-display font-semibold uppercase tracking-[0.12em] transition-colors duration-200",
                  isActive ? "text-white" : "text-white/50 hover:text-white/90"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl bg-white/[0.08] border border-white/[0.10]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Right side ── */}
        <div className="flex items-center gap-2.5">
          {/* Season badge – desktop */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/[0.08] px-3 py-1.5 text-[10px] font-display uppercase tracking-widest text-pink-300">
            <span className="size-1.5 rounded-full bg-pink-400 animate-pulse" />
            Season 1 · Aug 2026
          </div>

          <Link to="/join" className="hidden md:inline-block">
            <Button className="px-5 py-2.5 text-[11px]">Join the Squad</Button>
          </Link>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-xl p-2.5 border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {open ? <HiX className="size-5" /> : <HiMenu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mx-4 mt-2 overflow-hidden rounded-2xl border border-white/[0.09] bg-[rgba(5,2,15,0.88)] backdrop-blur-2xl"
          >
            {/* Season banner inside mobile menu */}
            <div className="border-b border-white/[0.06] px-5 py-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-pink-400 animate-pulse" />
              <span className="font-display text-[10px] uppercase tracking-[0.3em] text-pink-300">
                Season of Creation 2026 · Coming Soon
              </span>
            </div>

            <div className="flex flex-col gap-1 p-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center rounded-xl px-4 py-3.5 text-sm font-display uppercase tracking-[0.12em] transition-colors duration-150",
                        isActive
                          ? "bg-white/[0.08] text-white border border-white/[0.08]"
                          : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: NAV_ITEMS.length * 0.04 + 0.05 }}
                className="mt-2 px-1"
              >
                <Link to="/join">
                  <Button className="w-full py-3.5">Join the Squad</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
