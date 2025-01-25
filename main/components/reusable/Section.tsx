import React from "react";
import styles from "@/styles/home.module.scss";

export default function Section({
    children,
    index,
    link,
    padding,
    isLast
}: {
    children: React.ReactNode;
    index: number;
    link: { title: string; url: string };
    padding?: boolean;
    isLast: boolean;
}) {
    return (
        <div
            className={`${styles.section} ${padding ? styles.padding : ""}`}
            id={link.url.replace("#", "")}
            style={{
                scrollSnapAlign: isLast ? "none" : "start",
            }}
        >
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
            {padding ? (
                <div className={styles.sectionContent}>{children}</div>
            ) : (
                children
            )}
        </div>
    );
}
