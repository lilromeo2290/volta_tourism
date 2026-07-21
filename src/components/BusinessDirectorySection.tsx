"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { businesses } from "@/lib/vth-data";
import {
  Star,
  MapPin,
  Phone,
  CheckCircle,
  ArrowUpRight,
  Plus,
} from "lucide-react";

const categories = ["All", "Hotels", "Restaurants", "Tour Companies", "Shopping"] as const;

type CategoryFilter = (typeof categories)[number];

function normalizeCategory(cat: string): CategoryFilter {
  const map: Record<string, CategoryFilter> = {
    Hotel: "Hotels",
    hotels: "Hotels",
    Restaurant: "Restaurants",
    restaurants: "Restaurants",
    "Tour Company": "Tour Companies",
    "tour companies": "Tour Companies",
    Shopping: "Shopping",
    shopping: "Shopping",
  };
  return map[cat] ?? "All";
}

export default function BusinessDirectorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = section.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredBusinesses =
    activeFilter === "All"
      ? businesses
      : businesses.filter((b) => normalizeCategory(b.category) === activeFilter);

  return (
    <section
      id="business"
      className="py-24 md:py-32 bg-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <span className="text-[#F59E0B] font-semibold tracking-widest text-sm uppercase">
            BUSINESS DIRECTORY
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Tourism Businesses
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
            Discover trusted tourism businesses across the Volta Region. From
            hotels and restaurants to tour operators and artisan shops, find
            everything you need for the perfect visit.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-[#054906] text-white shadow-md"
                  : "bg-[#F8F9FA] text-charcoal/70 hover:bg-[#F8F9FA] hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredBusinesses.map((biz, index) => (
            <motion.div
              key={biz.id}
              className="reveal rounded-2xl overflow-hidden bg-white border border-border shadow-sm group"
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px -12px rgba(5, 73, 6, 0.12)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={biz.image}
                  alt={biz.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Verified Badge */}
                {biz.verified && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </div>
                )}

                {/* Hover Arrow */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#054906]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-lg text-charcoal leading-tight">
                    {biz.name}
                  </h3>
                  <span className="shrink-0 bg-[#F8F9FA] text-charcoal/70 text-xs font-medium px-2.5 py-1 rounded-full">
                    {biz.category}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {biz.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="font-semibold text-charcoal">{biz.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {biz.contact}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#054906]/20 text-[#054906] hover:bg-[#054906] hover:text-white font-medium text-sm transition-colors"
                  >
                    Contact
                  </Button>
                  <Button className="flex-1 bg-[#054906] hover:bg-[#054906]/80 text-white font-medium text-sm transition-colors">
                    View Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Register CTA */}
        <div className="text-center mt-14 reveal">
          <Button className="bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-[#042F2E] font-semibold px-8 py-6 text-base transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Register Your Business
          </Button>
        </div>
      </div>
    </section>
  );
}