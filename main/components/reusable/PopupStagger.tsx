"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function PopupStagger({ children, containerStyles }: { children: React.ReactNode; containerStyles?: string }) {
    const containerRef = React.useRef(null);

    useGSAP(
        () => {
            // Register the ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            gsap.fromTo(
                ".stagger",
                {
                    autoAlpha: 0,
                    scale: 0,
                },
                {
                    autoAlpha: 1,
                    duration: 1,
                    delay: 0,
                    scale: 1,
                    transformOrigin: "left",
                    ease: "power3.inOut",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".trigger",
                        start: "top bottom",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            <div className={`trigger ${containerStyles}`}>
                {React.Children.map(children, (child, index) => {
                    return (
                        <div className="stagger" key={index}>
                            {child}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}