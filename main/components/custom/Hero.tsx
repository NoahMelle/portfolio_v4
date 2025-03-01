"use client";

import React from "react";
import { HeroType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import WavyText from "../reusable/WavyText";

const imageVariants: Variants = {
  offscreen: {
    x: "-200%",
    rotate: 30,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
  onscreen: {
    x: 0,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const circleVariants: Variants = {
  offscreen: {
    x: "200%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function Hero({ heroData }: { heroData: HeroType }) {
  return (
    <>
      <motion.header
        className={`${styles.hero}`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.6 }}
      >
        <motion.div variants={imageVariants} className={styles.heroImage}>
          <Image
            src={heroData.image.url}
            alt="Hero image"
            height={400}
            width={400}
            className="rounded-full"
          />
        </motion.div>
        <div className={styles.heroCircleContainer}>
          <motion.div
            variants={circleVariants}
            className={`${styles.heroCircle} w-[100px] hero-circle`}
          ></motion.div>
          <motion.div
            className={`${styles.heroCircle} w-[350px] hero-circle`}
            variants={circleVariants}
          ></motion.div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <WavyText
            text={heroData.title}
            className="text-4xl uppercase text-center font-bold z-10 leading-[95%] text-glow relative"
            data-content={heroData.title}
          />
          <h2 className={styles.heroSubheading}>{heroData.subheading}</h2>
        </div>
      </motion.header>
    </>
  );
}
