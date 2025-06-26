"use client";
import { motion } from "framer-motion";
import TokenSection from "./token-section";

import {
  PersonICon,
  ShareICon,
  MicICon,
  PuzzleICon,
  LoadingIcon,
} from "../common/Icons";
import { SpotlightBg } from "../common/RadialBlueGlow";
import ScrollAnimatedLogo from "../common/AnimatedLogo";
import { useTranslations } from "next-intl";
import Image from "next/image";
import TextGradientWhite from "../common/text-gradient-white";
import FadeText from "../common/FadeText";

export default function ComparisonSection() {
  const t = useTranslations("HomePage.Comparison Section");

  const features = [
    {
      icon: MicICon,
      title: t("features.f1.title"),
      description: t("features.f1.description"),
    },
    {
      icon: ShareICon,
      title: t("features.f2.title"),
      description: t("features.f2.description"),
    },
    {
      icon: PersonICon,
      title: t("features.f3.title"),
      description: t("features.f3.description"),
    },
    {
      icon: PuzzleICon,
      title: t("features.f4.title"),
      description: t("features.f4.description"),
    },
    {
      icon: LoadingIcon,
      title: t("features.f5.title"),
      description: t("features.f5.description"),
    },
  ];

  const limitations = [
    t("limitations.l1"),
    t("limitations.l2"),
    t("limitations.l3"),
    t("limitations.l4"),
    t("limitations.l5"),
  ];

  return (
    <>
      <div className="relative h-full w-full overflow-visible">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <ScrollAnimatedLogo>
            <div className="relative w-[320px] h-[320px] sm:w-[544px] sm:h-[544px] lg:w-[744px] lg:h-[744px] md:w-[600px] md:h-[600px] z-10">
              <Image
                src="/images/logo/DTEC_WhiteMode.png"
                alt="DTEC Logo"
                fill
                className="object-contain"
              />
            </div>
          </ScrollAnimatedLogo>
        </div>
        <section className="relative z-10 w-full py-24">
          <SpotlightBg className="dark:absolute  dark:visible  invisible " />
          {/* Content */}
          <div className="container relative z-10 px-5">
            <div className="text-center md:mb-[96px] mb-10">
              <TextGradientWhite className="dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)]   font-black">
                {t("title")}
              </TextGradientWhite>
              <FadeText delay={0.2}>

              <p className="md:text-2xl text-base font-light ">{t("description")}</p>
              </FadeText>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-center gap-8 mx-auto"
            >
              {/* DTEC Features */}
              <div className="w-full max-w-[552px] group md:w-1/2 px-6 py-10 lg:p-12 dark:bg-[#121212] bg-[#FAFAFA] rounded-2xl border-[#212121]/30 border-2 hover:border-secondary">
                <div className="flex flex-col gap-2.5 mb-8">
                  <div className="flex gap-2">
                    <Image
                      src="/images/logo/logo-light.svg"
                      alt="DTEC Logo"
                      width={120}
                      height={30}
                      quality={100}
                      className="ml-2 w-[120px] h-[29px] dark:invert invert-0 "
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-8 group">
                  {features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      Icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Other Applications */}
              <div className="w-full md:w-1/2 max-w-[552px] px-6 py-10 lg:p-12   dark:bg-[#121212] bg-[#FAFAFA]   border-[#212121]/30 border-2 hover:border-secondary  rounded-2xl">
                <div className="flex flex-col gap-2.5 mb-8">
                  <h3 className="md:text-3xl text-xl font-medium ">
                    {t("otherApplicationsTitle")}
                  </h3>
                </div>

                <div className="flex flex-col gap-8">
                  {limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="">•</span>
                      <p className="lg:text-base text-sm font-light ">{limitation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="lg:h-[1032px] md:h-[1032px] h-[600px]"></div>
      
        <TokenSection />
      </div>
    </>
  );
}

function FeatureItem({
  Icon,
  title,
  description,
  index,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex items-start  gap-4"
    >
      <div className="mt-1">
        <Icon className="w-8 h-8  hover:text-secondary transition-all duration-300" />
      </div>
      <div className="flex-1 flex group flex-col gap-1">
        <h4 className="md:text-base text-sm  hover:text-secondary transition-all duration-300 font-bold">
          {title}
        </h4>
        <p className="md:text-sm text-xs font-light">{description}</p>
      </div>
    </motion.div>
  );
}
