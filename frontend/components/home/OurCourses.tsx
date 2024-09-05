import React from 'react'
import MaxWrapper from '../shared/MaxWrapper'
import Image from 'next/image'
import Img1 from "@/public/home/14.png"
import Img2 from "@/public/home/15.png"
import Img3 from "@/public/home/16.png"


const OurCourses = () => {
    return (
        <section className='w-full md:py-20 py-16'>
            <MaxWrapper className='flex flex-col gap-10 md:px-12 px-4'>

                <h1 className='md:text-4xl text-3xl font-semibold text-clPrimary tracking-wide text-center'>Our Courses</h1>
                <main className='w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-10 gap-6 md:px-12 px-4' >
                    {
                        courses.map((course, index) => (
                            <div className='w-full flex flex-col gap-3 p-6 rounded bg-white' key={index}>
                                <div className='w-full md:h-[200px] h-[200px]'>
                                    <Image src={course.img} alt="hero Image" className='w-full h-full object-cover border-[10px] rounded border-clSecondary/10' width={1640} height={1056} quality="100" priority />
                                </div>
                                <h4 className='text-clPrimary font-medium'>{course.name}</h4>
                                <p className='text-gray-500'>{course.desc}</p>
                                <button type='button' className='bg-clPrimary px-8 py-3 text-gray-300 rounded'>View</button>
                            </div>
                        ))
                    }

                </main>
            </MaxWrapper>
        </section>
    )
}

export default OurCourses

export const courses = [
    {
        name: "Blockchain Basics",
        desc: "Learn the basics of blockchain technology and its use in web3.",
        img: Img1,
    },
    {
        name: "Web3.0",
        desc: "Learn the basics of blockchain technology and its use in web3.",
        img: Img2,
    },
    {
        name: "NFTs",
        desc: "Learn the basics of blockchain technology and its use in web3.",
        img: Img3,
    },
]