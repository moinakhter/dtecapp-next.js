import { cn } from '@/lib/utils'
import React from 'react'

const SectionWrapper = ({children,className}:{
    children: React.ReactNode,
    className?: string
  
}) => {
  return (
      <section className={cn("w-full max-w-[1280px]  mx-auto px-4  lg:py-24 lg:px-4 py-8  md:py-16", className)}>

        
      {children}
    </section>
  )
}

export default SectionWrapper
