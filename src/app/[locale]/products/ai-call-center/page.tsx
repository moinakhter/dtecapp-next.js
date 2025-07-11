import React from 'react'
import AiPage from './AiCallCenterPage'
import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t('aiCallCenterTitle'),
    description: t('aiCallCenterDescription'),
  }


}
const page = () => {
  return (
   <AiPage/>
  )
}

export default page
