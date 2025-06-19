"use client";

import SectionWrapper from "@/components/common/SectionWrapper";
 
import Error from "next/error";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <SectionWrapper className="flex items-center justify-center   container text-center">
          <Error statusCode={404} />;
        </SectionWrapper>
      </body>
    </html>
  );
}
