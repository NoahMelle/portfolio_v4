"use client";
import React from "react";
import { AboutMeType } from "@/lib/types";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import Markdown from "react-markdown";

export default function AboutMe({ aboutMe }: { aboutMe: AboutMeType }) {
    return (
        <div>
            <div className={styles.aboutMeTextsContainer}></div>
            <div className="mt-20">
                <div className="grid lg:grid-cols-[1fr_1fr_300px] md:grid-cols-2 grid-cols-1 gap-10">
                    <div className="max-w-[350px]">
                        <Markdown>{aboutMe.text}</Markdown>
                    </div>
                    <div>
                        <div className="flex flex-col gap-5">
                            {aboutMe.quickInfo.map((quickInfo, index) => (
                                <div key={index} className="flex gap-4">
                                    <Image
                                        src={quickInfo.icon.url}
                                        width={20}
                                        height={20}
                                        alt={quickInfo.alt}
                                        className="select-none object-contain"
                                    />
                                    <span>{quickInfo.content}</span>
                                </div>
                            ))}
                        </div>
                        <ul className="flex gap-2 mt-5">
                            {aboutMe.socialLinks.map((socialLink, index) => (
                                <li key={index}>
                                    <a
                                        key={index}
                                        href={socialLink.url}
                                        target={
                                            socialLink.isExternal
                                                ? "_blank"
                                                : "_self"
                                        }
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={socialLink.icon.url}
                                            width={24}
                                            height={24}
                                            alt={socialLink.alt}
                                            className="w-6 h-6 invert select-none"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-full lg:col-span-1">
                        <Image
                            src={aboutMe.image.url}
                            width={0}
                            height={0}
                            alt="Profile Picture"
                            className="w-full h-full object-cover grayscale aspect-[3/1] lg:aspect-auto"
                            sizes="100vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
