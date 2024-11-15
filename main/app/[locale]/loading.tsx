import React from "react";

export default function Loading() {
    return (
        <div className="fixed h-[100vh] w-[100vw] flex items-center justify-center z-50 bg-white">
            <div className="p-2 animate-spin bg-gradient-to-bl from-[#8ae299] to-[#15c6e0] h-32 w-32 aspect-square rounded-full">
                <div className="rounded-full h-full w-full dark:bg-zinc-900 background-blur-md"></div>
            </div>
        </div>
    );
}