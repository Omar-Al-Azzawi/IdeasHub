import { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from "@/components/ui/sonner";
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer'
import { ABeeZee } from "next/font/google";

import "./globals.css";

const inter = ABeeZee({
    subsets: ["latin"],
    weight: '400'
});

export const metadata: Metadata = {
    title: "IdeaHub",
    description: "Platform to share idea",
};

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                        <Footer />
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
