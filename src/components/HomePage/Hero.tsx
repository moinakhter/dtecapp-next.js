"use client";

import LogosTicker from "./logos-tricker";
import { useTranslations } from "next-intl";
import CounterCard from "../common/CounterCard";
import FloatingBalls from "../common/FloatingBalls";
import FadeText from "../common/FadeText";
import Image from "next/image";
import { Button } from "../ui/button";

export const Hero = () => {
  const t = useTranslations("HomePage.Hero");
  return (
    <section className="relative md:p-0 p-2 h-full xl:h-full lg:min-h-screen text-start flex items-center flex-col justify-between w-full   bg-background text-foreground">
      <FloatingBalls />

      {/* Main Content */}
      <div className="z-10 relative container    flex items-start justify-between md:flex-row flex-col h-full w-full">
        <div className="md:w-1/2 pt-[250px]  md:pb-[150px] flex flex-col items-start justify-center gap-8">
          <FadeText>
            <h1 className="lg:text-6xl  md:text-4xl text-3xl  leading-tight dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)]  text-transparent bg-clip-text bg-[linear-gradient(90deg,_#212121_14%,_#424242_36%,_#616161_52%,_#424242_69%,_#212121_100%)]">
              <span className="block">{t("title1")}</span>
              <span className="block font-bold">{t("title2")}</span>
            </h1>
          </FadeText>
          <FadeText delay={0.2}>
            <p className="lg:text-xl md:text-lg text-sm font-light">
              {t.rich("description", {
                b: (chunks) => <b className="font-bold">{chunks}</b>,
              })}
            </p>
          </FadeText>
          <div className="flex items-center justify-center gap-4">
            <Button size="sm" className="w-[153px]" variant="secondary">
              {t("getDemo")}{" "}
            </Button>
            <Button
              size="sm"
              className="w-[176px] border-secondary"
              variant="outline"
            >
              {t("learnmore")}{" "}
            </Button>
          </div>
          {/* Statistics Cards */}
          <div className="flex  mt-[64px] pb-16 w-full items-center  justify-center gap-4">
            {[
              { value: "6", label: t("counter1") },
              { value: "12", label: t("counter2") },
              { value: "600.000", label: t("counter3") },
              // { value: "56+", label: t("counter4") },
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
        <div className="flex items-center md:pt-[250px]  md:pb-[150px] justify-center w-full md:w-1/2">
          <Image
            src="/images/Hero/two-small-phones.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="w-full md:max-w-[400px] max-w-[300px] mx-auto"
          />
        </div>
      </div>

      {/* Logos Row */}
      <LogosTicker />
    </section>
  );
};
