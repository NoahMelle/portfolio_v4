import React from "react";

export default function Section({
  children,
  index,
  link,
  isLast,
  className,
}: {
  children: React.ReactNode;
  index: number;
  link: { title: string; url: string };
  isLast?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`md:p-12 p-8 overflow-x-hidden min-h-screen relative [&:nth-child(odd)]:bg-background [&:nth-child(odd)]:text-foreground bg-[#0F1017] text-white pb-12 ${className}`}
      id={link.url.replace("#", "")}
      style={{
        scrollSnapAlign: isLast ? "none" : "start",
      }}
    >
      <div>
        <div className="flex items-center gap-8 py-12">
          <div className="relative flex items-center justify-center h-[40px] aspect-square">
            <h3 className="text-xl">{String(index).padStart(2, "0")}</h3>
          </div>
          <h3>{link.title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}
