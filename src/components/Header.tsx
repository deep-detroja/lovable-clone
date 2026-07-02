import Link from "next/link";
import Image from "next/image";
import { Zap } from 'lucide-react';
import { SignInButton,SignUpButton,Show,UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
     <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md ">
      <nav className="mx-auto  flex h-full max-w-7xl   items-center justify-around  ">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ">
          <Image
            src="/logo.png"
            alt="Forge"
            width={100}
            height={100}
            className="h-10 w-auto rounded-md"
          />
        </Link>

         {/* Right side */}
         <Show when="signed-in">
              
        <div className="flex items-center gap-5">
          
            <Link
              href="/projects"
              className="text-[15px] font-medium text-white/90 transition-colors hover:text-white/50"
            >
              Projects
            </Link>
            <Link
              href="/projects"
              className="text-[15px] font-medium text-white/90 transition-colors hover:text-white/50"
            >
              Community
            </Link>
            <Link
              href="/projects"
              className="text-[15px] font-medium text-white/90 transition-colors hover:text-white/50"
            >
              Price
            </Link>
            </div>

            <div className='flex items-center gap-5'>
            <span className='inline-flex h-8 items-center gap-2 rounded-full border-white/10 bg-white/5 px-3 text-sm text-white/90  hover:text-white/50 '>
                <Zap className='h-3 w-3 fill-white/90  hover:text-white/50 '/>
                 3 / 50 credits
            </span>
            <UserButton />
            </div>
            </Show>
            
            <div>
            <Show when="signed-out">
              <SignInButton mode='modal' />
              <SignUpButton mode='modal'>
                <button className="mx-5  text-white/90  hover:text-white/50 text-[15px] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            
            </div>
        </nav>
        </header>
  )
}

export default Header