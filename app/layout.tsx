import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jujutsu Kaisen Info',
  description: 'Info for characters of anime Jujutsu Kaisen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-[url('/background.jpg')] bg-cover`}>{children}</body>
    </html>
  )
}
