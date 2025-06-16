import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { Hero } from "@/components/HomePage/Hero";
import AICallCenter from "@/components/HomePage/AICallCenter";
import Ecosystem from "@/components/HomePage/Ecosystem";
import DtecAssistants from "@/components/HomePage/dtec-assistants";
import ExtraordinaryExperience from "@/components/HomePage/extraordinary-experience";
import LogosTicker from "@/components/HomePage/logos-tricker";
import MindsBanner from "@/components/HomePage/minds-meet";

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
      <DtecAssistants />
      <ExtraordinaryExperience />
      <LogosTicker />
      <MindsBanner />

    </>
  );
}
