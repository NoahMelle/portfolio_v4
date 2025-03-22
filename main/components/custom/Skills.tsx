"use client";

import React from "react";
import { SkillsSectionType } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import LinkRenderer from "../reusable/LinkRenderer";
import { motion } from "motion/react";
import Globe from "./Globe";

export default function Skills({ skills }: { skills: SkillsSectionType }) {
  return (
    <div>
      <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center`}>
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
                  <TooltipProvider key={i} delayDuration={0}>
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
        <Globe />
      </div>
    </div>
  );
}
