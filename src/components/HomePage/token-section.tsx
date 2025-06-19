"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function TokenSection() {
const t = useTranslations("HomePage.TokenSection");
const features = Object.values(t.raw("features")) as {
  title: string;
  description: string;
}[];


  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="container space-y-20 relative z-10 px-4 pt-16">
        {/* Header */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="md:text-4xl text-2xl lg:text-[56px] font-black mb-8 whitespace-pre-line">
            {t("header")}
          </h2>
          <p className="text-base mb-12 mx-auto">{t("description")}</p>

          <Button
            variant="outline"
            size="lg"
            className="border bg-transparent border-accent hover:text-white transition-all duration-300"
          >
            {t("cta")}
            <span className="rotate-[-45deg] inline-block">→</span>
          </Button>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 container mx-auto place-items-center md:place-items-stretch"
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
          {features.map((feature: {
            title: string;
            description: string;
          }, index: number) => (
            <TokenFeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TokenFeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group max-w-[320px] w-full flex gap-[24px] md:text-start text-center flex-col h-full"
    >
      <div>
        <h3 className="text-xl font-medium mb-2.5 group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base font-light">{description}</p>
      </div>
      <div className="w-full h-[2px] bg-black dark:bg-white group-hover:bg-secondary transition-colors duration-300 mt-auto" />
    </motion.div>
  );
}
