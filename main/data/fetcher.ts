import axios from "axios";
import { HomepageProps, Project, ProjectPage } from "@/lib/models";
import { NotFoundType } from "@/lib/types";

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
        hero {
            title
            subheading
            image {
                url
            }
        }
        aboutMe {
            quickInfo {
                icon {
                    url
                }
                content
                alt
            }
            image {
                url
            }
            text
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
        experience {
            heading
            experienceTexts {
                heading
                content
                startingDate
                endingDate
            }
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

  const [globalInfo, skills, testimonials, projects] = await Promise.all([
    getGlobalInfo(locale),
    getAllSkills(),
    getTestimonials(),
    getProjects(locale),
  ]);

  const data = new HomepageProps(
    res.hero,
    res.aboutMe,
    {
      ...res.skills,
      allSkills: skills,
    },
    {
      ...res.testimonials,
      testimonials,
    },
    projects,
    res.experience,
    globalInfo
  );

  return data;
}

export async function getGlobalInfo(locale: string) {
  const res = await axios({
    ...apiConfig,
    data: {
      query: `
                query($locale: I18NLocaleCode) {
                    global(locale: $locale) {
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
                        footer {
                            cta
                            buttons {
                                isExternal
                                title
                                url
                            }
                            blurColor {
                                color
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

  return res.data.data.global;
}

export async function getMetadata(locale: string, page: string) {
  const pages = ["homepage", "projectpage"];

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
                        confidenceLevel,
                        icon {
                          url
                        }
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
                    projects(locale: $locale, sort: "createdAt:desc") {
                        screenshots {
                            url
                        }
                        title
                        description
                        slug
                        backgroundColor {
                            color
                        }
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

export async function getProject(slug: string, locale: string) {
  const res = await axios({
    ...apiConfig,
    data: {
      query: `
                query($slug: String!, $locale: I18NLocaleCode) {
                    projects(filters: { slug: {eq:$slug} }, locale: $locale) {
                        screenshots {
                            url
                        }
                        title
                        createdAt
                        url
                        description
                        backgroundColor {
                            color
                        }
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
        locale,
      },
    },
  });

  if (!res.data.data.projects.length) {
    return null;
  }

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
                            dateHeading
                            technologiesHeading
                            categoriesHeading
                            metadata {
                                title
                                description
                            }
                        }
                    }
            `,
        variables: {
          locale,
        },
      },
    })
  ).data.data.projectpage;

  const project = await getProject(slug, locale);
  const globalInfo = await getGlobalInfo(locale);

  if (!project) {
    return null;
  }

  return new ProjectPage(
    res.dateHeading,
    res.technologiesHeading,
    res.categoriesHeading,
    project,
    res.metadata,
    globalInfo
  );
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

export async function getNotFoundData(locale: string): Promise<NotFoundType> {
  const res = await axios({
    ...apiConfig,
    data: {
      query: `
                query($locale: I18NLocaleCode!) {
                    notFound(locale: $locale) {
                        heading
                        toHomepageButton {
                            url
                            title
                        }
                    }
                }
            `,
      variables: {
        locale,
      },
    },
  });

  return res.data.data.notFound;
}
