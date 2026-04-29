import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import logo from "@assets/45375_1777311860118.png";
import rocket from "@/assets/characters/rocket.png";

const SEEN_KEY = "colab.intro.v3.seen";

const COLAB_LETTERS = ["C", "O", "L", "A", "B"];
const NATION_LETTERS = ["N", "A", "T", "I", "O", "N"];

const SPEED_LINE_COUNT = 24;

interface Props {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const OpeningAnimation = ({ onComplete, forceShow = false }: Props) => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<
    "countdown" | "launch" | "flash" | "reveal" | "exit"
  >("countdown");
  const [count, setCount] = useState(3);
  const [shockwaveKey, setShockwaveKey] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (forceShow) {
      setShow(true);
      return;
    }
    try {
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
    const push = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
      return t;
    };

    push(() => {
      setCount(2);
      setShockwaveKey((k) => k + 1);
    }, 300);
    push(() => {
      setCount(1);
      setShockwaveKey((k) => k + 1);
    }, 600);
    push(() => {
      setCount(0);
      setPhase("launch");
      setShockwaveKey((k) => k + 1);
    }, 900);
    push(() => {
      setShowFlash(true);
    }, 1200);
    push(() => {
      setShowFlash(false);
      setPhase("flash");
    }, 1300);
    push(() => {
      setPhase("reveal");
    }, 1400);
    push(() => {
      setPhase("exit");
    }, 2000);
    push(() => {
      setShow(false);
      onComplete?.();
    }, 2400);

    return () => timersRef.current.forEach(clearTimeout);
  }, [show, onComplete]);

  const skip = () => {
    timersRef.current.forEach(clearTimeout);
    setShow(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] cursor-pointer overflow-hidden bg-[#020008] select-none"
          onClick={skip}
        >
          {/* Deep space */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_110%,rgba(255,61,160,0.18)_0%,rgba(139,92,246,0.12)_40%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(79,183,255,0.06)_0%,transparent_60%)]" />

          {/* Stars */}
          {Array.from({ length: 120 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2.8 + 0.4,
                height: Math.random() * 2.8 + 0.4,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.1,
                animation: `twinkle ${2 + Math.random() * 5}s ease-in-out ${Math.random() * 4}s infinite`,
              }}
            />
          ))}

          {/* Grid bg subtle */}
          <div className="grid-bg absolute inset-0 opacity-10" />

          {/* ── WHITE SCREEN FLASH ── */}
          {showFlash && (
            <div className="screen-flash pointer-events-none absolute inset-0 z-50 bg-white" />
          )}

          {/* ── SHOCKWAVE RING (per countdown tick) ── */}
          {phase === "countdown" && count > 0 && (
            <div
              key={shockwaveKey}
              className="shockwave pointer-events-none absolute top-1/2 left-1/2"
              style={{
                width: 240,
                height: 240,
                marginLeft: -120,
                marginTop: -120,
                borderRadius: "50%",
                border: "2.5px solid rgba(255,61,160,0.9)",
                boxShadow: "0 0 40px rgba(255,61,160,0.5)",
              }}
            />
          )}
          {phase === "countdown" && count > 0 && (
            <div
              key={shockwaveKey + 100}
              className="shockwave pointer-events-none absolute top-1/2 left-1/2"
              style={{
                width: 400,
                height: 400,
                marginLeft: -200,
                marginTop: -200,
                borderRadius: "50%",
                border: "1.5px solid rgba(139,92,246,0.5)",
                animationDelay: "0.1s",
                animationDuration: "0.8s",
              }}
            />
          )}

          {/* ── LAUNCH PHASE SPEED LINES ── */}
          {(phase === "launch" || phase === "flash") && (
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
              {Array.from({ length: SPEED_LINE_COUNT }).map((_, i) => {
                const angle = (i / SPEED_LINE_COUNT) * 360;
                const length = 45 + Math.random() * 40;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: `${length}vw`,
                      height: Math.random() * 2 + 0.5,
                      transformOrigin: "left center",
                      transform: `rotate(${angle}deg)`,
                      background: `linear-gradient(to right, ${
                        i % 3 === 0
                          ? "rgba(255,61,160,0.9)"
                          : i % 3 === 1
                            ? "rgba(255,138,61,0.8)"
                            : "rgba(139,92,246,0.7)"
                      }, transparent)`,
                      animation: "speed-line 0.5s ease-out forwards",
                      animationDelay: `${Math.random() * 0.08}s`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* ── LAUNCH GROUND BLOOM ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "launch" ? [0, 1, 0] : 0 }}
            transition={{ duration: 1.0, times: [0, 0.15, 1] }}
            className="pointer-events-none absolute bottom-0 left-1/2 h-[450px] w-[900px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at bottom, rgba(255,138,61,0.7) 0%, rgba(255,61,160,0.3) 30%, transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "launch" ? [0, 1, 0.5] : 0 }}
            transition={{ duration: 0.6, times: [0, 0.2, 1] }}
            className="pointer-events-none absolute bottom-0 left-1/2 h-1.5 w-56 -translate-x-1/2 rounded-full blur-sm"
            style={{
              background:
                "linear-gradient(to right, transparent, #ff8a3d, #fff, #ff3da0, transparent)",
            }}
          />

          {/* ── ROCKET ── */}
          <motion.div
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
            initial={{ bottom: "-15%", scale: 0.5, opacity: 0 }}
            animate={
              phase === "countdown"
                ? { bottom: "4%", scale: 0.85, opacity: 1 }
                : phase === "launch"
                  ? {
                      bottom: ["4%", "12%", "115%"],
                      scale: [0.85, 1.15, 0.5],
                      opacity: [1, 1, 0],
                    }
                  : { bottom: "115%", opacity: 0 }
            }
            transition={
              phase === "countdown"
                ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.9, ease: [0.8, 0, 0.1, 1], times: [0, 0.2, 1] }
            }
          >
            {/* Exhaust */}
            {phase === "launch" && (
              <>
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 2.5, 1.2], opacity: [0, 1, 0.6] }}
                  transition={{ duration: 0.9, times: [0, 0.15, 1] }}
                  className="pointer-events-none absolute bottom-[-50%] left-1/2 origin-top -translate-x-1/2"
                  style={{
                    width: 72,
                    height: 180,
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,138,61,0.8), rgba(255,61,160,0.4), transparent)",
                    filter: "blur(8px)",
                    borderRadius: "50%",
                  }}
                />
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 1.6, 0.9], opacity: [0, 0.8, 0.3] }}
                  transition={{
                    duration: 0.9,
                    delay: 0.04,
                    times: [0, 0.15, 1],
                  }}
                  className="pointer-events-none absolute bottom-[-30%] left-1/2 origin-top -translate-x-1/2"
                  style={{
                    width: 36,
                    height: 100,
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,200,61,0.9), transparent)",
                    filter: "blur(4px)",
                    borderRadius: "50%",
                  }}
                />
              </>
            )}
            <img
              src={rocket}
              alt=""
              className="h-[44vh] max-h-[320px] w-auto"
              style={{
                filter:
                  "drop-shadow(0 0 40px rgba(255,138,61,0.9)) drop-shadow(0 0 80px rgba(255,61,160,0.5))",
              }}
            />
          </motion.div>

          {/* ── COUNTDOWN NUMBERS ── */}
          <AnimatePresence mode="wait">
            {phase === "countdown" && count > 0 && (
              <motion.div
                key={count}
                initial={{ scale: 0.3, opacity: 0, y: -30 }}
                animate={{
                  scale: [0.3, 1.05, 0.98],
                  opacity: 1,
                  y: [-30, 4, 0],
                }}
                exit={{ scale: 1.6, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className="font-impact"
                  style={{
                    fontSize: "clamp(140px, 22vw, 300px)",
                    background:
                      count === 3
                        ? "linear-gradient(135deg, #ff3da0, #ff8a3d)"
                        : count === 2
                          ? "linear-gradient(135deg, #ff8a3d, #8b5cf6)"
                          : "linear-gradient(135deg, #8b5cf6, #4fb7ff)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 0 60px rgba(255,61,160,0.7)) drop-shadow(0 0 120px rgba(139,92,246,0.4))",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {count}
                </span>
              </motion.div>
            )}

            {phase === "launch" && (
              <motion.div
                key="launch-word"
                initial={{ scale: 0.4, opacity: 0, letterSpacing: "-0.1em" }}
                animate={{ scale: [0.4, 1.08, 1], opacity: [0, 1, 1] }}
                exit={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }}
                transition={{ duration: 0.45, times: [0, 0.35, 1] }}
                className="pointer-events-none absolute top-[42%] left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className="font-impact tracking-[0.2em]"
                  style={{
                    fontSize: "clamp(72px, 14vw, 180px)",
                    background:
                      "linear-gradient(90deg, #ffffff, #ff8a3d 40%, #ff3da0 80%, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 0 80px rgba(255,138,61,1)) drop-shadow(0 0 160px rgba(255,61,160,0.7))",
                    display: "block",
                  }}
                >
                  WELCOME
                </span>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-2 h-0.5 w-full origin-left"
                  style={{
                    background:
                      "linear-gradient(to right, #ff3da0, #ff8a3d, #8b5cf6)",
                    filter: "blur(2px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── REVEAL: COLAB NATION + tagline ── */}
          <AnimatePresence>
            {(phase === "reveal" || phase === "exit") && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.06 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5"
              >
                {/* Central bloom */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2.5, 1.8], opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 0.7 }}
                  className="pointer-events-none absolute h-[700px] w-[700px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,138,61,0.2) 0%, rgba(255,61,160,0.15) 30%, rgba(139,92,246,0.1) 60%, transparent 80%)",
                    filter: "blur(20px)",
                  }}
                />

                {/* Logo */}
                <motion.div
                  initial={{ y: 30, scale: 0.7, opacity: 0, rotate: -8 }}
                  animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff3da0, #ff8a3d, #8b5cf6)",
                      filter: "blur(24px)",
                      opacity: 0.9,
                      transform: "scale(1.2)",
                    }}
                  />
                  <img
                    src={logo}
                    alt="CoLab Nation"
                    className="relative rounded-3xl border border-white/25 object-cover"
                    style={{
                      height: "clamp(96px, 14vw, 148px)",
                      width: "clamp(96px, 14vw, 148px)",
                      boxShadow:
                        "0 0 60px rgba(255,61,160,0.6), 0 0 120px rgba(139,92,246,0.4)",
                    }}
                  />
                </motion.div>

                {/* COLAB NATION staggered letters */}
                <div className="flex flex-col items-center gap-1">
                  {/* COLAB */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    {COLAB_LETTERS.map((l, i) => (
                      <motion.span
                        key={l + i}
                        initial={{ y: -80, opacity: 0, scaleY: 1.5 }}
                        animate={{ y: 0, opacity: 1, scaleY: 1 }}
                        transition={{
                          delay: 0.22 + i * 0.06,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-impact text-white"
                        style={{
                          fontSize: "clamp(48px, 10vw, 120px)",
                          lineHeight: 1,
                          textShadow: "0 0 20px rgba(255,255,255,0.3)",
                        }}
                      >
                        {l}
                      </motion.span>
                    ))}
                  </div>
                  {/* NATION in gradient */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    {NATION_LETTERS.map((l, i) => (
                      <motion.span
                        key={l + i}
                        initial={{ y: 80, opacity: 0, scaleY: 1.5 }}
                        animate={{ y: 0, opacity: 1, scaleY: 1 }}
                        transition={{
                          delay: 0.3 + i * 0.06,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-impact"
                        style={{
                          fontSize: "clamp(48px, 10vw, 120px)",
                          lineHeight: 1,
                          background: `linear-gradient(90deg, hsl(${(i / NATION_LETTERS.length) * 60 + 320}deg 100% 60%), hsl(${(i / NATION_LETTERS.length) * 80 + 260}deg 90% 70%))`,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                          filter: "drop-shadow(0 0 20px rgba(255,61,160,0.8))",
                        }}
                      >
                        {l}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Divider shimmer line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-px w-64 sm:w-96"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #ff3da0, #8b5cf6, #4fb7ff, transparent)",
                  }}
                />

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 12, letterSpacing: "0.05em" }}
                  animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
                  transition={{
                    delay: 0.82,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-center"
                  style={{
                    fontSize: "clamp(9px, 1.5vw, 13px)",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Where Builders Become Legends
                </motion.p>

                {/* Sub-tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="font-display text-center"
                  style={{
                    fontSize: "clamp(7px, 1.1vw, 10px)",
                    letterSpacing: "0.55em",
                    textTransform: "uppercase",
                    color: "rgba(255,61,160,0.7)",
                  }}
                >
                  Season of Creation 2026 · Coming Soon
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.6 }}
            className="font-display absolute right-6 bottom-5 text-[9px] tracking-[0.4em] text-white/50 uppercase"
          >
            Tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
