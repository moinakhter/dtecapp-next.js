 
import Step from "./Step";
import TextGradientWhite from "@/components/common/text-gradient-white";
import Step5 from "./Step5";

import { useTranslations } from "next-intl";

import MindsBanner from "@/components/HomePage/minds-meet";
import FloatingBalls from "@/components/common/FloatingBalls";
import FadeText from "@/components/common/FadeText";
import { buttonVariants } from "@/components/ui/button";
 
import Animation from "./Animation";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Step3Token from "./Step3Token";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("shopifyTitle"),
    description: t("shopifyDescription"),
  };
}
const Page = () => {
  const t = useTranslations("shopify-assistant");

  const steps = [
    {
      titleKey: "step1",
      detailsKey: "step1Details",
      img: "/images/Shopify2.webp",
    },
    { titleKey: "step2", detailsKey: "step2Details" },
    // { titleKey: "step3", detailsKey: "step3Details" },
    // {
    //   titleKey: "step4",
    //   detailsKey: "step4Details",
    //   img: "/images/Shopify1.webp",
    // },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh]  h-full  w-full">
        <FloatingBalls />
        <div className="container relative z-10 flex items-center justify-center min-h-[684px] !pt-[50px]   h-full ">
          <div className="container flex-col flex justify-center items-center relative  w-full z-10">
            <TextGradientWhite
              text={t("title2")}
              className="mb-4 lg:text-[48px]   font-black text-center mt-[128px]   "
            />
            <FadeText delay={0.2}>
              <p className="font-light mx-auto w-full text-center   lg:text-2xl max-w-[562px]   mb-[58px] lg:mx-0">
                {t("description2")}
              </p>
            </FadeText>
 
            
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-[58px]">
                <Link
                  href="https://apps.shopify.com/dtec-assistant?st_source=autocomplete&surface_detail=autocomplete_apps"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                    
                  })}
                >
                  {t("buttonText")}
                </Link>
                <Link
                  href="/products/shopify-assistant/create"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "w-full md:w-auto",
                  })}
                >
                  {t("create")}
                </Link>
               
            </div>

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
              <Step3Token />
              <Step
                step={`Step 4:`}
                title="step4"
                details={t.raw("step4Details")}
                img="/images/Shopify1.webp"
              />

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
          </div>
        </div>
      </section>
      <MindsBanner />
    </>
  );
};

export default Page;
