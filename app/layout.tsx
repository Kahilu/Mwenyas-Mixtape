import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Reenie_Beanie } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const reenieBeanie = Reenie_Beanie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-reenie-beanie",
})

export const metadata: Metadata = {
  title: "Digital Cassette Player",
  description: "A retro cassette player interface for playing YouTube tracks",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${reenieBeanie.variable}`}>{children}</body>
    </html>
  )
}
