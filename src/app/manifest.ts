import type { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "Manifest",
  })

  return {
    name: t("name"),
    short_name: t("shortName"),
    description: t("description"),
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#143773",
    orientation: "portrait-primary",
    scope: "/",
    lang: "tr",
    categories: ["productivity", "utilities", "business", "ai", "voice-assistant"],
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
 
      {
        src: "/icons/icon-192x192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: t("shortcuts.carAssistant"),
        short_name: t("shortcuts.carAssistantShort"),
        description: t("shortcuts.carAssistantDesc"),
        url: "/products/car-assistant",
        icons: [{ src: "/icons/car-assistant-96x96.png", sizes: "96x96" }],
      },
      {
        name: t("shortcuts.homeAssistant"),
        short_name: t("shortcuts.homeAssistantShort"),
        description: t("shortcuts.homeAssistantDesc"),
        url: "/products/home-assistant",
        icons: [{ src: "/icons/home-assistant-96x96.png", sizes: "96x96" }],
      },
      {
        name: t("shortcuts.shoppingAssistant"),
        short_name: t("shortcuts.shoppingAssistantShort"),
        description: t("shortcuts.shoppingAssistantDesc"),
        url: "/products/shopping-assistant",
        icons: [{ src: "/icons/shopping-assistant-96x96.png", sizes: "96x96" }],
      },
      {
        name: t("shortcuts.dtecToken"),
        short_name: t("shortcuts.dtecTokenShort"),
        description: t("shortcuts.dtecTokenDesc"),
        url: "/token",
        icons: [{ src: "/icons/token-96x96.png", sizes: "96x96" }],
      },
    ],
    related_applications: [
      {
        platform: "play",
        url: "https://play.google.com/store/apps/details?id=com.dtec.assistant",
        id: "com.dtec.assistant",
      },
      {
        platform: "itunes",
        url: "https://apps.apple.com/app/dtec-assistant/id123456789",
        id: "123456789",
      },
    ],
    prefer_related_applications: false,
  }
}
