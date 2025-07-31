import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const host = process.env.NEXT_PUBLIC_SITE_URL || "https://dtec.app"; 

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ href: Parameters<typeof getPathname>[0]["href"] }> = [
    { href: "/" },
    { href: "/about" },
    { href: "/products/car-assistant" },
    { href: "/products/ai-call-center" },
    { href: "/products/home-assistant" },
    { href: "/products/shopping-assistant" },
    { href: "/products/travel-assistant" },

    { href: "/products/shopify-assistant" },
    { href: "/products/shopify-assistant/signin" },
    { href: "/products/shopify-assistant/signup" },


  ];

  const entries = pages.flatMap(({ href }) =>
    routing.locales.map((locale) => ({
      url: host + getPathname({ locale, href }),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((cur) => [
            cur,
            host + getPathname({ locale: cur, href }),
          ])
        ),
      },
    }))
  );

  return entries;
}
