// app/[locale]/loading.js
"use client";

export default function Loading() {
  return (
    <div className="flex items-center relative justify-center h-screen ">
      <div className="flex flex-col items-center justify-center">
        <div className="loader"></div>
      </div>
    </div>
  );
}