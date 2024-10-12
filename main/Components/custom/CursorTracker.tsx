"use client";

import React from "react";
import Image from "next/image";

export default function CursorTracker({ wsUrl }: { wsUrl: string }) {
    const [ws, setWs] = React.useState<WebSocket | null>(null);
    const [cursor, setCursor] = React.useState({ x: 0, y: 0 });
    const wsRef = React.useRef<WebSocket | null>(null);
    const cursorTimeout = React.useRef<number | null>(null);
    const [otherCursors, setOtherCursors] = React.useState(
        new Map<string, { x: number; y: number; color: string }>()
    );
    const isAllowed = React.useRef(true);

    function hexToRgb(hex: string) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }

    React.useEffect(() => {
        if (!wsRef.current) {
            const ws = new WebSocket(wsUrl);
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type) {
                    switch (data.type) {
                        case "cursor":
                            setOtherCursors((prev) => {
                                const newCursors = new Map(prev);
                                newCursors.set(data.username, {
                                    ...data.position,
                                    color: data.color,
                                });
                                // console.log(data, newCursors);
                                return newCursors;
                            });
                            break;
                        case "disconnect":
                            setOtherCursors((prev) => {
                                const newCursors = new Map(prev);
                                newCursors.delete(data.username);
                                return newCursors;
                            });
                            break;
                    }
                }
            };
            setWs(ws);
            wsRef.current = ws;
        }

        window.addEventListener("mousemove", (event) => {
            // const bodyHeight = Math.max(document.body.clientHeight, document.getElementById("section-container")?.scrollHeight || 0);
            // const bodyWidth = document.body.clientWidth;
            // const scrollY = Math.max(window.scrollY, document.getElementById("section-container")?.scrollTop || 0);
            // const scrollX = window.scrollX;
            const bodyHeight = window.innerHeight;
            const bodyWidth = window.innerWidth;
            const x = (event.clientX / bodyWidth) * 100;
            const y = (event.clientY / bodyHeight) * 100;
            setCursor({ x, y });
        });

        return () => {
            ws?.close();
            window.removeEventListener("mousemove", () => {});
        };
    }, []);

    React.useEffect(() => {
        if (ws?.readyState === WebSocket.OPEN && isAllowed.current) {
            ws.send(
                JSON.stringify({
                    type: "cursor",
                    data: cursor,
                })
            );
            isAllowed.current = false;
            setTimeout(() => {
                isAllowed.current = true;
            }, 10);
        }

        return () => {
            if (cursorTimeout.current !== null) {
                window.clearTimeout(cursorTimeout.current);
                cursorTimeout.current = null;
            }
        };
    }, [cursor]);

    return (
        <>
            {Array.from(otherCursors).map(([username, props]) => (
                // <Image
                //     key={username}
                //     style={{
                //         position: "fixed",
                //         top: `${position.y}%`,
                //         left: `${position.x}%`,
                //     }}
                //     src="/icons/cursor.svg"
                //     alt="cursor"
                //     width={20}
                //     height={20}
                // />
                <div
                    key={username}
                    style={{
                        position: "fixed",
                        top: `${props.y}%`,
                        left: `${props.x}%`,
                    }}
                >
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 800 800"
                        xmlSpace="preserve"
                        height={20}
                        width={20}
                    >
                        <path
                            d="M5,61.3l273.6,704.3c0,0,41.2,79.4,78.8-2.9c32.3-70.8,125.7-278.5,125.7-278.5l291.4-132.8c0,0,69.3-49.3-18.8-79.9
S75.5,13.1,75.5,13.1S-16.1-26.8,5,61.3z"
                            fill={props.color}
                        />
                    </svg>
                    <h3
                        className="px-2 rounded-full ml-[15px] mt-[-5px]"
                        style={{
                            backgroundColor: `rgba(${
                                hexToRgb(props.color)?.r
                            }, ${hexToRgb(props.color)?.g}, ${
                                hexToRgb(props.color)?.b
                            }, 0.8)`,
                            border: `2px solid ${props.color}`,
                        }}
                    >
                        {username}
                    </h3>
                </div>
            ))}
        </>
    );
}
