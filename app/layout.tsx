import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Azzamo Pubkey Converter",
  description: "Convert between Nostr npub and hex public key formats",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground`}>
        <main className="flex-grow flex items-center justify-center p-4">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'