import {
    JumpToListType,
    HeroType,
    MarqueeType,
    AboutMeType,
    SocialLink,
    SkillsSectionType,
    TestimonialsSectionType,
    ProjectType,
    ExperienceType
} from "./types";
import { getAgeFromBday } from "./utils";
import { getYearsDiff } from "./utils";

export class HomepageProps {
    jumpToList: JumpToListType;
    hero: HeroType;
    dateOfBirth: Date;
    startedProgramming: string;
    marquee: MarqueeType;
    aboutMe: AboutMeType;
    skills: SkillsSectionType;
    testimonials: TestimonialsSectionType;
    projects: ProjectType[];
    experience: ExperienceType;

    constructor(
        jumpToList: JumpToListType,
        hero: HeroType,
        marquee: MarqueeType,
        dateOfBirth: string,
        startedProgramming: string,
        aboutMe: AboutMeType,
        socialLinks: SocialLink[],
        skills: SkillsSectionType,
        testimonials: TestimonialsSectionType,
        projects: ProjectType[],
        experience: ExperienceType
    ) {
        const birthDate = new Date(dateOfBirth); // Parse once
        const age = getAgeFromBday(birthDate);

        this.jumpToList = jumpToList;
        this.hero = {
            title: hero.title,
            subheading: replaceDynamicText(hero.subheading, {
                age,
                startedProgramming,
            }),
            image: {
                ...hero.image,
                url: (process.env.BASEURL_API ?? "") + hero.image.url,
            }
        };
        this.marquee = {
            ...marquee,
            text: marquee.text.map((text) => ({
                ...text,
                value: replaceDynamicText(text.value, {
                    age,
                    startedProgramming,
                }),
            })),
        };
        this.dateOfBirth = birthDate;
        this.startedProgramming = startedProgramming;
        this.aboutMe = {
            ...aboutMe,
            aboutMeTexts: aboutMe.aboutMeTexts.map((text) => ({
                image: {
                    ...text.image,
                    url: (process.env.BASEURL_API ?? "") + text.image.url,
                },
                text: replaceDynamicText(text.text, {
                    age,
                    startedProgramming,
                }),
            })),
            socialLinks: socialLinks.map((link) => ({
                ...link,
                icon: {
                    ...link.icon,
                    url: (process.env.BASEURL_API ?? "") + link.icon.url,
                },
            })),
        };
        this.testimonials = {
            ...testimonials,
            testimonials: testimonials.testimonials.map((testimonial) => {
                return {
                    ...testimonial,
                    image: {
                        ...testimonial.image,
                        url:
                            (process.env.BASEURL_API ?? "") +
                            testimonial.image.url,
                    },
                };
            }),
        };
        this.skills = {
            ...skills,
            techStack: {
                ...skills.techStack,
                techStackSkills: skills.techStack.techStackSkills.map(
                    (skill) => ({
                        ...skill,
                        icon: {
                            ...skill.icon,
                            url:
                                (process.env.BASEURL_API ?? "") +
                                skill.icon.url,
                        },
                    })
                ),
            },
        };
        this.projects = projects.map((project) => new Project(project));
        this.experience = {
            ...experience,
            experienceTexts: experience.experienceTexts.map((exp) => ({
                ...exp,
                startingDate: new Date(exp.startingDate),
                endingDate: exp.endingDate
                    ? new Date(exp.endingDate)
                    : undefined,
            })),
        };
    }

    getAge() {
        return getAgeFromBday(this.dateOfBirth); // Avoid multiple parsing
    }
}

export class Project {
    title: string;
    description?: string;
    slug: string;
    screenshots: { url: string }[];
    skills: { name: string; confidenceLevel: number; icon?: { url: string } }[];
    tags: { name: string }[] = [];
    frontPhoto: { url: string };
    categories?: { name: string }[];
    createdAt: Date;
    backgroundColor: { color: string };

    constructor(project: ProjectType) {
        this.title = project.title;
        this.description = project.description;
        this.slug = project.slug;
        this.screenshots = project.screenshots.map((screenshot) => ({
            ...screenshot,
            url: (process.env.BASEURL_API ?? "") + screenshot.url,
        }));
        this.skills = project.skills.map((skill) => ({
            ...skill,
            icon: {
                ...skill.icon,
                url: (process.env.BASEURL_API ?? "") + skill?.icon?.url,
            },
        })
        );
        this.frontPhoto = {
            ...project.frontPhoto,
            url: (process.env.BASEURL_API ?? "") + project.frontPhoto.url,
        };
        this.tags = project.tags ?? [];
        this.categories = project.categories ?? [];
        this.createdAt = new Date(project.createdAt);
        this.backgroundColor = project.backgroundColor
    }
}

export class ProjectPage {
    backgroundImg: { url: string };
    project: ProjectType;
    headings: { date: string; technologies: string; categories: string };

    constructor(backgroundImg: { url: string }, dateHeading: string, technologiesHeading: string, categoriesHeading: string, project: ProjectType) {
        this.backgroundImg = {
            ...backgroundImg,
            url: (process.env.BASEURL_API ?? "") + backgroundImg.url,
        };
        this.project = project;
        this.headings = {
            date: dateHeading,
            technologies: technologiesHeading,
            categories: categoriesHeading,
        };
    }
}

function replaceDynamicText(text: string, requiredData: { age: number; startedProgramming: string }) {
    const dict = {
        "{{age}}": requiredData.age.toString(),
        "{{experience}}": getYearsDiff(
            new Date(),
            new Date(requiredData.startedProgramming)
        ).toString(),
    };

    return Object.keys(dict).reduce((acc, key) => {
        return acc.replace(key, dict[key as keyof typeof dict]);
    }, text);
}
