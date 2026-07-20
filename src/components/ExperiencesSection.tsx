"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/vth-data";
import { ArrowUpRight } from "lucide-react";
import {
  Trees,
  Mountain,
  Landmark,
  Bird,
  Waves,
  UtensilsCrossed,
  PartyPopper,
  Camera,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trees,
  Mountain,
  Landmark,
  Bird,
  Waves,
  UtensilsCrossed,
  PartyPopper,
  Camera,
  Users,
};

export default function ExperiencesSection() {
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
      id="experiences"
      className="py-24 md:py-32 bg-cream"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-warm-gold font-semibold tracking-widest text-sm uppercase">
            EXPERIENCES
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Unforgettable Experiences Await
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
            From cascading waterfalls to ancient cultural traditions, the Volta
            Region offers experiences that touch the soul and create memories
            that last a lifetime.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, index) => {
            const IconComponent = iconMap[exp.icon];
            return (
              <motion.div
                key={exp.id}
                className="premium-card reveal overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer group"
                whileHover={{ y: -8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-warm-gold/90 text-forest-dark text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                    {exp.category}
                  </span>

                  {/* Arrow indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-forest-dark" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    {IconComponent && (
                      <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-forest" />
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-semibold text-charcoal leading-tight">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}