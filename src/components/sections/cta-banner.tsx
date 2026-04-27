import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "@/components/ui/button";
import rocket from "@/assets/characters/rocket.png";

export const CtaBanner = () => {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="neon-border relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 sm:py-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-500/15 via-violet-600/15 to-blue-500/15" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
          <img
            src={rocket}
            alt=""
            className="float-y pointer-events-none absolute -right-10 -bottom-10 hidden h-[110%] opacity-80 sm:block"
          />

          <div className="relative max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-tight"
            >
              The next launch <span className="gradient-text">has your name on it.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 max-w-xl text-text-dim text-base sm:text-lg"
            >
              Stop applying. Start building. The squad you've been waiting for is
              already in the dock — only the rocket is missing you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/join">
                <Button rightIcon={TiLocationArrow}>Claim Your Seat</Button>
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
