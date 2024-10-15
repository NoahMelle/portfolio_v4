import axios from "axios";
import { HomepageProps } from "@/lib/models";

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
        }
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