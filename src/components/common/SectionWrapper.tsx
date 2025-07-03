import { cn } from '@/lib/utils'
import React from 'react'

const SectionWrapper = ({children,className}:{
    children: React.ReactNode,
    className?: string
  
}) => {
  return (
      <section className={cn("w-full   mx-auto   lg:py-24 l  py-8  md:py-16", className)}>

        
      {children}
    </section>
  )
}

export default SectionWrapper
