import Image from "next/image";

import MindsBanner from "@/components/HomePage/minds-meet";
import FloatingBalls from "@/components/common/FloatingBalls";
import SigninForm from "./Form";

import React from "react";

const CarAssistantPage = () => {
  return (
    <>
      <section className="relative md:p-0 p-2  md:mt-[250px] mt-[200px]  lg:min-h-screen w-full  ">
        <FloatingBalls />
        <div className="relative z-10  container  gap-28  md:gap-[196px] flex md:flex-row flex-col items-center justify-between  w-full ">
          <div className="relative w-full   md:w-1/2">
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
          <SigninForm />
        </div>
      </section>

      <MindsBanner />
    </>
  );
};
export default CarAssistantPage;
