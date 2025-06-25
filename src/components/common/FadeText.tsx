"use client";

import { motion } from "framer-motion";

const FadeText = ({ children, className = "", delay = 0 }:{
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeText;
