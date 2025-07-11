import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Celias } from "@/lib/utils";
import Footer from "@/components/Footer";
import ReactQueryProvider from "./providers";
import Head from "next/head";
import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [
        {
          url: `https://dtec.app/og?title=${encodeURIComponent(t('homeTitle'))}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: 'Dtec Smart Assistant',
        },
      ],
    },
    alternates: {
      languages: {
        en: `https://dtec.app/en`,
        tr: `https://dtec.app/tr`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={Celias.className} suppressHydrationWarning>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      document.addEventListener("DOMContentLoaded", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const shopOrigin = urlParams.get('shop');
        const host = urlParams.get('host');

        if (window.ShopifyAppBridge && shopOrigin && host) {
          const AppBridge = window.ShopifyAppBridge;
          const createApp = AppBridge.default;
          const actions = AppBridge.actions;
          const Redirect = actions.Redirect;

          const app = createApp({
            apiKey: '${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}',
            shopOrigin: shopOrigin,
            host: host,
            forceRedirect: true
          });

          const redirect = Redirect.create(app);
          redirect.dispatch(Redirect.Action.ADMIN_PATH, '/settings/general');
        }
      });
    `,
          }}
        />
      </Head>
      <body
        className="bg-background text-foreground font-normal text-[13px] antialiased w-full h-full flex items-center justify-start flex-col overflow-hidden"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Navbar />
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
