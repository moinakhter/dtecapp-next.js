import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import localFont from "next/font/local";
import Navbar from "@/components/Layout/Navbar";
import "./globals.css";
const Celias = localFont({
  src: [
    {
      path: "../../../public/Fonts/Celias-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/Fonts/Celias-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../../public/Fonts/Celias-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/Fonts/Celias-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/Fonts/Celias-Hairline.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/Fonts/Celias-HairlineItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/Fonts/Celias-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/Fonts/Celias-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/Fonts/Celias-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/Fonts/Celias-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/Fonts/Celias-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/Fonts/Celias-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/Fonts/Celias-ThinItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/Fonts/Celias.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

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
    <html lang={locale} className={Celias.className}>
      <body
        className="bg-[#EEE] relative font-normal text-[13px]  text-[#212121] dark:text-[#FAFAFA] dark:bg-[#121212] antialiased w-full h-full flex items-center justify-start flex-col"
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
