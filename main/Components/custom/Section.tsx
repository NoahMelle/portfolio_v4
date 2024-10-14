import React from "react";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import bgImage from "@/public/img/backgrounds/patterngrid.png";
import bgImageBlack from "@/public/img/backgrounds/patterngrid-black.png";

export default function Section({
    children,
    index,
    link,
}: {
    children: React.ReactNode;
    index: number;
    link: { title: string; url: string };
}) {
    return (
        <div className={styles.section} id={link.title.toLowerCase()}>
            <div className={styles.sectionTop}>
                <div className="relative flex items-center justify-center h-[40px] aspect-square">
                    <div className={styles.sectionIndexDecoration}></div>
                    <h4 className="text-xl">
                        {String(index).padStart(2, "0")}
                    </h4>
                    <div
                        className={[
                            styles.sectionIndexDecoration,
                            styles.bottom,
                        ].join(" ")}
                    ></div>
                </div>
                <h3>{link.title}</h3>
            </div>
            <div className="h-full w-full overflow-hidden absolute left-0 top-0 -z-10">
                <Image
                    src={bgImage}
                    alt="background"
                    className={`absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] h-full w-[1400px] max-w-none object-contain ${styles.backgroundImage}`}
                />
            </div>
            <div className={styles.sectionContent}>{children}</div>
        </div>
    );
}
