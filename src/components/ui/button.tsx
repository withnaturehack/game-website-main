import type { PropsWithChildren, MouseEvent } from "react";
import type { IconType } from "react-icons";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ButtonProps {
  id?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  className?: string;
  variant?: "primary" | "ghost" | "outline" | "glow";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
}

export const Button = ({
  id,
  children,
  className,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  variant = "primary",
  onClick,
  type = "button",
}: PropsWithChildren<ButtonProps>) => {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-display font-bold uppercase tracking-[0.12em] cursor-pointer overflow-hidden transition-all duration-300 select-none";

  const variants = {
    primary: "text-white shadow-[0_4px_32px_rgba(255,61,160,0.35)] hover:shadow-[0_6px_48px_rgba(255,61,160,0.6)]",
    ghost: "text-white/90 hover:text-white border border-white/20 hover:border-white/40 backdrop-blur-xl bg-white/[0.06] hover:bg-white/[0.10]",
    outline: "text-white border-2 border-pink-500/60 hover:border-pink-400 hover:bg-pink-500/10 shadow-[0_0_0_0_rgba(255,61,160,0)] hover:shadow-[0_0_24px_rgba(255,61,160,0.35)]",
    glow: "text-white border border-violet-400/40 hover:border-violet-400/80 bg-violet-500/10 hover:bg-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]",
  };

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.045, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(base, variants[variant], className)}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full gradient-bg" aria-hidden />
      )}
      {variant === "primary" && (
        <>
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-400 via-orange-300 to-violet-400"
            aria-hidden
          />
          <span
            className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
            aria-hidden
          />
        </>
      )}
      {(variant === "ghost" || variant === "outline" || variant === "glow") && (
        <span
          className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.08)_50%,transparent_70%)] -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"
          aria-hidden
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        {LeftIcon ? <LeftIcon className="text-base shrink-0" /> : null}
        {children}
        {RightIcon ? <RightIcon className="text-base shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" /> : null}
      </span>
    </motion.button>
  );
};
