import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@assets/45375_1777311860118.png";
import rocket from "@/assets/characters/rocket.png";

const SEEN_KEY = "colab.intro.v2.seen";

interface Props {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const OpeningAnimation = ({ onComplete, forceShow = false }: Props) => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"countdown" | "launch" | "reveal" | "exit">("countdown");
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (forceShow) { setShow(true); return; }
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("nointro")) { onComplete?.(); return; }
      const seen = sessionStorage.getItem(SEEN_KEY);
      if (!seen) { setShow(true); sessionStorage.setItem(SEEN_KEY, "1"); }
      else { onComplete?.(); }
    } catch { setShow(true); }
  }, [forceShow, onComplete]);

  useEffect(() => {
    if (!show) return;

    // Countdown: 3 → 2 → 1
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setCount(2), 900));
    timers.push(setTimeout(() => setCount(1), 1800));
    timers.push(setTimeout(() => { setCount(0); setPhase("launch"); }, 2700));
    timers.push(setTimeout(() => setPhase("reveal"), 3600));
    timers.push(setTimeout(() => setPhase("exit"), 5000));
    timers.push(setTimeout(() => { setShow(false); onComplete?.(); }, 5700));

    return () => timers.forEach(clearTimeout);
  }, [show, onComplete]);

  const skip = () => { setShow(false); onComplete?.(); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] overflow-hidden bg-[#020008] cursor-pointer select-none"
          onClick={skip}
        >
          {/* Deep space gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,61,160,0.12)_0%,rgba(139,92,246,0.08)_40%,transparent_70%)]" />

          {/* Stars */}
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2.5 + 0.5,
                height: Math.random() * 2.5 + 0.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.1,
                animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          ))}

          {/* ── LAUNCH PAD (ground glow) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "launch" ? [0, 1, 0.3] : 0 }}
            transition={{ duration: 0.8, times: [0, 0.2, 1] }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-2 rounded-full bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-sm"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "launch" ? [0, 1, 0] : 0 }}
            transition={{ duration: 1.2, times: [0, 0.15, 1] }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(255,138,61,0.5)_0%,rgba(255,61,160,0.2)_30%,transparent_70%)] pointer-events-none"
          />

          {/* ── ROCKET ── */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
            initial={{ bottom: "-10%", scale: 0.6, opacity: 0 }}
            animate={
              phase === "countdown"
                ? { bottom: "5%", scale: 0.8, opacity: 1 }
                : phase === "launch"
                ? { bottom: "110%", scale: [0.8, 1.1, 0.6], opacity: [1, 1, 0] }
                : { bottom: "110%", opacity: 0 }
            }
            transition={
              phase === "countdown"
                ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                : { duration: 1.4, ease: [0.7, 0, 0.2, 1], times: [0, 0.3, 1] }
            }
          >
            {/* Exhaust flame */}
            {phase === "launch" && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.5, 0.8], opacity: [0, 1, 0.5] }}
                transition={{ duration: 1.2, times: [0, 0.2, 1] }}
                className="absolute left-1/2 -translate-x-1/2 bottom-[-40%] w-16 h-32 origin-top"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,138,61,0.9), rgba(255,61,160,0.5), transparent)",
                  filter: "blur(6px)",
                  borderRadius: "50%",
                }}
              />
            )}
            <img
              src={rocket}
              alt=""
              className="h-[45vh] max-h-[340px] w-auto drop-shadow-[0_0_30px_rgba(255,138,61,0.8)]"
            />
          </motion.div>

          {/* ── COUNTDOWN NUMBERS ── */}
          <AnimatePresence mode="wait">
            {phase === "countdown" && count > 0 && (
              <motion.div
                key={count}
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.6, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
              >
                <span
                  className="font-display font-black text-[18vw] sm:text-[14vw] leading-none tabular-nums"
                  style={{
                    background: "linear-gradient(135deg, #ff3da0, #ff8a3d, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "none",
                    filter: "drop-shadow(0 0 40px rgba(255,61,160,0.5))",
                  }}
                >
                  {count}
                </span>
              </motion.div>
            )}

            {phase === "launch" && (
              <motion.div
                key="launch"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.6, 1.1, 1], opacity: [0, 1, 1] }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5, times: [0, 0.4, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
              >
                <span
                  className="font-display font-black text-[10vw] sm:text-[7vw] leading-none uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(90deg, #ff3da0, #ff8a3d)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 50px rgba(255,138,61,0.8))",
                  }}
                >
                  LAUNCH
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── REVEAL: Logo + Wordmark ── */}
          <AnimatePresence>
            {(phase === "reveal" || phase === "exit") && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none"
              >
                {/* Bloom */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2, 1.5], opacity: [0, 0.5, 0.25] }}
                  transition={{ duration: 0.8 }}
                  className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-br from-pink-500/30 via-violet-500/20 to-blue-500/30 blur-3xl"
                />

                {/* Logo */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 blur-2xl opacity-80" />
                  <img
                    src={logo}
                    alt="CoLab Nation"
                    className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-3xl border border-white/20 object-cover"
                  />
                </motion.div>

                {/* Wordmark */}
                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <p className="font-display text-3xl sm:text-5xl font-black uppercase tracking-[0.12em]">
                    CoLab{" "}
                    <span
                      style={{
                        background: "linear-gradient(90deg,#ff3da0,#ff8a3d,#8b5cf6,#4fb7ff)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Nation
                    </span>
                  </p>
                  <p className="mt-2 font-display text-[11px] sm:text-xs uppercase tracking-[0.45em] text-white/50">
                    Build · Be Verified · Be Hired
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-5 right-6 font-display text-[9px] uppercase tracking-[0.4em] text-white/50"
          >
            Tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
