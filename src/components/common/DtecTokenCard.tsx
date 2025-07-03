import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React from "react";

const DtecTokenCard = ({
  className = "w-[258px] h-[180px]",
  text="text-lg",
 
}: {
  className?: string;
  text?:string,
  children?: React.ReactNode;
}) => {
  return (
    <Link
      href="https://dtec.space/"
        target="_blank"
          rel="noopener noreferrer"
          title="DTEC Token"
      className={`relative cursor-pointer  group rounded-xl overflow-hidden shadow-lg ${className}`}
    >
  
      <Image
        src="/images/dtec-token.png"
        alt="DTEC Token"
        fill
        quality={100}
        className="object-cover relative   transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute bottom-4 left-4 z-10">
        <p
        
          className={`!text-white  ${text}  font-bold flex items-center gap-1  transition-transform duration-300 ease-in-out  group-hover:scale-105`}
        
        >
          DTEC Token
          <span className="text-[12px]">↗</span>
        </p>
      </div>
    </Link>
  );
};

export default DtecTokenCard;
