"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Filter, Hotel, UtensilsCrossed, Compass, Plus, Fuel, Calendar, Bus, Camera, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapCategories } from "@/lib/vth-data";

const iconMap: Record<string, React.ElementType> = {
  Hotel, UtensilsCrossed, MapPin, Plus, Fuel, Calendar, Compass, Bus,
};

export default function MapSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("sites");

  const mapPoints = [
    { name: "Wli Waterfalls", lat: 7.0833, lng: 0.6333, category: "sites" },
    { name: "Mount Afadja", lat: 7.07, lng: 0.62, category: "sites" },
    { name: "Keta Beach", lat: 5.9167, lng: 0.9833, category: "sites" },
    { name: "Tafi Atome Sanctuary", lat: 7.15, lng: 0.57, category: "sites" },
    { name: "Ho City", lat: 6.61, lng: 0.47, category: "transport" },
    { name: "Hohoe", lat: 7.15, lng: 0.48, category: "transport" },
    { name: "Keta", lat: 5.92, lng: 1.0, category: "hotels" },
    { name: "Sogakope", lat: 5.99, lng: 0.52, category: "restaurants" },
  ];

  return (
    <section
      id="map"
      ref={ref}
      className="py-24 md:py-32 bg-cream-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-warm-gold font-semibold tracking-widest text-sm uppercase">
            INTERACTIVE MAP
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Navigate the Volta Region
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Explore our interactive map to find hotels, restaurants, tourist sites, and more across the Volta Region. Filter by category to find exactly what you need.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {mapCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || MapPin;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-forest text-white shadow-md"
                    : "bg-white text-charcoal/70 hover:bg-forest/5 hover:text-forest border border-border"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-white"
        >
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {/* Map Placeholder - Stylized SVG Map of Volta Region */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-volta-blue/5 to-warm-gold/5">
              {/* Decorative map grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14532D" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Stylized region outline */}
              <svg
                viewBox="0 0 800 450"
                className="absolute inset-0 w-full h-full p-8 md:p-16"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Volta Region approximate outline */}
                <path
                  d="M150,80 L250,50 L400,40 L550,60 L680,100 L720,180 L700,280 L650,350 L550,390 L400,410 L250,400 L150,350 L100,280 L80,200 L100,140 Z"
                  fill="#14532D"
                  fillOpacity="0.08"
                  stroke="#14532D"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                {/* Lake Volta */}
                <path
                  d="M200,100 L350,90 L500,100 L550,150 L520,200 L400,220 L280,210 L200,170 Z"
                  fill="#0EA5E9"
                  fillOpacity="0.15"
                  stroke="#0EA5E9"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
                <text x="370" y="165" textAnchor="middle" className="text-xs md:text-sm" fill="#0EA5E9" fillOpacity="0.6" fontFamily="Poppins, sans-serif" fontWeight="500">
                  Lake Volta
                </text>
              </svg>

              {/* Map Points */}
              {mapPoints
                .filter((p) => activeCategory === "sites" || p.category === activeCategory || activeCategory === "sites")
                .map((point, i) => (
                  <motion.div
                    key={point.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="absolute group cursor-pointer"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${15 + Math.random() * 60}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform duration-300 group-hover:scale-125">
                        <MapPin className="w-4 h-4 text-warm-gold" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-warm-gold rounded-full animate-ping opacity-75" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-charcoal text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                        {point.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-charcoal" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Quick access buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button variant="outline" className="rounded-full px-6 border-forest text-forest hover:bg-forest hover:text-white">
            <Compass className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          <Button variant="outline" className="rounded-full px-6 border-forest text-forest hover:bg-forest hover:text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Map
          </Button>
        </div>
      </div>
    </section>
  );
}

function Download(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}