import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "@/components/ui/button";
import rocket from "@/assets/characters/rocket.png";

export const CtaBanner = () => {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="neon-border relative overflow-hidden rounded-3xl px-7 py-14 sm:px-14 sm:py-20">
          {/* Background layers */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-500/18 via-violet-600/14 to-blue-500/14" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-35" />

          {/* Animated aurora glow */}
          <div className="aurora pointer-events-none absolute inset-0 -z-10 opacity-30 rounded-3xl" />

          {/* Animated glow orbs */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent blur-3xl" />

          {/* Rocket character */}
          <img
            src={rocket}
            alt=""
            aria-hidden
            className="float-slow pointer-events-none absolute -right-8 -bottom-8 hidden h-[105%] opacity-75 sm:block"
          />

          {/* Beam sweep decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <div
              className="beam-sweep absolute top-0 h-full w-32 opacity-20"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animationDuration: "5s",
                animationDelay: "2s",
              }}
            />
          </div>

          <div className="relative max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-2 text-[10px] tracking-[0.4em] text-pink-300 font-display uppercase backdrop-blur-md"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="size-1.5 rounded-full bg-pink-400"
              />
              Founding Season · Limited Seats
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-black uppercase leading-tight sm:text-5xl md:text-6xl"
            >
              The next launch{" "}
              <span className="gradient-text">has your name on it.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-xl text-text-dim text-base sm:text-lg"
            >
              Stop applying. Start building. The squad you&apos;ve been waiting for is
              already in the dock — only the rocket is missing you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3 sm:gap-4"
            >
              <Link to="/join">
                <Button
                  rightIcon={TiLocationArrow}
                  className="shadow-[0_0_50px_rgba(255,61,160,0.45)]"
                >
                  Claim Your Seat
                </Button>
              </Link>
              <Link to="/nation">
                <Button variant="ghost">Tour the Nation</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
