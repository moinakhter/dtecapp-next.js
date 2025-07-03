"use client";
import {
  Dialog,
  DialogContent,
 
  DialogTitle,
 
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
interface StepProps {
  step: string;
  title: string;
  details: string[];
  img?: string;
}
function Step({ step, title, details, img }: StepProps) {
  const t = useTranslations("shopify-assistant");
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};
return (
     <motion.div
       variants={stepVariants}

      className="grid md:grid-cols-[150px_1fr] gap-9 items-start group"
    >
      {/* Step Label */}
      <div>
        <h3 className="md:text-[32px] text-lg font-medium">{step}</h3>
      </div>

      {/* Right Side: Content and Optional Image */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
        {/* Step Content */}
        <div className="space-y-4">
          <h4 className="text-xl font-medium">{title}</h4>
          <ol className="space-y-2 text-base list-decimal list-inside">
            {details.map((item, idx) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{ __html: item }}
                className="[&>strong]:font-bold [&>span.text-red-500]:text-red-500 [&>a]:text-blue-500 [&>a]:hover:underline font-light"
              />
            ))}
          </ol>

          <div className="relative overflow-hidden max-w-1/3 mt-auto">
            <div className="w-full h-px bg-border" />
            <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        </div>

        {/* Image */}
        {img && (
          <div className="w-full max-w-[350px] flex flex-col items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  src={img}
                  alt={title}
                  width={350}
                  height={250}
                  className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90"
                />
              </DialogTrigger>
              <span className="text-[12px] text-center mt-2  ">
                {t("clicktoview")}
              </span>
              <DialogContent fullscreen className=" pt-10   border-none flex items-center justify-center">
                 <DialogTitle></DialogTitle>
                <Image
                  src={img}
                  alt={title}
                  width={1000}
                  height={700}
                  quality={100}
                  className="max-h-[90vh] w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
</motion.div>
  );
}

export default Step;