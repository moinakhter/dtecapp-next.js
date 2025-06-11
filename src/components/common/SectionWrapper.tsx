import { cn } from '@/lib/utils'
import React from 'react'

const SectionWrapper = ({children,className}:{
    children: React.ReactNode,
    className?: string
}) => {
  return (
    <section className={cn("w-full h-full flex items-center justify-center lg:py-[128px] lg:px-4 py-8 px-1  md:py-16 bg-background", className)}>
        
      {children}
    </section>
  )
}

export default SectionWrapper
