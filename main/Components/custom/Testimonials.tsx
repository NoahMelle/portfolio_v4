"use client";

import React, { useRef } from "react";
import styles from "@/styles/home.module.scss";
import Markdown from "react-markdown";
import { TestimonialsSectionType } from "@/lib/types";
import gsap from "gsap";
import Image from "next/image";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Testimonials({
    testimonials,
}: {
    testimonials: TestimonialsSectionType;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // React.useLayoutEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const sectionScroll = document.querySelector(".section-scroll");

    //     const scroller =
    //         sectionScroll?.scrollHeight &&
    //         sectionScroll.scrollHeight > document.body.scrollHeight
    //             ? sectionScroll
    //             : document.body;

    //     const animation = gsap.fromTo(
    //         ".stagger",
    //         {
    //             y: 100,
    //             opacity: 0,
    //         },
    //         {
    //             y: 0,
    //             duration: 0.5,
    //             opacity: 1,
    //             scrollTrigger: {
    //                 trigger: ".testimonials",
    //                 start: "top bottom",
    //                 scroller: scroller,
    //             },
    //             stagger: 0.2,
    //         }
    //     );

    //     return () => {
    //         if (animation.scrollTrigger) {
    //             animation.scrollTrigger.kill();
    //         }
    //         animation.kill();
    //     };
    // }, []);

    return (
        <div ref={containerRef}>
            <h2 className={styles.sectionHeading}>
                {testimonials.testimonialHeading}
            </h2>
            <div className={`${styles.testimonialContainer} testimonials`}>
                {testimonials.testimonials.map((testimonial, i) => (
                    <div
                        className={`${styles.testimonialWrapper} stagger`}
                        key={i}
                    >
                        <div className={styles.testimonial}>
                            <Markdown>{testimonial.content}</Markdown>
                            <div className="h-[50px] flex gap-4">
                                <div className={styles.testimonialImage}>
                                    <Image
                                        src={testimonial.image.url}
                                        alt={testimonial.name}
                                        className="h-full"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="leading-none">
                                        {testimonial.name}
                                    </h3>
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
