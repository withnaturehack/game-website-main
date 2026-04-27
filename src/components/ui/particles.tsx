import { useMemo } from "react";

interface StarFieldProps {
  count?: number;
  className?: string;
}

export const StarField = ({ count = 80, className = "" }: StarFieldProps) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.4 + 0.4,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 4,
        hue:
          Math.random() > 0.7
            ? "#ff3da0"
            : Math.random() > 0.5
              ? "#8b5cf6"
              : "#ffffff",
      })),
    [count]
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
            boxShadow: `0 0 ${s.size * 3}px ${s.hue}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
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
  const bits = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: 50 + (Math.random() * 30 - 15),
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.2,
        rotation: Math.random() * 360,
        size: 6 + Math.random() * 6,
        color: ["#ff3da0", "#ff8a3d", "#8b5cf6", "#4fb7ff", "#38f0ff"][i % 5],
      })),
    [count]
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
