import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
function FeatureCard({
  icon: Icon,
  title,
  description,
  className

}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
    className?: string;
}) {
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    className={cn(
        "group   w-full flex gap-[24px] md:text-start text-center flex-col h-full",
        className 
      )}
      >
        <div className="flex flex-col space-y-4">
          {/* Icon at the top */}
          {Icon && (
            <div className="w-fit">
              <Icon className="h-6 w-6 text-foreground group-hover:text-secondary transition-colors" />
            </div>
          )}

          <h3 className="text-xl font-medium mb-2.5  group-hover:text-secondary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-base font-light">{description}</p>
        </div>
        {/* Bottom separator line */}
        <div className="relative  overflow-hidden mt-auto">
          <div className="w-full h-px bg-border" />
          <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </div>
      </motion.div>
    </>
  );
}

export default FeatureCard;
