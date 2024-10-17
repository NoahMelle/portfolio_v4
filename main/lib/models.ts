import {
    JumpToListType,
    HeroType,
    MarqueeType,
    AboutMeType,
    SocialLink,
    SkillsSectionType,
    TestimonialsSectionType,
    ProjectType,
} from "./types";
import { getAgeFromBday } from "./utils";
import { getYearsDiff } from "./utils";

export class HomepageProps {
    jumpToList: JumpToListType;
    hero: { title: string; subheading: string };
    dateOfBirth: Date;
    startedProgramming: string;
    marquee: MarqueeType;
    aboutMe: AboutMeType;
    skills: SkillsSectionType;
    testimonials: TestimonialsSectionType;
    projects: ProjectType[];

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
        projects: ProjectType[]
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
    skills: { name: string; confidenceLevel: number }[];
    frontPhoto: { url: string };

    constructor(project: ProjectType) {
        this.title = project.title;
        this.description = project.description;
        this.slug = project.slug;
        this.screenshots = project.screenshots.map((screenshot) => ({
            ...screenshot,
            url: (process.env.BASEURL_API ?? "") + screenshot.url,
        }));
        this.skills = project.skills;
        this.frontPhoto = {
            ...project.frontPhoto,
            url: (process.env.BASEURL_API ?? "") + project.frontPhoto.url,
        };
    }
}

function replaceDynamicText(text: string, requiredData: any) {
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
