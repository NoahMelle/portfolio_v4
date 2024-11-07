import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css"
import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/sonner";
import GSAPCursor from "@/components/reusable/GSAPCursor";

const authorFont = localFont({src: "../fonts/satoshi.ttf"})

export const metadata: Metadata = {
  title: "Noey's Portfolio",
  description: '...',
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
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
