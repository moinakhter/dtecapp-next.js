"use client";

import LogosTicker from "./logos-tricker";
import { useTranslations } from "next-intl";
import CounterCard from "../common/CounterCard";
import FloatingBalls from "../common/FloatingBalls";
import FadeText from "../common/FadeText";

export const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
    <section className="relative md:p-0 p-2 h-full xl:h-full lg:min-h-screen text-center flex items-center flex-col justify-between w-full   bg-background text-foreground">
      <FloatingBalls />

      {/* Main Content */}
      <div className="z-40 flex items-center justify-center flex-col h-full w-full">
        <div className="mt-[250px] mb-[150px]">
          <FadeText>
            <h1
              className="lg:text-8xl md:text-6xl text-4xl font-extrabold leading-tight mb-8 text-center   dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)] 
        text-transparent bg-clip-text bg-[linear-gradient(90deg,_#212121_14%,_#424242_36%,_#616161_52%,_#424242_69%,_#212121_100%)]"
            >
              {t("title")}
            </h1>
          </FadeText>
          <FadeText delay={0.2}>

          <p className="lg:text-xl md:text-lg text-base font-light">
            {t("description")}
          </p>
          </FadeText>

        </div>

        {/* Statistics Cards */}
        <div className="flex max-w-[984px] pb-16 w-full items-center flex-wrap justify-center gap-4">
          {[
            { value: "6", label: t("counter1") },
            { value: "12", label: t("counter2") },
            { value: "600.000", label: t("counter3") },
            { value: "56+", label: t("counter4") },
          ].map((item, i) => (
            <CounterCard
              key={i}
              value={item.value}
              label={item.label}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Logos Row */}
      <LogosTicker />
    </section>
  );
};
