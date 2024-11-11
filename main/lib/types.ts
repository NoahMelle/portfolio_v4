export interface JumpToListType {
    header: string;
    links: LinkType[];
}

export interface LinkType {
    title: string;
    url: string;
    isExternal?: boolean;
}

export interface HeroType {
    title: string;
    subheading: string;
    image: { url: string };
}

export interface MarqueeType {
    text: { value: string }[];
}

export interface AboutMeType {
    quickInfo: quickInfoType[];
    image: { url: string };
    text: string;
    socialLinks: SocialLink[];
}

export interface quickInfoType {
    icon: { url: string };
    content: string;
    alt: string;
}

export interface SocialLink {
    alt: string;
    url: string;
    isExternal?: boolean;
    icon: { url: string };
}

export interface SkillsSectionType {
    skillText: string;
    skillsHeading: string;
    techStack: TechStackType;
    allSkills: SkillType[];
}

export interface SkillType {
    name: string;
    confidenceLevel: number;
    icon?: { url: string };
}

export interface ExperienceType {
    heading: string;
    experienceTexts: ExperienceTextType[];
}

export interface ExperienceTextType {
    heading: string;
    content: string;
    startingDate: Date;
    endingDate?: Date;
}

export interface TechStackType {
    heading: string;
    techStackSkills: TechStackSkillType[];
}

export interface TechStackSkillType {
    name: string;
    icon: { url: string };
}

export interface TestimonialType {
    name: string;
    content: string;
    testimonialRole: { name: string };
    image: { url: string };
}

export interface TestimonialsSectionType {
    testimonialHeading: string;
    testimonials: TestimonialType[];
}

export interface ProjectType {
    title: string;
    description?: string;
    slug: string;
    screenshots: { url: string }[];
    frontPhoto: { url: string };
    skills: SkillType[];
    tags?: { name: string }[];
    categories?: { name: string }[];
    createdAt: Date;
    backgroundColor: { color: string };
}

export interface ProjectPageType {
    dateHeading: string;
    technologiesHeading: string;
    cateogriesHeading: string;
    project: ProjectType;
    metadata: MetadataType;
}

export interface NotFoundType {
    heading: string;
    toHomepageButton: LinkType;
}

export interface MyInfoType {
    dateOfBirth: Date;
    startedProgramming: Date;
    socialLinks: SocialLink[];
}

export interface FooterType {
    cta: string;
    buttons: LinkType[];
    blurColor: { color: string };
}

export interface MetadataType {
    title: string;
    description: string;
}