"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
 

export default function CarAssistantPage() {
  const [mounted, setMounted] = useState(false);

  const t = useTranslations("car-assistant");

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <SectionWrapper className="relative mt-[90px] overflow-hidden">
        {/* Background Grid Pattern */}

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <TextGradientWhite className="text-3xl md:text-7xl font-bold  ">
                  Yeniden
                  <br />
                  Tanımlanan
                  <br />
                  Sürüş Deneyimi
                </TextGradientWhite>
                <p className="text-base font-light  max-w-xl">
                  Araç Asistanımız, yolculuğunuzu boyunca yanınızda olan akıllı
                  bir yol arkadaşıdır. Sesli komutlarla araçlarınızın tüm
                  fonksiyonlarına erişim sağlayarak güvenliğinizi ve konforunuzu
                  en üst düzeyde çıkarır, dikkatinizi yoldan ayırmayacak şekilde
                  destek sunar.
                </p>
              </div>
            </div>

            {/* Right Content - Car Image */}
            <div className="relative">
              <div className="relative  rounded-3xl p-8 overflow-hidden">
                <Image
                  src="/images/Home/dtec-assistants/car.png"
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
      <SectionWrapper className=" mx-auto">
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
            />
          ))}
          <div className="lg:col-span-3 grid grid-cols-2 place-content-center gap-12">
            {features.slice(6).map((feature, index) => (
              <FeatureCard
                key={6 + index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="mx-auto"
              />
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-4">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <TextGradientWhite text="Dtec GPT" className="mb-8 text-[90px] " />

            <p className="font-light text-base max-w-[562px] mx-auto lg:mx-0">
              {t("dtecgpt")}
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-[512px] h-[512px] rounded-4xl overflow-hidden shadow-lg">
              <Image
                src="/images/Backgrounds/colorful-spiral.svg"
                alt="DtecGPT"
                width={512}
                height={512}
                className="object-cover w-full h-full shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

     <SectionWrapper className="w-full    relative  rounded-3xl ">
    
     
          <Image
            src= "/images/Backgrounds/shape1.svg"
            alt="Minds Meet Background"
            fill
            className="relative   object-cover bg-black  rounded-3xl  overflow-hidden"
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <TextGradientWhite
              text={ t("ComplexQuestionsTitle1")}
              className="md:text-4xl text-2xl lg:text-[64px] font-bold  text-white"
            />
                <TextGradientWhite
              text={ t("ComplexQuestionsTitle2")}
              className="md:text-4xl text-2xl mb-8 lg:text-[64px] font-bold  text-white"
            />
      
       
  
          {t("dtecgptDescription")
            .split("\n")
            .map((line, i) => (
              <p className="font-light text-base text-white mb-3 max-w-[720px]" key={i}>{line}</p>
            ))}
          </div>
     
      </SectionWrapper>
    </div>
  );
}
