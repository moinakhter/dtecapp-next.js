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

      <SectionWrapper className="relative w-full py-24 px-4 flex justify-center items-center  ">
        <div
          ref={ref}
          className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-4"
        >
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

      <div className=" py-[128px] relative">
        <motion.div
          style={{ scale }}
          className="absolute -z-0  w-[50vw] h-[50vw] bg-secondary opacity-50 rounded-full blur-[200px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        />

        <SectionWrapper className="w-full relative rounded-3xl ">
          <Image
            src="/images/Backgrounds/shape1.svg"
            alt="Minds Meet Background"
            fill
            className="relative   object-cover bg-black  rounded-3xl  overflow-hidden"
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <TextGradientWhite
              text={t("ComplexQuestionsTitle1")}
              className="md:text-4xl text-2xl lg:text-[64px] font-bold  text-white"
            />
            <TextGradientWhite
              text={t("ComplexQuestionsTitle2")}
              className="md:text-4xl text-2xl mb-8 lg:text-[64px] font-bold  text-white"
            />

            {t("dtecgptDescription")
              .split("\n")
              .map((line, i) => (
                <p
                  className="font-light text-base text-white mb-3 max-w-[720px]"
                  key={i}
                >
                  {line}
                </p>
              ))}
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
              text="Güvenli ve Verimli Sürüş Deneyimi"
              className="mb-8 text-[56px] font-black "
            />

            <p className="font-light text-base max-w-[575px] mx-auto lg:mx-0">
              Araç Asistanı, manuel dikkat dağıtıcıları ortadan kaldırarak
              tamamen eller serbest bir kontrol sunar. Kritik uyarıları ve acil
              durum bildirimlerini sesli olarak iletir; çoklu görev yapma
              yeteneği sayesinde rota, iletişim veya eğlence işlemlerinizi
              kesintisiz yönetmenizi sağlar. Böylece hem güvenliğiniz hem de
              yolculuğunuzun verimliliği en üst düzeye çıkar.
            </p>
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
      <MindsBanner  />

      {/* Footer Section */}
    </div>
  );
}
