import { getHomepageData } from "@/data/fetcher";
import { getLocale } from "next-intl/server";
import styles from "@/styles/home.module.scss";
import Marquee from "react-fast-marquee";
import Section from "@/Components/custom/Section";
import AboutMe from "@/Components/custom/AboutMe";
import SlideFromLeft from "@/Components/reusable/SlideFromLeft";
import TextReveal from "@/Components/reusable/gsap/TextReveal";
import Skills from "@/Components/custom/Skills";

export enum TextRevealType {
    "h1",
    "h2",
    "h3",
    "h4",
    "p",
}

export default async function Home() {
    const locale = await getLocale();

    const homepageData = await getHomepageData(locale);

    const sections = homepageData.jumpToList.links.map((link, index) => (
        <Section key={link.url} index={index + 1} link={link}>
            {link.title === "About" ? (
                <AboutMe aboutMe={homepageData.aboutMe} />
            ) : link.title === "Skills" ? (
                <Skills skills={homepageData.skills}/>
            ) : (
                <div>Content for {link.title}</div>
            )}
        </Section>
    ));

    return (
        <div className={styles.sectionContainer}>
            <header className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className="flex flex-col gap-3">
                        <h2 className={styles.heroHeader}>
                        <TextReveal
                                text={homepageData.hero.title}
                            />
                        </h2>
                        <SlideFromLeft delay={0.3}>
                            <p>{homepageData.hero.subheading}</p>
                        </SlideFromLeft>
                    </div>
                    <div className={styles.jumpToList}>
                        <h3 className={styles.jumpToHeader}>
                            {homepageData.jumpToList.header}
                        </h3>
                        <ul className={styles.jumpToListLinks}>
                            {homepageData.jumpToList.links.map((link) => (
                                <li key={link.url}>
                                    <a
                                        href={link.url}
                                        target={
                                            link.isExternal ? "_blank" : "_self"
                                        }
                                        rel="noopener noreferrer"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.marquee}>
                    <Marquee autoFill>
                        {homepageData.marquee.text.map((text) => (
                            <span key={text.value} className="px-4 text-lg">
                                • {text.value}
                            </span>
                        ))}
                    </Marquee>
                </div>
            </header>
            <div className={styles.invisibleDiv}></div>
            {sections}
        </div>
    );
}
