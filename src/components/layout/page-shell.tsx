import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const PageShell = ({ children }: PropsWithChildren) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="relative pt-28"
    >
      {children}
    </motion.main>
  );
};
