import React from "react";
import ShoppingAssistantPage from "./ShoppingAssistant";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("shoppingTitle"),
    description: t("shoppingDescription"),
  };
}
const page = () => {
  return <ShoppingAssistantPage />;
};

export default page;
