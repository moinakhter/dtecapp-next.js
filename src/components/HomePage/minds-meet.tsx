"use client";

import Image from "next/image";
import SectionWrapper from "../common/SectionWrapper";
import TextGradientWhite from "../common/text-gradient-white";
import { useTranslations } from "next-intl";

export default function MindsBanner({
  text,
  img,
  children,
}: {
  text?: string;
  img?: string;
  children?: React.ReactNode;
}) {
  const t = useTranslations("HomePage");
  
  return (
    <SectionWrapper className="w-full py-12 hover:drop-shadow-sm  hover:drop-shadow-secondary transition-all duration-100 ease-in-out">
      <div className="container px-4">
        <div className="relative w-full flex items-center justify-center max-w-[1184px] h-[384px] mx-auto">
          <Image
            src={img || "/images/Backgrounds/shape.svg"}
            alt="Minds Meet Background"
            fill
            className="relative  bg-black h-full rounded-3xl   overflow-hidden"
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <TextGradientWhite
              text={text ? text : t("mindsmeet")}
              className="md:text-4xl text-2xl lg:text-5xl font-bold  text-white"
            />
             {children}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
