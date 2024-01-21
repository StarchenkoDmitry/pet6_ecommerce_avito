import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


import Header from '../components/header/Header'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/config/authConfig'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Avito',
  description: 'Avito: недвижимость, транспорт, работа, услуги, вещи',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("Render RootLayout");

  const session = await auth();


  return (
    <html lang="ru">
      <body className={inter.className}>

        <SessionProvider session={session}>

          <main className='mx-auto px-1 w-full max-w-5xl min-h-dvh'>
            <Header/>
            {children}
          </main>
          
        </SessionProvider>

      </body>
    </html>
  )
}
