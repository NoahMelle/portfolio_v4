"use client";

import React from "react";
import { LinkType } from "@/lib/types";
import Link from "next/link";

export default function Navbar({ links }: { links: LinkType[] }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="p-4 fixed w-full text-xl bg-white/30 backdrop-blur-md z-50 h-[80px] flex items-center shadow-[0_0_50px_rgba(0,0,0,.05)]">
            <div className="container mx-auto md:flex justify-between items-center">
                <div className="md:contents flex justify-between">
                    <div className="font-medium">
                        <Link href="/">Noah&apos;s Portfolio</Link>
                    </div>
                    <div className="block md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    className={`${
                        isOpen ? "block" : "hidden"
                    } w-full md:flex md:items-center md:w-auto h-screen md:h-auto`}
                >
                    <ul className="md:flex md:space-x-4">
                        {links.map((link) => (
                            <li key={link.url} className="py-2 md:border-b-0 border-b-2 border-slate-500">
                                <Link href={link.url}>{link.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
