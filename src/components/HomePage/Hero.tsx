import { cn } from "@/lib/utils";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative md:p-0 p-2 h-full xl:h-full lg:min-h-screen text-center flex items-center flex-col justify-between w-full overflow-hidden bg-background text-foreground">
      {/* Blurred radial gradients */}
      <div className="absolute top-[-30%] left-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,var(--blue-dark)_0%,rgba(255,255,255,0)_100%)] blur-[120px] opacity-60 z-0" />

      {/* Light Blue Gradient */}
      <div className="absolute bottom-50 right-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,var(--blue)_0%,rgba(230,230,230,0)_100%)] blur-[100px] opacity-80 z-0" />

      {/* Dots Overlay */}
      {/* <Image
        fill
        src="/images/Backgrounds/bg2.svg"
        alt="Hero Image"
        className="absolute inset-0 z-10  object-cover stroke-secondary opacity-10 pointer-events-none"
      /> */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Backgrounds/bg2.svg"
          alt="background"
          fill
          className="object-cover   opacity-20  stroke-primary"
        />
      </div>
      {/* Main Content */}
      <div className="z-40 flex items-center justify-center flex-col h-full w-full    ">
        <div className=" py-[318px] ">
          <h1 className="lg:text-8xl md:text-6xl text-4xl font-extrabold mb-8 text-center">
            Geleceğe Yolculuk
          </h1>
          <p className="lg:text-xl md:text-lg text-base font-light  ]">
            Hepsi Bir Arada Akıllı Sesli Asistan Çözümünüz
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="flex max-w-[984px] w-full   items-center flex-wrap justify-center gap-4">
          {[
            { value: "6", label: "Ödül" },
            { value: "12", label: "Anlaşmalı Firma" },
            { value: "600.000", label: "Mutlu Çalışan" },
            { value: "56+", label: "Dilde Çeviri" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-card text-foreground shadow-md rounded-xl px-6 py-4 min-w-[233px] h-[176px] flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <p
                className={cn(
                  " font-normal",
                  item.value === "600.000"
                    ? "md:text-[40px] text-3xl"
                    : "md:text-[53px] text-4xl"
                )}
              >
                {item.value}
              </p>
              <p className="text-[20px] opacity-55 font-light">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logos Row */}
      <div className="w-full  h-full   flex items-center justify-center  py-[127px] relative">
        <div className="w-full h-[90px]   z-50">
          <div className="flex items-center justify-around gap-8 w-full h-full overflow-x-auto scrollbar-hide">
            {[
              "/images/Hero/logos/itu-cekirdek-beyaz.png",
              "/images/Hero/logos/kosgeb_logo_beyaz.png",
              "/images/Hero/logos/teknofest_logo_beyaz 1.png",
              "/images/Hero/logos/tübitak_logo_beyaz.png",
              "/images/Hero/logos/kosgeb_logo_beyaz.png",
              "/images/Hero/logos/teknofest_logo_beyaz 1.png",
              "/images/Hero/logos/tübitak_logo_beyaz.png",
            ].map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                width={100}
                height={50}
                // className="h-[50px] object-contain"
                className=" opacity-80 brightness-[0.3] dark:brightness-[0.8]   grayscale z-40 invert dark:invert-0 transition-all"
              />
            ))}
          </div>
          {/* <div
            className="
      absolute bottom-0 h-full left-0 w-full 
      bg-gradient-to-r 
      from-[var(--background)] via-transparent to-[var(--background)] 
      pointer-events-none z-50
    "
          /> */}
        </div>
      </div>
    </section>
  );
};
