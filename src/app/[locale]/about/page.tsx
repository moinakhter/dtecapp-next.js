import React from 'react'
import { getTranslations } from "next-intl/server";
import AboutPage from './AboutPage';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  }


}
const page = () => {
  return (
   <AboutPage />
  )
}

export default page
