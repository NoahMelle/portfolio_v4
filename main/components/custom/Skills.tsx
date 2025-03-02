"use client";

import React from "react";
import { SkillsSectionType } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { SkillType } from "@/lib/types";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import LinkRenderer from "../reusable/LinkRenderer";
import { motion, Variants } from "motion/react";

export default function Skills({ skills }: { skills: SkillsSectionType }) {
  const [currentSkillPage, setCurrentSkillPage] = React.useState(0);
  const skillsPerPage = 3;
  const totalPages = React.useRef(
    Math.ceil(skills.allSkills.length / skillsPerPage)
  );
  const [showingSkills, setShowingSkills] = React.useState<
    (SkillType | undefined)[]
  >([]);

  const handlePrevNext = React.useCallback((amt: number) => {
    setCurrentSkillPage((prev) => {
      let target = prev + amt;
      if (target < 0) {
        target = totalPages.current - 1;
      } else if (target >= totalPages.current) {
        target = 0;
      }
      return target;
    });
  }, []);

  React.useEffect(() => {
    const newSkills: (SkillType | undefined)[] = skills.allSkills.filter(
      (skill, index) =>
        index >= skillsPerPage * currentSkillPage &&
        index < skillsPerPage * (currentSkillPage + 1)
    );

    while (newSkills.length < 3) {
      newSkills.push(undefined);
    }

    setShowingSkills(newSkills);
  }, [currentSkillPage, skills.allSkills]);

  const progressBarVariants: Variants = {};

  return (
    <div>
      <div className={`flex flex-col md:flex-row gap-8 md:gap-16`}>
        <div className="basis-full">
          <div className="max-w-[600px] flex flex-col gap-8 md:gap-16">
            <motion.div
              className="text-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: 0.4,
              }}
            >
              <ReactMarkdown components={{ a: LinkRenderer }}>
                {skills.skillText}
              </ReactMarkdown>
            </motion.div>
            <div className={`flex flex-col gap-4`}>
              <h3 className="text-xl font-semibold">
                {skills.techStack.heading}
              </h3>
              <div className="flex gap-4 flex-wrap">
                {skills.techStack.techStackSkills.map((skill, i) => (
                  <TooltipProvider key={i}>
                    <Tooltip>
                      <TooltipTrigger>
                        {skill.icon && (
                          <Image
                            src={skill?.icon?.url}
                            alt={skill.name}
                            width={40}
                            height={40}
                            className="invert-[80%] select-none"
                          />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>{skill.name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`basis-full flex items-center justify-end`}>
          <div className="max-w-[600px] w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5, once: false }}
              className="grid gap-10 grid-cols-[1fr]"
              style={{
                gridTemplateRows: `repeat(${skillsPerPage}, 1fr)`,
              }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {showingSkills.map((skill, i) => (
                <div
                  key={i}
                  className={`${!skill && "hidden"}`}
                  aria-hidden={!skill}
                >
                  <div className="flex justify-end">
                    <div>{skill?.name ?? ""}</div>
                  </div>
                  <div className={`h-7 border-[1px] border-navy-blue-800`}>
                    <motion.div
                      className="h-full bg-navy-blue-800"
                      variants={{
                        hidden: { width: 0 },
                        visible: { width: `${skill?.confidenceLevel ?? 0}%` },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 10,
                        mass: 1,
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="flex mt-10 w-full justify-between items-center">
              <button
                onClick={() => handlePrevNext(-1)}
                className="px-3 py-1 transition-colors"
              >
                PREV
              </button>
              <div
                className="flex gap-[6px] grow h-fit"
                style={{
                  maxWidth: `${(totalPages.current * 2 + 2) * 7}px`,
                }}
              >
                {Array.from({
                  length: totalPages.current,
                }).map((e, i) => (
                  <div
                    className={`h-[6px] basis-[6px] transition-all ${
                      currentSkillPage === i ? "grow" : ""
                    } bg-navy-blue-800`}
                    key={i}
                  ></div>
                ))}
              </div>
              <button
                onClick={() => handlePrevNext(1)}
                className="px-3 py-1 transition-colors"
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
