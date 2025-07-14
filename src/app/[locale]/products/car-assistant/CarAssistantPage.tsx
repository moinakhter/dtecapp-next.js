"use client";

import { useRef } from "react";
import Image from "next/image";

import TextGradientWhite from "@/components/common/text-gradient-white";
import SectionWrapper from "@/components/common/SectionWrapper";
import LogosTicker from "@/components/HomePage/logos-tricker";
import FeatureCard from "@/components/common/FeatureCard";
import {
  BookMarkIcon,
  ChatIcon,
  EmailIcon,
  LanguageIcon,
  LoadingIcon,
  MicICon,
  ScanFaceIcon,
  VoiceMessageIcon,
} from "@/components/common/Icons";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MindsBanner from "@/components/HomePage/minds-meet";
 
import FadeText from "@/components/common/FadeText";
import InnerPageHeader from "@/components/common/InnerPageHeader";

export default function CarAssistantPage() {
  const t = useTranslations("car-assistant");

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
      icon: ScanFaceIcon,
      title: t("faceRecognitionTitle"),
      description: t("faceRecognitionDescription"),
    },
    {
      icon: LoadingIcon,
      title: t("moodBasedSuggestionsTitle"),
      description: t("moodBasedSuggestionsDescription"),
    },
    {
      icon: MicICon,
      title: t("voiceControlTitle"),
      description: t("voiceControlDescription"),
    },
    {
      icon: EmailIcon,
      title: t("sendEmailTitle"),
      description: t("sendEmailDescription"),
    },
    {
      icon: ChatIcon,
      title: t("chatAndInfoTitle"),
      description: t("chatAndInfoDescription"),
    },
    {
      icon: VoiceMessageIcon,
      title: t("qaResponseTitle"),
      description: t("qaResponseDescription"),
    },
    {
      icon: LanguageIcon,
      title: t("translateTitle"),
      description: t("translateDescription"),
    },
    {
      icon: BookMarkIcon,
      title: t("reminderTitle"),
      description: t("reminderDescription"),
    },
  ];

  return (
    <>
      <InnerPageHeader
        title={t("title")}
        desc={t("description")}
        imageSrc="/images/Home/dtec-assistants/car.png"
      />

      <LogosTicker />
<div className="flex flex-col gap-[150px]">
      <SectionWrapper className="relative z-10 mx-auto">
        <motion.div
          className="   container flex items-center justify-center flex-wrap  gap-12 lg:gap-[102px] mx-auto  "
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
          <div className="flex items-center flex-wrap justify-around w-full gap-12">
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

      <SectionWrapper className="relative z-10 w-full  py-24 px-4 sm:px-8 flex justify-center items-center">
        <div
          ref={ref}
          className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-4"
        >
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <TextGradientWhite
              text="Dtec GPT"
              className="mb-8 lg:text-[90px] text-5xl"
            />
            <FadeText delay={0.2}>
              <p className="font-light text-base max-w-[562px] mx-auto lg:mx-0">
                {t("dtecgpt")}
              </p>
            </FadeText>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-[512px] relative h-auto aspect-square rounded-4xl overflow-hidden shadow-lg ">
              <Image
                src="/images/Backgrounds/colorful-spiral.svg"
                alt="DtecGPT"
                width={512}
                height={512}
                className="object-cover w-full h-full shadow-[0_4px_24px_rgba(0,0,0,0.2)] dark:mix-blend-lighten"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="relative w-full">
        <motion.div
          style={{ scale }}
          className="absolute -z-0  w-[50vw] h-[50vw] bg-secondary opacity-50 rounded-full blur-[200px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        />

        <SectionWrapper className="w-full  lg:max-w-[1184px]  max-w-[95%]  py-6 px-4 md:px-[92px] mx-auto z-10 relative rounded-4xl ">
          <Image
            src="/images/Backgrounds/shape1.svg"
            alt="Minds Meet Background"
            fill
            className="relative  md:max-w-[1184px] object-cover bg-black  rounded-4xl  overflow-hidden"
          />

          {/* Content */}
          <div className="relative z-10 text-center flex flex-col items-center justify-center ">
            <TextGradientWhite
              text={t("ComplexQuestionsTitle1")}
              className="md:text-4xl text-[2rem]   font-bold  text-white"
            />
            <TextGradientWhite
              text={t("ComplexQuestionsTitle2")}
              className="md:text-4xl text-[2rem] mb-8  font-bold  text-white"
            />
            <FadeText delay={0.2}>
              {t("dtecgptDescription")
                .split("\n")
                .map((line, i) => (
                  <p
                    className="font-light md:text-base  text-sm text-white mb-3 max-w-[720px]"
                    key={i}
                  >
                    {line}
                  </p>
                ))}
            </FadeText>
          </div>
        </SectionWrapper>
      </div>
      <SectionWrapper className="relative w-full bg-transparent  py-24 px-4 flex justify-center items-center  ">
        <div
          ref={ref}
          className="container flex flex-col-reverse lg:flex-row justify-between items-center gap-8 px-4"
        >
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <TextGradientWhite
              text={t("SafeExperienceTitle")}
              className="mb-8   font-black "
            />
            <FadeText delay={0.2}>
              <p className="font-light md:text-base text-sm max-w-[575px] mx-auto lg:mx-0">
                {t("SafeExperienceDesc")}
              </p>
            </FadeText>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/images/Home/dtec-assistants/blue-brain-hologram.png"
              alt="DtecGPT"
              width={577}
              height={387}
              className=" border-2 relative rounded-2xl  shadow-lg"
            />
          </div>
        </div>
      </SectionWrapper>
      <MindsBanner />
      </div>
    </>
  );
}
