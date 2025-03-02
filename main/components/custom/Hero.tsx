"use client";

import React, { useEffect, useRef, useState } from "react";
import { HeroType } from "@/lib/types";
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
  const [mousePos, setMousePos] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const newX = e.clientX + window.scrollX;
    const newY = e.clientY + window.scrollY;

    setMousePos({
      x: newX,
      y: newY,
    });
  };

  useEffect(() => {
    const heroEl = heroRef.current

    if (!heroEl) return;

    heroEl.addEventListener("mouseenter", addMouseEventListener);
    heroEl.addEventListener("mouseleave", removeMouseEventListener);

    if (heroEl.matches(":hover")) addMouseEventListener();

    function removeMouseEventListener() {
      if (!heroEl) return;

      heroEl.removeEventListener("mousemove", handleMouseMove);
  
      setMousePos(undefined);
    }
  
    function addMouseEventListener() {
      if (!heroEl) return;
      heroEl.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (!heroEl) return;

      removeMouseEventListener();

      heroEl.removeEventListener("mouseenter", addMouseEventListener);
      heroEl.removeEventListener(
        "mouseleave",
        removeMouseEventListener
      );
    };
  }, []);

  return (
    <>
      <motion.header
        className={`overflow-x-auto h-screen bg-background text-foreground flex relative flex-col justify-center items-center gap-4 p-4`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.6 }}
        ref={heroRef}
      >
        {mousePos && (
          <motion.div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{ left: mousePos.x, top: mousePos.y }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={"/img/halftone-744404.svg"}
              alt="Halftone dot"
              width={200}
              height={200}
            />
          </motion.div>
        )}
        <motion.div
          variants={imageVariants}
          className="rounded-full max-w-[70%] -left-1/4 md:left-12 top-12 absolute aspect-square"
        >
          <Image
            src={heroData.image.url}
            alt="Hero image"
            height={400}
            width={400}
            className="rounded-full grayscale hover:grayscale-0 transition-all duration-500"
            draggable={false}
          />
        </motion.div>
        <div className="absolute flex-col items-end bottom-12 -right-[13%] max-w-[70%] md:right-12 flex pointer-events-none">
          <motion.div
            variants={circleVariants}
            className="aspect-square rounded-full border-2 border-foreground w-[100px]"
          ></motion.div>
          <motion.div
            className="aspect-square rounded-full border-2 border-foreground w-[350px] max-w-full"
            variants={circleVariants}
          ></motion.div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 pointer-events-none">
          <WavyText
            text={heroData.title}
            className="text-5xl uppercase text-center font-bold z-10 leading-[95%] text-glow relative max-w-[1000px]"
            data-content={heroData.title}
          />
          <h2 className="font-medium leading-snug text-xl text-center max-w-[400px] relative z-10">
            {heroData.subheading}
          </h2>
        </div>
      </motion.header>
    </>
  );
}
