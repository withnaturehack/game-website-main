import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const PageShell = ({ children }: PropsWithChildren) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative pt-28"
    >
      {children}
    </motion.main>
  );
};
