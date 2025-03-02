"use client";

import React, { useRef } from "react";
import { ExperienceType } from "@/lib/types";
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
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        bounce: 0.4,
      },
    },
    offscreen: {
      x: "100%",
      opacity: 0,
    },
  };

  const leftExperienceItemVariants: Variants = {
    ...rightExperienceItemVariants,
    offscreen: {
      ...rightExperienceItemVariants.offscreen,
      x: "-100%",
    },
  };

  return (
    <div className={`py-24`}>
      <div
        className={`grid grid-cols-[1px_1fr] md:grid-cols-[1fr_1px_1fr] gap-8 w-fit items-center mx-auto experiences`}
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
            className={`col-[2] row-auto md:col-[1] md:[&:nth-child(odd)]:col-[3]`}
            key={index}
            style={{ gridRow: index + 1 }}
          >
            <motion.div
              variants={
                index % 2 == 0
                  ? rightExperienceItemVariants
                  : leftExperienceItemVariants
              }
              className={`flex flex-col items-start md:flex-row flex-end md:items-center gap-4 [&:nth-child(odd)] ${
                index % 2 == 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <p className="text-nowrap">
                {experienceText.startingDate.getFullYear()} -{" "}
                {experienceText.endingDate?.getFullYear() ?? "Present"}
              </p>
              <div className="max-w-[400px] p-4 outline-1 outline outline-white/20 rounded-xl">
                <h3 className="text-xl">{experienceText.heading}</h3>
                <p>{experienceText.content}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
        <motion.div
          className={`col-[1] md:col-[2] row-span-full bg-white/25 origin-top h-full shadow-[0_0_14px_1px_rgba(255,255,255,0.3)] w-[1px]`}
          style={{
            scaleY: scrollYProgress,
          }}
        ></motion.div>
      </div>
    </div>
  );
}
