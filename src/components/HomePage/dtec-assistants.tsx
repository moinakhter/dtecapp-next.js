"use client";

import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import {
  Phone,
  Code,
  User,
  Shield,
  Cpu,
  Zap,
  Layers,
  ScanFace,
  MessageSquareText,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import TextGradientWhite from "../common/text-gradient-white";

export default function DtecAssistants() {
  const [activeCard, setActiveCard] = useState("car");

  const cards = [
    {
      id: "car",
      title: "Dtec Araç Asistanı",
      description:
        "Araçlar ile karşıda bir insan varmış gibi konuşmayı sağlar. Ses tanıma teknolojisiyle sizinle etkileşim kurar ve istediğiniz bilgileri veya komutları hızla yerine getirir.",
      image: "/images/Home/dtec-assistants/car.png",
      link: "#",
      features: [
        {
          icon: <MessageSquareText className="h-5 w-5" />,
          text: "Sohbet Modülü",
        },
        { icon: <ScanFace className="h-5 w-5" />, text: "Yüz Tanıma" },
        { icon: <Phone className="h-5 w-5" />, text: "Telefon Kontrolü" },
        {
          icon: <Cpu className="h-5 w-5" />,
          text: "Araç Donanımları Kontrolü",
        },
      ],
    },
    {
      id: "shopping",
      title: "Dtec Alışveriş Asistanı",
      description:
        "Herkesin e-ticaret platformlarında konuşarak rahatlıkla alışveriş yapabileceği alışveriş asistanıdır",
      image: "/images/Home/dtec-assistants/women-shopping.png",
      link: "#",

      features: [
        {
          icon: <Code className="h-5 w-5" />,
          text: "Gelişmiş NLP yetenekleri",
        },
        {
          icon: <User className="h-5 w-5" />,
          text: "Kişiselleştirme ve Özelleştirme",
        },
        { icon: <Shield className="h-5 w-5" />, text: "Güvenli İşlem İşleme" },
      ],
    },
    {
      id: "home",
      title: "Dtec Akıllı Ev Asistanı",
      description:
        "IoT cihazlarıyla uyumlu çalışarak veri analizi, cihaz yönetimi ve kullanıcı deneyimini optimize etme konularında uzmanlaşmıştır.",
      image: "/images/Home/dtec-assistants/smarthome.png",
      link: "#",

      features: [
        {
          icon: <Layers className="h-5 w-5" />,
          text: "IoT Cihazları Sorunsuz Entegrasyon",
        },
        { icon: <Zap className="h-5 w-5" />, text: "Bağlama Duyarlı Zeka" },
        {
          icon: <Cpu className="h-5 w-5" />,
          text: "Otomasyon ve Kişiselleştirme",
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0B0B0B] py-[128px] ">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-24">
          <TextGradientWhite text="Dtec Asistanları" />

          <p className="text-2xl font-light opacity-60 ">
            Hepsi Bir Arada Akıllı Sesli Asistanlar. Hepsi Bir Arada Akıllı
            Sesli Asistanlar.
          </p>
        </div>
        {/* Expanding Cards */}
        <div className="flex h-[500px] w-full gap-2.5 mx-auto">
          {cards.map((card) => {
            const isActive = activeCard === card.id;

            return (
              <motion.div
                key={card.id}
                className={cn(
                  "relative rounded-2xl overflow-hidden cursor-pointer",
                  {
                    "flex-1": isActive,
                    "flex-0.1": !isActive,
                  }
                )}
                onMouseEnter={() => setActiveCard(card.id)}
                animate={{
                  flex: isActive ? 1 : 0.1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 from-50% to-black/90 to-90% rounded-2xl" />
                </div>

                {/* Content */}
                <div className="relative h-full flex   flex-col justify-between px-9 pb-8 pt-5 z-10">
                  {/* Top Right Link - Only visible when active */}
                  {isActive && (
                    <div className="flex justify-end">
                      <Link
                        href={card.link}
                        className="!text-neutral-50  text-[13px] flex items-center hover:underline"
                      >
                        <motion.span
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          Detaylı İncele
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          {/* <ArrowRight className="ml-1 h-4 w-4" /> */}
                          <span className="ml-1 rotate-[-45deg] inline-block  ">
                            →
                          </span>
                        </motion.span>
                      </Link>
                    </div>
                  )}

                  {/* Content Area - Only show content when active */}
                  <div className="mt-auto  ">
                    {isActive && (
                      <div className="relative overflow-hidden lg:mb-0 mb-10  h-[4rem]">
                        <motion.h3
                          className="absolute top-0 left-0 text-3xl font-medium  text-neutral-50"
                          initial={{ x: "100%", opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            type: "tween",
                            ease: "easeOut",
                            duration: 0.4,
                          }}
                        >
                          {card.title}
                        </motion.h3>
                      </div>
                    )}

                    {/* Description - Only visible when active */}
                    {isActive && (
                      <motion.p
                        className="text-neutral-50/80 font-light text-base mb-8 max-w-xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        {card.description}
                      </motion.p>
                    )}

                    {/* Features - Only visible when active */}
                    {isActive && (
                      <div className="flex flex-wrap gap-6">
                        {card.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center text-neutral-50"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                          >
                            <div className="mr-2">{feature.icon}</div>
                            <span className="text-xs font-medium">
                              {feature.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
