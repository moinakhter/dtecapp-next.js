"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ScrollAnimatedLogo() {
  const ref = useRef(null);

  // Track scroll progress (from when section enters until logo hits center)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Animate scale of circles from 0.5 to 1.8
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.5, 1.8]), {
    stiffness: 40, // ↓ lower = slower
    damping: 14, // ↓ lower = bouncier (optional)
    mass: 1.5, // ↑ higher = slower momentum
  });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center w-full h-[100vh] overflow-hidden"
    >
      {/* Optional glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,139,255,0.12)_0%,_transparent_70%)] z-0" />

      {/* Animated Rings */}
      <motion.svg
        style={{ scale }}
        className="absolute w-[1000px] h-[1000px] z-0"
        viewBox="0 0 744 744"
        fill="none"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle
            key={i}
            cx="372"
            cy="372"
            r={i * 50}
            stroke="#3A7BD5"
            strokeOpacity={0.25}
            strokeWidth="1"
          />
        ))}
      </motion.svg>

      {/* DTEC Logo */}
      <div className="relative w-[744px] mx-auto w-full h-[744px] z-10">
        <Image
          src="/images/logo/DTEC_WhiteMode.png"
          alt="DTEC Logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
