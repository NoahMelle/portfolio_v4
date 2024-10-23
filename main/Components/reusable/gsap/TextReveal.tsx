"use client";

import { useRef } from "react";
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
        const duration = 1 + words.length * 0.15;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: paragraph,
                start: "top 80%",
                once: true,
            },
        });

        gsap.fromTo(
            words,
            { y: "110%", opacity: 0 },
            {
                y: "0%",
                duration: duration,
                opacity: 1,
                stagger: {
                    amount: 0.3,
                },
                ease: "power4.out",
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
                    className="word-wrapper inline-blockrelative"
                >
                    <span className="word-inner inline-block translate-y-full opacity-0">
                        {word}
                    </span>
                    &nbsp;
                </span>
            ))}
        </span>
    );
};

export default AnimatedText;
