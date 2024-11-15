import React from "react";
import { getNotFoundData } from "@/data/fetcher";
import { getLocale } from "next-intl/server";

export default async function notFound() {
    const locale = await getLocale();
    const notFoundData = await getNotFoundData(locale);

    return (
        <div className="h-full min-h-screen flex items-center justify-center">
            <div>
                <h1 className="text-4xl">404 | {notFoundData.heading}</h1>
            </div>
        </div>
    );
}