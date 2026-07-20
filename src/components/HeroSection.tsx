"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides, searchCategories } from "@/lib/vth-data";

const SLIDE_INTERVAL = 6000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const totalSlides = heroSlides.length;

  const advanceSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(advanceSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [advanceSlide]);

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(frame);
    };
    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [currentSlide]);

  // Compute 3-dot progress indicator
  const activeDot = Math.floor((currentSlide / totalSlides) * 3);

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* ---- Background slides with crossfade ---- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].alt}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ---- Dark gradient overlay ---- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* ---- Progress bar ---- */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-warm-gold z-50"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />

      {/* ---- Main content ---- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 pb-32">
        {/* Fade-in animation wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <span className="mb-6 rounded-full border border-warm-gold/30 bg-warm-gold/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-warm-gold">
            WELCOME TO THE VOLTA REGION
          </span>

          {/* Main heading */}
          <h1
            className="font-heading text-5xl font-bold text-white md:text-7xl lg:text-8xl"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
          >
            Discover Volta
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-lg font-light text-white/80 md:text-xl">
            Culture. Nature. Adventure. One Extraordinary Region.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
            <Button className="rounded-full bg-warm-gold px-8 py-3.5 font-semibold text-forest-dark hover:bg-warm-gold-light">
              Explore Destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-2 border-white bg-transparent px-8 py-3.5 font-semibold text-white hover:bg-white hover:text-forest"
            >
              Plan Your Journey
            </Button>

            <Button
              variant="ghost"
              className="gap-2 text-white/70 hover:bg-transparent hover:text-white"
            >
              <Play className="h-4 w-4" />
              Watch Video
            </Button>
          </div>
        </motion.div>
      </div>

      {/* ---- Slide indicators (3 dots) ---- */}
      <div className="absolute bottom-28 left-6 z-20 flex gap-2 sm:left-10">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className={`block h-2 rounded-full transition-all duration-500 ${
              dot === activeDot
                ? "w-6 bg-warm-gold"
                : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-white/60" />
      </motion.div>

      {/* ---- Floating search bar ---- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-[-30px] left-1/2 z-30 w-full max-w-4xl -translate-x-1/2 px-4"
      >
        <div className="rounded-2xl bg-white p-3 shadow-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, hotels, festivals, adventures..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-warm-gold focus:outline-none focus:ring-2 focus:ring-warm-gold/30"
              />
            </div>

            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 shrink-0 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 focus:border-warm-gold focus:outline-none focus:ring-2 focus:ring-warm-gold/30 sm:w-44"
            >
              <option value="All Categories">All Categories</option>
              {searchCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Search button */}
            <Button className="h-11 shrink-0 rounded-xl bg-warm-gold px-6 font-semibold text-forest-dark hover:bg-warm-gold-light sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}