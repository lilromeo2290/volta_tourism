"use client";

import { stories } from "@/lib/vth-data";

const featured = stories[0];

export default function StoriesSection() {
  return (
    <section id="stories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#054906] tracking-tight">
            VTH STORIES
          </h2>
          <a
            href="#stories"
            className="text-sm font-medium text-[#054906] hover:underline flex items-center gap-1"
          >
            View All
            <span className="text-lg leading-none">&rarr;</span>
          </a>
        </div>

        {/* Single Large Story Card */}
        <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Text on Left */}
          <div className="absolute inset-0 flex items-center p-6 md:p-10 lg:p-16">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                The People, The Culture, Our Volta
              </h3>
              <p className="text-white/70 mt-3 text-sm md:text-base leading-relaxed">
                Discover stories that inspire and connect us.
              </p>
              <button className="mt-6 border border-white text-white text-sm font-semibold px-7 py-2.5 rounded-full hover:bg-white hover:text-charcoal transition-colors cursor-pointer">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}