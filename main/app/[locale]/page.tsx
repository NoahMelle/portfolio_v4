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
import Footer from "@/components/custom/Footer";
import { constructWebsocketURL } from "@/lib/envUtils";

export default async function Home() {
  const locale = await getLocale();

  const homepageData = await getHomepageData(locale);

  //   const sections = homepageData.jumpToList.links
  //     .map((link) => {
  //       switch (link.url.replace("#", "")) {
  //         case "about":
  //           return <AboutMe aboutMe={homepageData.aboutMe} />;
  //         case "skills":
  //           return <Skills skills={homepageData.skills} />;
  //         case "testimonials":
  //           return <Testimonials testimonials={homepageData.testimonials} />;
  //         case "projects":
  //           return <Projects projects={homepageData.projects} />;
  //         case "experience":
  //           return <Experience experience={homepageData.experience} />;
  //         default:
  //           return <div>Content for {link.title}</div>;
  //       }
  //     })
  //     .map((section, index) =>
  //       index === homepageData.jumpToList.links.length - 1 ? (
  //         <div className="snap-start" key={index}>
  //           <Section
  //             index={index + 1}
  //             link={homepageData.jumpToList.links[index]}
  //             isLast={true}
  //           >
  //             {section}
  //           </Section>
  //           <Footer
  //             footerData={homepageData.globalData.footer}
  //             socialLinks={homepageData.globalData.myInfo.socialLinks}
  //           />
  //         </div>
  //       ) : (
  //         <Section
  //           key={index}
  //           index={index + 1}
  //           link={homepageData.jumpToList.links[index]}
  //         >
  //           {section}
  //         </Section>
  //       )
  //     );

  return (
    <div
      className={`${styles.sectionContainer} section-scroll`}
      id="section-container"
    >
      <div className={styles.sectionWrapper}>
        <Hero heroData={homepageData.hero} />
        <div className={styles.invisibleDiv} id="invisible-div"></div>

        <Section index={1} link={{ title: "About me", url: "about-me" }}>
          <AboutMe aboutMe={homepageData.aboutMe} />
        </Section>

        <Section
          index={2}
          link={{ title: homepageData.skills.skillsHeading, url: "skills" }}
        >
          <Skills skills={homepageData.skills} />
        </Section>

        <Section
          index={3}
          link={{
            title: homepageData.testimonials.testimonialHeading,
            url: "testimonials",
          }}
        >
          <Testimonials testimonials={homepageData.testimonials} />
        </Section>

        <Section index={4} link={{ title: "Projects", url: "projects" }}>
          <Projects projects={homepageData.projects} />
        </Section>

        <div className="snap-start">
          <Section
            isLast={true}
            index={5}
            link={{ title: homepageData.experience.heading, url: "experience" }}
          >
            <Experience experience={homepageData.experience} />
          </Section>
          <Footer
            footerData={homepageData.globalData.footer}
            socialLinks={homepageData.globalData.myInfo.socialLinks}
          />
        </div>

        <CursorTracker wsUrl={constructWebsocketURL()} />
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
