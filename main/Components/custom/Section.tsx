import React from "react";
import styles from "@/styles/home.module.scss";

export default function Section({ children, index, link }: { children: React.ReactNode, index: number, link: { title: string, url: string } }) {
    return (
        <div className={styles.section} id={link.title.toLowerCase()}>
            <div className={styles.sectionTop}>
                <div className="relative flex items-center justify-center h-[40px] aspect-square">
                    <div className={styles.sectionIndexDecoration}></div>
                    <h4 className="text-xl">
                        {String(index).padStart(2, "0")}
                    </h4>
                    <div className={[styles.sectionIndexDecoration, styles.bottom].join(" ")}></div>
                </div>
                <h3>{link.title}</h3>
            </div>
            <div className={styles.sectionContent}>
                {children}
            </div>
        </div>
    );
}
