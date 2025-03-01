/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Link from "next/link";

export default function LinkRenderer(props: any) {
  return (
    <Link
      href={props.href}
      className="underline"
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </Link>
  );
}
