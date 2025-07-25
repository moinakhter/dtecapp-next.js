"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const HeroImgLight = () => {
    const { theme } = useTheme();
const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering on server
  if (!mounted) return 
   <div className="w-[572.23px] h-96 relative flex items-center justify-center">
      {/* optional: spinner or blurred img here */}
    </div>

  const isDark = theme === "dark";

  return (
    <div className="w-[572.23px] flex items-center justify-center h-96 relative">
      {/* AI Call Image (middle one) */}
      <motion.div
        className="absolute"
        whileHover={{
          scale: 1.1,
          rotate: 3,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Image
          priority

          src={
            isDark
              ? "/images/Hero/dark/AI-Call.png"
              : "/images/Hero/light/AI-Call.png"
          }
          alt="Logo"
          width={288}
          height={288}
          className="object-cover"
        />
      </motion.div>

      {/* Instagram Image */}
      <motion.div
        className="size-96 left-[259.07px] top-[-15px] absolute"
        whileHover={{
          scale: 1.05,
          rotate: 2,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Image
          src={
            isDark
              ? "/images/Hero/dark/Instagram.png"
              : "/images/Hero/light/Instagram.png"
          }
          alt="Logo"
          fill
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* WP Facebook */}
      <motion.div
        className="left-[-100px] top-[-100px] absolute"
        whileHover={{
          scale: 1.05,
          rotate: -2,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Image
          src={
            isDark
              ? "/images/Hero/dark/WP Facebook.png"
              : "/images/Hero/light/WP Facebook.png"
          }
          alt="Logo"
          width={423}
          height={549}
          className="object-cover"
        />
      </motion.div>

      {/* Audio from DTEC */}
      {/* <motion.div
        className="left-[356.23px] top-[315.75px] absolute"
        whileHover={{
          scale: 1.05,
          rotate: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Image
          src={
            isDark
              ? "/images/Hero/dark/Audio.png"
              : "/images/Hero/light/Audio from DTEC.APP.png"
          }
          alt="Logo"
          width={616}
          height={616}
          className="object-cover"
        />
      </motion.div> */}

      {/* DtecAiCall */}
      <motion.div
        className="left-[2.23px] top-[265.75px] absolute"
        whileHover={{
          scale: 1.05,
          rotate: -1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Image
          src={
            isDark
              ? "/images/Hero/dark/DtecAiCall.png"
              : "/images/Hero/light/DtecAiCall.png"
          }
          alt="Hero Image Light"
          quality={100}
          width={318}
          height={80}
          className="w-[318px] h-auto object-cover"
        />
      </motion.div>

      {/* New Gen AI Assistant */}
      <motion.div
        className="left-[311.23px] top-[40.75px] absolute"
        whileHover={{
          scale: 1.05,
          rotate: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Image
          src={
            isDark
              ? "/images/Hero/dark/New Gen AI Assistant.png"
              : "/images/Hero/light/New Gen AI Assistant from Figma.png"
          }
          alt="Hero Image Light"
          width={228}
          height={64}
          className="object-cover"
        />
      </motion.div>

      {/* Security DTEC App */}
      <motion.div
        className="left-[165.02px] top-0 absolute"
        whileHover={{
          scale: 1.05,
          rotate: -1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Image
          src={
            isDark
              ? "/images/Hero/dark/Security.png"
              : "/images/Hero/light/Security DTEC App.png"
          }
          alt="Hero Logo Light"
          width={63}
          height={78}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

export default HeroImgLight;
