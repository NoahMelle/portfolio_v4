"use client";

import React from "react";
import Markdown from "react-markdown";
import { TestimonialsSectionType } from "@/lib/types";
import Image from "next/image";

export default function Testimonials({
  testimonials,
}: {
  testimonials: TestimonialsSectionType;
}) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {testimonials.testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="break-inside-avoid w-full mb-4 border rounded-xl border-white/30"
          >
            <div className="p-4 rounded-lg shadow-lg flex flex-col gap-4">
              <Markdown className="text-white">{testimonial.content}</Markdown>
              <div className="h-[50px] flex gap-4 items-center">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-700 bg-gray-800 relative">
                  <Image
                    src={testimonial.image.url}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white leading-none">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400">
                    {testimonial?.testimonialRole?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
