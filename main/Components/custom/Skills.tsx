"use client";

import React from "react";
import { SkillsSectionType } from "@/lib/types";
import Markdown from "react-markdown";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import { SkillType } from "@/lib/types";
import { defaultOverrides } from "next/dist/server/require-hook";

export default function Skills({ skills }: { skills: SkillsSectionType }) {
    const [currentSkillPage, setCurrentSkillPage] = React.useState(0);
    const skillsPerPage = 3;
    const totalPages = React.useRef(
        Math.ceil(skills.allSkills.length / skillsPerPage)
    );
    const skillContainerRef = React.useRef<HTMLDivElement>(null);
    const [touchstartX, setTouchstartX] = React.useState(0);
    const [touchendX, setTouchendX] = React.useState(0);
    const [showingSkills, setShowingSkills] = React.useState<SkillType[]>([]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchstartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        setTouchendX(e.changedTouches[0].clientX);
    };

    React.useEffect(() => {
        if (touchendX < touchstartX) {
            handlePrevNext(1);
        } else if (touchendX > touchstartX) {
            handlePrevNext(-1);
        }
    }, [touchendX]);

    React.useEffect(() => {
        const newSkills = skills.allSkills.filter(
            (skill, index) =>
                index >= skillsPerPage * currentSkillPage &&
                index <= skillsPerPage * currentSkillPage + skillsPerPage - 1
        );
        setShowingSkills(newSkills);
    }, [currentSkillPage]);

    const handlePrevNext = (amt: number) => {
        let target = currentSkillPage + amt;
        if (target < 0) {
            target = totalPages.current - 1;
        } else if (target >= skills.allSkills.length / skillsPerPage) {
            target = 0;
        }
        setCurrentSkillPage(target);
    };

    return (
        <div>
            <div className={`flex flex-col md:flex-row gap-8 md:gap-16`}>
                <div className="basis-full">
                    <div className="max-w-[600px] flex flex-col gap-8 md:gap-16">
                        <div className="text-lg">
                            <Markdown>{skills.skillText}</Markdown>
                        </div>
                        <div className={`flex flex-col gap-4`}>
                            <h3 className="text-xl font-semibold">
                                {skills.techStack.heading}
                            </h3>
                            <div className="flex gap-4 flex-wrap">
                                {skills.techStack.techStackSkills.map(
                                    (skill, i) => (
                                        <Image
                                            src={skill.icon.url}
                                            alt={skill.name}
                                            className="invert-[90%] select-none"
                                            height={40}
                                            width={40}
                                            title={skill.name}
                                            key={i}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`basis-full flex items-center justify-end`}>
                    <div
                        className={`max-w-[600px] w-full  ${styles.skillsContainer}`}
                    >
                        <div
                            className="grid gap-10 grid-cols-[1fr]"
                            style={{
                                gridTemplateRows: `repeat(${skillsPerPage}, 1fr)`,
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {showingSkills.map((skill, i) => (
                                <div key={i} className={styles.skill}>
                                    <div className="flex justify-end">
                                        <div>{skill.name}</div>
                                    </div>
                                    <div className={`h-7 border-[1px] ${styles.skillBar}`}>
                                        <div
                                            className={`h-full transition-all duration-500 ${styles.skillBarFill}`}
                                            style={{
                                                width: `${skill.confidenceLevel}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-10 w-full justify-between items-center">
                            <button
                                onClick={() => handlePrevNext(-1)}
                                className="hover:bg-slate-100 px-3 py-1 transition-colors bg-transparent]"
                            >
                                PREV
                            </button>
                            <div
                                className="flex gap-[6px] grow h-fit"
                                style={{
                                    maxWidth: `${
                                        (totalPages.current * 2 + 2) * 7
                                    }px`,
                                }}
                            >
                                {Array.from({
                                    length: totalPages.current,
                                }).map((e, i) => (
                                    <button
                                        className={`block h-[6px] basis-[6px] transition-all ${
                                            currentSkillPage === i ? "grow" : ""
                                        } ${styles.skillPageButton}`}
                                        onClick={() => setCurrentSkillPage(i)}
                                        key={i}
                                    ></button>
                                ))}
                            </div>
                            <button
                                onClick={() => handlePrevNext(1)}
                                className="hover:bg-slate-100 px-3 py-1 transition-colors bg-transparent"
                            >
                                NEXT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
