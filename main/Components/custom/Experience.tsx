"use client";

import React from "react";
import { ExperienceType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience({
    experience,
}: {
    experience: ExperienceType;
}) {
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            const sectionScroll = document.querySelector(".section-scroll");
            const STAGGER = 1;

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
                            ease: "power1.out",
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
                    ease: "none", // No easing for a linear transition
                    scrollTrigger: {
                        trigger: ".separator", // The element to trigger the animation
                        start: "top bottom", 
                        end: "bottom top", // Animate it till the top of the separator hits the top of the viewport
                        scroller: scroller,
                        scrub: 0.5, // Delay the animation by 0.5 seconds to sync with scroll
                    },
                }
            );
            
            

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }
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
