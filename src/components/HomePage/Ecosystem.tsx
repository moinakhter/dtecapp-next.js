import React from "react";
import Image from "next/image";
import SectionWrapper from "../common/SectionWrapper";

function Ecosystem() {
  return (
    <SectionWrapper className="bg-[#F8F8F8] dark:bg-[#171717]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Text Content */}
        <div className="lg:max-w-[400px] w-fill">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ekosistem
          </h2>
          <p className="text-base text-foreground/80 leading-relaxed">
            Dtec, Gelişmiş doğal dil işleme kabiliyetleri ve üst düzey yapay zeka özellikleri sayesinde sadece sürücünün sesli komutlarını anlamakla kalmaz, aynı zamanda yerleşik otonom öğrenme sistemi ve duygusal mutabakat mekanizması sayesinde sürücünün ruh halini algılayabilir, ihtiyaç ve isteklerini öngörerek erkenden çözüm ve hizmet sunabilir.
          </p>
        </div>

        {/* Right Image */}
        <div className="  w-full max-w-[672px] rounded-2xl  overflow-hidden">
          <Image
            src="/images/Ecosystem.png" 
            alt="Ekosistem"
            width={672}
            height={378}
            className="object-cover w-full h-full shadow-md"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Ecosystem;
