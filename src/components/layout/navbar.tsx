import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 sm:px-7",
          scrolled
            ? "mx-4 sm:mx-6 glass border border-white/10 shadow-[0_8px_60px_-15px_rgba(139,92,246,0.45)]"
            : "mx-4 sm:mx-6 bg-transparent"
        )}
      >
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src={logo}
              alt="CoLab Nation"
              className="relative h-10 w-10 rounded-full border border-white/15 object-cover"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-wider hidden sm:inline">
            CoLab<span className="gradient-text">Nation</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative px-4 py-2 text-sm font-display font-semibold uppercase tracking-wider transition-all",
                  isActive
                    ? "text-white"
                    : "text-text-dim hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/15"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/join" className="hidden md:inline-block">
            <Button className="px-5 py-2 text-xs">Join the Squad</Button>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full p-2 border border-white/15 text-white"
            aria-label="Toggle menu"
          >
            {open ? <HiX className="size-5" /> : <HiMenu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-3 glass rounded-2xl border border-white/10 p-4"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-4 py-3 text-sm font-display uppercase tracking-wider",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-text-dim hover:text-white hover:bg-white/5"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/join" className="mt-2">
                <Button className="w-full">Join the Squad</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
