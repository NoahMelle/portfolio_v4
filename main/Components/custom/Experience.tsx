"use client";

import React from "react";
import { ExperienceType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);

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
              sectionScroll?.scrollHeight && sectionScroll.scrollHeight > document.body.scrollHeight
                  ? sectionScroll
                  : document.body;

          const animationLeft = gsap.fromTo(".stagger-left", {
              x: 50,
              opacity: 0,
              y: 0,
          }, {
              x: 0,
              y: 0,
              delay: STAGGER / 4,
              duration: STAGGER,
              opacity: 1,
              scrollTrigger: {
                  trigger: ".experiences",
                  start: "top bottom",
                  scroller: scroller,
              },
              stagger: STAGGER
          });

          const animationRight = gsap.fromTo(".stagger-right", {
              x: -50,
              opacity: 0,
              y: 0,
          }, {
              x: 0,
              y: 0,
              duration: STAGGER / 2,
              opacity: 1,
              delay: STAGGER / 2 + STAGGER / 4,
              scrollTrigger: {
                  trigger: ".experiences",
                  start: "top bottom",
                  scroller: scroller,
              },
              stagger: STAGGER
          });

          const revealSeparator = gsap.fromTo(".separator", {
              scaleY: 0,
          }, {
              scaleY: 1,
              transformOrigin: "top",
              duration: experience.experienceTexts.length * STAGGER,
              scrollTrigger: {
                  trigger: ".experiences",
                  start: "top bottom",
                  scroller: scroller,
              }
          });

          return () => {
              if (animationLeft.scrollTrigger) {
                  animationLeft.scrollTrigger.kill();
              }
              if (animationRight.scrollTrigger) {
                  animationRight.scrollTrigger.kill();
              }
              if (animationRight) {
                  animationRight.kill();
              };
              animationLeft.kill();
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
                        <div key={index} className={styles.experienceContent}>
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
