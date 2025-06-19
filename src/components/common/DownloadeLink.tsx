"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function DownloadButton({ title }: { title?: string }) {
  const [link, setLink] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      setLink(
        "https://play.google.com/store/apps/details?id=com.dizaynvip.dtec&pcampaignid=web_share"
      );
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setLink("https://apps.apple.com/tr/app/dtec/id6473634753");
    } else if (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1) {
      setLink("https://apps.apple.com/tr/app/dtec/id6473634753");
    } else {
      setLink(
        "https://play.google.com/store/apps/details?id=com.dizaynvip.dtec&pcampaignid=web_share"
      );
    }
  }, []);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Button className="bg-secondary   hover:bg-blue-600 text-white !p-[12px] rounded-lg font-medium">
        {title}
      </Button>
    </a>
  );
}
