"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "./ui/input";

const footerLinks = {
  products: [
    { name: "Araç Asistanı", href: "/products/car-assistant" },
    { name: "Alışveriş Asistanı", href: "/products/shopping-assistant" },
    { name: "Akıllı Ev Asistanı", href: "/products/home-assistant" },
    { name: "Seyahat Asistanı", href: "/products/travel-assistant" },
  ],
  about: [
    // { name: "Hakkımızda", href: "/about" },
    // { name: "Ekibimiz", href: "/team" },
    // { name: "Kariyer", href: "/careers" },
    // { name: "Basın Kiti", href: "/press" },
  ],
  legal: [
    { name: "Hizmetler & Koşullar", href: "/terms" },
    { name: "Gizlilik Politikası", href: "/privacy" },
    { name: "KVKK Aydınlatma Metni", href: "/kvkk" },
    { name: "Tüm Hakları Saklıdır", href: "/rights" },
  ],
};

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
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
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
              <h3 className=" font-medium text-base  mb-4">Ürünlerimiz</h3>
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
              <h3 className="font-semibold text-foreground mb-4">Hakkımızda</h3>
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
              <h3 className="font-semibold text-foreground mb-4">
                Bize Ulaşın
              </h3>
              <div className="space-y-[13px]">
                <div className="flex items-start gap-2  ">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-[13px] w-full">
                    Finlandiya Mah. Finlandiya Bulvarı
                    <br />
                    N:100 34394 Avcılar/İstanbul
                  </span>
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
          <div className="w-[258px] h-[180px] cursor-pointer   relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/dtec-token.png"
              alt="DTEC Token"
              fill
              quality={100}
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
       <div className="absolute bottom-4 left-4 z-10">
        <Link
          href="https://dtec.space/"
          className="!text-white  text-lg  font-bold flex items-center gap-1  transition-transform duration-300 ease-in-out  group-hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
          title="DTEC Token"

        >
          DTEC Token
          <span className="text-[12px]">↗</span>
        </Link>
      </div>

          </div>
        </div>

        {/* Newsletter Section */}
        <div className=" pt-[112px] mb-8">
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex  items-center justify-center gap-3"
          >
            <Input
              type="email"
              placeholder="Bir Mail Adresi Girin"
              // onChange={(e: unknown) => setEmail(e?.target?.value)}
              className="flex-1 rounded-[9.6px] min-h-[48px] border-none  focus-within:border-none outline-none bg-[#E0E0E0] max-w-[374px] w-full h-full dark:bg-[#212121]"
              required
            />
            <Button
              type="submit"
              size="sm"
              className="bg-secondary rounded-[9.6px"
            >
              Geçmişten Takip Edin
            </Button>
          </form>

          <p className="text-center  text-sm font-light mt-6">
            Güncellemeler sayın duyurular DTEC&apos;den ilgili açık ve etkili
            bilgileri göndermek için bilgilendirme kullanılabilir.
            <br />
            İstediğiniz zaman abonelikten çıkabilirsiniz. Daha fazla bilgi için
            Gizlilik Politikamızı gözden geçirin.
          </p>
        </div>

        {/* Bottom Legal Links */}
        <div className="pt-[128px]">
          <div className="flex flex-col  md:flex-row justify-center items-center gap-4">
            <div className="flex flex-wrap gap-9 text-[13px]  ">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-primary font-medium
                   transition-colors duration-200"
                >
                  {link.name}
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
