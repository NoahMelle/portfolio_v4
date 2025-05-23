import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import localFont from "next/font/local";
import { ReactLenis } from "lenis/react";
import { Toaster } from "@/components/ui/sonner";

const authorFont = localFont({ src: "../fonts/satoshi.ttf" });

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === "production"
      ? new URL("https://noeycodes.com")
      : undefined,
  title: "Noey's Portfolio",
  description: "...",
};

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
          <ReactLenis root>{children}</ReactLenis>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
