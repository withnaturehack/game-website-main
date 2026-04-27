import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@assets/45375_1777311860118.png";
import rocket from "@/assets/characters/rocket.png";
import { StarField } from "@/components/ui/particles";

const SEEN_KEY = "colab.intro.seen";

interface Props {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const OpeningAnimation = ({ onComplete, forceShow = false }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setShow(true);
      return;
    }
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("nointro")) {
        onComplete?.();
        return;
      }
      const seen = sessionStorage.getItem(SEEN_KEY);
      if (!seen) {
        setShow(true);
        sessionStorage.setItem(SEEN_KEY, "1");
      } else {
        onComplete?.();
      }
    } catch {
      setShow(true);
    }
  }, [forceShow, onComplete]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 4400);
    return () => clearTimeout(t);
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-bg"
          onClick={() => {
            setShow(false);
            onComplete?.();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-[#0c0720] to-bg" />
          <StarField count={140} />
          <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-30" />

          {/* Radial bloom */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.6, 1.2], opacity: [0, 0.7, 0.35] }}
            transition={{ duration: 3.4, ease: "easeOut" }}
            className="pointer-events-none absolute h-[680px] w-[680px] rounded-full bg-gradient-to-br from-pink-500/40 via-violet-500/30 to-blue-500/40 blur-3xl"
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -20, filter: "blur(20px)" }}
            animate={{
              scale: [0.4, 1.05, 1],
              opacity: [0, 1, 1, 0],
              rotate: [-20, 0, 0, 0],
              filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(2px)"],
              y: [0, 0, 0, -40],
            }}
            transition={{ duration: 3.2, times: [0, 0.35, 0.7, 1], ease: "easeInOut" }}
            className="relative grid place-items-center"
          >
            <span className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-2xl opacity-70" />
            <img
              src={logo}
              alt="CoLab Nation"
              className="relative h-40 w-40 rounded-3xl border border-white/15 object-cover sm:h-52 sm:w-52"
            />
          </motion.div>

          {/* Wordmark */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay: 0.6, times: [0, 0.25, 0.7, 1] }}
            className="absolute bottom-[24%] flex flex-col items-center gap-2 text-center"
          >
            <p className="font-display text-3xl sm:text-5xl font-black uppercase tracking-widest">
              CoLab <span className="gradient-text">Nation</span>
            </p>
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.4em] text-text-dim">
              Build · Be Verified · Be Hired
            </p>
          </motion.div>

          {/* Rocket launch */}
          <motion.img
            src={rocket}
            alt=""
            initial={{ y: "60vh", scale: 0.5, opacity: 0, rotate: -4 }}
            animate={{
              y: ["60vh", "10vh", "-110vh"],
              scale: [0.5, 1, 0.85],
              opacity: [0, 1, 0.4],
              rotate: [-4, 0, 5],
            }}
            transition={{ duration: 3.2, delay: 1.2, ease: [0.7, 0, 0.3, 1], times: [0, 0.55, 1] }}
            className="pointer-events-none absolute z-10 h-[80vh] w-auto drop-shadow-[0_0_40px_rgba(255,138,61,0.7)]"
          />

          {/* Skip hint */}
          <p className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.4em] text-text-dim font-display">
            Tap to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
