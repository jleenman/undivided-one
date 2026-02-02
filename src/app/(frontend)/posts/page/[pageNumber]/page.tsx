import React from 'react'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Undivided One',
  description: 'A Payload CMS + Next.js website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
