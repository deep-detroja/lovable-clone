import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Zap } from 'lucide-react';

const Header = () => {
  return (
     <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md ">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image
            src="/logo.png"
            alt="Forge"
            width={100}
            height={100}
            className="h-9 w-auto rounded-md"
          />
        </Link>

         {/* Right side */}
        <div className="flex items-center gap-5">
          
            <Link
              href="/projects"
              className="text-[15px] font-medium text-white/90 transition-colors hover:text-white/50"
            >
              Projects
            </Link>
            <span className='inline-flex h-8 items-center gap-1.5 rounded-full border-white/10 bg-white/5 px-3 text-sm text-white/90  hover:text-white/50 '>
                <Zap className='h-3 w-3 fill-white/90  hover:text-white/50 '/>
                 3 / 50 credits
            </span>
            </div>
        </nav>
        </header>
  )
}

export default Header