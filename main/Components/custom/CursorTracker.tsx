"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function CursorTracker({ wsUrl }: { wsUrl: string }) {
    const [ws, setWs] = React.useState<WebSocket | null>(null);
    const [cursor, setCursor] = React.useState({ x: 0, y: 0 });
    const wsRef = React.useRef<WebSocket | null>(null);
    const cursorTimeout = React.useRef<number | null>(null);
    const [otherCursors, setOtherCursors] = React.useState(
        new Map<string, { x: number; y: number; color: string }>()
    );
    const isAllowed = React.useRef(true);
    const sectionContainerRef = React.useRef<HTMLElement | null>(null);

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
        sectionContainerRef.current =
            document.getElementById("section-container");
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
                            toast.error(`${data.username} disconnected.`, {
                                description:
                                    "Their cursor is no longer visible.",
                                closeButton: true,
                            });
                            break;
                        case "connect":
                            toast.success(`${data.username} connected.`, {
                                description: "Their cursor is now visible.",
                                closeButton: true,
                            });
                            break;
                    }
                }
            };
            setWs(ws);
            wsRef.current = ws;
        }

        window.addEventListener("mousemove", (event) => {
            const bodyHeight = Math.max(
                sectionContainerRef.current?.scrollHeight || 0,
                window.innerHeight
            );
            const bodyWidth = window.innerWidth;

            const scrollY = sectionContainerRef.current?.scrollTop || 0;

            console.log("scrollY", scrollY, bodyHeight);

            const x = (event.clientX / bodyWidth) * 100;
            const y = ((event.clientY + scrollY) / bodyHeight) * 100;
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
            }, 50);
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
                <div
                    key={username}
                    style={{
                        top: `${props.y}%`,
                        left: `${props.x}%`,
                    }}
                    className="absolute transition-all duration-50"
                >
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 800 800"
                        width={20}
                        height={20}
                        xmlSpace="preserve"
                    >
                        <path
                            d="M63.8,111.9l233,599.8c0,0,35.1,67.6,67.1-2.5C391.4,648.9,470.9,472,470.9,472l248.2-113.1c0,0,59-42-16-68
	S123.8,70.8,123.8,70.8S45.8,36.8,63.8,111.9z"
                            fill={`rgba(${hexToRgb(props.color)?.r}, ${
                                hexToRgb(props.color)?.g
                            }, ${hexToRgb(props.color)?.b}, 0.8)`}
                            stroke={props.color}
                            strokeWidth="2"
                            vectorEffect={"non-scaling-stroke"}
                        />
                    </svg>

                    <h3
                        className="px-2 rounded-full ml-[15px] mt-[-5px] backdrop-blur-sm select-none"
                        style={{
                            backgroundColor: `rgba(${
                                hexToRgb(props.color)?.r
                            }, ${hexToRgb(props.color)?.g}, ${
                                hexToRgb(props.color)?.b
                            }, 0.7)`,
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
