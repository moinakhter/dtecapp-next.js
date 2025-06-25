import { cn } from '@/lib/utils'
import React from 'react'

const SectionWrapper = ({children,className}:{
    children: React.ReactNode,
    className?: string
  
}) => {
  return (
    <section className={cn("w-full h-full flex items-center justify-center lg:py-24 lg:px-4 py-8 px-2  md:py-16", className)}>
        
      {children}
    </section>
  )
}

export default SectionWrapper
