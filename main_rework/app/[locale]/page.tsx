import { getHomepageData, getMetadata } from "@/data/fetcher";
import { getLocale } from "next-intl/server";
import styles from "@/styles/home.module.scss";
import Section from "@/components/custom/Section";
import AboutMe from "@/components/custom/AboutMe";
import Skills from "@/components/custom/Skills";
import CursorTracker from "@/components/custom/CursorTracker";
import Testimonials from "@/components/custom/Testimonials";
import Projects from "@/components/custom/Projects";
import Experience from "@/components/custom/Experience";
import Hero from "@/components/custom/Hero";

export default async function Home() {
    const isProduction = process.env.NODE_ENV === "production";

    const wsProtocol = process.env.WEBSOCKET_PROTOCOL || "ws";
    const wsHost = process.env.WEBSOCKET_HOST || "localhost";
    const wsPort = process.env.WEBSOCKET_PORT || "8080";

    const homepageData = await getHomepageData("en");

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
                <Hero heroData={homepageData.hero}/>
                <div className={styles.invisibleDiv} id="invisible-div"></div>
                {sections}
                {/* <CursorTracker
                    wsUrl={`${wsProtocol}://${wsHost}${isProduction ? "" : `:${wsPort}`}`}
                /> */}
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
    const metadata = await getMetadata("en", "homepage");

    return {
        title: metadata.title,
        description: metadata.description || "",
    };
}
