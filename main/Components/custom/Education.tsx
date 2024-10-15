"use client";

import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/styles/home.module.scss";

export default function Education() {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            const sectionScroll = document.querySelector(".section-scroll");

            const scroller =
                sectionScroll?.scrollHeight &&
                sectionScroll.scrollHeight > document.body.scrollHeight
                    ? sectionScroll
                    : document.body;

            const panels = gsap.utils.toArray(".panel");

            // Horizontal scroll setup
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    scroller: scroller,
                    pin: true,

                    scrub: 0.1,
                    end: () => "+=" + containerRef.current?.offsetWidth,
                    snap: {
                        snapTo: 1 / (panels.length - 1), // Snap to each panel
                        duration: 0.5,
                        ease: "power1.inOut",
                    },
                },
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }
    }, []);

    return (
        <div className={styles.section} id={"education"}>
            <div ref={triggerRef}>
                <div className={styles.sectionTop}>
                    <div className="relative flex items-center justify-center h-[40px] aspect-square">
                        <div className={styles.sectionIndexDecoration}></div>
                        <h4 className="text-xl">
                            {String(4).padStart(2, "0")}
                        </h4>
                        <div
                            className={[
                                styles.sectionIndexDecoration,
                                styles.bottom,
                            ].join(" ")}
                        ></div>
                    </div>
                    <h3>Education</h3>
                </div>
                <div className="overflow-x-hidden p-4 h-full">
                    <div
                        className="w-full overflow-x-hidden h-full"
                    >
                        <div className="flex w-[500%] overflow-x-hidden flex-nowrap h-full" ref={containerRef}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`panel w-full h-full flex items-center justify-center ${
                                        i % 2 === 0
                                            ? "bg-blue-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
