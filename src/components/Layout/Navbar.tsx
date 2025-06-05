"use client"

import { ChevronDown, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <nav className="w-full bg-blue-100/60 !px-4  !my-5 max-h-[90px] h-full rounded-2xl  !py-4 !md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* <div className="text-2xl font-bold text-gray-900">DTEC</div> */}
          <Image src="/images/logo/logo-light.png" alt="DTEC Logo" width={40} height={40} quality={100} className="ml-2 w-[99px] h-[24px]" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center !space-x-[36px] md:flex">
          <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors">
            Ürünlerimiz
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
            Hakkımızda
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors">
              <span>DTEC Token</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Token Bilgileri</DropdownMenuItem>
              <DropdownMenuItem>Whitepaper</DropdownMenuItem>
              <DropdownMenuItem>Tokenomics</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center !space-x-6">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-700 hover:text-gray-900 font-medium">EN</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Türkçe</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-700 hover:text-gray-900">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Download Assistant Button */}
          <Button className="bg-blue-500 hover:bg-blue-600 text-white  !p-[12px] rounded-lg font-medium">
            Asistanı İndirin
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-gray-700">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </nav>
  )
}
