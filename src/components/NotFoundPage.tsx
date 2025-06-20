import { useTranslations } from "next-intl";
import SectionWrapper from "./common/SectionWrapper";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "./ui/button";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <SectionWrapper className="flex-col flex items-center justify-center  h-[70vh] container text-center">
      <p className="max-w-[460px]">{t("description")}</p>
      <Link  href="/" className={buttonVariants({ variant: "default", className: "mt-6 !text-white" })}>
        {t("backToHome")}
      </Link>
    </SectionWrapper>
  );
}
