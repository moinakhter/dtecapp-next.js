"use client";
import FadeText from "@/components/common/FadeText";
import FeatureCard from "@/components/common/FeatureCard";
import FloatingBalls from "@/components/common/FloatingBalls";
import SectionWrapper from "@/components/common/SectionWrapper";
import TextGradientWhite from "@/components/common/text-gradient-white";
import MindsBanner from "@/components/HomePage/minds-meet";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const teamMembers = [
    {
      name: "Serdar sultanoğlu",
      role: "CEO, Co-Founder",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/serdar-sultanoglu-a98a7355/",
    },
    {
      name: "Mohammad Fares",
      role: "AI team leader",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/mohres/",
    },
    {
      name: "Hanan Abbas",
      role: "AI Software Engineer",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/hanan-abbas/",
    },
    {
      name: "Moin Akhtar",
      role: "Full Stack Software Engineer",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/moinakhtar123/",
    },
    {
      name: "Hasan Alani",
      role: "Software Engineer",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/hasan-alani-sweng/",
    },  {
      name: "Ilham Asgarli",
      role: "Mobil Application Developer",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/ilham-asgarli/?originalSubdomain=tr",
    },
    {
      name: "Zainab Salah",
      role: "Full Stack Web Developer",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/zainab-salah-6169431b4/",
    },
  ];

  const awards1 = [
    {
      logo: "/images/Hero/logos/tübitak_logo_beyaz.png",
      title: t("award1_title"),
      description: t("award1_description"),
    },
    {
      logo: "/images/Hero/logos/kosgeb_logo_beyaz.png",
      title: t("award2_title"),
      description: t("award2_description"),
    },
    {
      logo: "/images/Hero/logos/itu-cekirdek-beyaz.png",
      title: t("award3_title"),
      description: t("award3_description"),
    },
  ];

  const awards2 = [
    {
      logo: "/images/Hero/logos/oib.svg",
      title: t("award4_title"),
      description: t("award4_description"),
    },
    {
      logo: "/images/Hero/logos/togg.svg",
      title: t("award5_title"),
      description: t("award5_description"),
    },
    {
      logo: "/images/Hero/logos/btm.svg",
      title: t("award6_title"),
      description: t("award6_description"),
    },
    {
      logo: "/images/Hero/logos/teknofest_logo_beyaz 1.png",
      title: t("award7_title"),
      description: t("award7_description"),
    },
  ];
  const patents = [
    { text: t("patent1") },
    { text: t("patent2") },
    { text: t("patent3") },
  ];

  return (
    <>
      <section className="relative md:p-0 p-2   lg:min-h-screen w-full  ">
        <FloatingBalls />

        <div className=" md:mt-[0px] mt-[160px] relative z-10 flex items-center min-h-screen justify-center flex-col md:gap-0 gap-24   h-full w-full">
          <div className="text-center m-auto max-w-5xl">
            <TextGradientWhite className="lg:text-8xl md:text-6xl text-4xl font-extrabold leading-tight mb-8 text-center ">
              {t("title")}
            </TextGradientWhite>
            <FadeText delay={0.2}>
              <p className="lg:text-xl md:text-lg text-base font-light">
                {t("description")}
              </p>
            </FadeText>
          </div>
          <div className="flex container  items-center lg:flex-nowrap flex-wrap   justify-between  w-full  gap-24   ">
            <FeatureCard
              title={t("features1title")}
              description={t("features1description")}
            />
            <FeatureCard
              title={t("features2title")}
              description={t("features2description")}
            />
          </div>
        </div>
      </section>

      <SectionWrapper>
        <TextGradientWhite className="text-center    font-black mb-16">
          {t("DetcTeam")}
        </TextGradientWhite>
        <div className=" flex items-center h-full justify-center flex-wrap  gap-16 container ">
          {teamMembers.map((member, index) => (
            <Link
              key={index}
              href={member.link}
              className="flex flex-col max-w-[240px] w-full items-center text-center"
            >
              <div className="w-[240px] h-[280px] relative mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-base font-medium">{member.name}</h3>
              <p className="text-[13px]  font-light">{member.role}</p>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="flex flex-col mt-20 relative  gap-2 md:gap-[64px] items-center justify-center ">
        <TextGradientWhite className="text-center font-black ">
          {t("Awards")}
        </TextGradientWhite>

        <h3 className="text-center text-2xl font-medium  md:mb-16">
          {t("awards1")}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 max-w-7xl mx-auto px-4 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-12">
            {awards1.map((award, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:gap-6"
              >
                {/* Image Container */}
                <div className=" md:w-[128px] w-[200px]   aspect-square relative flex-shrink-0 mx-auto md:mx-0">
                  <Image
                    src={award.logo}
                    alt={award.title}
                    fill
                    className="object-contain lg:object-top object-center invert dark:invert-0"
                  />
                </div>

                {/* Text */}
                <div className="group flex-1 text-center md:text-left">
                  <h4 className="text-xl font-medium md:mb-2 md:block hidden">
                    {award.title}
                  </h4>
                  <p className="text-base font-light md:mt-2.5">
                    {award.description}
                  </p>

                  <div className="relative overflow-hidden mt-6">
                    <div className="w-full h-px bg-border" />
                    <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-12">
            {awards2.map((award, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start gap-6"
              >
                {/* Image Container */}
                <div className="md:w-[128px] w-[200px]    aspect-square relative flex-shrink-0 mx-auto md:mx-0">
                  <Image
                    src={award.logo}
                    alt={award.title}
                    fill
                    className="object-contain  lg:object-top object-center invert dark:invert-0"
                  />
                </div>

                {/* Text */}
                <div className="group flex-1 text-center md:text-left">
                  <h4 className="text-xl font-medium md:mb-2 md:block hidden">
                    {award.title}
                  </h4>
                  <p className="text-base font-light md:mt-2.5">
                    {award.description}
                  </p>

                  <div className="relative overflow-hidden mt-6">
                    <div className="w-full h-px bg-border" />
                    <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-center text-2xl font-medium  mt-16">
          {t("awards2")}
        </h3>
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Image Container */}
          <div className="md:w-[128px] w-[200px]    aspect-square relative flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/images/Hero/logos/tübitak_logo_beyaz.png"
              alt="TÜBİTAK Logo"
              fill
              className="object-contain  lg:object-top object-center invert dark:invert-0"
            />
          </div>

          {/* Text */}
          <div className="group flex-1 text-center md:text-left">
            <h4 className="text-xl font-medium md:mb-2 md:block hidden">
              TÜBİTAK
            </h4>
            <p className="text-base font-light md:mt-2.5">
              {t("tubitakDescription")}
            </p>

            <div className="relative overflow-hidden mt-6">
              <div className="w-full h-px bg-border" />
              <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper className="w-full    flex flex-col items-center">
        <TextGradientWhite className="   font-extrabold mb-16 text-center">
          {t("pointsTitle")}
        </TextGradientWhite>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-12 max-w-7xl w-full items-stretch">
          {patents.map((patent, index) => (
            <div key={index} className="text-center h-full group pb-4">
              <p className="text-base font-light ">{patent.text}</p>
              <div className="relative overflow-hidden mt-6">
                <div className="w-full h-px bg-border" />
                <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
      <MindsBanner />
    </>
  );
}
