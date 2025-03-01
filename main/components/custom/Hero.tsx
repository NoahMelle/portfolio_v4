"use client";

import React from "react";
import { HeroType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import Image from "next/image";

export default function Hero({ heroData }: { heroData: HeroType }) {
  return (
    <>
      <header className={`${styles.hero}`}>
        <Image
          src={heroData.image.url}
          alt="Hero image"
          height={400}
          width={400}
          className={`${styles.heroImage} rotating-image`}
        />
        <div className={styles.heroCircleContainer}>
          <div className={`${styles.heroCircle} w-[100px] hero-circle`}></div>
          <div className={`${styles.heroCircle} w-[350px] hero-circle`}></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className={styles.heroTitle} data-content={heroData.title}>
            <span className="z-10 relative">{heroData.title}</span>
          </h1>
          <h2 className={styles.heroSubheading}>{heroData.subheading}</h2>
        </div>
      </header>
    </>
  );
}
