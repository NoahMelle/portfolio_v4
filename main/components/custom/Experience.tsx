"use client";

import React from "react";
import { ExperienceType } from "@/lib/types";
import styles from "@/styles/home.module.scss";

export default function Experience({
  experience,
}: {
  experience: ExperienceType;
}) {
  return (
    <div className={`${styles.experience}`}>
      <div
        className={`${styles.experienceTimeline} experiences`}
        style={{
          gridTemplateRows: `repeat(${experience.experienceTexts.length}, auto)`,
        }}
      >
        {experience.experienceTexts.map((experienceText, index) => (
          <div
            className={`${styles.experienceItem} experience-item snap-start ${
              index % 2 === 0 ? "stagger-left" : "stagger-right"
            }`}
            key={index}
          >
            <p className={styles.experienceDate}>
              {experienceText.startingDate.getFullYear()} -{" "}
              {experienceText.endingDate?.getFullYear() ?? "Present"}
            </p>
            <div className={styles.experienceContent}>
              <h3 className="text-xl">{experienceText.heading}</h3>
              <p>{experienceText.content}</p>
            </div>
          </div>
        ))}
        <div className={`${styles.separator} separator`}></div>
      </div>
    </div>
  );
}
