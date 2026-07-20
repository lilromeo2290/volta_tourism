"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { communities } from "@/lib/vth-data";
import {
  Users,
  ArrowRight,
  Palette,
  Sparkles,
} from "lucide-react";

export default function CommunitySection() {
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
      id="community"
      className="py-24 md:py-32 bg-cream"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-warm-gold font-semibold tracking-widest text-sm uppercase">
            COMMUNITY TOURISM
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Connect with Local Communities
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
            Experience the authentic heart of the Volta Region through its
            people. Our community tourism program lets you live alongside local
            families, learn traditional crafts, and discover the cultural
            heritage that makes this region truly special.
          </p>
        </div>

        {/* Community Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {communities.map((community, index) => (
            <motion.div
              key={community.id}
              className="reveal rounded-2xl overflow-hidden bg-white shadow-sm group"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(20, 83, 45, 0.18)" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden rounded-t-2xl">
                <motion.img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Population Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Users className="w-3.5 h-3.5 text-forest" />
                  {community.population} residents
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 rounded-b-2xl">
                {/* Community Name */}
                <h3 className="font-heading font-bold text-xl text-charcoal">
                  {community.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
                  {community.description}
                </p>

                {/* Culture Section */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Palette className="w-4 h-4 text-warm-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                      Culture & Heritage
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {community.culture}
                  </p>
                </div>

                {/* Products Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {community.products.map((product) => (
                    <span
                      key={product}
                      className="inline-flex items-center gap-1 bg-cream text-charcoal/70 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      <Sparkles className="w-3 h-3 text-warm-gold" />
                      {product}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Button className="mt-5 w-full bg-forest hover:bg-forest-light text-white font-semibold transition-colors">
                  Visit Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="text-center mt-14 reveal">
          <Button
            variant="outline"
            className="border-forest/30 text-forest hover:bg-forest hover:text-white font-semibold px-8 py-6 text-base transition-all"
          >
            Explore All Communities
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
