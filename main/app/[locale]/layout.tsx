import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css"
import localFont from 'next/font/local'
import CursorTracker from "@/Components/custom/CursorTracker";

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

    const wsProtocol = process.env.WEBSOCKET_PROTOCOL || "ws";
    const wsHost = process.env.WEBSOCKET_HOST || "localhost";
    const wsPort = process.env.WEBSOCKET_PORT || "8080";

    return (
        <html lang={locale}>
            <body className={authorFont.className}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <CursorTracker wsUrl={`${wsProtocol}://${wsHost}:${wsPort}`} />
            </body>
        </html>
    );
}
