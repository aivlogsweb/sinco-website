import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sinco | The Viral Forest Experience',
  description: 'Join the Sinco movement - where nature meets viral social media. Experience the forest theme sensation taking TikTok by storm.',
  keywords: ['Sinco', 'TikTok viral', 'forest theme', 'social media', 'memecoin', 'viral trend'],
  authors: [{ name: 'Sinco Team' }],
  creator: 'Sinco',
  publisher: 'Sinco',
  openGraph: {
    title: 'Sinco | The Viral Forest Experience',
    description: 'Join the Sinco movement - where nature meets viral social media. Experience the forest theme sensation taking TikTok by storm.',
    url: 'https://sinco.com',
    siteName: 'Sinco',
    images: [
      {
        url: '/images/sinco-og.png',
        width: 1200,
        height: 630,
        alt: 'Sinco - The Viral Forest Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sinco | The Viral Forest Experience',
    description: 'Join the Sinco movement - where nature meets viral social media.',
    images: ['/images/sinco-twitter.png'],
    creator: '@sinco.00',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased bg-forest-gradient min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}