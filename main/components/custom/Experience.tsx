"use client";

import React, { useRef } from "react";
import { ExperienceType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import { motion, useScroll, Variants } from "motion/react";

export default function Experience({
  experience,
}: {
  experience: ExperienceType;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const rightExperienceItemVariants: Variants = {
    onscreen: {
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        bounce: 0.4,
      },
    },
    offscreen: {
      x: "200%",
    },
  };

  const leftExperienceItemVariants: Variants = {
    ...rightExperienceItemVariants,
    offscreen: {
      x: "-200%",
    },
  };

  return (
    <div className={`${styles.experience}`}>
      <div
        className={`${styles.experienceTimeline} experiences`}
        style={{
          gridTemplateRows: `repeat(${experience.experienceTexts.length}, auto)`,
        }}
        ref={containerRef}
      >
        {experience.experienceTexts.map((experienceText, index) => (
          <motion.div
            whileInView="onscreen"
            initial="offscreen"
            viewport={{ once: true, margin: "0px 0px -50% 0px", amount: 0 }}
            className={`${styles.experienceItem} experience-item snap-start`}
            key={index}
          >
            <motion.div
              variants={
                index % 2 == 0
                  ? rightExperienceItemVariants
                  : leftExperienceItemVariants
              }
            >
              <p className={styles.experienceDate}>
                {experienceText.startingDate.getFullYear()} -{" "}
                {experienceText.endingDate?.getFullYear() ?? "Present"}
              </p>
              <div className={styles.experienceContent}>
                <h3 className="text-xl">{experienceText.heading}</h3>
                <p>{experienceText.content}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
        <motion.div
          className={`${styles.separator} origin-top`}
          style={{
            scaleY: scrollYProgress,
          }}
        ></motion.div>
      </div>
    </div>
  );
}
