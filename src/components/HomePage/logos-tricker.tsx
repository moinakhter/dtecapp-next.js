"use client";

import Image from "next/image";
 
const LogosTicker = () => {
 
 

  const logos = [
    { src: "/images/Hero/logos/itu-cekirdek-beyaz.svg", alt: "ITU Çekirdek" },
    { src: "/images/Hero/logos/kosgeb_logo_beyaz.svg", alt: "KOSGEB" },
    { src: "/images/Hero/logos/teknofest_logo_beyaz 1.svg", alt: "Teknofest" },
    { src: "/images/Hero/logos/btm.svg", alt: "BTM" },
    { src: "/images/Hero/logos/oib.svg", alt: "OIB" },
    { src: "/images/Hero/logos/togg.svg", alt: "TOGG" },
    { src: "/images/Hero/logos/tübitak_logo_beyaz.svg", alt: "TÜBİTAK" },
  ];
  // Double the logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

 

  return (
    <div className="w-full py-16 ">
      <div className="relative overflow-hidden">
        {/* Moving logos container */}
        <div className="flex  animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-8 flex-shrink-0"
              style={{ minWidth: "150px" }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={60}
                className="h-[90px] w-[100px]  object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 invert dark:invert-0"
                priority={index < logos.length}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogosTicker;
