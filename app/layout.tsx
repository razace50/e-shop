import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const Poppins = Poppins({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'Ecommerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
