"use client";

import { Button } from "@/components/ui/button";

// Token features data for mapping
const tokenFeatures = [
  {
    title: "Sesli Komutla Erişim",
    description: "IoT cihazlarına ve uygulamalara sesle anında erişim.",
  },
  {
    title: "Yapay Zeka Entegrasyonu",
    description:
      "Asistan destekli, sürekli evrilen akıllı mobilite ekosistemi.",
  },
  {
    title: "Kişiselleştirilmiş Deneyim",
    description: "Sürüş alışkanlıklarına göre dinamik optimizasyon.",
  },
  {
    title: "Token Kazanımı",
    description:
      "Şarj işlemleri ve asistan etkileşimleriyle token kazan, istediğin gibi değerlendir.",
  },
  {
    title: "Gerçek Zamanlı Veri",
    description: "Anlık rota ve sürüş içgörüleriyle verimli mobilite.",
  },
  {
    title: "Blockchain Güvencesi",
    description:
      "Blockchain'in şeffaf, güvenli ve izlenebilir işlem altyapısı.",
  },
];

export default function TokenSection() {
  return (
    <section className="relative w-full py-24  overflow-hidden">
      {/* Content */}
      <div className="container space-y-20 relative z-10 px-4 pt-16">
        {/* Header */}
        <div className="text-center max-w-[900px]  mx-auto">
          <h2 className="md:text-4xl text-2xl lg:text-[56px] font-black mb-8   ">
            Dtec Token ile
            <br />
            Mobilitenin Geleceğini Yaşayın!
          </h2>
          <p className="text-base  mb-12   mx-auto">
            Dtec Token, blok zinciri altyapısıyla çalışan Dtec Asistan üzerinden
            sesli komutlarla uygulama kontrolü sağlar. Araç şarj edildiğinde
            veya asistan kullanıldığında token kazanır. Bu ödüller, sistem
            içinde özgürce harcanabilir ve değer yaratmak için kullanılabilir.
            Gerçek zamanlı veri, yapay zeka ve güvenli blockchain entegrasyonu
            sayesinde mobilite artık daha akıllı, kazançlı ve tamamen kişisel.
          </p>

          {/* CTA Button */}
          <Button
            variant="outline"
            size="lg"
            className="border  bg-transparent border-accent    hover:text-white transition-all duration-300  "
          >
            Daha Fazlasını Öğrenin
            <span className=" rotate-[-45deg] inline-block  ">→</span>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12   container mx-auto place-items-center md:place-items-stretch">
          {tokenFeatures.map((feature, index) => (
            <TokenFeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TokenFeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group max-w-[320px] w-full flex gap-[24px] md:text-start text-center  flex-col h-full">
      <div className="">
        <h3 className="text-xl   font-medium   mb-2.5 group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base  font-light ">{description}</p>
      </div>

      {/* Separator line */}
      <div className="w-full h-[2px] bg-black dark:bg-white  group-hover:bg-secondary transition-colors duration-300 mt-auto" />
    </div>
  );
}
