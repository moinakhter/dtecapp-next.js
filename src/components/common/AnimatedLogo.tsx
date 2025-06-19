"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ScrollAnimatedLogo() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.5, 1.8]), {
    stiffness: 40,
    damping: 14,
    mass: 1.5,
  });

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center top-[300px] md:top-[200px]  sm:-top-12  justify-center overflow-visible pointer-events-none"
    >
      {/* Animated rings */}
      <motion.svg
        style={{ scale }}
        className="absolute md:w-[1000px] md:h-[1000px] sm:w-[700px] sm:h-[700px] w-[444px] h-[444px] "
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

      {/* Logo perfectly centered inside rings */}
      <div className="relative w-[320px] h-[320px] sm:w-[544px] sm:h-[544px] lg:w-[744px] lg:h-[744px] md:w-[600px] md:h-[600px] z-10">
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
