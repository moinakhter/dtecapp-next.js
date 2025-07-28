"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/common/SectionWrapper";
import { useRouter } from "@/i18n/navigation";
import TextGradientWhite from "@/components/common/text-gradient-white";
import { cn } from "@/lib/utils";
import FloatingBalls from "@/components/common/FloatingBalls";
import Image from "next/image";
import MindsBanner from "@/components/HomePage/minds-meet";
import CustomerList from "./CustomerList";
import { useTranslations } from "next-intl";

interface UserData {
  username: string;
  email: string;
  company: string;
  storeUrl: string;
  dtecToken: string;
  tokenExpiry: string;
  expired: boolean;
}

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t= useTranslations("CustomerList");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user", {
          credentials: "include",
        });

        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.error || t("failed_to_fetch_user"));
        }

        const result = await res.json();
        setUserData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/products/shopify-assistant/signin");
  };

  if (loading) {
    return (
      <SectionWrapper className="text-center py-[128px]">
        {t("loading")}
      </SectionWrapper>
    );
  }

  if (error || !userData) {
    return (
      <SectionWrapper className="text-center py-[128px] text-red-500">
        {t("unauthorized")}
      </SectionWrapper>
    );
  }
  return (
    <>
      <section className="relative md:p-0 p-2  md:mt-[250px] mt-[200px]  lg:min-h-screen w-full  ">
        <FloatingBalls />
        <div className="relative z-10  container  gap-28  md:gap-[196px] flex md:flex-row flex-col items-start justify-between  w-full ">
          <div className="relative w-full   md:w-1/3">
            <div className="relative rounded-3xl md:p-8 overflow-hidden">
              <Image
                src="/images/Icons/shopify-light.svg"
                alt="DTEC Car Assistant"
                width={449}
                height={128}
                className="w-full  md:max-w-[449px] max-w-[300px] mx-auto h-auto block dark:hidden rounded-2xl"
                priority
              />
              <Image
                src="/images/Icons/shopify-dark.svg"
                alt="DTEC Car Assistant"
                width={449}
                height={128}
                className="w-full  md:max-w-[449px] max-w-[300px] mx-auto dark:block hidden h-auto rounded-2xl"
                priority
              />
            </div>
          </div>
          <div className="relative z-10 flex flex-col w-full mx-auto max-w-[416px] md:w-3/4">
            <TextGradientWhite
              text={t("storetitle")}
              className="text-3xl font-bold w-full md:px-0 px-3"
            />

            <div className="flex text-[13px] font-medium flex-col gap-8 md:p-2 px-4  my-8">
              {/* <div className="flex justify-between ">
                <span>View Store Customers:</span>
                <a
                  href={userData?.storeUrl}
                  target="_blank"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                    className: "!text-white",
                  })}
                >
                  Click Here
                </a>
              </div> */}

              <div className="flex justify-between ">
                <span>{t("username")}:</span>
                <span>{userData?.username}</span>
              </div>

              <div className="flex justify-between ">
                <span>{t("email")}:</span>
                <span>{userData?.email}</span>
              </div>

              <div className="flex justify-between ">
                <span>{t("company")}:</span>
                <span>{userData?.company}</span>
              </div>

              <div className="flex justify-between ">
                <span>{t("shopify_store")}:</span>
                <a
                  href={userData?.storeUrl}
                  target="_blank"
                  className="text-blue-400"
                >
                  {userData?.storeUrl}
                </a>
              </div>

              <div className="flex justify-between items-center ">
                <span className="w-full">{t("dtec_access_token")}:</span>

                <div className="flex w-full items-center">
                  <input
                    type="text"
                    readOnly
                    value={userData?.dtecToken}
                    className="bg-card py-[12px] px-1 rounded-xl truncate w-full mr-2"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      navigator.clipboard.writeText(userData?.dtecToken || "")
                    }
                  >
                    {t("copy_token")}
                  </Button>
                </div>
              </div>

              <div className="flex justify-between ">
                <span>{t("expired_status")}:</span>
                <span
                  className={cn(
                    userData?.expired ? "bg-red-500" : "bg-green-500",
                    "rounded-lg p-3 text-white font-bold"
                  )}
                >
                  {userData?.expired ? t("yes") : t("no")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>{t("token_expiry")}:</span>
                <span>
                  {userData?.tokenExpiry
                    ? (() => {
                        const expiry = new Date(userData.tokenExpiry);
                        const now = new Date();
                        const diffMs = expiry.getTime() - now.getTime();
                        if (diffMs <= 0) return t("expired");
                        const diffDays = Math.floor(
                          diffMs / (1000 * 60 * 60 * 24)
                        );
                        if (diffDays > 30) {
                          const months = Math.floor(diffDays / 30);
                          return `${months} month${months > 1 ? "s" : ""} left`;
                        }
                        if (diffDays >= 1) {
                          return `${diffDays} day${
                            diffDays > 1 ? "s" : ""
                          } left`;
                        }
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        if (diffHours >= 1) {
                          return `${diffHours} hour${
                            diffHours > 1 ? "s" : ""
                          } left`;
                        }
                        const diffMinutes = Math.floor(diffMs / (1000 * 60));
                        return `${diffMinutes} minute${
                          diffMinutes > 1 ? "s" : ""
                        } left`;
                      })()
                    : "-"}
                </span>
              </div>

              <Button onClick={handleLogout} variant="outline" className="mt-4">
                {t("logout")}
              </Button>
            </div>
          </div>
          <div className="lg:w-1/3"></div>
        </div>
      </section>

      <SectionWrapper className="text-center py-16 container">
        {/* Customer List Section */}
        <TextGradientWhite
          text={t("shopify_customers")}
          className="text-3xl font-bold md:px-0 px-3 mt-12"
        />

        <div className="md:px-2 px-4 mt-6">
          {userData && <CustomerList storeUrl={userData.storeUrl} />}
        </div>
      </SectionWrapper>
      <MindsBanner />
    </>
  );
};

export default DashboardPage;
