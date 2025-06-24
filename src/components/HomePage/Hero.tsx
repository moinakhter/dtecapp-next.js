"use client";

import LogosTicker from "./logos-tricker";
import { useTranslations } from "next-intl";
import CounterCard from "../common/CounterCard";
import FloatingBalls from "../common/FloatingBalls";

export const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
    <section className="relative md:p-0 p-2 h-full xl:h-full lg:min-h-screen text-center flex items-center flex-col justify-between w-full overflow-hidden bg-background text-foreground">
      <FloatingBalls />

      {/* Main Content */}
      <div className="z-40 flex items-center justify-center flex-col h-full w-full">
        <div className="my-[318px]">
          <h1 className="lg:text-8xl md:text-6xl text-4xl font-extrabold leading-tight mb-8 text-center dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)]">
            {t("title")}
          </h1>

          <p className="lg:text-xl md:text-lg text-base font-light">
            {t("description")}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="flex max-w-[984px] w-full items-center flex-wrap justify-center gap-4">
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
