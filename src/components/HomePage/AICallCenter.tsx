"use client";
import React from "react";
import SectionWrapper from "../common/SectionWrapper";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

function AICallCenter() {
  const t = useTranslations("HomePage.Dtec AI Call Center");

  const features = [
    {
      icon: "/images/Icons/SmartCall.png",
      title: t("features.f1.title"),
      desc: t("features.f1.description"),
    },
    {
      icon: "/images/Icons/AutonomousCall.png",
      title: t("features.f2.title"),
      desc: t("features.f2.description"),
    },
    {
      icon: "/images/Icons/GlobalSupport.png",
      title: t("features.f3.title"),
      desc: t("features.f3.description"),
    },
    {
      icon: "/images/Icons/AI.png",
      title: t("features.f4.title"),
      desc: t("features.f4.description"),
    },
  ];

  const howItWorks = t.raw("howItWorks.columns");

  return (
    <SectionWrapper>
      <div className="container flex flex-col gap-[24px]">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            {t("title")}
          </h2>
          <p className="text-lg max-w-3xl mx-auto">{t("description")}</p>
        </div>

        <div className="w-full flex flex-col items-center justify-between rounded-3xl border border-border p-[65px]  md:flex-row gap-10 bg-[radial-gradient(98.83%_153.64%_at_94.89%_1.17%,_rgba(20,55,115,0.29)_0%,_rgba(255,255,255,0)_100%)] ">
          <div className="md:w-1/2 w-full relative">
            <div className="max-w-[372px]">
              <h3 className="text-2xl font-semibold mb-4">
                {t("sectionTitle")}
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                {t("sectionDescription")}
              </p>
            </div>
            <Button size="sm" variant="secondary" className="mt-6">
              {t("button")} <span className="rotate-[-45deg] inline-block">→</span>
            </Button>
          </div>

          <motion.div
            className="md:w-1/2 p-2 w-full grid grid-cols-1 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-start gap-4"
              >
                <div className="min-w-[48px] min-h-[48px] p-2 flex items-center justify-center">
                  <Image src={feature.icon} alt={feature.title} width={48} height={48} style={{ filter: "var(--icon-filter)" }} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                  <p className="text-foreground/70 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-10">
          <motion.div className="p-10 bg-card w-[300px] rounded-3xl border border-border shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}>
            <h3 className="text-2xl font-bold mb-4">{t("scalability.title")}</h3>
            <p className="text-base leading-relaxed text-foreground/80">{t("scalability.description")}</p>
          </motion.div>

          <motion.div className="w-[420px] rounded-3xl border border-border shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}>
            <Image src="/images/Photorealistic-Digital-Artwork.png" alt="Agent" width={420} height={300} className="object-cover w-full h-full" />
          </motion.div>

          <div className="p-10 bg-card w-[416px] rounded-3xl border border-border shadow-md">
            <Image src="/images/Icons/security.png" alt="Security" width={88} height={110} className="mb-4" />
            <h3 className="text-2xl font-bold mb-4">{t("security.title")}</h3>
            <p className="text-base leading-relaxed text-foreground/80">{t("security.description")}</p>
          </div>
        </div>

        <motion.div
          className="w-full p-[64px] space-y-[64px] dark:bg-[radial-gradient(97.15%_108.81%_at_50%_139.84%,_#3D7EE2_0%,_#000000_100%)] bg-[radial-gradient(86.63%_97.02%_at_50%_151.62%,_#8FBBFF_0%,_#FFFFFF_100%)]  rounded-3xl border border-border shadow-md"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t("howItWorks.title")}</h2>
              <p className="text-[16px] font-light">{t("howItWorks.subtitle")}</p>
            </div>
            <Image src="/images/Icons/audio.svg" alt="How It Works" width={132} height={48} style={{ filter: "var(--icon-filter)" }} />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-stretch text-sm font-light gap-12 relative">
            {Object.values(howItWorks).map((col, idx) => {
              const column = col as { title: string; points: string[] };
              return (
                <div key={idx} className="flex-1 relative flex flex-col justify-between px-[24px]">
                  <h3 className="text-xl font-bold mb-4">{column.title}</h3>
                  <div className="space-y-4">
                    {column.points.map((line: string, i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-xl leading-[1.4]">•</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  {idx !== 2 && (
                    <div className="hidden md:block absolute top-0 right-[-30px] h-full lg:flex items-center">
                      <Image src="/images/Icons/Separator.png" alt="Separator" width={30} height={200} className="h-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="mb-2 font-normal text-xs">{t("howItWorks.cta.text")}</p>
            <Button size="lg" variant="secondary">
              {t("howItWorks.cta.button")} <span className=" rotate-[-45deg] inline-block">→</span>
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10">
          <motion.div
            className="w-full relative flex items-center justify-center p-10 bg-card rounded-3xl border border-border shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/Backgrounds/bg1.svg"
                alt="background"
                fill
                className="object-cover bg-white dark:bg-[radial-gradient(100.2%_132.81%_at_60.38%_0%,_#121212_48.71%,_#003FA1_100%)]"
              />
            </div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold mb-4">{t("automation.title")}</h3>
              <p className="text-base leading-relaxed text-foreground/80 max-w-lg mx-auto">
                {t("automation.description")}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-[450px] rounded-2xl border border-border shadow-md overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/images/Futuristic-Digital-Artwork.png"
              alt="AI Illustration"
              width={450}
              height={300}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default AICallCenter;
