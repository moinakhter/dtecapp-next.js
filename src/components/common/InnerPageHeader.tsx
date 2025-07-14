import React from "react";
import FloatingBalls from "./FloatingBalls";
import TextGradientWhite from "./text-gradient-white";
import FadeText from "./FadeText";
import Image from "next/image";

const InnerPageHeader = ({
  title,
  desc,
  imageSrc,
}: {
  title: string;
  desc: string;
  imageSrc: string;
}) => {
  return (
    <section className="relative  w-full h-full   min-h-[80vh]">
      <FloatingBalls />

      <div className="container relative z-10 flex items-center justify-center min-h-[684px] !pt-[200px]   h-full ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl md:-mr-20 z-10">
            <TextGradientWhite className="text-5xl md:text-[80px] font-black leading-[110%]">
              <span className="md:block hidden">
                {title.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
              <span className=" md:hidden">{title}</span>
            </TextGradientWhite>
            <FadeText delay={0.2}>
              <p className="text-base font-light">{desc}</p>
            </FadeText>
          </div>

          {/* Right Content - Car Image */}
          <div className="relative z-0">
            <div className="relative rounded-3xl md:p-8 overflow-hidden">
              <Image
                src={imageSrc}
                alt="DTEC Car Assistant"
                width={577}
                height={363}
                className="w-full max-w-[577px] h-auto rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerPageHeader;
