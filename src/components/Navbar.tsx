"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, HomeIcon, X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import LocaleSwitcher from "./common/LocaleSwitcher";
import DownloadButton from "./common/DownloadeLink";
import { useTranslations } from "next-intl";
import DtecTokenCard from "./common/DtecTokenCard";
import { CarIcon, CartIcon, MicICon, ThinPlaneIcon } from "./common/Icons";
import { usePathname } from "@/i18n/navigation";

const productItems = [
  {
    icon: CarIcon,
    title: "Araç Asistanı",
    href: "/products/car-assistant",
    key: "carAssistant",
  },
  {
    icon: CartIcon,
    title: "Alışveriş Asistanı",
    href: "/products/shopping-assistant",
    key: "shoppingAssistant",
  },
  {
    icon: HomeIcon,
    title: "Akıllı Ev Asistanı",
    href: "/products/home-assistant",
    key: "homeAssistant",
  },
  {
    icon: MicICon,
    title: "AI Call Center",
    href: "/products/ai-call-center",
    key: "aiCallCenter",
  },
  {
    icon: ThinPlaneIcon,
    title: "Seyahat Asistanı",
    href: "/products/travel-assistant",
    key: "travelAssistant",
  },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const t = useTranslations("Navbar");
  const pathname = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const closeAllMenus = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="fixed top-8 left-0 right-0 z-50   bg-white/10 container md:mx-auto border-[#808080]/15 border-[1px] backdrop-blur-[32px] rounded-2xl transition-all duration-300">
      <div className="mx-auto md:px-8 py-4 flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeAllMenus} className="flex items-center">
          <Image
            src="/images/logo/logo-light.svg"
            alt="DTEC Logo"
            width={40}
            height={40}
            quality={100}
            className="ml-2 w-[99px] h-[24px] dark:invert invert-0"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center space-x-1 hover:text-primary transition-colors group"
            >
              <span>{t("products")}</span>
            </button>
            {productsOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[455px] bg-transparent z-20 drop-shadow-[0_0_5px_#3D7EE2]">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#16191A] rotate-45 z-20" />
                <div className="flex justify-between items-end gap-8 w-full p-6 rounded-2xl relative transition-all duration-300 bg-gradient-to-br from-[#1C1F22] to-[#121212] hover:bg-[radial-gradient(100%_100%_at_0%_100%,rgba(61,126,226,0.2)_0%,#16191A_30%,#16191A_100%),radial-gradient(60%_60%_at_50%_100%,rgba(61,126,226,0.15)_0%,#16191A_20%,#16191A_100%)]">
                  <div>
                    <div className="text-[10px] font-medium text-[#FAFAFA] pb-6">
                      Ürünlerimiz
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {productItems.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={closeAllMenus}
                          className={`flex items-center text-[13px] gap-3 group rounded-lg transition-colors
    ${pathname === item.href ? "text-secondary" : "text-white"}
  `}
                        >
                          <item.icon
                            className={`h-5 w-5 ${
                              pathname === item.href
                                ? "text-secondary"
                                : "text-white"
                            } group-hover:text-secondary`}
                          />
                          <span
                            className={`${
                              pathname === item.href
                                ? "text-secondary"
                                : "text-white"
                            } group-hover:text-secondary`}
                          >
                            {item.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <DtecTokenCard
                    text="text-xs"
                    className="w-[172px] h-[120px]"
                  />
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            onClick={closeAllMenus}
            className="hover:text-primary transition-colors"
          >
            {t("about")}
          </Link>

          <a
            href="https://dtec.space"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeAllMenus}
            className="hover:text-primary transition-colors"
          >
            <span>Dtec Token</span>
            <span className="rotate-[-45deg] inline-block">→</span>
          </a>
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center space-x-6">
          <LocaleSwitcher />
          <button
            onClick={toggleTheme}
            className="cursor-pointer hover:text-accent transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <DownloadButton title={t("Download")} />
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col justify-center items-center space-y-4 px-6 pb-6">
          <button
            onClick={() => setProductsOpen(!productsOpen)}
            className="text-left hover:text-primary"
          >
            {t("products")}
          </button>
          {productsOpen && (
            <div className="pl-4 flex flex-col space-y-2">
              {productItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeAllMenus}
                  className="flex items-center text-[13px] gap-3 group hover:text-secondary transition-colors"
                >
                  <item.icon className="h-5 w-5 text-white group-hover:text-secondary" />
                  <span className="text-[13px]">{item.title}</span>
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/about"
            onClick={closeAllMenus}
            className="hover:text-primary transition-colors"
          >
            {t("about")}
          </Link>

          <a
            href="https://dtectoken.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-primary transition-colors"
          >
            <span>Dtec Token</span>
            <span className="rotate-[-45deg] inline-block">→</span>
          </a>

          {/* Mobile Right Controls */}
          <div className="flex  gap-4 items-center space-4 pt-4 border-t border-border mt-4">
            <LocaleSwitcher />
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 hover:text-accent transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <DownloadButton title={t("Download")} />
          </div>
        </div>
      )}
    </nav>
  );
}
