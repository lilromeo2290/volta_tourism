"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { destinations } from "@/lib/vth-data";
import { useVTH } from "@/components/vth-provider";
import { MapPin, Star, Clock, Route, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Waterfall", "Mountain", "Beach", "Wildlife", "Nature", "Culture"];

export default function DestinationsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toggleFavourite, isFavourite } = useVTH();

  const filtered =
    activeCategory === "All"
      ? destinations
      : destinations.filter((d) => d.category === activeCategory);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left mb-10 md:mb-14"
        >
          <span className="text-[#F59E0B] font-semibold tracking-widest text-sm uppercase">
            DESTINATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Explore Extraordinary Places
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto md:mx-0 text-base md:text-lg">
            From cascading waterfalls and misty mountain peaks to golden beaches
            and sacred wildlife sanctuaries — the Volta Region is a tapestry of
            unforgettable destinations waiting to be discovered.
          </p>
        </motion.div>

        {/* ── Category Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  activeCategory === cat
                    ? "bg-[#054906] text-white rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300"
                    : "bg-secondary text-charcoal/70 hover:bg-secondary/80 rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300"
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Destination Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 * idx,
                ease: "easeOut",
              }}
              className="group flex flex-col md:flex-row bg-white border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative w-full md:w-80 shrink-0 h-56 md:h-auto">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover rounded-xl md:rounded-l-xl md:rounded-r-none"
                  loading="lazy"
                />
                {/* Category badge overlay */}
                <span className="absolute top-3 left-3 bg-[#054906]/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                  {dest.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 p-5 md:p-6">
                <div>
                  {/* Rating row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-charcoal">
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      {dest.rating}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-charcoal leading-tight">
                    {dest.name}
                  </h3>

                  {/* Municipality */}
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {dest.municipality}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {dest.description}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Route className="w-3.5 h-3.5" />
                      {dest.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {dest.travelTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button className="bg-[#054906] text-white hover:bg-[#054906]/80 rounded-full px-6 py-2 text-sm font-medium h-auto">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>

                    <button
                      onClick={() =>
                        toggleFavourite({
                          id: dest.id,
                          type: "destination",
                          name: dest.name,
                        })
                      }
                      aria-label={
                        isFavourite(dest.id)
                          ? `Remove ${dest.name} from favourites`
                          : `Add ${dest.name} to favourites`
                      }
                      className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 hover:bg-secondary transition-colors duration-200"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors duration-200 ${
                          isFavourite(dest.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── View All Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <Button
            variant="outline"
            className="rounded-full px-8 py-3 text-sm font-medium border-[#054906] text-[#054906] hover:bg-[#054906] hover:text-white transition-all duration-300"
          >
            View All Destinations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}