import "./globals.css";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import Header from "@/components/header/Header";
import db from "@/db";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Avito",
    description: "Avito: недвижимость, транспорт, работа, услуги, вещи",
};

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
    const user = await db.user.currentUser();

    return (
        <html lang="ru">
            <body className={inter.className}>
                <main className="mx-auto flex flex-col max-w-5xl w-full h-dvh">
                    <Header user={user} />
                    {children}
                </main>
            </body>
        </html>
    );
}
