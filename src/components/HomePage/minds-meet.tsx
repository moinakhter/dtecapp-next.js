"use client";

import Image from "next/image";
import SectionWrapper from "../common/SectionWrapper";
import TextGradientWhite from "../common/text-gradient-white";

export default function MindsBanner() {
  return (
    <SectionWrapper className="w-full py-12  ">
      <div className="container px-4">
        <div className="relative w-full flex items-center justify-center max-w-[1184px] h-[384px] mx-auto">
          {/* Main Banner Card */}
          
            {/* Flowing Blue Lines Background */}

            <Image
              src="/images/Backgrounds/shape.svg"
              alt="Minds Meet Background"
              fill
              className="relative  bg-black h-full rounded-3xl   overflow-hidden"
            />

            {/* Content */}
            <div className="relative z-10 text-center">
                <TextGradientWhite text=" tüm zihinlerin buluştuğu yer" className="md:text-4xl text-2xl lg:text-5xl font-bold  text-white" />
              <h2 >
               
              </h2>
            </div>
          </div>
        </div>
      
    </SectionWrapper>
  );
}
