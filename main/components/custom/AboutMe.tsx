"use client";
import React from "react";
import { AboutMeType } from "@/lib/types";
import Image from "next/image";
import Markdown from "react-markdown";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const listItemVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function AboutMe({ aboutMe }: { aboutMe: AboutMeType }) {
  return (
    <div>
      <div className="mt-20">
        <div className="grid lg:grid-cols-[1fr_1fr_300px] md:grid-cols-2 grid-cols-1 gap-10">
          <div className="max-w-[350px]">
            <Markdown>{aboutMe.text}</Markdown>
          </div>
          <div>
            <motion.div
              className="flex flex-col gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
            >
              {aboutMe.quickInfo.map((quickInfo, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.div
                    className="flex gap-4"
                    variants={listItemVariants}
                  >
                    <Image
                      src={quickInfo.icon.url}
                      width={20}
                      height={20}
                      alt={quickInfo.alt}
                      className="select-none object-contain"
                    />
                    <span>{quickInfo.content}</span>
                  </motion.div>
                </div>
              ))}
            </motion.div>
            <ul className="flex gap-2 mt-5">
              {aboutMe.socialLinks.map((socialLink, index) => (
                <li key={index}>
                  <a
                    key={index}
                    href={socialLink.url}
                    target={socialLink.isExternal ? "_blank" : "_self"}
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
              className="w-full h-full object-[center_15%] object-cover bg-top grayscale aspect-[3/1] lg:aspect-auto hover:grayscale-0 transition-all duration-500"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
