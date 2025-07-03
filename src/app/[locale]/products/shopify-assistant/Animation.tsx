"use client";
import { motion } from "framer-motion";
const Animation = ({ children }: { children: React.ReactNode }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-[38px]"
      >
        {children}
      </motion.div>
    </>
  );
};

export default Animation;
