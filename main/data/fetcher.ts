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
    const res = (await axios({
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
                    }
                }
            `,
            variables: {
                locale,
            },
        },
        
    })).data.data.homepage

    const myInfo = await getMyInfo();

    const data = new HomepageProps(
        res.jumpToList,
        res.hero,
        res.marquee,
        myInfo.dateOfBirth,
        myInfo.startedProgramming,
        res.aboutMe,
        myInfo.socialLinks
    )

    return data
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