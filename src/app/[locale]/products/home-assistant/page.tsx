import React from 'react'
import HomeAssistantPage from './HomeAssistant'
import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t('homeAssistantTitle'),
    description: t('homeAssistantDescription'),
  }


}
const page = () => {
  return (
   <HomeAssistantPage />
  )
}

export default page
