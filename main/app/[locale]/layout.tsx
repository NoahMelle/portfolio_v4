import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css"
import localFont from 'next/font/local'
import CursorTracker from "@/Components/custom/CursorTracker";
import { Toaster } from "@/Components/ui/sonner";
import GSAPCursor from "@/Components/reusable/gsap/GSAPCursor";

const authorFont = localFont({src: "../fonts/Author-Variable.ttf"})

export const metadata: Metadata = {
  title: "Noey's Portfolio",
  description: '...',
}

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={authorFont.className}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Toaster />
                <GSAPCursor />
            </body>
        </html>
    );
}
