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
}

export interface MarqueeType {
    text: { value: string }[];
}

export interface AboutMeType {
    heading: string;
    aboutMeTexts: AboutMeTextType[];
    socialLinks: SocialLink[];
}

export interface AboutMeTextType {
    text: string;
    image: { url: string };
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
}
