"use client";
import { motion,Variants } from "framer-motion";
type Step5Props = {
  step: string;
  title: string;
  details: string[];
};
function Step5({ step, title, details }: Step5Props) {

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
      <div>
        <h3 className="md:text-[32px] text-lg font-medium">{step}</h3>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-medium">{title}</h4>

        <div className="space-y-6">
          {details.map((item, idx) => (
            <div key={idx} className="space-y-2">
              {item.split("\n").map((line, lineIdx) => (
                <p
                  key={lineIdx}
                  dangerouslySetInnerHTML={{ __html: line }}
                  className={`${
                    line.trim().startsWith("•") ? "pl-4" : "font-semibold"
                  } [&>strong]:font-bold font-light text-base`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden mt-auto">
          <div className="w-full h-px bg-border" />
          <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </div>
      </div>
    </motion.div>
  );
}

export default Step5;
