"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CounterCardProps {
  value: string;
  label: string;
  index?: number; // NEW
}

export default function CounterCard({ value, label, index = 0 }: CounterCardProps) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const isPlus = value.includes("+");
    const numericValue = parseInt(value.replace(/[^\d]/g, ""));
    const hasDot = value.includes(".");
    const duration = 1500;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * numericValue);

      const formatted = hasDot
        ? current.toLocaleString("tr-TR")
        : current.toString();

      setDisplayValue(formatted + (isPlus ? "+" : ""));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="
        relative 
        bg-white 
         h-[140px]
        shadow-md 
        w-full
        rounded-xl 
        px-6 py-4 
        dark:bg-[#1A1A1A]
        flex flex-col items-center justify-center
        transition-all duration-[800ms] 
        border border-transparent
        hover:border-[#006BFF]
        before:absolute before:inset-0 before:rounded-xl 
        before:transition-all before:duration-[800ms]
        before:opacity-0 hover:before:opacity-100 
        before:bg-[radial-gradient(100%_132.81%_at_50%_100%,rgba(0,107,255,0.2)_0%,rgba(255,255,255,0)_100%)]
        z-10 overflow-hidden
      "
    >
      <div className="relative z-10 flex flex-col items-center">
        <p className={cn(
          "font-normal",
          value === "600.000" ? "md:text-[40px] text-3xl" : "md:text-[53px] text-4xl"
        )}>
          {displayValue}
        </p>
        <p className="text-sm">{label}</p>
      </div>
    </motion.div>
  );
}
