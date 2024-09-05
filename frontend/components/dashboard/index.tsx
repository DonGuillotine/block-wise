'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import thumbnail from "@/public/home/17.png"
import Image from 'next/image'

const Home = () => {
    const path = usePathname()
    return (
        <section className='w-full flex flex-col'>
            <div className='w-full flex gap-6 items-center justify-center py-5'>
                <Link href="/user" className={`text-clPrimary ${path === '/user' && 'underline underline-offset-4'}`}>Course</Link>
                <Link href="/user/achievements" className={`text-clPrimary ${path === '/user/achievements' && 'underline underline-offset-4'}`}>Achievements</Link>
            </div>

            <main className='w-full max-w-3xl mx-auto md:mb-20 mb-12 mt-12 bg-white p-6 flex flex-col gap-4'>
                <div className='w-full h-[250px]'>
                    <Image src={thumbnail} alt="hero Image" className='w-full h-full object-cover' width={2760} height={1160} quality="100" priority />
                </div>

                <h2 className='text-clPrimary md:text-3xl text-2xl font-medium'>Basics of Blockchain</h2>

                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum massa orci, pulvinar vel egestas id, iaculis eget sapien. Morbi justo leo, pulvinar ac vehicula eget, accumsan in mauris. Donec magna libero, tempus sit amet commodo ac, malesuada a est. </p>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum massa orci, pulvinar vel egestas id, iaculis eget sapien. Morbi justo leo, pulvinar ac vehicula eget, accumsan in mauris. Donec magna libero, tempus sit amet commodo ac, malesuada a est. </p>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum massa orci, pulvinar vel egestas id, iaculis eget sapien. Morbi justo leo, pulvinar ac vehicula eget, accumsan in mauris. Donec magna libero, tempus sit amet commodo ac, malesuada a est. </p>
            </main>
        </section>
    )
}

export default Home