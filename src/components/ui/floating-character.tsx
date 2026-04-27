import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingCharacterProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  hue?: "pink" | "violet" | "cyan";
}

const hueMap = {
  pink: "drop-shadow-[0_0_30px_rgba(255,61,160,0.45)]",
  violet: "drop-shadow-[0_0_30px_rgba(139,92,246,0.45)]",
  cyan: "drop-shadow-[0_0_30px_rgba(56,240,255,0.45)]",
};

export const FloatingCharacter = ({
  src,
  alt,
  className,
  delay = 0,
  hue = "violet",
}: FloatingCharacterProps) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("float-y select-none", hueMap[hue], className)}
      draggable={false}
    />
  );
};
