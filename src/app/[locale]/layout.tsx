import type React from "react"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import Navbar from "@/components/Navbar"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Celias } from "@/lib/utils"
import Footer from "@/components/Footer"
import ReactQueryProvider from "./providers"
import { getTranslations } from "next-intl/server"
import ShopifyAppBridgeLoader from "./products/shopify-assistant/loader"
import Head from "next/head"
 
 

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og?title=${encodeURIComponent(t("homeTitle"))}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: "Dtec Smart Assistant",
        },
      ],
    },
    alternates: {
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        tr: `${process.env.NEXT_PUBLIC_SITE_URL}/tr`,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={Celias.className} suppressHydrationWarning>
          <Head>
        <meta name="shopify-api-key" content="9a0b89206045c07c821e340a610" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />
      </Head>
   
      <body
        className="bg-background text-foreground font-normal text-[13px] antialiased w-full h-full flex items-center justify-start flex-col overflow-hidden"
        suppressHydrationWarning
      >
        <ShopifyAppBridgeLoader />
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider>
            <Navbar />
   
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
