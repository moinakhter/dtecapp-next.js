import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { Hero } from "@/components/HomePage/Hero";
import AICallCenter from "@/components/HomePage/AICallCenter";
import Ecosystem from "@/components/HomePage/Ecosystem";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AICallCenter />
      <Ecosystem />
    </>
  );
}
