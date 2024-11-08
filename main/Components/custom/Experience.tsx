"use client";

import React from "react";
import { ExperienceType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Experience({
    experience,
}: {
    experience: ExperienceType;
}) {
    const containerRef = React.useRef(null);

    React.useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sectionScroll = document.querySelector(".section-scroll");
        const STAGGER = 0.5;

        const scroller =
            sectionScroll?.scrollHeight &&
            sectionScroll.scrollHeight > document.body.scrollHeight
                ? sectionScroll
                : document.body;

        // Batch animation for stagger-left elements
        ScrollTrigger.batch(".stagger-left", {
            onEnter: (batch) => {
                gsap.fromTo(
                    batch,
                    { x: 50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: STAGGER,
                        stagger: 0.2,
                        ease: "power1.inOut",
                    }
                );
            },
            onLeaveBack: (batch) => {
                gsap.to(batch, {
                    x: 50,
                    opacity: 0,
                    duration: STAGGER,
                    stagger: 0.2,
                    ease: "power1.out",
                });
            },
            start: "top center",
            scroller: scroller,
        });

        // Batch animation for stagger-right elements
        ScrollTrigger.batch(".stagger-right", {
            onEnter: (batch) => {
                gsap.fromTo(
                    batch,
                    { x: -50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: STAGGER,
                        stagger: 0.2,
                        ease: "power1.out",
                    }
                );
            },
            onLeaveBack: (batch) => {
                gsap.to(batch, {
                    x: -50,
                    opacity: 0,
                    duration: STAGGER,
                    stagger: 0.2,
                    ease: "power1.out",
                });
            },
            start: "top center",
            scroller: scroller,
        });

        const revealSeparator = gsap.fromTo(
            ".separator",
            {
                scaleY: 0, // Start with scaleY 0 (invisible)
            },
            {
                scaleY: 1, // End with scaleY 1 (fully revealed)
                transformOrigin: "top", // Make the scale happen from the top
                ease: "linear", 
                scrollTrigger: {
                    trigger: ".experiences", // The element to trigger the animation
                    start: "top center", // When the top of the trigger element hits the top of the viewport
                    end: "bottom center",
                    scroller: scroller,
                    scrub: 1, // Delay the animation by 0.5 seconds to sync with scroll
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            revealSeparator.kill();
        };
    }, []);

    return (
        <div className={`${styles.experience}`} ref={containerRef}>
            <div
                className={`${styles.experienceTimeline} experiences`}
                style={{
                    gridTemplateRows: `repeat(${experience.experienceTexts.length}, auto)`,
                }}
            >
                {experience.experienceTexts.map((experienceText, index) => (
                    <div
                        className={`${styles.experienceItem} experience-item ${
                            index % 2 === 0 ? "stagger-left" : "stagger-right"
                        }`}
                        key={index}
                    >
                        <p className={styles.experienceDate}>
                            {experienceText.startingDate.getFullYear()} -{" "}
                            {experienceText.endingDate?.getFullYear() ??
                                "Present"}
                        </p>
                        <div className={styles.experienceContent}>
                            <h3 className="text-xl">
                                {experienceText.heading}
                            </h3>
                            <p>{experienceText.content}</p>
                        </div>
                    </div>
                ))}
                <div className={`${styles.separator} separator`}></div>
            </div>
        </div>
    );
}
