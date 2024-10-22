"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SlideFromLeft({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const container = React.useRef(null);

    useGSAP(
        () => {
            gsap.registerPlugin(useGSAP);
            gsap.fromTo(
                ".target",
                { x: "-100%", opacity: 0 },
                { x: "0%", duration: 1, ease: "power3.inOut", delay: delay, opacity: 1 }
            );
        },
        { scope: container }
    );

    return (
        <div ref={container}>
            <div className="target -translate-x-full opacity-0">
                {children}</div>
        </div>
    );
}
