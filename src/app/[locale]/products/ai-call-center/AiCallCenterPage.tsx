
"use client";

import { useRef } from "react";
import Image from "next/image";

import TextGradientWhite from "@/components/common/text-gradient-white";
import SectionWrapper from "@/components/common/SectionWrapper";
import LogosTicker from "@/components/HomePage/logos-tricker";
import FeatureCard from "@/components/common/FeatureCard";
import {
  ClockIcon,
  LanguageIcon,
  PersonICon,
  PhoneRingIcon,
  PhoneStarsIcon,
  WalletIcon,
} from "@/components/common/Icons";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MindsBanner from "@/components/HomePage/minds-meet";
import FadeText from "@/components/common/FadeText";
import InnerPageHeader from "@/components/common/InnerPageHeader";

export default function AiPage() {
  const t = useTranslations("ai-assistant");

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.5, 0.6]), {
    stiffness: 100,
    damping: 30,
  });

  const features = [
    {
      title: t("f1Title"),
      description: t("f1Description"),
      icon: PhoneRingIcon,
    },
    {
      title: t("f2Title"),
      description: t("f2Description"),
      icon: PhoneStarsIcon,
    },
    {
      title: t("f3Title"),
      description: t("f3Description"),
      icon: ClockIcon,
    },
    {
      title: t("f4Title"),
      description: t("f4Description"),
      icon: WalletIcon,
    },
    {
      title: t("f5Title"),
      description: t("f5Description"),
      icon: PersonICon,
    },
    {
      title: t("f6Title"),
      description: t("f6Description"),
      icon: LanguageIcon,
    },
  ];

  return (
    <>
   <InnerPageHeader
        title={t("heroTitle")}
        desc={t("heroDescription")}
        imageSrc="/images/Photorealistic-Digital-Artwork.png"
      />
  

      <LogosTicker />

      {/* Main Features SectionWrapper */}
      <SectionWrapper className=" relative z-10 mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2  container  lg:grid-cols-3 gap-12 lg:gap-[102px] mx-auto  md:place-items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {features.slice(0, 6).map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="max-w-[320px]"
            />
          ))}
          <div className="lg:col-span-3 grid grid-cols-2 place-content-center gap-12">
            {features.slice(6).map((feature, index) => (
              <FeatureCard
                key={6 + index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="mx-auto max-w-[320px]"
              />
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="relative w-full  flex justify-center items-center  ">
        <div
          ref={ref}
          className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-4"
        >
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <TextGradientWhite text={t("section2Title")} className="mb-8   " />
            <FadeText delay={0.2}>
              {t("section2Description")
                .split("\n")
                .map((line, i) => (
                  <p
                    key={i}
                    className="font-light text-sm md:text-base mb-4 max-w-[562px] mx-auto lg:mx-0"
                  >
                    {line}
                  </p>
                ))}
            </FadeText>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-[512px] relative h-auto aspect-square rounded-4xl overflow-hidden shadow-lg ">
              <Image
                src="/images/Home/dtec-assistants/dtec-voice.png"
                alt="DtecGPT"
                width={512}
                height={512}
                className="object-cover w-full h-full shadow-[0_4px_24px_rgba(0,0,0,0.2)] dark:mix-blend-lighten"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="  relative">
        <motion.div
          style={{ scale }}
          className="absolute -z-0  w-[50vw] h-[50vw] bg-secondary opacity-50 rounded-full blur-[200px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        />
        <SectionWrapper className=" w-[95%] md:max-w-[1184px] lg:mt-0 mt-10 py-10 px-4 lg:p-[92px]  mx-auto z-10 relative rounded-4xl ">
          <Image
            src="/images/Backgrounds/shape4.svg"
            alt="Minds Meet Background"
            fill
            className="relative   object-top object-cover bg-black  rounded-4xl  overflow-hidden"
          />
          <div className="relative flex-col flex gap-8 items-center justify-center z-10 text-center">
            <TextGradientWhite
              text={t("section3Title")}
              className=" lg:text-[64px] mx-auto lg:max-w-5xl font-bold  text-white"
            />
            <FadeText delay={0.2}>
              {t("section3Description")
                .split("\n")
                .map((line, i) => (
                  <p
                    className="font-light md:text-base text-sm text-white mb-3 lg:max-w-4xl"
                    key={i}
                  >
                    {line}
                  </p>
                ))}
            </FadeText>
          </div>
        </SectionWrapper>
      </div>
      <SectionWrapper className="relative w-full bg-transparent md:py-0 py-10 flex justify-center items-center  ">
        <div
          ref={ref}
          className="container   flex flex-col-reverse lg:flex-row justify-between items-center gap-8 px-4"
        >
          <div className="lg:w-1/2 text-center lg:text-left">
            <TextGradientWhite
              text={t("section4Title")}
              className="mb-8   font-black "
            />
            <FadeText delay={0.2}>
              <p className="font-light text-sm md:text-base max-w-[575px] mx-auto lg:mx-0">
                {t("section4Description")}
              </p>
            </FadeText>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/images/Futuristic-Digital-Artwork.png"
              alt="DtecGPT"
              width={577}
              height={387}
              className=" border-2 relative rounded-2xl  shadow-lg"
            />
          </div>
        </div>
      </SectionWrapper>
      <MindsBanner />
    </>
  );
}
