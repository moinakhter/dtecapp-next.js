"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
const LocaleSwitcher = (
  {
    className,
  }: React.HTMLAttributes<HTMLAnchorElement> & { className?: string } = {
    className: "",
  }
) => {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const [otherLocale, setOtherLocale] = useState("");

  useEffect(() => {
    if (locale === "en") {
      setOtherLocale("tr");
    } else {
      setOtherLocale("en");
    }
  }, [locale]);

  const pathName = usePathname();

  return (
    <Link href={pathName} locale={otherLocale}>
      <span
        className={cn(
          className,
          "text-sm font-medium hover:text-accent transition-colors duration-200"
        )}
      >
        {t("locale")}
      </span>
    </Link>
  );
};

export default LocaleSwitcher;
