"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/lib/vth-data";
import { MapPin, Calendar, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const filterTabs = ["All", "Cultural", "Music", "Adventure", "Food"];

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered =
    activeFilter === "All"
      ? events
      : events.filter((e) => e.category === activeFilter);

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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-24 md:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-warm-gold font-semibold tracking-widest text-sm uppercase">
            Events &amp; Festivals
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Experience Living Culture
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            The Volta Region pulses with vibrant festivals, electrifying music
            celebrations, thrilling adventures, and culinary feasts that bring
            communities together all year round.
          </p>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center mb-10 md:mb-14"
        >
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={
                  activeFilter === tab
                    ? "bg-forest text-white rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300"
                    : "bg-secondary text-charcoal/70 hover:bg-secondary/80 rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300"
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Events Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.97 }
                }
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * idx,
                  ease: "easeOut",
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className="rounded-2xl overflow-hidden bg-white shadow-sm premium-card group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Date badge — top left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-warm-gold text-forest-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>

                  {/* Category badge — top right */}
                  <span className="absolute top-3 right-3 bg-forest/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-charcoal leading-tight line-clamp-1">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-forest" />
                    {event.location}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-3 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/50">
                    <Button className="bg-forest text-white hover:bg-forest-light rounded-full px-5 py-2 text-sm font-medium h-auto">
                      Register
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full px-4 py-2 text-sm font-medium h-auto border-border/60 hover:bg-secondary"
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-full px-4 py-2 text-sm font-medium h-auto hover:bg-secondary"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              No events found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}