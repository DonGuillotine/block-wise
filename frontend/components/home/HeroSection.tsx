import React from 'react'
import MaxWrapper from '../shared/MaxWrapper'
import hero1 from "@/public/home/1.png"
import hero2 from "@/public/home/2.png"
import hero3 from "@/public/home/3.png"
import Image from 'next/image'
import fav from "@/public/favicon-blue.png"


const HeroSection = () => {
    return (
        <section className='w-full bg-clPrimary py-16'>
            <MaxWrapper className='grid md:grid-cols-2 md:gap-16 gap-8 md:px-12 px-4'>
                {/* text */}
                <div className='w-full flex flex-col items-start justify-center md:gap-6 gap-4 order-2 md:order-1'>
                    <h1 className='md:text-6xl text-4xl font-semibold text-gray-200 tracking-wide '>Learn and Thrive with <span className='text-clSecondary'>AI-Powered</span> Courses.</h1>
                    <p className='text-gray-300 text-lg'>A decentralized learning platform where knowledge is rewarded with NFTs. Advance by mastering your skills, or retake courses to perfect them.</p>
                    <button type='button' className='bg-clSecondary px-8 py-3 text-clPrimary rounded'>
                        Explore courses
                    </button>
                </div>

                {/* image */}
                <div className='w-full flex flex-col gap-4 order-1 md:order-2'>
                    <div className='w-full md:h-[450px] h-[350px] grid grid-cols-2 grid-rows-2 gap-2'>
                        <div className='w-full h-full col-span-2'>
                            <Image src={hero1} alt="hero Image" className='w-full h-full object-cover object-top rounded-t-3xl border-[2px] border-clSecondary/50' width={2372} height={1060} quality="100" priority />
                        </div>
                        <div className='w-full h-full'>
                            <Image src={hero2} alt="hero Image" className='w-full h-full object-cover object-top rounded-es-3xl border-[2px] border-clSecondary/50' width={908} height={1112} quality="100" priority />
                        </div>
                        <div className='w-full h-full'>
                            <Image src={hero3} alt="hero Image" className='w-full h-full object-cover object-top rounded-ee-3xl border-[2px] border-clSecondary/50' width={1372} height={1112} quality="100" priority />
                        </div>
                    </div>
                </div>
            </MaxWrapper>
        </section>
    )
}

export default HeroSection