import React from 'react'
import { getTranslations } from "next-intl/server";
 


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t('carTitle'),
    description: t('carDescription'),
  }


}

 import CarAssistantPage from './CarAssistantPage';

const page = () => {
  return (
    <CarAssistantPage />
  )
}

export default page
