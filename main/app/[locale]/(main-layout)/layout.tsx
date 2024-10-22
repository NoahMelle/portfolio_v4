import React from "react";
import Link from "next/link";
import { getHomepageLinks } from "@/data/fetcher";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const links = await getHomepageLinks(locale);

    return (
        <div>
            {/* <Navbar links={links} /> */}
            <nav className="fixed top-4 left-4">
                <Link href={"/"} className="flex gap-2 bg-[#FFFFFF] px-4 py-1 rounded-full shadow-[0_0_10px_rgba(0,0,0,.1)]">
                    <Image
                        src="/icons/arrow-left.svg"
                        alt="Home"
                        width={16}
                        height={16}
                    />
                    <span className="text-lg font-medium">Home</span>
                </Link>
            </nav>
            <div className="min-h-screen">{children}</div>
        </div>
    );
}
