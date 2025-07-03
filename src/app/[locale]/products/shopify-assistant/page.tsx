import Image from "next/image";
import Step from "./Step";
import TextGradientWhite from "@/components/common/text-gradient-white";
import Step5 from "./Step5";

import { useTranslations } from "next-intl";

import MindsBanner from "@/components/HomePage/minds-meet";
import FloatingBalls from "@/components/common/FloatingBalls";
import FadeText from "@/components/common/FadeText";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/common/SectionWrapper";
import Animation from "./Animation";

const Page = () => {
  const t = useTranslations("shopify-assistant");

  const steps = [
    {
      titleKey: "step1",
      detailsKey: "step1Details",
      img: "/images/Shopify2.webp",
    },
    { titleKey: "step2", detailsKey: "step2Details" },
    { titleKey: "step3", detailsKey: "step3Details" },
    {
      titleKey: "step4",
      detailsKey: "step4Details",
      img: "/images/Shopify1.webp",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative md:p-0 p-2 xl:h-full w-full">
        <FloatingBalls />
        <div className="container relative z-10">
          <div className="grid md:mt-[250px] mt-[160px] grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 md:text-start text-center">
              <TextGradientWhite className="text-3xl md:text-7xl font-bold">
                {t("title")}
              </TextGradientWhite>
              <FadeText delay={0.2}>
                <p className="text-base font-light max-w-xl">
                  {t.rich("description", {
                    b: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
              </FadeText>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                <Button size="sm" variant="secondary" className="mt-4">
                  {t("buttonText")}
                </Button>
                <Button size="sm" variant="outline" className="mt-4">
                  {t("create")}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl md:p-8 overflow-hidden">
                <Image
                  src="/images/Icons/shopify-light.svg"
                  alt="DTEC Car Assistant"
                  width={577}
                  height={363}
                  className="w-full mx-auto md:max-w-[577px] max-w-[300px] h-auto block dark:hidden rounded-2xl relative z-10"
                  priority
                />
                <Image
                  src="/images/Icons/shopify-dark.svg"
                  alt="DTEC Car Assistant"
                  width={577}
                  height={363}
                  className="w-full mx-auto md:max-w-[577px] max-w-[300px] dark:block hidden h-auto rounded-2xl relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="container flex-col flex justify-center items-center relative mt-10 w-full z-10">
        <TextGradientWhite
          text={t("title2")}
          className="mb-4 lg:text-[48px]   font-black text-center mt-[128px]   "
        />
        <FadeText delay={0.2}>
          <p className="font-light mx-auto w-full text-center   lg:text-2xl max-w-[562px]   mb-[128px] lg:mx-0">
            {t("description2")}
          </p>
        </FadeText>

        <Animation>
          {steps.map((step, index) => (
            <Step
              key={index}
              step={`Step ${index + 1}:`}
              title={t(step.titleKey)}
              details={t.raw(step.detailsKey)}
              img={step.img ? step.img : undefined}
            />
          ))}

          {/* Step 5 */}
          <Step5
            step="Step 5:"
            title={t("step5")}
            details={t.raw("step5Details")}
          />
          <Step5
            step="Step 6:"
            title={t("step6")}
            details={t.raw("step6Details")}
          />

          <Step5
            step="Step 7:"
            title={t("step7")}
            details={t.raw("step7Details")}
          />
        </Animation>
      </SectionWrapper>

      <MindsBanner />
    </>
  );
};

export default Page;
