"use client";
import FeatureCard from "@/components/common/FeatureCard";
import SectionWrapper from "@/components/common/SectionWrapper";
import TextGradientWhite from "@/components/common/text-gradient-white";
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
    },
    {
      name: "Zainab Salah",
      role: "Full Stack Software Engineer",
      image: "/images/dtec-member.png",
      link: "https://www.linkedin.com/in/zainab-salah-6169431b4/",
    },
  ];

  const awards = [
    {
      logo: "/images/Hero/logos/tübitak_logo_beyaz.png",
      title: "TÜBİTAK",
      description:
        '1507 ARGE Programından "7180493" Numaralı "Yapay Zeka Teknolojisine Sahip Hologram Görüntüsüyle Araç İçerisinde Yer Alacak, Yerli Otomobil Ve Tüm Araçlarda Kullanılabilecek Sesli Kontrol Ve Araç Asistanı Sistemi" İsimli Projeyle Destek Almış Ve Başarılı Şekilde Tamamlanmıştır.',
    },
    {
      logo: "/images/Hero/logos/oib.svg",
      title: "OIB",
      description:
        'OIB\'in düzenlediği "Otomotivde geleceğin tasarımı yarışması"nda dereceye girerek ödül almıştır.',
    },
    {
      logo: "/images/Hero/logos/kosgeb_logo_beyaz.png",
      title: "KOSGEB",
      description:
        "Projemiz KOSGEB işbirliği programından Kurul karar no: 2020-56038-30/1 ile destek almıştır ve proje başarılı şekilde tamamlanmıştır.",
    },
    {
      logo: "/images/Hero/logos/togg.svg",
      title: "TOGG",
      description:
        "TOGG’un düzenlediği mobility programında 850 girişim arasından ilk 10’a girmiştir ve TOGG yerli otomobili için geliştirmeler devam etmektedir.",
    },
    {
      logo: "/images/Hero/logos/btm.svg",
      title: "BTM",
      description:
        "2023 BTM Bilgiyi Ticarileştirme Merkezi programına seçilmiştir.",
    },
    {
      logo: "/images/Hero/logos/itu-cekirdek-beyaz.png",
      title: "İTÜ Çekirdek",
      description:
        "Projemiz, İTÜ çekirdek 2021 programına seçilmiş ve BIG BANG sahnesinde ödül almıştır.",
    },
    {
      logo: "/images/Hero/logos/teknofest_logo_beyaz 1.png",
      title: "TEKNOFEST",
      description: "2023 Teknofest yarışmasında finale kalınmıştır.",
    },
  ];

  return (
    <>
      <SectionWrapper>
        <div className="z-40 flex items-center justify-center flex-col h-full w-full">
          <div className="text-center my-[118px] max-w-5xl">
            <TextGradientWhite className="lg:text-8xl md:text-6xl text-4xl font-extrabold leading-tight mb-8 text-center dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)]">
              {t("title")}
            </TextGradientWhite>
            <p className="lg:text-xl md:text-lg text-base font-light  ]">
              {t("description")}
            </p>
          </div>
          <div className="flex container  items-center justify-between  w-full  gap-24   ">
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
      </SectionWrapper>
      <SectionWrapper className="flex container flex-col items-center py-[128px]">
        <TextGradientWhite className="text-center text-4xl font-bold mb-16">
          Dtec Ekibi
        </TextGradientWhite>
        <div className="grid grid-cols-4 gap-16 container ">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col max-w-[240px] w-full items-center text-center"
            >
              <div className="w-48 h-48 relative mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper className="flex container flex-col items-center py-[128px]">
        <h2 className="text-center text-4xl font-bold mb-8">
          Kazandığımız Yarışmalar & Ödüller
        </h2>
        <h3 className="text-center text-lg text-gray-400 mb-16">
          Dtec Araç Asistanı
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-4">
          {awards.map((award, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src={award.logo}
                  alt={award.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">{award.title}</h4>
                <p className="text-sm text-gray-400">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
