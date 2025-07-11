"use client";

import { useRef } from "react";
import Image from "next/image";

import TextGradientWhite from "@/components/common/text-gradient-white";
import SectionWrapper from "@/components/common/SectionWrapper";
import LogosTicker from "@/components/HomePage/logos-tricker";
import FeatureCard from "@/components/common/FeatureCard";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MindsBanner from "@/components/HomePage/minds-meet";
import {
  CartIcon,
  CodeIcon,
  FilterIcon,
  GlobeIcon,
  LanguageIcon,
  PersonICon,
  PlaneIcon,
  ShieldIcon,
  SuitCaseIcon,
  TwoSideArrowIcon,
} from "@/components/common/Icons";
import FloatingBalls from "@/components/common/FloatingBalls";
import FadeText from "@/components/common/FadeText";

export default function ShoppingAssistantPage() {
  const t = useTranslations("shopping-assistant");

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
      title: t("f1title"),
      description: t("f1description"),
      icon: CodeIcon,
    },
    {
      title: t("f2title"),
      description: t("f2description"),
      icon: FilterIcon,
    },
    {
      title: t("f3title"),
      description: t("f3description"),
      icon: TwoSideArrowIcon,
    },
    {
      title: t("f4title"),
      description: t("f4description"),
      icon: ShieldIcon,
    },
    {
      title: t("f5title"),
      description: t("f5description"),
      icon: PersonICon,
    },
    {
      title: t("f6title"),
      description: t("f6description"),
      icon: LanguageIcon,
    },
  ];

  return (
    <>
      <section className="relative md:p-0 p-2   lg:min-h-screen w-full  ">
        <FloatingBalls />

        <div className="container relative z-10">
          <div className="grid  md:mt-[250px] mt-[160px] grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-5 items-center">
            <div className="space-y-8  md:text-start text-center">
              <TextGradientWhite className="text-3xl md:text-7xl font-bold  ">
                {t("heroTitle")}
              </TextGradientWhite>
              <p className="text-base font-light  max-w-xl">
                {t("heroDescription")}
              </p>
            </div>

            {/* Right Content - Car Image */}
            <div className="relative">
              <div className="relative  rounded-3xl md:p-8  overflow-hidden">
                <Image
                  src="/images/Home/dtec-assistants/women-shopping.png"
                  alt="DTEC Car Assistant"
                  width={577}
                  height={363}
                  className="w-full h-auto rounded-2xl relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <SectionWrapper className="relative  w-full  px-4 flex justify-center items-center  ">
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
            src="/images/Backgrounds/shape2.svg"
            alt="Minds Meet Background"
            fill
            className="relative  md:max-w-[1184px]   object-cover bg-black  rounded-4xl  overflow-hidden"
          />

          {/* Content */}
          <div className="relative z-10 text-center flex flex-col items-center justify-center ">
            <TextGradientWhite
              text={t("smartshopping")}
              className="  lg:text-[64px] font-bold mb-8  text-white"
            />

            {t("smartshoppingDescription")
              .split("\n")
              .map((line, i) => (
                <p
                  className="font-light md:text-base  text-sm text-white  max-w-[720px]"
                  key={i}
                >
                  {line}
                </p>
              ))}
            <div className="flex items-center mt-12 justify-center mx-auto gap-8">
              <CartIcon className="w-8 h-8 text-white" />
              <PlaneIcon className="w-8 h-8 text-white" />
              <SuitCaseIcon className="w-8 h-8 text-white" />
              <GlobeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </SectionWrapper>
      </div>
      <SectionWrapper className="relative w-full bg-transparent py-24 px-4 flex justify-center items-center  ">
        <div
          ref={ref}
          className="container   flex flex-col-reverse lg:flex-row justify-between items-center gap-8 px-4"
        >
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <TextGradientWhite
              text={t("se3title")}
              className="mb-8   font-black "
            />

            <p className="font-light w-full text-sm md:text-base max-w-[575px] mx-auto lg:mx-0">
              {t("se3description")}
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/images/Backgrounds/shape3.svg"
              alt="DtecGPT"
              width={577}
              height={387}
              className="  relative rounded-2xl  "
            />
          </div>
        </div>
      </SectionWrapper>
      <MindsBanner />

      {/* Footer Section */}
    </>
  );
}
