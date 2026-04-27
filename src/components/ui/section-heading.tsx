import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
}: PropsWithChildren<SectionHeadingProps>) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs uppercase tracking-[0.4em] text-neon-pink"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]"
      >
        {title.split("|").map((part, i) =>
          i === 1 ? (
            <span key={i} className="gradient-text">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-2xl text-base sm:text-lg text-text-dim"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
