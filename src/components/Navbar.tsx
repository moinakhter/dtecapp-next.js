"use client";

import { Moon, Sun, HomeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LocaleSwitcher from "./common/LocaleSwitcher";
import DownloadButton from "./common/DownloadeLink";
import { useTranslations } from "next-intl";
import DtecTokenCard from "./common/DtecTokenCard";
import { CarIcon, CartIcon, MicICon, ThinPlaneIcon } from "./common/Icons";

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
  const t = useTranslations("Navbar");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav
      className="fixed top-8 left-0 right-0 z-50 bg-white/10 container
     md:mx-auto border-[#808080]/15 border-[1px] backdrop-blur-[32px] rounded-2xl
       transition-all duration-300 "
    >
      <div className="mx-auto md:px-8 py-4 flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/logo-light.svg"
            alt="DTEC Logo"
            width={40}
            height={40}
            quality={100}
            className="ml-2 w-[99px] h-[24px] dark:invert invert-0"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center !space-x-[36px] md:flex">
          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-primary group  !focus-within:outline-none">
              <span>{t("products")}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-none  w-full max-w-[455px] md:block hidden overflow-visible drop-shadow-[0_0_5px_#3D7EE2]   bg-transparent "
              align="center"
              sideOffset={50}
            >
              {/* Top Notch */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-xl w-10 h-10 bg-[#16191A] rotate-45  z-20" />

              <div
                className="flex justify-between items-end gap-8 w-full p-6 [background:linear-gradient(135deg,_#1C1F22_0%,_#121212_100%)] rounded-2xl z-10 relative
                  transition-all duration-300 hover:[background:radial-gradient(100%_100%_at_0%_100%,rgba(61,126,226,0.2)_0%,#16191A_30%,#16191A_100%),radial-gradient(60%_60%_at_50%_100%,rgba(61,126,226,0.15)_0%,#16191A_20%,#16191A_100%)]

              
              "
              >
                {/* Left menu */}
                <div className="w-fit">
                  <div className="text-[10px] font-medium text-[#FAFAFA] pb-6">
                    Ürünlerimiz
                  </div>
                  <div className="grid grid-cols-1 gap-4 ">
                    {productItems.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="flex items-center text-[13px] gap-3 group   rounded-lg   transition-colors"
                      >
                        <item.icon className="h-5 w-5 text-white group-hover:text-secondary" />

                        <span className="text-[13px] group-hover:text-secondary  text-white">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right card */}
                <DtecTokenCard text="text-xs" className="w-[172px] h-[120px]" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/about" className="transition-colors  hover:text-primary">
            {t("about")}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-primary">
              <span>Dtec Token</span>
              <span className="rotate-[-45deg] inline-block">→</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              <DropdownMenuItem className="hover:bg-primary/10 hover:text-primary">
                {t("tokenInfo")}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/10 hover:text-primary">
                {t("whitepaper")}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/10 hover:text-primary">
                {t("tokenomics")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center !space-x-6">
          {/* Language Selector */}
          <LocaleSwitcher />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="!hover:bg-transparent cursor-pointer hover:text-accent transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Download Assistant Button */}
          <DownloadButton title={t("Download")} />
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </nav>
  );
}
