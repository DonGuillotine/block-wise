'use client'
import React, { useCallback, useEffect, useState } from 'react'
import MaxWrapper from './MaxWrapper'
import Logo from './Logo'
import Link from 'next/link'
import logoBlue from "@/public/logo-blue.png"
import logoWhite from "@/public/logo-white.png"
import { usePathname, useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'

const NavBar = () => {
    const [showMobileNav, setShowMobileNav] = useState(false)
    const { isConnected } = useAccount()
    const router = useRouter()

    const pathname = usePathname();

    useEffect(() => {
        if (showMobileNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    })

    const change = useCallback(async () => {
        if (isConnected) {
            router.push('/setup');
        }
    }, [isConnected, router]);

    useEffect(() => {
        change();
    }, [change, isConnected]);

    return (
        <header className="w-full overflow-hidden">
            <div className={`w-full h-20 lg:px-8 md:px-4 py-3 transition-all duration-150 bg-white rounded-3xl`}>
                <MaxWrapper className="h-full w-full flex items-center justify-between">
                    <Logo href="/" classname="md:w-[150px] w-[120px]" image={logoBlue} />

                    <div className="hidden md:flex h-full items-center gap-7 justify-center">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={`text-base  text-clPrimary relative z-[1] before:content-[''] before:absolute before:w-[7px] before:h-[7px] before:rounded-full before:opacity-0 before:transition-all before:duration-[0.3s] before:ease-[ease-out] before:delay-[0s]  before:top-2 before:-left-2.5 before:bg-clPrimary hover:text-lightgreen  hover:before:opacity-100 ${pathname === link.href && "text-lightgreen before:opacity-100"}`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center justify-end gap-3">

                        <w3m-button />


                        <div className="md:hidden">
                            <button onClick={() => setShowMobileNav(!showMobileNav)} className="bg-clPrimary text-white rounded-[10px] p-1.5" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                </svg>
                            </button>
                        </div>



                        {/* Mobile */}
                        <div className={`fixed top-0 z-[99] w-full h-[100dvh] bg-clSecondary transition-all duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] lg:hidden flex justify-end ${showMobileNav ? "left-0" : "left-[100%]"}`}>
                            <div className={`w-[80%] h-full bg-clPrimary flex flex-col gap-10 transition-all duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] px-8 py-8 delay-300 ${showMobileNav ? "translate-x-0" : "translate-x-full"}`}>
                                <header className="flex justify-between items-center w-full">
                                    <Logo href="/" classname="w-[120px]" image={logoWhite} />
                                    <button type="button" className="text-2xl text-white" onClick={() => setShowMobileNav(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </header>

                                <ul className="flex flex-col lg:hidden mt-10 items-start gap-6">
                                    {
                                        navLinks.map((link, index) => (
                                            <li className="block relative list-none group" key={index}>
                                                <Link
                                                    className={`text-sm font-bold uppercase text-gray-100 block leading-none relative tracking-[0.8px] z-[1] font-barlow before:content-[''] before:absolute before:w-[7px] before:h-[7px]
                                            before:rounded-full before:opacity-0 before:transition-all before:duration-[0.3s] before:ease-[ease-out] before:delay-[0s]  before:top-1 before:-left-3 before:bg-clSecondary group-hover:text-clSecondary  group-hover:before:opacity-100 ${pathname === link.href && "text-lightgreen before:opacity-100"}`}
                                                    href={link.href}
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </MaxWrapper>
            </div>
        </header>
    )
}

export default NavBar

export const navLinks = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Courses",
        href: "/courses",
    },
]