"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const LAG_FACTOR = 9;

export default function GSAPCursor() {
    const pathname = usePathname();
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    // Cursor position variables
    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const initializeCursor = React.useCallback(
        (cursor: HTMLDivElement, follower: HTMLDivElement) => {
            // Update mouse coordinates
            const mouseCoords = (e: MouseEvent) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            };

            // Animate cursor position using GSAP
            const animateCursor = () => {
                posX += (mouseX - posX) / LAG_FACTOR;
                posY += (mouseY - posY) / LAG_FACTOR;

                gsap.set(follower, {
                    css: {
                        left: posX - 27,
                        top: posY - 27,
                    },
                });

                gsap.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY,
                    },
                });
            };

            // Hide cursor when off-screen
            const mouseOut = () => {
                cursor.classList.add("hidden");
                follower.classList.add("hidden");
            };

            // Show cursor when back on screen
            const mouseIn = () => {
                cursor.classList.remove("hidden");
                follower.classList.remove("hidden");
            };

            // Add event listeners
            window.addEventListener("mousemove", mouseCoords);
            window.addEventListener("mouseout", mouseOut);
            window.addEventListener("mouseover", mouseIn);

            gsap.ticker.add(animateCursor);

            // Cleanup function to remove event listeners and GSAP animation
            return () => {
                window.removeEventListener("mousemove", mouseCoords);
                window.removeEventListener("mouseout", mouseOut);
                window.removeEventListener("mouseover", mouseIn);

                gsap.ticker.remove(animateCursor);
            };
        },
        []
    );

    // Initialize cursor and animations on component mount
    React.useLayoutEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Initialize cursor functionality
        const cleanup = initializeCursor(cursor, follower);

        // Cleanup cursor setup on component unmount
        return () => cleanup();
    }, [initializeCursor]);

    // Reinitialize link hover effects on path change
    React.useLayoutEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        cursor.classList.remove("active");
        follower.classList.remove("active");

        initializeLinks();
    }, [pathname]);

    const initializeLinks = () => {
        const links = document.getElementsByTagName("a");
        const buttons = document.getElementsByTagName("button");

        // console.log(links);

        // Add hover effects on links
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("mouseover", () => {
                cursorRef.current?.classList.add("active");
                followerRef.current?.classList.add("active");
            });
            links[i].addEventListener("mouseout", () => {
                cursorRef.current?.classList.remove("active");
                followerRef.current?.classList.remove("active");
            });
        }

        // Add hover effects on buttons
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("mouseover", () => {
                cursorRef.current?.classList.add("active");
                followerRef.current?.classList.add("active");
            });
            buttons[i].addEventListener("mouseout", () => {
                cursorRef.current?.classList.remove("active");
                followerRef.current?.classList.remove("active");
            });
        }

        // Cleanup function for link hover effects
        return () => {
            for (let i = 0; i < links.length; i++) {
                links[i].removeEventListener("mouseover", () => {
                    cursorRef.current?.classList.add("active");
                    followerRef.current?.classList.add("active");
                });
                links[i].removeEventListener("mouseout", () => {
                    cursorRef.current?.classList.remove("active");
                    followerRef.current?.classList.remove("active");
                });
            }

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].removeEventListener("mouseover", () => {
                    cursorRef.current?.classList.add("active");
                    followerRef.current?.classList.add("active");
                });
                buttons[i].removeEventListener("mouseout", () => {
                    cursorRef.current?.classList.remove("active");
                    followerRef.current?.classList.remove("active");
                });
            }
        };
    };

    return (
        <>
            <div ref={cursorRef} className="cursor"></div>
            <div ref={followerRef} className="aura"></div>
        </>
    );
}
