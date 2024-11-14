import React from "react";
import { getProjectPageData } from "@/data/fetcher";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import styles from "@/styles/project.module.scss";
import PopupStagger from "@/components/reusable/PopupStagger";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/lib/models";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/custom/Footer";
import Markdown from "react-markdown";

export default async function Project(props: {
    params: Promise<{ slug: string }>;
}) {
    const params = await props.params;
    const locale = await getLocale();

    const projectPageData = await getProjectPageData(locale, params.slug);

    if (!projectPageData) {
        console.log("Project not found");
        return notFound();
    }

    return (
        <>
            <div className={`${styles.projectPage} mb-12`}>
                <div className="max-w-[1000px] mx-auto flex flex-col gap-10">
                    <div className="relative">
                        <Carousel>
                            <CarouselContent>
                                {projectPageData.project.screenshots.map(
                                    (image) => (
                                        <CarouselItem key={image.url}>
                                            <div className="aspect-video border-2 border-black/5 rounded-lg">
                                                <Image
                                                    src={image.url}
                                                    alt="Project Screenshot"
                                                    width={1000}
                                                    height={500}
                                                    className="w-full h-full object-cover block rounded-lg select-none"
                                                />
                                            </div>
                                        </CarouselItem>
                                    )
                                )}
                            </CarouselContent>
                            <div className="md:inline-flex hidden">
                                <CarouselPrevious />
                            </div>
                            <div className="md:inline-flex hidden">
                                <CarouselNext />
                            </div>
                        </Carousel>
                        <div className={styles.blur}>
                            <div
                                className={styles.blob}
                                style={{
                                    backgroundColor:
                                        projectPageData.project.backgroundColor
                                            .color,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <h1 className="text-4xl font-medium uppercase">
                                    {projectPageData.project.title}
                                </h1>
                                {projectPageData.project.url && (
                                    <Link
                                        href={projectPageData.project.url}
                                        target="_blank"
                                        className="flex gap-2 bg-black text-white rounded-full p-3 items-center"
                                    >
                                        <ArrowUpRight />
                                        Visit Site
                                    </Link>
                                )}
                            </div>
                            <hr className="h-[3px] bg-black" />
                            <div className="flex gap-2 flex-wrap">
                                {projectPageData.project.tags &&
                                    projectPageData.project?.tags.map((tag) => (
                                        <span
                                            className="font-medium lowercase rounded-full"
                                            key={tag.name}
                                        >
                                            #{tag.name}
                                        </span>
                                    ))}
                            </div>
                        </div>
                        <div className="flex gap-8 md:flex-row flex-col-reverse">
                            <div className="grid md:grid-cols-[min-content,_1fr] gap-8 min-w-fit md:w-auto w-full">
                                <div className="md:contents flex flex-col gap-2">
                                    <h2 className="font-semibold uppercase text-xl w-fit">
                                        {projectPageData.headings.categories}
                                    </h2>
                                    <div className="flex gap-2 md:flex-col flex-wrap">
                                        <PopupStagger containerStyles="flex gap-2 md:flex-col flex-wrap">
                                            {projectPageData.project
                                                .categories &&
                                                projectPageData.project.categories.map(
                                                    (category) => (
                                                        <p
                                                            className={
                                                                styles.category
                                                            }
                                                            key={category.name}
                                                        >
                                                            {category.name}
                                                        </p>
                                                    )
                                                )}
                                        </PopupStagger>
                                    </div>
                                </div>
                                <div className="md:contents flex flex-col gap-2">
                                    <h2 className="font-semibold uppercase text-xl w-fit">
                                        {projectPageData.headings.date}
                                    </h2>
                                    <div>
                                        <p>
                                            {projectPageData.project.createdAt.toDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <Markdown className={styles.markdownDescription}>{projectPageData.project.description}</Markdown>
                            </div>
                        </div>
                        <div className="text-center flex flex-col items-center gap-4">
                            <h2 className="font-semibold uppercase text-xl">
                                {projectPageData.headings.technologies}
                            </h2>
                            <div className="flex gap-7 flex-wrap justify-center">
                                {projectPageData.project.skills.map((skill) => (
                                    <TooltipProvider key={skill.name}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div key={skill.name}>
                                                    {skill.icon && (
                                                        <Image
                                                            src={
                                                                skill?.icon?.url
                                                            }
                                                            alt={skill.name}
                                                            width={40}
                                                            height={40}
                                                            className="invert-[80%] select-none"
                                                        />
                                                    )}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <h3 className="text-xl">
                                                    {skill.name}
                                                </h3>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                footerData={projectPageData.global.footer}
                socialLinks={projectPageData.global.myInfo.socialLinks}
                blurColor={projectPageData.project.backgroundColor.color}
            />
        </>
    );
}

export async function generateMetadata(props: {
    params: Promise<{ slug: string }>;
}) {
    const locale = await getLocale();
    const projectPageData: ProjectPage | null = await getProjectPageData(
        locale,
        (
            await props.params
        ).slug
    );

    if (!projectPageData) {
        return notFound();
    }

    const title = projectPageData.metadata.title.replace(
        "{{ projectName }}",
        projectPageData.project.title
    );

    const description = projectPageData.metadata.description.replace(
        "{{ projectName }}",
        projectPageData.project.title
    ) ?? "";

    return {
        title,
        description,
    };
}
