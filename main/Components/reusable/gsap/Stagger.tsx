"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Stagger({ children }: { children: React.ReactNode }) {
    const containerRef = React.useRef(null);

    useGSAP(
        () => {
            // Register the ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            gsap.fromTo(
                ".stagger",
                {
                    autoAlpha: 0,
                    y: 100,
                },
                {
                    autoAlpha: 1,
                    y: "+=0",
                    duration: 0.2,
                    ease: "power4.inOut",

                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: ".test", // Updated to use the trigger property
                        start: "top bottom", // You can adjust the start position
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            <div className="test">
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
