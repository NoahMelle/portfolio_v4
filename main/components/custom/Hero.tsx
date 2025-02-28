"use client";

import React from "react";
import { HeroType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "@/app/[locale]/loading";

export default function Hero({ heroData }: { heroData: HeroType }) {
  const containerRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let imageOpacityAnimation: gsap.core.Tween | undefined;

    const textAnimation = gsap.to(".word", {
      duration: 0.5,
      y: "0%",
      stagger: 0.05,
    });
    const imageAnimation = gsap.timeline();

    const sectionScroll = document.querySelector(".section-scroll");

    const scroller =
      sectionScroll?.scrollHeight &&
      sectionScroll.scrollHeight > document.body.scrollHeight
        ? sectionScroll
        : document.body;

    imageAnimation
      .from(".rotating-image", {
        clipPath: "circle(0%)",
        opacity: 1,
        transformOrigin: "center",
      })
      .to(".rotating-image", {
        clipPath: "circle(100%)",
        duration: 1,
        ease: "power4.inOut",
      })
      .to(".rotating-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scroller: scroller,
          scrub: true,
        },
        opacity: 0,
        duration: 2,
        x: "-100%",
        ease: "power4.inOut",
      });

    const circleAnimation = gsap.timeline();

    circleAnimation
      .from(".hero-circle", {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 1,
      })
      .to(".hero-circle", {
        clipPath: "circle(100% at 50% 50%)",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(".hero-circle", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scroller: scroller,
          scrub: true,
        },
        x: "150%",
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.1,
      });

    setLoading(false);

    return () => {
      textAnimation?.kill();
      imageAnimation?.kill();
      imageOpacityAnimation?.kill();
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      <header className={`${styles.hero}`} ref={containerRef}>
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
            {heroData.title.split(" ").map((word, index) => (
              <React.Fragment key={index}>
                <span className="inline-block text-nowrap overflow-hidden">
                  {word.split("").map((letter, index) => (
                    <span
                      className="word transform translate-y-[100%] inline-block"
                      key={index * 1000}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span>
                  {index < heroData.title.split(" ").length - 1 && " "}
                </span>
              </React.Fragment>
            ))}
          </h1>
          <h2 className={styles.heroSubheading}>{heroData.subheading}</h2>
        </div>
      </header>
    </>
  );
}
