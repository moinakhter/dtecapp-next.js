import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import localFont from "next/font/local";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const Celias = localFont({
  src: [
    {
      path: "../../public/Fonts/Celias-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Celias-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Celias-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Celias-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Celias-Hairline.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Celias-HairlineItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Celias-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Celias-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Celias-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Celias-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Celias-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Celias-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Celias-ThinItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Celias.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});