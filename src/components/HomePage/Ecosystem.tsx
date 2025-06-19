"use client";

import React, { useState, useRef, useEffect } from "react";
import SectionWrapper from "../common/SectionWrapper";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Ecosystem() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
const t = useTranslations("HomePage.Ecosystem");
  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video play failed:", err);
      });
    }
  }, [isPlaying]);

  return (
    <SectionWrapper className="bg-[#F8F8F8] dark:bg-[#171717]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Text Content */}
        <div className="lg:max-w-[400px] w-fill">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
   {t("title")}
          </h2>
          <p className="text-base text-foreground/80 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Right Video */}
        <div className="w-full max-w-[672px] rounded-2xl overflow-hidden relative shadow-md">
          {/* Video */}
          <video
            ref={videoRef}
            src="/videos/ecosystem-video.mp4"
            preload="metadata"
            poster="/images/Ecosystem.png"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
            controls={isPlaying}
          />

          {/* Overlay (poster + play button) */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-opacity-40
                transition-opacity duration-700"
              onClick={handlePlay}
              role="button"
              aria-label="Play video"
               
            >
              <Image src="/images/Ecosystem.png" fill alt="Ecosystem Poster" className="w-full h-full object-cover" />
              <div
                className="bg-white rounded-full p-4 shadow-lg animate-pulse
                  hover:shadow-xl hover:scale-105 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Ecosystem;
