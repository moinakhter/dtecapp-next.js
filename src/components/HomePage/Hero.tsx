import Image from "next/image"


 

export const Hero = () => {
  return (
    <section className="h-screen">
        <Image fill src="/images/Hero/hero.png" alt="Hero Image" className="object-cover" />

    </section>
  )
}
