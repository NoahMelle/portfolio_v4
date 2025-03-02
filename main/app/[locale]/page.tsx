import { getHomepageData, getMetadata } from "@/data/fetcher";
import { getLocale } from "next-intl/server";
import Section from "@/components/reusable/Section";
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

  return (
    <>
      <Hero heroData={homepageData.hero} />

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

      <CursorTracker wsUrl={constructWebsocketURL()} />
    </>
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
