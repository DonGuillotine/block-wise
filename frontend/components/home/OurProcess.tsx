import React from 'react'
import MaxWrapper from '../shared/MaxWrapper'
import icon1 from "@/public/home/5.png"
import icon2 from "@/public/home/6.png"
import icon3 from "@/public/home/7.png"
import icon4 from "@/public/home/8.png"
import Image from 'next/image'

const OurProcess = () => {
    return (
        <section className='w-full md:py-28 py-20'>
            <MaxWrapper className='md:px-12 px-4'>
                <main className='flex flex-col gap-10'>
                    <h1 className='md:text-4xl text-3xl font-semibold text-clPrimary tracking-wide text-center'>Our Process Workflow</h1>

                    <div className='w-full grid grid-cols-2 gap-10'>
                        <ol className="relative border-s border-clPrimary">
                            <li className="mb-10 ms-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8 ring-white">
                                    <Image src={icon1} alt="icon" className='w-full h-full' width={50} height={65} />
                                </span>
                                <div className='rounded-md bg-white p-4'>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-clPrimary">Connect Wallet & Select Interest </h3>
                                    <p className="mb-4 text-base font-normal text-gray-600">Start your journey by connecting your blockchain wallet and choosing your areas of interest. This helps us tailor course recommendations just for you.</p>
                                </div>
                            </li>
                            <li className="mb-10 ms-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <Image src={icon2} alt="icon" className='w-full h-full' width={240} height={245} />
                                </span>
                                <div className='rounded-md bg-white p-4'>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-clPrimary">Start learning  Course </h3>
                                    <p className="mb-4 text-base font-normal text-gray-600">Dive into your selected course, where AI-generated content adapts to your pace and learning style. Engage with interactive modules and quizzes to deepen your understanding.</p>
                                </div>
                            </li>
                        </ol>

                        <ol className="relative border-s border-clPrimary">
                            <li className="mb-10 ms-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8 ring-white">
                                    <Image src={icon3} alt="icon" className='w-full h-full' width={50} height={65} />
                                </span>
                                <div className='rounded-md bg-white p-4'>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-clPrimary">Connect Wallet & Select Interest </h3>
                                    <p className="mb-4 text-base font-normal text-gray-600">Start your journey by connecting your blockchain wallet and choosing your areas of interest. This helps us tailor course recommendations just for you.</p>
                                </div>
                            </li>
                            <li className="mb-10 ms-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <Image src={icon4} alt="icon" className='w-full h-full' width={240} height={245} />
                                </span>
                                <div className='rounded-md bg-white p-4'>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-clPrimary">Start learning  Course </h3>
                                    <p className="mb-4 text-base font-normal text-gray-600">Dive into your selected course, where AI-generated content adapts to your pace and learning style. Engage with interactive modules and quizzes to deepen your understanding.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </main>
            </MaxWrapper>
        </section>
    )
}

export default OurProcess