import {
  HeroType,
  AboutMeType,
  SocialLink,
  SkillsSectionType,
  TestimonialsSectionType,
  ProjectType,
  ExperienceType,
  MyInfoType,
  FooterType,
  MetadataType,
} from "./types";
import { getAgeFromBday } from "./utils";
import { getYearsDiff } from "./utils";

export class HomepageProps {
  hero: HeroType;
  aboutMe: AboutMeType;
  skills: SkillsSectionType;
  testimonials: TestimonialsSectionType;
  projects: ProjectType[];
  experience: ExperienceType;
  globalData: {
    myInfo: MyInfoType;
    footer: FooterType;
  };

  constructor(
    hero: HeroType,
    aboutMe: AboutMeType,
    skills: SkillsSectionType,
    testimonials: TestimonialsSectionType,
    projects: ProjectType[],
    experience: ExperienceType,
    globalData: {
      myInfo: {
        dateOfBirth: string;
        startedProgramming: string;
        socialLinks: SocialLink[];
      };
      footer: FooterType;
    }
  ) {
    const birthDate = parseDate(globalData.myInfo.dateOfBirth);
    const age = getAgeFromBday(birthDate);
    const startedProgramming = globalData.myInfo.startedProgramming;

    this.hero = {
      title: hero.title,
      subheading: replaceDynamicText(hero.subheading, {
        age,
        startedProgramming,
      }),
      image: {
        ...hero.image,
        url: constructImageUrl(hero.image.url),
      },
    };
    this.aboutMe = {
      ...aboutMe,
      socialLinks: processLinks(globalData.myInfo.socialLinks),
      quickInfo: aboutMe.quickInfo.map((quickInfo) => ({
        ...quickInfo,
        icon: {
          ...quickInfo.icon,
          url: constructImageUrl(quickInfo.icon.url),
        },
      })),
      image: {
        ...aboutMe.image,
        url: constructImageUrl(aboutMe.image.url),
      },
    };
    this.testimonials = {
      ...testimonials,
      testimonials: testimonials.testimonials.map((testimonial) => {
        return {
          ...testimonial,
          image: {
            ...testimonial.image,
            url: constructImageUrl(testimonial.image.url),
          },
        };
      }),
    };
    this.skills = {
      ...skills,
      techStack: {
        ...skills.techStack,
        techStackSkills: skills.techStack.techStackSkills.map((skill) => ({
          ...skill,
          icon: {
            ...skill.icon,
            url: constructImageUrl(skill.icon.url),
          },
        })),
      },
      allSkills: skills.allSkills.map((skill) => ({
        ...skill,
        icon: skill.icon
          ? {
              ...skill.icon,
              url: constructImageUrl(skill.icon?.url),
            }
          : undefined,
      })),
    };
    this.projects = projects.map((project) => new Project(project));
    this.experience = {
      ...experience,
      experienceTexts: experience.experienceTexts.map((exp) => ({
        ...exp,
        startingDate: parseDate(exp.startingDate),
        endingDate: exp.endingDate ? parseDate(exp.endingDate) : undefined,
      })),
    };

    this.globalData = {
      myInfo: {
        ...globalData.myInfo,
        dateOfBirth: parseDate(globalData.myInfo.dateOfBirth),
        startedProgramming: parseDate(globalData.myInfo.startedProgramming),
        socialLinks: processLinks(globalData.myInfo.socialLinks),
      },
      footer: globalData.footer,
    };
  }

  getAge() {
    return getAgeFromBday(parseDate(this.globalData.myInfo.dateOfBirth));
  }
}

export class Project {
  title: string;
  description?: string;
  slug: string;
  url?: string;
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
      url: constructImageUrl(screenshot.url),
    }));
    this.skills = project.skills.map((skill) => ({
      ...skill,
      icon: {
        ...skill.icon,
        url: constructImageUrl(skill.icon?.url),
      },
    }));
    this.url = project.url;
    this.frontPhoto = {
      ...project.frontPhoto,
      url: constructImageUrl(project.frontPhoto.url),
    };
    this.tags = project.tags ?? [];
    this.categories = project.categories ?? [];
    this.createdAt = parseDate(project.createdAt);
    this.backgroundColor = project.backgroundColor;
  }
}

export class ProjectPage {
  project: ProjectType;
  headings: { date: string; technologies: string; categories: string };
  metadata: MetadataType;
  global: {
    myInfo: {
      socialLinks: SocialLink[];
    };
    footer: FooterType;
  };

  constructor(
    dateHeading: string,
    technologiesHeading: string,
    categoriesHeading: string,
    project: ProjectType,
    metadata: MetadataType,
    globalData: {
      myInfo: {
        socialLinks: SocialLink[];
      };
      footer: FooterType;
    }
  ) {
    this.project = project;
    this.headings = {
      date: dateHeading,
      technologies: technologiesHeading,
      categories: categoriesHeading,
    };
    this.metadata = metadata;
    this.global = {
      myInfo: {
        socialLinks: processLinks(globalData.myInfo.socialLinks),
      },
      footer: globalData.footer,
    };
  }
}

function replaceDynamicText(
  text: string,
  requiredData: { age: number; startedProgramming: string }
) {
  const dict = {
    "{{age}}": requiredData.age.toString(),
    "{{experience}}": getYearsDiff(
      new Date(),
      parseDate(requiredData.startedProgramming)
    ).toString(),
  };

  return Object.keys(dict).reduce((acc, key) => {
    return acc.replace(key, dict[key as keyof typeof dict]);
  }, text);
}

function constructImageUrl(url: string | undefined) {
  return (process.env.BASEURL_API ?? "") + url;
}

function parseDate(date: string | Date) {
  return new Date(date);
}

function processLinks(links: SocialLink[]) {
  return links.map((link) => ({
    ...link,
    icon: {
      ...link.icon,
      url: constructImageUrl(link.icon.url),
    },
  }));
}
