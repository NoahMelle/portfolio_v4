import React from "react";
import Link from "next/link";

export default function LinkRenderer(props: any) {
    return (
        <Link href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </Link>
    );
}