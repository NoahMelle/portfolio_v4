"use client";

import React from "react";
import { SkillsSectionType } from "@/lib/types";
import Markdown from "react-markdown";
import styles from "@/styles/home.module.scss";
import Image from "next/image";

export default function Skills({ skills }: { skills: SkillsSectionType }) {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="basis-full">
                <div className="max-w-[600px] flex flex-col gap-8">
                    <div className="text-lg">
                        <Markdown>{skills.skillText}</Markdown>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">
                            {skills.techStack.heading}
                        </h3>
                        <div className="flex gap-4">
                            {skills.techStack.techStackSkills.map((skill, i) => (
                                <Image
                                    src={skill.icon.url}
                                    alt={skill.name}
                                    className="invert"
                                    height={40}
                                    width={40}
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-full">skills go here</div>
        </div>
    );
}
