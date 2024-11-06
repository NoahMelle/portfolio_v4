import { getHomepageData, getMetadata } from "@/data/fetcher";
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
import Testimonials from "@/Components/custom/Testimonials";
import AnchorNav from "@/Components/custom/navbar/AnchorNav";
import Projects from "@/Components/custom/Projects";
import Experience from "@/Components/custom/Experience";
import Hero from "@/Components/custom/Hero";

export default async function Home() {
    const locale = await getLocale();

    const isProduction = process.env.NODE_ENV === "production";

    const wsProtocol = process.env.WEBSOCKET_PROTOCOL || "ws";
    const wsHost = process.env.WEBSOCKET_HOST || "localhost";
    const wsPort = process.env.WEBSOCKET_PORT || "8080";

    const homepageData = await getHomepageData(locale);

    const sections = homepageData.jumpToList.links
        .map((link) => {
            switch (link.url.replace("#", "")) {
                case "about":
                    return <AboutMe aboutMe={homepageData.aboutMe} />;
                case "skills":
                    return <Skills skills={homepageData.skills} />;
                case "testimonials":
                    return (
                        <Testimonials
                            testimonials={homepageData.testimonials}
                        />
                    );
                case "projects":
                    return <Projects projects={homepageData.projects} />;
                case "experience":
                    return <Experience experience={homepageData.experience} />;
                default:
                    return <div>Content for {link.title}</div>;
            }
        })
        .map((section, index) => (
            <Section
                key={index}
                index={index + 1}
                link={homepageData.jumpToList.links[index]}
            >
                {section}
            </Section>
        ));

    return (
        <div
            className={`${styles.sectionContainer} section-scroll`}
            id="section-container"
        >
            <div className={styles.sectionWrapper}>
                <Hero heroData={homepageData.hero} />
                <div className={styles.invisibleDiv} id="invisible-div"></div>
                {sections}
                <CursorTracker
                    wsUrl={`${wsProtocol}://${wsHost}${isProduction ? "" : `:${wsPort}`}`}
                />
                <footer className="min-h-[400px] snap-start bg-white relative">
                    <div>
                        <h4>
                            Noey, 2021. All rights reserved. Built with Next.js and Tailwind CSS.
                        </h4>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export async function generateMetadata() {
    const locale = await getLocale();
    const metadata = await getMetadata(locale, "homepage");

    return {
        title: metadata.title,
        description: metadata.description || "",
    };
}
