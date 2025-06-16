import Image from "next/image";
import TokenSection from "./token-section";

// Feature data for mapping
const features = [
  {
    icon: "/images/Icons/mic.svg",

    title: "Doğal Dil Anlama (NLU)",
    description:
      "Sezgisel kullanıcı iletişimi için konuşmayı anlama, bağlam açısından zengin etkileşimler",
  },
  {
    icon: "/images/Icons/share.svg",

    title: "Çok Modlu Etkileşim",
    description:
      "Esnek kullanıcı etkileşimi için kesintisiz ses, metin ve görsel geçişler",
  },
  {
    icon: "/images/Icons/person.svg",

    title: "Kişiselleştirme ve Kullanıcı Tanıma",
    description:
      "Yanıtları kişiselleştirilmiş etkileşime göre uyarlayarak kullanıcı tercihlerini öğrenin ve hatırlayın",
  },
  {
    icon: "/images/Icons/puzzle.svg",
    title: "Üçüncü Taraf Hizmetlerle Entegrasyon",
    description:
      "Kolaylık sağlamak için merkezi bir merkez oluşturarak çeşitli hizmetlere bağlanın",
  },
  {
    icon: "/images/Icons/sun.svg",
    title: "Bağlama Duyarlı Görev Sürekliliği",
    description:
      "Tekrarlama ihtiyacını azaltarak akıcı etkileşimler için bağlamı koruyun",
  },
];

// Other applications limitations
const limitations = [
  "Temel ve statik tepkiler ve cevaplar.",
  "Tek modlu etkileşim.",
  "Kişiselleştirilmez deneyim",
  "Kapalı ekosistem",
  "Temel etkileşimler",
];

export default function ComparisonSection() {
  return (
    <>
      <div className="relative   h-full w-full">
        <div className="hidden bg-radial  inset-0 dark:absolute bg-center top-[-350px] from-[#143773] via-[#121212] to-transparent" />
        <section className="relative w-full py-24 overflow-hidden ">
          {/* Content */}
          <div className="container relative     z-10 px-5">
            <div className="text-center mb-[96px]">
              <h2 className="dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)] mb-2.5 text-[56px] font-black">
                Sıradışı Bir Asistan Deneyimi
              </h2>
              <p className="text-2xl font-light ">
                Hepsi Bir Arada Akıllı Sesli Asistanlar. Hepsi Bir Arada Akıllı
                Sesli Asistanlar.
              </p>
            </div>

            <div className="flex  flex-col md:flex-row justify-center gap-8   mx-auto">
              {/* DTEC Features */}
              <div className="w-full max-w-[552px] group md:w-1/2 p-12 dark:bg-[#121212] bg-[#FAFAFA] rounded-2xl border-[#212121]/30 border-2 hover:border-secondary">
                <div className="flex flex-col gap-2.5 mb-8">
                  <div className="flex gap-2">
                    <span className="text-3xl font-bold ">DTEC</span>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  {features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      Icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  ))}
                </div>
              </div>

              {/* Other Applications */}
              <div className="w-full md:w-1/2 max-w-[552px] p-12 dark:bg-[#121212] bg-[#FAFAFA]   border-[#212121]/30 border-2 hover:border-secondary  rounded-2xl">
                <div className="flex flex-col gap-2.5 mb-8">
                  <h3 className="text-3xl font-medium ">
                    Diğerler Uygulamalar
                  </h3>
                </div>

                <div className="flex flex-col gap-8">
                  {limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="">•</span>
                      <p className="text-base font-light ">{limitation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" w-full py-[419px] overflow-hidden  ">
          <Image
          src="/images/Backgrounds/circles.png"
          alt="Extraordinary Experience Background"
        width={2000}
          height={2000}
          className="  z-0 top-[17%]   absolute object-center   dark:hidden block"
          priority
        />
          {/* Logo */}
          <div className="relative z-10 flex items-center justify-center  w-[744px]  h-[744px]   mx-auto  ">
            <Image
              src="/images/logo/DTEC_WhiteMode.png"
              alt="DTEC Logo"
              fill
              className="object-contain dark:hidden block"
              priority
            />
            <Image
              src="/images/logo/DTEC_DarkMode.png"
              alt="DTEC Logo"
              fill
              className="object-contain dark:block hidden"
              priority
            />
          </div>
        </section>
        <TokenSection />
        
      </div>
    </>
  );
}

function FeatureItem({
  Icon,
  title,
  description,
}: {
  Icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4  ">
      <div className="mt-1">
        <Image
          width={32}
          height={32}
          src={Icon}
          alt={title}
          priority
          className="filter invert dark:invert-0     transition-all duration-300  "
        />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <h4 className="text-base font-bold  ">{title}</h4>
        <p className="text-sm font-light  ">{description}</p>
      </div>
    </div>
  );
}
