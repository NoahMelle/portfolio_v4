import React from "react";
import { FooterType, SocialLink } from "@/lib/types";
import styles from "@/styles/footer.module.scss";
import Image from "next/image";

export default function Footer({
  footerData,
  socialLinks,
  blurColor,
}: {
  footerData: FooterType;
  socialLinks: SocialLink[];
  blurColor?: string;
}) {
  return (
    <footer className="pt-0 overflow-hidden relative h-fit bg-background p-12 min-h-[400px]">
      <div className="z-10 relative">
        <div className="h-[100px]"></div>
        <h3 className="text-4xl uppercase font-bold text-center max-w-[500px] mx-auto leading-[100%] mb-12">
          {footerData.cta}
        </h3>
        <div className="flex max-w-[1400px] mx-auto gap-4 md:gap-8 flex-col md:flex-row mb-16">
          {footerData.buttons.map((button, index) => (
            <a
              key={index}
              href={button.url}
              target={button.isExternal ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`${styles.button} font-bold text-center border-2 rounded-full border-foreground py-6 flex-1`}
            >
              {button.title}
            </a>
          ))}
        </div>
        <div className="flex gap-2 w-full justify-center">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialLink} flex items-center gap-4`}
            >
              <Image
                src={link.icon.url}
                alt={`${link.alt} icon`}
                width={50}
                height={50}
              />
            </a>
          ))}
        </div>
        <div className="h-[100px]"></div>
      </div>
      <div className="w-full aspect-square absolute bottom-0 left-[50%] pointer-events-none blur-3xl translate-y-[80%] max-w-[1200px] -translate-x-1/2">
        <div
          className="w-full h-full rounded-full brightness-150 opacity-90"
          style={{
            backgroundColor: blurColor ?? footerData.blurColor.color,
          }}
        ></div>
      </div>
    </footer>
  );
}
