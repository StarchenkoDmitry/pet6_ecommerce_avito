import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


import Header from '../components/header/Header'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/config/authConfig'
import clsx from 'clsx'
import db from '@/lib/db'

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

  const user = await db.user.currentUser();

  return (
    <html lang="ru">
      <body className={inter.className}>
        <main className='mx-auto px-1 flex flex-col max-w-5xl w-full h-dvh _h-screen'>
          <Header user={user}/>
          {children}
        </main>
      </body>
    </html>
  )
}
