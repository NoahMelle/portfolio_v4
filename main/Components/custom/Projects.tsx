import React from "react";
import { ProjectType } from "@/lib/types";
import Image from "next/image";
import styles from "@/styles/home.module.scss";
import Link from "next/link";

export default function Projects({ projects }: { projects: ProjectType[] }) {
    return (
        <div className={styles.projects}>
            {projects.map((project, i) => (
                <Link
                    key={i}
                    className={styles.project}
                    href={"/project/" + project.slug}
                    style={{
                        backgroundColor: project.backgroundColor.color,
                    }}
                >
                    <div className="z-10 relative flex flex-col justify-between h-full">
                        <ul className="ml-auto mr-0 flex gap-1 justify-end max-w-full flex-wrap">
                            {project.skills.map((skill) => (
                                <li
                                    key={skill.name}
                                    className="px-2 py-1 bg-white/90 rounded-full text-black backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,.3)]"
                                >
                                    {skill.name}
                                </li>
                            ))}
                        </ul>
                        <div className="bg-white/90 px-6 py-2 rounded-lg shadow-[0_0_10px_rgba(0,0,0,.3)] w-fit">
                            <h3 className="text-2xl text-black">
                                {project.title}
                            </h3>
                        </div>
                    </div>
                    <div className={styles.projectOverlay}></div>
                    <Image
                        src={project.frontPhoto.url}
                        alt={project.title}
                        width={500}
                        height={500}
                        className={styles.projectImage}
                        draggable={false}
                    />
                </Link>
            ))}
        </div>
    );
}
