import React from "react";
import TravelAssistantPage from "./TravelAssistantPage";
import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t('travelTitle'),
    description: t('travelDescription'),
  }


}
const page = () => {
  return <TravelAssistantPage />;
};

export default page;
