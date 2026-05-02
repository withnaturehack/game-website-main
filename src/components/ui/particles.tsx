import { useMemo, useEffect, useState } from "react";
import { useMotionBudget } from "@/lib/motion";

interface StarFieldProps {
  count?: number;
  className?: string;
}

export const StarField = ({ count = 80, className = "" }: StarFieldProps) => {
  const { shouldReduceEffects } = useMotionBudget();
  const effectiveCount = shouldReduceEffects
    ? Math.max(20, Math.floor(count * 0.4))
    : count;

  const stars = useMemo(
    () =>
      Array.from({ length: effectiveCount }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.6 + 0.3,
        delay: Math.random() * 5,
        duration: 2.5 + Math.random() * 4,
        hue:
          Math.random() > 0.75
            ? "#ff3da0"
            : Math.random() > 0.55
              ? "#8b5cf6"
              : Math.random() > 0.35
                ? "#38f0ff"
                : "#ffffff",
      })),
    [effectiveCount]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.hue,
            boxShadow: shouldReduceEffects
              ? "none"
              : `0 0 ${s.size * 4}px ${s.hue}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

interface ShootingStarsProps {
  count?: number;
}

export const ShootingStars = ({ count = 4 }: ShootingStarsProps) => {
  const { shouldReduceEffects } = useMotionBudget();
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    if (shouldReduceEffects) return;

    const shoot = () => {
      const id = Date.now();
      setVisible((prev) => [...prev, id]);
      setTimeout(() => {
        setVisible((prev) => prev.filter((v) => v !== id));
      }, 1900);
    };

    const intervals = Array.from({ length: count }).map((_, i) => {
      const base = 3000 + i * 2200;
      const jitter = Math.random() * 4000;
      return setInterval(shoot, base + jitter);
    });

    shoot();

    return () => intervals.forEach(clearInterval);
  }, [count, shouldReduceEffects]);

  if (shouldReduceEffects) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {visible.map((id, i) => (
        <span
          key={id}
          className="shooting-star absolute"
          style={{
            top: `${8 + ((i * 19) % 40)}%`,
            left: `${5 + ((id % 60))}%`,
            width: "120px",
            height: "1.5px",
            background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
            borderRadius: "9999px",
            boxShadow: "0 0 6px 1px rgba(255,255,255,0.5)",
          }}
        />
      ))}
    </div>
  );
};

interface ConfettiBurstProps {
  count?: number;
}
export const ConfettiBurst = ({ count = 24 }: ConfettiBurstProps) => {
  const { shouldReduceEffects } = useMotionBudget();
  const effectiveCount = shouldReduceEffects
    ? Math.max(10, Math.floor(count * 0.55))
    : count;

  const bits = useMemo(
    () =>
      Array.from({ length: effectiveCount }).map((_, i) => ({
        id: i,
        left: 50 + (Math.random() * 30 - 15),
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.2,
        rotation: Math.random() * 360,
        size: 6 + Math.random() * 6,
        color: ["#ff3da0", "#ff8a3d", "#8b5cf6", "#4fb7ff", "#38f0ff"][i % 5],
      })),
    [effectiveCount]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.id}
          className="absolute"
          style={{
            top: "-10%",
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size * 0.4}px`,
            background: b.color,
            transform: `rotate(${b.rotation}deg)`,
            animation: `confetti-fall ${b.duration}s ${b.delay}s ease-in forwards`,
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
};
