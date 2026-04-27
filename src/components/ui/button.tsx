import type { PropsWithChildren, MouseEvent } from "react";
import type { IconType } from "react-icons";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ButtonProps {
  id?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
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
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-display font-semibold uppercase tracking-wider cursor-pointer overflow-hidden transition-all";

  const variants = {
    primary:
      "text-white pulse-glow",
    ghost:
      "text-white/90 hover:text-white border border-white/15 hover:border-white/30 backdrop-blur-md bg-white/5 hover:bg-white/10",
    outline:
      "text-white border border-pink-500/50 hover:border-pink-500 hover:bg-pink-500/10",
  };

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], className)}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 gradient-bg" aria-hidden />
      )}
      {variant === "primary" && (
        <span
          className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.45)_50%,transparent_70%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          aria-hidden
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {LeftIcon ? <LeftIcon className="text-base" /> : null}
        {children}
        {RightIcon ? <RightIcon className="text-base" /> : null}
      </span>
    </motion.button>
  );
};
