'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import nft from "@/public/home/18.png"
import Image from 'next/image'
import MaxWrapper from '../shared/MaxWrapper'

const Feats = () => {
    const path = usePathname()
    return (
        <section className='w-full flex flex-col'>
            <div className='w-full flex gap-6 items-center justify-center py-5'>
                <Link href="/user" className={`text-clPrimary ${path === '/user' && 'underline underline-offset-4'}`}>Course</Link>
                <Link href="/user/achievements" className={`text-clPrimary ${path === '/user/achievements' && 'underline underline-offset-4'}`}>Achievements</Link>
            </div>

            <MaxWrapper className='w-full grid lg:grid-cols-4 md:grid-cols-2 md:gap-8 gap-6 px-8'>
                <div className='w-full h-[300px] p-4 rounded bg-white'>
                    <Image src={nft} alt="hero Image" className='w-full h-full object-cover rounded' width={1880} height={1712} quality="100" priority />
                </div>
            </MaxWrapper>
        </section>
    )
}

export default Feats