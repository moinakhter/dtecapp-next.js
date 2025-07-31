 
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
 

import { Hero } from "@/components/HomePage/Hero";
import AICallCenter from "@/components/HomePage/AICallCenter";
import Ecosystem from "@/components/HomePage/Ecosystem";
import DtecAssistants from "@/components/HomePage/dtec-assistants";
import ExtraordinaryExperience from "@/components/HomePage/extraordinary-experience";
import LogosTicker from "@/components/HomePage/logos-tricker";
import MindsBanner from "@/components/HomePage/minds-meet";

import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;  
}) {
  const { locale } = await params; 

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og?title=${encodeURIComponent(t('homeTitle'))}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: 'Dtec Smart Assistant',
        },
      ],
    },
    alternates: {
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        tr: `${process.env.NEXT_PUBLIC_SITE_URL}/tr`,
      },
    },
  };
}


export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
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
