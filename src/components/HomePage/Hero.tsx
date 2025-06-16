
import Image from "next/image";
import LogosTicker from "./logos-tricker";
import { useTranslations } from "next-intl";
import CounterCard from "../common/CounterCard";

export const Hero = () => {
  const t=useTranslations("HomePage.Hero");
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
        <div className=" my-[318px] ">
        <h1 
        
        className="lg:text-8xl md:text-6xl text-4xl font-extrabold leading-tight mb-8 text-center dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)]"
        >
  {t("title")}
</h1>

          <p className="lg:text-xl md:text-lg text-base font-light  ]">
            {t("description")}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="flex max-w-[984px] w-full items-center flex-wrap justify-center gap-4">
  {[
    { value: "6", label: "Ödül" },
    { value: "12", label: "Anlaşmalı Firma" },
    { value: "600.000", label: "Mutlu Çalışan" },
    { value: "56+", label: "Dilde Çeviri" },
  ].map((item, i) => (
    <CounterCard key={i} value={item.value} label={item.label} />
  ))}
</div>

      </div>

      {/* Logos Row */}
      <LogosTicker />
    
    </section>
  );
};
