import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/public/logo-white.png"

const Footer = () => {
    return (
        <footer className="bg-clPrimary">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src={logo} className="md:w-[150px] w-[120px]" alt="Flowbite Logo" />
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 ">
                        <li>
                            <Link href="/contract" className="hover:underline me-4 md:me-6">Home</Link>
                        </li>
                        <li>
                            <Link href="/courses" className="hover:underline me-4 md:me-6">Courses</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-300 sm:text-center">© 2024 Chainlearn. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer