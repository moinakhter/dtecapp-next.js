import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative !h-full min-h-screen  text-center flex items-center flex-col justify-between  w-full overflow-hidden ">
      {/* Blurred radial gradients */}
      <div className="absolute top-[-30%] left-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,_#143773ff_0%,_#ffffff00_100%)] blur-[120px] opacity-60 z-0" />

      {/* Light Blue Gradient */}
      <div className="absolute bottom-[-30%] right-[-30%] h-[1053px] w-[1053px] rounded-full bg-[radial-gradient(circle,_rgba(61,126,226,0.61)_0%,_rgba(230,230,230,0)_100%)] blur-[100px] opacity-80 z-0" />

      <Image
        fill
        src="/images/Hero/hero-dots.png"
        alt="Hero Image"
        className="absolute inset-0 z-10 bg-repeat opacity-10 pointer-events-none"
      />
      {/* Main Content */}
      <div className="z-40   flex items-center justify-center flex-col h-full w-full !mt-[318px]">
        <h1 className="lg:text-8xl md:text-6xl text-4xl font-extrabold !mb-[28px]  ">
          Geleceğe Yolculuk
        </h1>
        <p className="text-xl md:text-lg text-base font-light !mb-[218px]">
          Hepsi Bir Arada Akıllı Sesli Asistan Çözümünüz
        </p>

        {/* Statistics Cards */}
        <div className="!flex max-w-[984px]  w-full items-center flex-wrap justify-center gap-4 mb-12">
          {[
            { value: "6", label: "Ödül" },
            { value: "12", label: "Anlaşmalı Firma" },
            { value: "600.000", label: "Mutlu Çalışan" },
            { value: "56+", label: "Dilde Çeviri" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl px-6 py-4 min-w-[233px] h-[176px] flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-[53px] font-normal">{item.value}</p>
              <p className="text-[20px] opacity-55 font-light ">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Logos Row */}
      </div>
      <div className="w-full max-h-[346px] relative">
        <div className="w-full h-[90px] absolute bottom-0 z-50  ">
          <Image
            src="/images/Hero/logos.png"
            alt={`logos`}
            fill
            quality={100}
            className="mx-auto opacity-60 object-cover grayscale z-40 invert dark:invert-0 transition-all"
          />
          <div className="absolute bottom-0  h-full left-0 w-full bg-gradient-to-r from-white/90  to-white/90 via-transparent pointer-events-none z-50" />
        </div>
      </div>
    </section>
  );
};
