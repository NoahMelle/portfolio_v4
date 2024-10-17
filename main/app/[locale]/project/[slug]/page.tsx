import React from "react";
import { getProjectPageData } from "@/data/fetcher";
import { ProjectType } from "@/lib/types";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import styles from "@/styles/project.module.scss";

export default async function Project({
    params,
}: {
    params: { slug: string };
}) {
    const locale = await getLocale();

    const projectPageData = await getProjectPageData(locale, params.slug);

    return (
        <div
            style={{
                backgroundImage: `url(${projectPageData.backgroundImg.url})`,
            }}
            className={`${styles.projectPage}`}
        >
            <div className="max-w-[1000px] mx-auto flex flex-col gap-10">
                <Image
                    src={projectPageData.project.screenshots[0].url}
                    alt="Screenshot"
                    width={1000}
                    height={1000}
                    className="w-full rounded-lg shadow-[0_0_100px_rgba(0,0,0,.1)]"
                />
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-4xl italic font-medium uppercase">
                            {projectPageData.project.title}
                        </h1>
                        <hr className="h-[3px] bg-black" />
                        <div className="flex gap-2 flex-wrap">
                            {projectPageData.project.tags &&
                                projectPageData.project?.tags.map((tag) => (
                                    <span className="font-medium lowercase rounded-full">
                                        #{tag.name}
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div>
                        <h3>{projectPageData.headings.categories}</h3>
                        <div>
                            {
                              projectPageData.project.categories && projectPageData.project.categories.map((category) => (
                                <p>{category.name}</p>
                              ))
                            }
                        </div>
                        <h3>
                            {projectPageData.headings.date}
                        </h3>
                        <div>
                            {
                              projectPageData.project.skills && projectPageData.project.skills.map((skill) => (
                                <p>{skill.name}</p>
                              ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
