import React from "react";
import SectionWrapper from "../common/SectionWrapper";
import Image from "next/image"; 
import { Button } from "../ui/button";

function AICallCenter() {
  return (
    <SectionWrapper className="">
      <div className="container flex flex-col gap-[24px]">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Dtec AI Call Center
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Dtec AI Call Center çözümümüz, gelen ve giden çağrıların insan
            müdahalesi olmadan yöneterek müşteri deneyimini devrim niteliğinde
            dönüştürüyor!
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-col items-center justify-between rounded-3xl border border-border p-[65px]  md:flex-row gap-10 bg-[radial-gradient(98.83%_153.64%_at_94.89%_1.17%,_rgba(20,55,115,0.29)_0%,_rgba(255,255,255,0)_100%)] ">
          {/* Left Gradient Box */}
          <div className="md:w-1/2  w-full  relative ">
            <div className="max-w-[372px]">
              <h3 className="text-2xl font-semibold mb-4">
                Geleceğin Çağrı Deneyimi Başladı.
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                Yapay zeka destekli çağrı merkezi çözümümüz ile müşteri
                hizmetlerinde devrim yaratın. DtecAI, gelen ve giden çağrıların
                otomatik olarak yönetir, kişiselleştirilmiş hizmet sunar ve 7/24
                kesintisiz destek sağlar.
              </p>
            </div>

            <Button  size="sm" variant="secondary" className="mt-6    ">
              Daha Fazla Bilgi Edinin <span className=" rotate-[-45deg] inline-block  ">
                →
                </span>
            </Button>
          </div>

          {/* Right Features List */}
          <div className="md:w-1/2 p-2 w-full grid grid-cols-1 gap-8">
            {[
              {
                icon: "/images/AI-CALL-CENTER-ICONS/SmartCall.png",
                title: "Akıllı Çağrı Karşılama",
                desc: "Her çağrıyı doğru yönlendirme ve anında çözüm.",
              },
              {
                icon: "/images/AI-CALL-CENTER-ICONS/AutonomousCall.png",
                title: "Otonom Giden Çağrılar",
                desc: "Bilgilendirme, hatırlatma ve anketler.",
              },
              {
                icon: "/images/AI-CALL-CENTER-ICONS/GlobalSupport.png",
                title: "7/24 Hizmet, Çok Dilli Destek",
                desc: "Kesintisiz, global destek deneyimi.",
              },
              {
                icon: "/images/AI-CALL-CENTER-ICONS/AI.png",
                title: "Sürekli Öğrenen Zeka",
                desc: "Her etkileşimden gelişen sistem.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="min-w-[48px] min-h-[48px] p-2 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    style={{ filter: "var(--icon-filter)" }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-foreground/70 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scalability Section */}
        <div className="w-full flex flex-col md:flex-row gap-10  ">
          <div className="p-10 bg-card w-[300px] rounded-3xl border border-border shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ölçeklenebilir Yapı</h3>
              <p className="text-base leading-relaxed text-foreground/80">
                DtecAI,{" "}
                <span className="font-semibold">
                  küçük ekiplerden global operasyonlara
                </span>{" "}
                kadar her ölçekte esnek bir şekilde uyarlanabilir. Ek
                geliştirmeye gerek kalmadan büyüyen ihtiyaçlara cevap verir.
              </p>
            </div>
          </div>

          <div className="w-[420px]  rounded-3xl border border-border shadow-md overflow-hidden flex items-center justify-center">
            <Image
              src="/images/Photorealistic-Digital-Artwork.png"
              alt="Agent"
              width={420}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-10 bg-card w-[416px] rounded-3xl border border-border shadow-md flex flex-col items-end justify-between">
            <div className="flex items-center mb-4">
              <div>
                <Image
                  src="/images/Icons/security.png"
                  alt="Security"
                  width={88}
                  height={110}
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Kurumsal Güvenlik Standartları
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                Tüm iletişim ve işlem kayıtları,{" "}
                <span className="font-semibold">
                  uluslararası güvenlik standartlarına uygun
                </span>{" "}
                şekilde şifrelenir ve saklanır. DtecAI, veri gizliliğinizi
                ciddiyetle korur.
              </p>
            </div>
          </div>
        </div>

        {/* Nasıl Çalışır Section */}
        <div className="w-full p-[64px] space-y-[64px] bg-[radial-gradient(86.63%_97.02%_at_50%_151.62%,_#8FBBFF_0%,_#FFFFFF_100%)] dark:bg-background rounded-3xl border border-border shadow-md ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-[16px] font-light">
                Müşterilerinizin olduğu her yerde DtecAI ile var olun.
              </p>
            </div>
            <div>
              <Image
                src="/images/Icons/audio.svg"
                alt="How It Works"
                width={132}
                height={48}
                style={{ filter: "var(--icon-filter)" }}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-stretch text-sm font-light gap-12 relative">
            {[
              {
                title: "Anında Algılama ve Yönlendirme",
                points: [
                  <>
                    Müşteri sizi aradığında{" "}
                    <b className="font-medium">
                      DtecAI çağrıyı otomatik olarak karşılar.
                    </b>
                  </>,
                  <>
                    Arayan kişinin ihtiyacını{" "}
                    <b className="font-medium">saniyeler içinde analiz eder.</b>
                  </>,
                  <>
                    Konuya göre en{" "}
                    <b className="font-medium">doğru yanıtı sunar</b> veya
                    yönlendirir.
                  </>,
                ],
              },
              {
                title: "Yapay Zekâ ile Dinle, Anla ve Cevapla",
                points: [
                  <>
                    {" "}
                    <b className="font-medium">NLP teknolojisiyle</b> müşterinin
                    ne söylediğini ve ne istediğini anlar.
                  </>,
                  <>
                    İnsan benzeri,{" "}
                    <b className="font-medium">
                      doğal ve akıcı bir konuşma deneyimi
                    </b>{" "}
                    sunar.
                  </>,
                  <>
                    Her etkileşimden öğrenerek gelecekte daha{" "}
                    <b className="font-medium">doğru tepkiler verir.</b>
                  </>,
                ],
              },
              {
                title: "Verimli, Ölçülebilir ve Her Zaman Hazır",
                points: [
                  <>
                    Randevu hatırlatma, kampanya ve anket gibi aramalar{" "}
                    <b className="font-medium">otonom şekilde</b>{" "}
                    gerçekleştirilir.
                  </>,
                  <>
                    7/24 hizmet vererek{" "}
                    <b className="font-medium">
                      gelen hiçbir çağrı cevapsız kalmaz.
                    </b>
                  </>,
                  <>
                    Operasyonel maliyetleri düşürür,{" "}
                    <b className="font-medium">
                      müşteri memnuniyetini artırır.
                    </b>
                  </>,
                ],
              },
            ].map((column, idx) => (
              <div
                key={idx}
                className="flex-1 relative flex flex-col justify-between px-[24px]"
              >
                <h3 className="text-xl font-bold mb-4">{column.title}</h3>

                <div className="space-y-4">
                  {column.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-xl leading-[1.4]">•</span>
                      <span className=" ">{point}</span>
                    </div>
                  ))}
                </div>

                {idx !== 2 && (
                  <div className="hidden md:block absolute top-0 right-[-30px] h-full lg:flex items-center">
                    <Image
                      src="/images/Icons/Separator.png"
                      alt="Separator"
                      width={30}
                      height={200}
                      className="h-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="mb-2 font-normal text-xs">
              Bugün kullanmaya başlayın!
            </p>
            <Button size="lg" variant="secondary">
              Demo Talep Edin <span className=" rotate-[-45deg] inline-block ">
                →
                </span>
            </Button>
          </div>
        </div>

        <div className=" flex flex-col md:flex-row gap-10">
          {/* Left card */}
          <div className="w-full relative p-10 bg-card dark:bg-card rounded-3xl border border-border shadow-md flex flex-col justify-center items-center overflow-hidden">
            {/* Background Circles */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/Backgrounds/bg1.svg"
                alt="background"
                fill
                className="object-cover  stroke-primary"
              />
            </div>

            <div className=" w-full relative z-10 text-center flex justify-center items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Otomatik Süreç Akışları
                </h3>
                <p className="text-base leading-relaxed text-foreground/80 max-w-lg mx-auto">
                  Manuel işlemlere veda edin. Müşteriyle gerçekleşen her
                  etkileşim sonrası tetiklenen
                  <span className="font-semibold">
                    {" "}
                    e-posta, SMS ya da CRM girdileri tamamen otomatikleştirilir.
                  </span>
                  Zaman kazanın, hata payını sıfırlayın.
                </p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full max-w-[450px]  rounded-2xl border border-border shadow-md overflow-hidden flex items-center justify-center">
            <Image
              src="/images/Futuristic-Digital-Artwork.png"
              alt="AI Illustration"
              width={450}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default AICallCenter;
