import axios from "axios";
import { HomepageProps, Project, ProjectPage } from "@/lib/models";

const apiConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + process.env.STRAPI_TOKEN,
    },
    method: "POST",
    url: process.env.BASEURL_API + "/graphql",
};

export async function getHomepageData(locale: string) {
    const res = (
        await axios({
            ...apiConfig,
            data: {
                query: `
                query($locale: I18NLocaleCode!) {
                    homepage(locale: $locale) {
                        jumpToList {
                            header
                            links {
                                title
                                url
                            }
                        }
                        hero {
                            title
                            subheading
                        }
                        marquee {
                            text {
                                value
                            }
                        }
                        aboutMe {
                            heading
                            aboutMeTexts {
                                text
                                image {
                                    url
                                }
                            }
                        }
                        skills {
                            skillText
                            skillsHeading
                            techStack {
                                heading
                                techStackSkills {
                                    icon {
                                        url
                                    }
                                    name
                                }
                            }
                        }
                        testimonials {
                            testimonialHeading
                        }
                    }
                }
            `,
                variables: {
                    locale,
                },
            },
        })
    ).data.data.homepage;

    const myInfo = await getMyInfo();
    const skills = await getAllSkills();
    const testimonials = await getTestimonials();
    const projects = await getProjects(locale);

    const data = new HomepageProps(
        res.jumpToList,
        res.hero,
        res.marquee,
        myInfo.dateOfBirth,
        myInfo.startedProgramming,
        res.aboutMe,
        myInfo.socialLinks,
        {
            ...res.skills,
            allSkills: skills,
        },
        {
            ...res.testimonials,
            testimonials,
        },
        projects
    );

    return data;
}

export async function getMyInfo() {
    const res = await axios({
        ...apiConfig,
        data: {
            query: `
                query {
                    global {
                        myInfo {
                            dateOfBirth
                            startedProgramming
                            socialLinks {
                                alt
                                url
                                isExternal
                                icon {
                                    url
                                }
                            }
                        }
                    }
                }
            `,
        },
    });

    return res.data.data.global.myInfo;
}

export async function getMetadata(locale: string, page: string) {
    const pages = ["homepage"];

    if (!pages.includes(page)) {
        throw new Error("Invalid page name");
    }

    const res = await axios({
        ...apiConfig,
        data: {
            query: `
                query($locale: I18NLocaleCode!) {
                    ${page}(locale: $locale) {
                        metadata {
                            title
                            description
                        }
                    }
                }
            `,
            variables: {
                locale,
                page,
            },
        },
    });

    return res.data.data[page].metadata;
}

export async function getAllSkills() {
    const res = await axios({
        ...apiConfig,
        data: {
            query: `
                query Skills($locale: I18NLocaleCode) {
                    skills(locale: $locale, pagination: { limit: 100 }, sort: "pride:desc") {
                        name,
                        confidenceLevel
                    }
                }
            `,
        },
    });

    return res.data.data.skills;
}

export async function getTestimonials() {
    const res = await axios({
        ...apiConfig,
        data: {
            query: `
                query {
                    testimonials {
                        content
                        name
                        testimonialRole {
                            name
                        }
                        image {
                            url
                        }
                    }
                }
            `,
        },
    });

    return res.data.data.testimonials;
}

export async function getProjects(locale: string) {
    return (
        await axios({
            ...apiConfig,
            data: {
                query: `
                query($locale: I18NLocaleCode!) {
                    projects(locale: $locale) {
                        screenshots {
                            url
                        }
                        title
                        description
                        slug
                        backgroundColor
                        frontPhoto {
                            url
                        }
                        skills {
                            name
                        }
                    }
                }
            `,
                variables: {
                    locale,
                },
            },
        })
    ).data.data.projects;
}

export async function getProject(slug: string) {
    const res = await axios({
        ...apiConfig,
        data: {
            query: `
                query($slug: String!) {
                    projects(filters: { slug: {eq:$slug} }) {
                        screenshots {
                            url
                        }
                        title
                        createdAt
                        description
                        backgroundColor
                        slug
                        frontPhoto {
                            url
                        }
                        categories {
                            name
                        }
                        tags {
                            name
                        }
                        skills {
                            name
                            icon {
                                url
                            }
                        }
                    }
                }
            `,
            variables: {
                slug,
            },
        },
    });

    return new Project(res.data.data.projects[0]);
}

export async function getProjectPageData(locale: string, slug: string) {
    const res = (
        await axios({
            ...apiConfig,
            data: {
                query: `
                    query($locale: I18NLocaleCode) {
                        projectpage(locale: $locale) {
                            backgroundImage {
                                url
                            }
                            dateHeading
                            technologiesHeading
                            categoriesHeading
                        }
                    }
            `,
                variables: {
                    locale,
                },
            },
        })
    ).data.data.projectpage;

    const project = await getProject(slug);

    return new ProjectPage(res.backgroundImage, res.dateHeading, res.technologiesHeading, res.categoriesHeading, project);
}

export async function getHomepageLinks(locale: string) {
    const res = await axios({
        ...apiConfig,
        data: {
            query: `
                query($locale: I18NLocaleCode!) {
                    homepage(locale: $locale) {
                        jumpToList {
                            links {
                                title
                                url
                            }
                        }
                    }
                }
            `,
            variables: {
                locale,
            },
        },
    });

    return res.data.data.homepage.jumpToList.links;
}