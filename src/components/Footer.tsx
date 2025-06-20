"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";
import DtecTokenCard from "./common/DtecTokenCard";

const socialLinks = [
  {
    icon: "/images/Icons/SOCIAL/X.svg",
    href: "https://twitter.com/dtec",
    label: "Twitter",
  },
  {
    icon: "/images/Icons/SOCIAL/Facebook.svg",
    href: "https://facebook.com/dtec",
    label: "Facebook",
  },
  {
    icon: "/images/Icons/SOCIAL/linkedin.svg",
    href: "https://linkedin.com/company/dtec",
    label: "LinkedIn",
  },
  {
    icon: "/images/Icons/SOCIAL/discord.svg",
    href: "https://discord.gg/dtec",
    label: "Discord",
  },
  {
    icon: "/images/Icons/SOCIAL/instagram.svg",
    href: "https://instagram.com/dtec",
    label: "Instagram",
  },
  {
    icon: "/images/Icons/SOCIAL/youtube.svg",
    href: "https://youtube.com/dtec",
    label: "YouTube",
  },
  {
    icon: "/images/Icons/SOCIAL/telegram.svg",
    href: "https://t.me/dtec",
    label: "Telegram",
  },
];

export default function Footer() {
  const t = useTranslations("Footer");

  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };
  const footerLinks = {
    products: [
      { name: t("products.car"), href: "/products/car-assistant" },
      {
        name: t("products.shopping"),
        href: "/products/shopping-assistant",
      },
      { name: t("products.home"), href: "/products/home-assistant" },
      { name: t("products.travel"), href: "/products/travel-assistant" },
    ],
    about: [
      // { name: "Hakkımızda", href: "/about" },
      // { name: "Ekibimiz", href: "/team" },
      // { name: "Kariyer", href: "/careers" },
      // { name: "Basın Kiti", href: "/press" },
    ],
    legal: [
      { key: "terms", href: "/terms" },
      { key: "privacy", href: "/privacy" },
      { key: "kvkk", href: "/kvkk" },
      { key: "all_rights", href: "/rights" },
    ],
  };

  return (
    <footer className="w-full h-full   bg-background">
      <div className="px-[70px]  mx-auto lg:pt-[128px]  py-8 md:py-16 ">
        {/* Main Footer Content */}
        <div className="flex lg:flex-nowrap flex-wrap justify-between gap-12 mb-12">
          {/* Logo and Social Links */}
          <div className=" ">
            <Link href="/" className="inline-block  mb-16">
              <Image
                src="/images/logo/logo-light.svg"
                alt="DTEC Logo"
                width={198}
                height={48}
                className="h-auto w-auto
           dark:invert invert-0 
             "
              />
            </Link>

            <div className="flex  flex-wrap gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    width={24}
                    height={24}
                    alt={social.label}
                    className="h-[24px] invert dark:invert-0 w-[24px]"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="gap-12 flex   justify-center items-start">
            {/* Products */}
            <div className=" ">
              <h3 className=" font-medium text-base  mb-4">
                {t("productstitle")}
              </h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="  hover:text-primary text-sm font-light transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div className=" ">
              <h3 className="font-medium text-base  mb-4">{t("about")}</h3>
              {/* <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul> */}
            </div>

            {/* Contact */}
            <div className="  ">
              <h3 className="font-medium text-base  mb-4">{t("contact")}</h3>
              <div className="space-y-[13px]">
                <div className="flex items-start gap-2  ">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  {/* <span className="text-[13px] w-full">{t("address")}</span> */}

                  <div className="text-[13px] w-full">
                    {t("address")
                      .split("\n")
                      .map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 ">
                  <Phone className="h-4 w-4" />
                  <span className="text-[13px]">+90 (212) 468 45 45</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Mail className="h-4 w-4 " />
                  <span className="text-[13px]">dtec@dtecyazilim.com</span>
                </div>
              </div>
            </div>
          </div>
          {/* DTEC Token Card */}
     <DtecTokenCard   className = "w-[258px] h-[180px]" />
        </div>

        {/* Newsletter Section */}
        <div className="pt-[112px] mb-8">
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex items-center justify-center gap-3"
          >
            <Input
              type="email"
              placeholder={t("newsletter_placeholder")}
              className="flex-1 rounded-[9.6px] min-h-[48px] border-none focus-within:border-none outline-none bg-[#E0E0E0] max-w-[374px] w-full h-full dark:bg-[#212121]"
              required
            />
            <Button
              type="submit"
              size="sm"
              className="bg-secondary text-[13px] text-white font-normal rounded-[9.6px]"
            >
              {t("newsletter_button")}
            </Button>
          </form>

          <p className="text-center text-sm font-light mt-6">
            {t
              .raw("newsletter_note")
              .split("\n")
              .map((line: string, i: number) => (
                <span key={`${i}-${line}`}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>

        {/* Bottom Legal Links */}
        <div className="pt-[128px]">
          <div className="flex flex-col  md:flex-row justify-center items-center gap-4">
            <div className="flex flex-wrap gap-9 text-[13px]  ">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="hover:text-primary font-medium transition-colors duration-200"
                >
                  {t(`legal.${link.key}`)}
                </Link>
              ))}
            </div>
            <div className="text-sm ">© 2025 DTEC</div>
          </div>
        </div>
      </div>

      <div className="h-[190px] mt-[164px]  w-full relative">
        <Image
          src="/images/Backgrounds/dtec-bottom.svg"
          alt="background"
          fill
          className=" stroke-[#808080]"
        />
      </div>
    </footer>
  );
}
