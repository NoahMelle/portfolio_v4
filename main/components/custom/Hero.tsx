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
        className={`overflow-x-auto h-screen bg-background text-foreground flex relative flex-col justify-center items-center gap-4 p-4`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.6 }}
      >
        <motion.div
          variants={imageVariants}
          className="rounded-full max-w-[90%] left-12 top-12 md:absolute grayscale aspect-square"
        >
          <Image
            src={heroData.image.url}
            alt="Hero image"
            height={400}
            width={400}
            className="rounded-full"
          />
        </motion.div>
        <div className="absolute flex-col items-end bottom-12 right-12 hidden md:flex">
          <motion.div
            variants={circleVariants}
            className="aspect-square rounded-full border-2 border-black w-[100px] hero-circle"
          ></motion.div>
          <motion.div
            className="aspect-square rounded-full border-2 border-black w-[350px] hero-circle"
            variants={circleVariants}
          ></motion.div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <WavyText
            text={heroData.title}
            className="text-4xl uppercase text-center font-bold z-10 leading-[95%] text-glow relative"
            data-content={heroData.title}
          />
          <h2 className="font-medium leading-snug text-xl text-center max-w-[400px]">
            {heroData.subheading}
          </h2>
        </div>
      </motion.header>
    </>
  );
}
