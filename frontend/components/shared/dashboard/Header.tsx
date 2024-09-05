'use client'
import React, { useCallback, useEffect } from 'react'
import logoBlue from "@/public/logo-blue.png"
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import MaxWrapper from '../MaxWrapper'
import Logo from '../Logo'

const Header = () => {
    const { isConnected } = useAccount()
    const router = useRouter()

    const change = useCallback(async () => {
        if (!isConnected) {
            router.push('/');
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

                    <div className="flex items-center justify-end gap-3">
                        <w3m-button />
                    </div>
                </MaxWrapper>
            </div>
        </header>
    )
}

export default Header
