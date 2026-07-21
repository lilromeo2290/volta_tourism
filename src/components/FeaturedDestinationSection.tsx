"use client";

import { destinations } from "@/lib/vth-data";

const wliFalls = destinations.find((d) => d.id === "wli-falls") || destinations[0];

export default function FeaturedDestinationSection() {
  return (
    <section id="featured-dest" className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#054906] tracking-tight">
            FEATURED DESTINATION
          </h2>
          <a
            href="#destinations"
            className="text-sm font-medium text-[#054906] hover:underline flex items-center gap-1"
          >
            View All
            <span className="text-lg leading-none">&rarr;</span>
          </a>
        </div>

        {/* Large Card */}
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white shadow-sm">
          {/* Image — Left 60% */}
          <div className="w-full md:w-[60%] h-72 md:h-96 shrink-0">
            <img
              src={wliFalls.image}
              alt={wliFalls.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content — Right 40% */}
          <div className="flex flex-col justify-center p-6 md:p-10 md:w-[40%]">
            <h3 className="text-3xl font-bold text-[#054906] leading-tight">
              {wliFalls.name.toUpperCase().replace(" WATERFALLS", " FALLS")}
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              {wliFalls.municipality}
            </p>
            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              Ghana&apos;s Highest Waterfall. Nature&apos;s Masterpiece.
            </p>
            <a
              href="#destinations"
              className="inline-flex items-center justify-center mt-6 bg-[#054906] text-white font-semibold text-sm px-7 py-2.5 rounded-full hover:bg-[#054906]/90 transition-colors w-fit"
            >
              EXPLORE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}