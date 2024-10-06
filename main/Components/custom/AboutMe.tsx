"use client";
import React from "react";
import { AboutMeType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import SlideFromLeft from "../reusable/SlideFromLeft";

export default function AboutMe({ aboutMe }: { aboutMe: AboutMeType }) {
    return (
        <div>
            <div className={styles.aboutMeTextsContainer}>
                {aboutMe.aboutMeTexts.map((aboutMeText, index) => (
                    <div
                        className={[
                            styles.aboutMeRow,
                            index % 2 === 0
                                ? "about-me-from-left"
                                : "about-me-from-right",
                        ].join(" ")}
                        key={index}
                    >
                        <div className="relative w-[170px] aspect-square max-w-full shrink-0">
                            <div className="w-[93%] h-[93%] border-solid border-2 border-blue aspect-square absolute"></div>
                            <Image
                                src={aboutMeText.image.url}
                                alt="Photo of me"
                                width={0}
                                height={0}
                                className="absolute bottom-0 right-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-"
                                sizes={"100vw"}
                                style={{ width: "93%", height: "93%" }}
                                tabIndex={0}
                            />
                        </div>
                        <p className="text-normal">{aboutMeText.text}</p>
                    </div>
                ))}
            </div>
            <div className="mt-20">
                <ul className="flex gap-2 justify-center">
                    {aboutMe.socialLinks.map((socialLink, index) => (
                        <li key={index}>
                            <a
                                key={index}
                                href={socialLink.url}
                                target={
                                    socialLink.isExternal ? "_blank" : "_self"
                                }
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={socialLink.icon.url}
                                    alt={socialLink.alt}
                                    className="w-8 h-8 invert opacity-70 select-none"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
