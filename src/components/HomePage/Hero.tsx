import { cn } from "@/lib/utils";
import Image from "next/image";
import LogosTicker from "./logos-tricker";

export const Hero = () => {
  return (
    <section className="relative md:p-0 p-2 h-full xl:h-full lg:min-h-screen text-center flex items-center flex-col justify-between w-full overflow-hidden bg-background text-foreground">
      {/* Blurred radial gradients */}
      <div className="absolute top-[-30%] left-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,var(--blue-dark)_0%,rgba(255,255,255,0)_100%)] blur-[120px] opacity-60 z-0" />

      {/* Light Blue Gradient */}
      <div className="absolute bottom-50 right-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,var(--blue)_0%,rgba(230,230,230,0)_100%)] blur-[100px] opacity-80 z-0" />

  
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
      <LogosTicker />
    
    </section>
  );
};
