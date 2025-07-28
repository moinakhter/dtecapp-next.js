import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Celias } from "@/lib/utils";
import Footer from "@/components/Footer";
import ReactQueryProvider from "./providers";
 
import { getTranslations } from "next-intl/server";
import ShopifyRedirector from "@/components/ShopifyRedirector";


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
                <ShopifyRedirector />
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
