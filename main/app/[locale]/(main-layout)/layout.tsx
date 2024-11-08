import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav className="fixed top-4 left-4 z-10">
                <Link
                    href={"/"}
                    className="flex gap-2 bg-[#FFFFFF] px-4 py-1 rounded-full shadow-[0_0_10px_rgba(0,0,0,.1)]"
                >
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
