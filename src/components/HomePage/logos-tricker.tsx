import Image from 'next/image'
import React from 'react'

const LogosTicker = () => {
  return (
  <div className="w-full  h-full   flex items-center justify-center  py-[128px] relative">
        <div className="w-full h-[90px]   z-10">
          <div className="flex items-center justify-around gap-8 w-full h-full overflow-x-auto scrollbar-hide">
            {[
              "/images/Hero/logos/itu-cekirdek-beyaz.png",
              "/images/Hero/logos/kosgeb_logo_beyaz.png",
              "/images/Hero/logos/teknofest_logo_beyaz 1.png",
              "/images/Hero/logos/tübitak_logo_beyaz.png",
              "/images/Hero/logos/kosgeb_logo_beyaz.png",
              "/images/Hero/logos/teknofest_logo_beyaz 1.png",
              "/images/Hero/logos/tübitak_logo_beyaz.png",
            ].map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                width={100}
                height={50}
            
                className=" opacity-80 brightness-[0.3] dark:brightness-[0.8]   grayscale z-40 invert dark:invert-0 transition-all"
              />
            ))}
          </div>
       
        </div>
      </div>
  )
}

export default LogosTicker