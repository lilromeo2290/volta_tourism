"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { stories } from "@/lib/vth-data";
import { Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const featured = stories[0];
  const remaining = stories.slice(1);

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
      id="stories"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
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
            Stories &amp; Insights
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Stories from the Volta
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Deep dives, travelogues, and insider perspectives from explorers,
            locals, and cultural custodians who call the Volta Region home.
          </p>
        </motion.div>

        {/* ── Featured Story ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="group relative rounded-2xl overflow-hidden mb-10 md:mb-14 cursor-pointer premium-card"
          >
            {/* Image */}
            <div className="relative h-80 md:h-96 w-full">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              {/* Category badge */}
              <span className="self-start bg-warm-gold/90 text-forest-dark text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                {featured.category}
              </span>

              {/* Title */}
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-white leading-tight max-w-3xl">
                {featured.title}
              </h3>

              {/* Excerpt */}
              <p className="text-white/80 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                {featured.excerpt}
              </p>

              {/* Meta row + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {featured.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime}
                  </span>
                  <span>{featured.date}</span>
                </div>

                <Button className="bg-white text-charcoal hover:bg-white/90 rounded-full px-6 py-2.5 text-sm font-semibold h-auto w-fit shadow-md group/btn">
                  Read Full Story
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Remaining Stories Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {remaining.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + 0.08 * idx,
                ease: "easeOut",
              }}
              className="group flex flex-col sm:flex-row bg-white border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-400 cursor-pointer"
            >
              {/* Image — 40% */}
              <div className="relative w-full sm:w-[40%] shrink-0 h-48 sm:h-auto">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover rounded-xl sm:rounded-l-xl sm:rounded-r-none"
                  loading="lazy"
                />
              </div>

              {/* Content — 60% */}
              <div className="flex flex-col justify-between flex-1 p-5 sm:p-6">
                <div>
                  {/* Category */}
                  <span className="inline-block text-warm-gold text-xs font-semibold tracking-wide uppercase mb-2">
                    {story.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-charcoal leading-tight line-clamp-2">
                    {story.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {story.author}
                  </span>
                  <span>{story.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.readingTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── View All Stories ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <Button
            variant="outline"
            className="rounded-full px-8 py-3 text-sm font-medium border-forest text-forest hover:bg-forest hover:text-white transition-all duration-300"
          >
            View All Stories
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}