import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { rootstockTestnet } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
    name: 'ChainLearn',
    description: 'An AI based learning platform to help you learn new skills and concepts',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['/favicon.ico'],
}

// Create wagmiConfig
const chains = [rootstockTestnet] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})