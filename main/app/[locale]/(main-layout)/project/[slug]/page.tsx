import React from "react";
import { getProjectPageData } from "@/data/fetcher";
import { ProjectType } from "@/lib/types";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import styles from "@/styles/project.module.scss";
import PopupStagger from "@/Components/reusable/gsap/PopupStagger";

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
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
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
                    <div className="flex gap-8 md:flex-row flex-col-reverse">
                        <div className="grid md:grid-cols-[min-content,_1fr] gap-8 min-w-fit md:w-auto w-full">
                            <div className="md:contents flex flex-col gap-2">
                                <h3 className="font-semibold uppercase text-xl w-fit">
                                    {projectPageData.headings.categories}
                                </h3>
                                <div className="flex gap-2 md:flex-col flex-wrap">
                                    <PopupStagger containerStyles="flex gap-2 md:flex-col flex-wrap">
                                        {projectPageData.project.categories &&
                                            projectPageData.project.categories.map(
                                                (category) => (
                                                    <p className="text-xl px-3 py-1 bg-gray-400/40 w-fit rounded-full">
                                                        {category.name}
                                                    </p>
                                                )
                                            )}
                                    </PopupStagger>
                                </div>
                            </div>
                            <div className="md:contents flex flex-col gap-2">
                                <h3 className="font-semibold uppercase text-xl w-fit">
                                    {projectPageData.headings.date}
                                </h3>
                                <div>
                                    <p className="text-xl">
                                        {projectPageData.project.createdAt.toDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p>{projectPageData.project.description}</p>
                        </div>
                    </div>
                    <div className="text-center flex flex-col items-center gap-4">
                        <h3 className="font-semibold uppercase text-xl">
                            {projectPageData.headings.technologies}
                        </h3>
                        <ul className="flex gap-7 flex-wrap justify-center">
                            {projectPageData.project.skills.map((skill) => (
                                <li>
                                    {skill.icon && (
                                        <Image
                                            src={skill?.icon?.url}
                                            alt={skill.name}
                                            width={40}
                                            height={40}
                                            className="invert-[80%] select-none"
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}