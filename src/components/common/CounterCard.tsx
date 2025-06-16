"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CounterCardProps {
  value: string;
  label: string;
}

export default function CounterCard({ value, label }: CounterCardProps) {
  return (
    <div
      className="
        relative 
        bg-white 
        text-black 
        shadow-md 
        rounded-xl 
        px-6 py-4 
        min-w-[233px] 
        h-[176px] 
        flex flex-col items-center justify-center
        transition-all duration-[800ms] 
        border border-transparent
        hover:border-[#006BFF]
        before:absolute before:inset-0 before:rounded-xl 
        before:transition-all before:duration-[800ms]
        before:opacity-0 hover:before:opacity-100 
        before:bg-[radial-gradient(100%_132.81%_at_50%_100%,rgba(0,107,255,0.2)_0%,rgba(255,255,255,0)_100%)]
        z-10 overflow-hidden
      "
    >
      <div className="relative z-10 flex flex-col items-center">
        <p className={cn(
          "font-normal",
          value === "600.000" ? "md:text-[40px] text-3xl" : "md:text-[53px] text-4xl"
        )}>
          {value}
        </p>
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
}
