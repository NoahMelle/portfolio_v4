import React from "react";
import { ProjectType } from "@/lib/types";
import Image from "next/image";
import styles from "@/styles/home.module.scss";

export default function Projects({ projects }: { projects: ProjectType[] }) {
    return (
        <div className={styles.projects}>
            {projects.map((project, i) => (
                <div key={i} className={styles.project}>
                    <div className="z-10 relative flex flex-col justify-between h-full">
                        <ul className="ml-auto mr-0 flex gap-1 justify-end max-w-full flex-wrap">
                            {project.skills.map((skill) => (
                                <li
                                    key={skill.name}
                                    className="px-2 py-1 bg-gray-800/70 rounded-full text-white backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,.3)]"
                                >
                                    {skill.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.projectOverlay}></div>
                    <Image
                        src={project.screenshots[0].url}
                        alt={project.title}
                        width={500}
                        height={500}
                        className={styles.projectImage}
                        draggable={false}
                    />
                </div>
            ))}
        </div>
    );
}
