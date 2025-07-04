import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Celias } from "@/lib/utils";
import Footer from "@/components/Footer";
 
import ReactQueryProvider from "./providers";

 
 


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
              <ReactQueryProvider >

            {children}
              </ReactQueryProvider>
            <Footer />
          </NextIntlClientProvider>
      </ThemeProvider>
        </body>
    </html>
  );
}
