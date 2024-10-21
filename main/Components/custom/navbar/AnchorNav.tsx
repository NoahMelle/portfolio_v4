"use client";

import React from "react";
import { LinkType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";

export default function AnchorNav({
    links,
    heading,
}: {
    links: LinkType[];
    heading: string;
}) {
    React.useEffect(() => {
        gsap.registerPlugin(ScrollToPlugin);

        // if (typeof window !== "undefined") {
        //     const jumpToLinks = document.querySelectorAll(".jumpToListLinks a");

        //     jumpToLinks.forEach((link) => {

        //     })
        // }
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetSelector = e.currentTarget.getAttribute("href")?.replace("/", "");
        const targetElement =
            targetSelector && document.querySelector(targetSelector);
        const scroller = document.querySelector("#section-container");

        if (!targetElement) return;

        // Use gsap to scroll to the target element
        gsap.to(scroller, {
            duration: 0.4,
            scrollTo: { y: targetElement, autoKill: false },
        });
    };

    return (
        <>
            <div className={styles.jumpToList}>
                <h3 className={styles.jumpToHeader}>{heading}</h3>
                <ul className={styles.jumpToListLinks}>
                    {links.map((link) => (
                        <li key={link.url}>
                            <Link
                                href={link.url}
                                target={link.isExternal ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="jumpToListLink"
                                onClick={handleLinkClick}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Link
                className={`${styles.scrollDownIndicator} jumpToListLink`}
                href={links[0].url}
                target={links[0].isExternal ? "_blank" : "_self"}
                onClick={handleLinkClick}
            >
                <Image
                    src={"/icons/arrow-down.svg"}
                    height={100}
                    width={100}
                    alt="Arrow down"
                />
            </Link>
        </>
    );
}
