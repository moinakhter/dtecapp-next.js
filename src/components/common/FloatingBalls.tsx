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
           className="absolute top-[-30%] left-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,#3D7EE2_0%,#E6E6E600_100%)] blur-[120px] opacity-100 z-0 mix-blend-multiply"
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
           className="absolute bottom-50 right-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,#143773_0%,#FFFFFF00_100%)] blur-[100px] opacity-100 z-0 mix-blend-multiply"
         />
   
         <div className="absolute inset-0 z-0 mix-blend-overlay">
           <Image
             src="/images/Backgrounds/bg2.svg"
             alt="background"
             fill
             className="object-cover stroke-primary"
           />
         </div>
         </>
  )
}

export default FloatingBalls
