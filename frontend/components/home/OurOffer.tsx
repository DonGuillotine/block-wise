import React from 'react'
import MaxWrapper from '../shared/MaxWrapper'
import Image from 'next/image'
import img1 from "@/public/home/9.png"
import img2 from "@/public/home/10.png"
import img3 from "@/public/home/11.png"
import img4 from "@/public/home/12.png"
import img5 from "@/public/home/13.png"

const OurOffer = () => {
    return (
        <section className='w-full bg-clPrimary md:py-20 py-16'>
            <MaxWrapper className='flex flex-col gap-10 md:px-12 px-4'>

                <h1 className='md:text-4xl text-3xl font-semibold text-clSecondary tracking-wide text-center'>Our Offers</h1>

                <main className='grid md:grid-cols-2 md:gap-10 gap-6 md:px-12 px-4'>

                    {/* image */}
                    <div className='w-full flex flex-col gap-4'>
                        <div className='w-full md:h-[500px] h-[400px]'>
                            <Image src={img1} alt="hero Image" className='w-full h-full object-cover border-[10px] rounded border-clSecondary/30' width={2344} height={2156} quality="100" priority />
                        </div>
                    </div>

                    {/* image */}
                    <div className='w-full grid grid-cols-2 grid-rows-2 md:gap-8 gap-4'>
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-clSecondary/30 rounded">
                            <Image src={img2} alt="hero Image" className='w-full h-full object-cover rounded' width={1000} height={620} quality="100" priority />
                            <h4 className='text-clSecondary font-medium'>AI Powered Learning</h4>
                        </div>
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-clSecondary/30 rounded">
                            <Image src={img3} alt="hero Image" className='w-full h-full object-cover rounded' width={1000} height={620} quality="100" priority />
                            <h4 className='text-clSecondary font-medium'>NFT Rewards</h4>
                        </div>
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-clSecondary/30 rounded">
                            <Image src={img4} alt="hero Image" className='w-full h-full object-cover rounded' width={1000} height={620} quality="100" priority />
                            <h4 className='text-clSecondary font-medium'>Decentralized & Secured</h4>
                        </div>
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-clSecondary/30 rounded">
                            <Image src={img5} alt="hero Image" className='w-full h-full object-cover rounded' width={1000} height={620} quality="100" priority />
                            <h4 className='text-clSecondary font-medium'>Personalised Learning</h4>
                        </div>
                    </div>
                </main>
            </MaxWrapper>
        </section>
    )
}

export default OurOffer