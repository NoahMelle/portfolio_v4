"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AnimatedText = ({ text }: { text: string }) => {
    const paragraphRef = useRef<HTMLSpanElement>(null);

    // Function to split the text into words and return an array of JSX elements
    const splitTextIntoWords = (text: string) => {
        return text.split(/\s+/).filter((word) => word.trim() !== "");
    };

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const paragraph = paragraphRef.current;
        if (!paragraph) return;

        const words = paragraph.querySelectorAll(".word-inner");
        const duration = 1 + words.length * 0.01;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: paragraph,
                start: "top 80%",
                once: true,
            },
        });

        tl.fromTo(
            words,
            { y: "110%" },
            {
                y: "0%",
                duration: duration,
                stagger: {
                    amount: 0.2,
                },
                ease: "expo.out",
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    });

    return (
        <span ref={paragraphRef}>
            {splitTextIntoWords(text).map((word, index) => (
                <span
                    key={index}
                    className="word-wrapper inline-block overflow-hidden relative"
                >
                    <span className="word-inner inline-block translate-y-full">
                        {word}
                    </span>
                    &nbsp;
                </span>
            ))}
        </span>
    );
};

export default AnimatedText;
