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
  BillICon,
  MobileIcon,
  RefreshIcon,
  SettingsIcon,
} from "@/components/common/Icons";
import { Lock } from "lucide-react";
import ScrollAnimatedLogo from "@/components/common/AnimatedLogo";
import FloatingBalls from "@/components/common/FloatingBalls";
import FadeText from "@/components/common/FadeText";

export default function CarAssistantPage() {
  const t = useTranslations("home-assistant");

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
      icon: RefreshIcon,
    },
    {
      title: t("f2title"),
      description: t("f2description"),
      icon: BillICon,
    },
    {
      title: t("f3title"),
      description: t("f3description"),
      icon: MobileIcon,
    },
    {
      title: t("f4title"),
      description: t("f4description"),
      icon: Lock,
    },
    {
      title: t("f5title"),
      description: t("f5description"),
      icon: SettingsIcon,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative md:p-0 p-2   lg:min-h-screen w-full  ">
        <FloatingBalls />
        <div className="container relative z-10">
          <div className="grid  md:mt-[250px] mt-[160px] grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-5 items-center">
            <div className="space-y-8  md:text-start text-center">
              <TextGradientWhite className="text-3xl md:text-7xl font-bold   ">
                {t("heroTitle")}
              </TextGradientWhite>
              <FadeText delay={0.2}>
                <p className="text-base font-light  max-w-xl">
                  {t("heroDescription")}
                </p>
              </FadeText>
            </div>

            {/* Right Content - Car Image */}

            <div className="relative  rounded-3xl md:p-8  overflow-hidden">
              <Image
                src="/images/Home/dtec-assistants/smarthome.png"
                alt="DTEC smarthome Assistant"
                width={577}
                height={363}
                className="w-full h-auto rounded-2xl relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <LogosTicker />

      {/* Main Features SectionWrapper */}
      <SectionWrapper className=" relative z-10 mx-auto">
        <motion.div
          className="  container  flex items-center justify-center flex-wrap gap-12 lg:gap-[102px] mx-auto  "
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
          {features.slice(0, 3).map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="max-w-[320px]"
            />
          ))}
          <div className="w-full flex lg:flex-row  flex-wrap flex-col justify-center items-center gap-12">
            {features.slice(3).map((feature, index) => (
              <FeatureCard
                key={5 + index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="mx-auto max-w-[320px]"
              />
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
      <div className="relative md:top-auto top-[250px] w-full h-[600px] md:h-[800px] lg:h-[1000px]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <ScrollAnimatedLogo className="flex-col max-w-5xl px-2 text-center mx-auto">
            <motion.div
              style={{ scale }}
              className="absolute -z-0  w-1/2 h-1/2 bg-secondary  rounded-full blur-[200px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            />

            <TextGradientWhite
              text={t("HomeCallTitle")}
              className="  lg:text-[64px] font-bold mb-8"
            />
            <FadeText delay={0.2}>
              <p className="font-light md:text-base text-sm max-w-3xl">
                {t("HomeCallDescription")}
              </p>
            </FadeText>
          </ScrollAnimatedLogo>
        </div>
      </div>

      <SectionWrapper className="relative w-full bg-transparent   flex justify-center items-center  ">
        <div
          ref={ref}
          className="container   flex flex-col-reverse lg:flex-row justify-between items-center gap-8 px-4"
        >
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <TextGradientWhite
              text={t("se3title")}
              className=" lg:max-w-md font-black "
            />
            <FadeText delay={0.2}>
              <p className="font-light text-sm md:text-base max-w-[575px] mx-auto lg:mx-0">
                {t("se3description")}
              </p>
            </FadeText>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/images/Home/dtec-assistants/home-blue.png"
              alt="DtecGPT"
              width={577}
              height={387}
              className="relative rounded-2xl "
            />
          </div>
        </div>
      </SectionWrapper>
      <MindsBanner />
    </>
  );
}
