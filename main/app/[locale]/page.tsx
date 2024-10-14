import { getHomepageData } from "@/data/fetcher";
import { getLocale } from "next-intl/server";
import styles from "@/styles/home.module.scss";
import Marquee from "react-fast-marquee";
import Section from "@/Components/custom/Section";
import AboutMe from "@/Components/custom/AboutMe";
import SlideFromLeft from "@/Components/reusable/SlideFromLeft";
import TextReveal from "@/Components/reusable/gsap/TextReveal";
import Skills from "@/Components/custom/Skills";
import CursorTracker from "@/Components/custom/CursorTracker";
import bgImage from "@/public/img/backgrounds/patterngrid.png";
import Image from "next/image";

export enum TextRevealType {
    "h1",
    "h2",
    "h3",
    "h4",
    "p",
}

export default async function Home() {
    const locale = await getLocale();

    const wsProtocol = process.env.WEBSOCKET_PROTOCOL || "ws";
    const wsHost = process.env.WEBSOCKET_HOST || "localhost";
    const wsPort = process.env.WEBSOCKET_PORT || "8080";

    const homepageData = await getHomepageData(locale);

    const sections = homepageData.jumpToList.links.map((link, index) => (
        <Section key={link.url} index={index + 1} link={link}>
            {link.title === "About" ? (
                <AboutMe aboutMe={homepageData.aboutMe} />
            ) : link.title === "Skills" ? (
                <Skills skills={homepageData.skills} />
            ) : (
                <div>Content for {link.title}</div>
            )}
        </Section>
    ));

    return (
        <div className={`${styles.sectionContainer}`} id="section-container">
            <div className={styles.sectionWrapper}>
                <header className={`${styles.hero}`}>
                    <div className="h-full w-full overflow-hidden absolute left-0 top-0 -z-10">
                        <Image
                            src={bgImage}
                            alt="background"
                            className={`absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] h-full w-[1400px] max-w-none object-contain ${styles.backgroundImage}`}
                        />
                    </div>
                    <div className={styles.heroContent}>
                        <div className="flex flex-col gap-3">
                            <h2 className={styles.heroHeader}>
                                <TextReveal text={homepageData.hero.title} />
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
                                                link.isExternal
                                                    ? "_blank"
                                                    : "_self"
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
                <div className={styles.invisibleDiv} id="invisible-div"></div>
                {sections}
                <CursorTracker wsUrl={`${wsProtocol}://${wsHost}:${wsPort}`} />
            </div>
        </div>
    );
}
