"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/home.module.scss";
import Markdown from "react-markdown";
import { TestimonialType } from "@/lib/types";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Testimonials({
    testimonials,
}: {
    testimonials: TestimonialType[];
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            const sectionScroll = document.querySelector(".section-scroll");

            const scroller =
                sectionScroll?.scrollHeight && sectionScroll.scrollHeight > document.body.scrollHeight
                    ? sectionScroll
                    : document.body;

            const animation = gsap.fromTo(".stagger", {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                duration: .5,
                opacity: 1,
                scrollTrigger: {
                    trigger: ".testimonials",
                    start: "top bottom",
                    scroller: scroller,
                },
                stagger: 0.2
            });

            return () => {
                if (animation.scrollTrigger) {
                    animation.scrollTrigger.kill();
                }
                animation.kill();
            };
        }
    }, []);

    return (
        <div className={`${styles.testimonialContainer}`} ref={containerRef}>
            <div className="testimonials">
                {testimonials.map((testimonial, i) => (
                    <div
                        className={`${styles.testimonialWrapper} stagger`}
                        key={i}
                    >
                        <div className={styles.testimonial}>
                            <Markdown>{testimonial.content}</Markdown>
                            <div className="h-[50px] flex gap-4">
                                <div className={styles.testimonialImage}>
                                    <img
                                        src={testimonial.image.url}
                                        alt={testimonial.name}
                                        className="h-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="leading-none">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-gray-400">
                                        {testimonial?.testimonialRole?.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}