import React from 'react'
import MaxWrapper from '../shared/MaxWrapper'
import Image from 'next/image'
import img from "@/public/home/4.png"
import favi from "@/public/favicon-white.png"

const AboutUs = () => {
    return (
        <section className='w-full bg-white md:py-28 py-20'>
            <MaxWrapper className='grid md:grid-cols-2 md:gap-16 gap-8 md:px-12 px-4'>

                {/* image */}
                <div className='w-full flex flex-col gap-4 order-2 md:order-1'>
                    <div className='w-full md:h-[600px] h-[400px] relative'>
                        <Image src={img} alt="hero Image" className='w-full h-full object-cover rounded-ee-[70%]' width={626} height={417} quality="100" priority />
                        <div className='w-[200px] h-[200px] bg-clPrimary rounded-ee-[50%] absolute -bottom-8 right-8 flex justify-center items-center shadow-2xl p-6'>
                            <Image src={favi} alt="hero Image" className='w-[130px]' width={668} height={608} quality="100" priority />
                        </div>
                    </div>
                </div>

                {/* text */}
                <div className='w-full flex flex-col items-start justify-center md:gap-6 gap-4 order-1 md:order-2'>
                    <h1 className='md:text-4xl text-3xl font-semibold text-clPrimary tracking-wide '>About ChainLearn</h1>
                    <p className='text-gray-800 text-base'>At ChainLearn, we believe that education should be as rewarding as it is transformative. Our decentralized platform combines artificial intelligence and blockchain technology to offer personalized learning experiences that adapt to your needs and reward you with exclusive NFTs for every course you complete.</p>
                    <p className='text-gray-800 text-base'>Our mission is to empower learners by providing them with the tools to advance their knowledge in a secure, transparent, and community-driven environment. Each NFT you earn on ChainLearn is more than just a digital badge—it’s a testament to your hard work and growth.</p>
                    <p className='text-gray-800 text-base'>Founded by a team passionate about technology and education, ChainLearn was created to break down barriers and make learning more dynamic, rewarding, and accessible. Join us on this journey, where every step you take in your education is recognized and truly yours to own.</p>
                </div>


            </MaxWrapper>
        </section>
    )
}

export default AboutUs