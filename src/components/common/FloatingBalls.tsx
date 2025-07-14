"use client";
import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";

const FloatingBalls = () => {
    return (
      <>
         <motion.div
           animate={{
             y: [0, 1000, 0],
           }}
           transition={{
             duration: 10,
             repeat: Infinity,
             ease: "easeInOut",
           }}
           className="absolute top-[-30%] left-[-30%] h-[1053px] w-[1053px] rounded-full ball-1 blur-[120px] opacity-100 z-0 "
         />
   
         <motion.div
           animate={{
             y: [0, -800, 0],
           }}
           transition={{
             duration: 10,
             repeat: Infinity,
             ease: "easeInOut",
           }}
           className="absolute bottom-50 right-[-30%] h-[1053px] w-[1053px] rounded-full ball-2 blur-[100px] opacity-100 z-0 "
         />
   
         <div className="absolute inset-0 z-0 mix-blend-overlay">
           <Image
             src="/images/Backgrounds/bg2.svg"
             alt="background"
             fill
             className="object-cover background-repeat "
           />
         </div>
         </>
  )
}

export default FloatingBalls
