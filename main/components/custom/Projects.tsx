import React from "react";
import { ProjectType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, i) => (
        <Link
          key={i}
          className="group relative aspect-[10/9] rounded-md overflow-hidden p-4"
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
                  className="px-2 py-1 bg-white/90 rounded-full text-foreground backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,.3)]"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
            <div className="bg-white/90 px-6 py-2 rounded-lg shadow-[0_0_10px_rgba(0,0,0,.3)] w-fit">
              <h3 className="text-xl text-foreground">{project.title}</h3>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 z-[5]"></div>
          <Image
            src={project.frontPhoto.url}
            alt={project.title}
            width={500}
            height={500}
            className="absolute brightness-90 drop-shadow-2xl group-hover:scale-110 top-0 left-0 select-none w-full h-full object-cover z-0 transition-transform duration-500"
            draggable={false}
          />
        </Link>
      ))}
    </div>
  );
}
