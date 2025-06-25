"use client";

import Image from "next/image";

import TextGradientWhite from "@/components/common/text-gradient-white";
import SectionWrapper from "@/components/common/SectionWrapper";
import LogosTicker from "@/components/HomePage/logos-tricker";
import FeatureCard from "@/components/common/FeatureCard";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import MindsBanner from "@/components/HomePage/minds-meet";

import {
  BillICon,
  MapPinIcon,
  PeopleIcon,
  ShieldIcon,
  ThinPlaneIcon,
} from "@/components/common/Icons";
import FloatingBalls from "@/components/common/FloatingBalls";
import FadeText from "@/components/common/FadeText";

export default function CarAssistantPage() {
  const t = useTranslations("travel-assistant");
 

  const features = [
    {
      title: t("f1Title"),
      description: t("f1Description"),
      icon: ThinPlaneIcon,
    },
    {
      title: t("f2Title"),
      description: t("f2Description"),
      icon: MapPinIcon,
    },
    {
      title: t("f3Title"),
      description: t("f3Description"),
      icon: BillICon,
    },
    {
      title: t("f4Title"),
      description: t("f4Description"),
      icon: ShieldIcon,
    },
    {
      title: t("f5Title"),
      description: t("f5Description"),
      icon: PeopleIcon,
    },
  ];

  return (
    <div className="min-h-screen">
      <FloatingBalls />

      {/* Hero Section */}
      <SectionWrapper className="relative mt-[90px] overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <TextGradientWhite className="text-3xl md:text-7xl font-bold  ">
                  {t("heroTitle")}
                </TextGradientWhite>
                <FadeText delay={0.2}>

                <p className="text-base font-light  max-w-xl">
                  {t("heroDescription")}
                </p>
                </FadeText>
              </div>
            </div>

            {/* Right Content - Car Image */}
            <div className="relative">
              <div className="relative  rounded-3xl p-8 overflow-hidden">
                <Image
                  src="/images/Home/dtec-assistants/women-booking-plane.png"
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
      </SectionWrapper>

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
          {features.slice(0, 3).map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
                              className="max-w-[320px]"

            />
          ))}
          <div className="lg:col-span-3  grid grid-cols-2 place-content-center gap-12">
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

      <MindsBanner   />

      {/* Footer Section */}
    </div>
  );
}
