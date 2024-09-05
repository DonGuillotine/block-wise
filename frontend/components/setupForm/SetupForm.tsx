'use client'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'

const SetupForm = () => {
    const router = useRouter()
    return (
        <main className='w-full flex flex-col justify-center items-center px-4 py-20 relative'>
            <div className='max-w-lg rounded w-full bg-white flex flex-col gap-4 px-6 py-10'>
                <h1 className='md:text-2xl text-xl font-semibold text-clPrimary tracking-wide text-center'>Set Preference</h1>

                <form className='flex flex-col gap-5 '>
                    <div className='w-full'>
                        <Select
                            isRequired
                            label="Topics"
                            placeholder="Select your interests"
                            selectionMode="multiple"
                            className="w-full "
                            color='default'
                        >
                            {topics.map((topic) => (
                                <SelectItem key={topic.key} className='text-gray-800'>
                                    {topic.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className='w-full'>
                        <Input type="number" isRequired label="Study hours per week" />
                    </div>

                    <div className='w-full'>
                        <Select
                            isRequired
                            label="Skill level"
                            placeholder="Pick your skill level"
                            className="w-full"
                            color='default'
                        >
                            {levels.map((level) => (
                                <SelectItem key={level.key} className='text-gray-800'>
                                    {level.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className='w-full'>
                        <Select
                            isRequired
                            label="Learning pace"
                            placeholder="Choose your pace"
                            className="w-full"
                            color='default'
                        >
                            {pace.map((ace) => (
                                <SelectItem key={ace.key} className='text-gray-800'>
                                    {ace.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className='w-full'>
                        <Textarea
                            label="Learning goals"
                            placeholder="Type here..."
                            className="w-full"
                            isRequired
                        />
                    </div>

                    <button type='submit' className='w-full mt-4 bg-clPrimary text-white rounded py-2 px-4'>Submit</button>

                </form>
            </div>

            <button type='button' className='absolute top-5 md:top-8 left-5 md:left-8 bg-clPrimary text-gray-200 rounded px-4 py-2' onClick={() => router.back()}>
                <HiOutlineArrowNarrowLeft />
            </button>
        </main>
    )
}

export default SetupForm

const topics = [
    {
        key: "defi",
        label: "DeFi",
    },
    {
        key: "nft",
        label: "NFT",
    },
    {
        key: "blockchain",
        label: "Blockchain",
    },
    {
        key: "web3",
        label: "Web3",
    },
    {
        key: "cryptocurrency",
        label: "Cryptocurrency",
    },
    {
        key: "security",
        label: "Security",
    }
]

const levels = [
    {
        key: "beginner",
        label: "Beginner",
    },
    {
        key: "intermediate",
        label: "Intermediate",
    },
    {
        key: "advanced",
        label: "Advanced",
    }
]

const pace = [
    {
        key: "fast",
        label: "Fast",
    },
    {
        key: "slow",
        label: "Slow",
    },
    {
        key: "moderate",
        label: "Moderate",
    }
]