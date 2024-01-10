import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


import Header from '../components/ui/Header'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Avito',
  description: 'Avito: недвижимость, транспорт, работа, услуги, вещи',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("Render RootLayout");
  return (
    <html lang="ru">
      <body className={inter.className}>
        <main className='mx-auto px-1 w-full max-w-5xl min-h-dvh'>
          <Header/>
          {children}
        </main>
      </body>
    </html>
  )
}
