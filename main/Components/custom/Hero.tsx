"use client";

import React from "react";
import { HeroType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import gsap from "gsap";

// gsap.registerPlugin(useGSAP);

export default function Hero({ heroData }: { heroData: HeroType }) {
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        let textAnimation: gsap.core.Tween | undefined;
        let imageAnimation: gsap.core.Tween | undefined;
        let imageOpacityAnimation: gsap.core.Tween | undefined;
        if (typeof window !== "undefined") {
            textAnimation = gsap.to(".word", {
                duration: 0.5,
                y: "0%",
                stagger: 0.05,
            });
            imageAnimation = gsap.to(".rotating-image", {
                duration: 1,
                rotation: "0",
                ease: "power4.out",
                delay: 1.5,
            });
            imageOpacityAnimation = gsap.to(".rotating-image", {
                duration: 1,
                opacity: 1,
                delay: 1.5,
                ease: "sine",
            });
        }
        return () => {
            textAnimation?.kill();
            imageAnimation?.kill();
            imageOpacityAnimation?.kill();
        };
    }, []);

    return (
        <header className={`${styles.hero}`} ref={containerRef}>
            <Image src={heroData.image.url} alt="Hero image" height={400} width={400} className={`${styles.heroImage} rotating-image`} />
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className={styles.heroTitle}>
                    {heroData.title.split(" ").map((word, index) => (
                        <React.Fragment key={index}>
                            <span className="inline-block text-nowrap overflow-hidden">
                                {word.split("").map((letter, index) => (
                                    <span className="word transform translate-y-[100%] inline-block" key={index * 1000}>
                                        {letter}
                                    </span>
                                ))}
                            </span>
                            <span>
                                {index < heroData.title.split(" ").length - 1 &&
                                    " "}
                            </span>
                        </React.Fragment>
                    ))}
                </h1>
                <h3 className={styles.heroSubheading}>{heroData.subheading}</h3>
            </div>
        </header>
    );
}
