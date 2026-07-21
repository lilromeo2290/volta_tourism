"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { investments } from "@/lib/vth-data";
import {
  TrendingUp,
  Download,
  ArrowRight,
  Banknote,
  ShieldCheck,
  Target,
  BarChart3,
  MapPin,
} from "lucide-react";

const statsData = [
  {
    icon: BarChart3,
    label: "Growing Sector",
    value: "15% YoY",
    description: "Tourism growth rate in the Volta Region",
  },
  {
    icon: ShieldCheck,
    label: "Government Support",
    value: "100%",
    description: "Tax incentives for tourism investors",
  },
  {
    icon: Banknote,
    label: "High Returns",
    value: "18-30%",
    description: "Average ROI across tourism sectors",
  },
  {
    icon: Target,
    label: "Strategic Location",
    value: "#1",
    description: "Fastest growing tourism region in Ghana",
  },
];

export default function InvestmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="investment"
      className="py-24 md:py-32 bg-charcoal text-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-warm-gold font-semibold tracking-widest text-sm uppercase">
            INVESTMENT OPPORTUNITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-3">
            Invest in Volta&apos;s Future
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto mt-4 leading-relaxed">
            The Volta Region is Ghana&apos;s next big tourism frontier. With
            untapped natural beauty, rich cultural heritage, and strong
            government backing, now is the time to invest in one of West
            Africa&apos;s most promising tourism destinations.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="reveal rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center"
                whileHover={{ y: -4, borderColor: "rgba(244,180,0,0.4)" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-warm-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-warm-gold" />
                </div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-warm-gold">
                  {stat.value}
                </p>
                <p className="text-white font-semibold text-sm mt-1">
                  {stat.label}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Investment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {investments.map((inv, index) => (
            <motion.div
              key={inv.id}
              className="reveal rounded-2xl overflow-hidden bg-white/5 border border-white/10 group"
              whileHover={{ y: -6 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <motion.img
                  src={inv.image}
                  alt={inv.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Sector Badge */}
                <span className="absolute top-4 left-4 bg-volta-blue/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  {inv.sector}
                </span>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-charcoal" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-white leading-tight">
                  {inv.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-3 mt-3 leading-relaxed">
                  {inv.description}
                </p>

                {/* Key Details */}
                <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/10">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Banknote className="w-3.5 h-3.5 text-warm-gold" />
                      <span className="text-white/40 text-xs uppercase tracking-wide">
                        Capital
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium">
                      {inv.capital}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-warm-gold" />
                      <span className="text-white/40 text-xs uppercase tracking-wide">
                        Returns
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium">
                      {inv.returns}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-warm-gold" />
                      <span className="text-white/40 text-xs uppercase tracking-wide">
                        Location
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium">
                      {inv.location}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="mt-5 w-full bg-warm-gold hover:bg-warm-gold-light text-forest-dark font-semibold transition-colors"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="text-center mt-14 reveal">
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8 py-6 text-base transition-all"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Investment Brochure
          </Button>
        </div>
      </div>
    </section>
  );
}
