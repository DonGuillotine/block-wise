import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import AppKitProvider from '@/context'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChainLearn | An AI based learning platform",
  description: "An AI based learning platform to help you learn new skills and concepts",
  keywords: "AI, education, learning, skills, concepts, platform",
  authors: [{ name: "ChainLearn" }],
  creator: "ChainLearn",
  publisher: "ChainLearn",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppKitProvider initialState={initialState}>{children}</AppKitProvider>
        </Providers>
      </body>
    </html>
  );
}
