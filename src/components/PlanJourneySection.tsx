"use client";

import { Mountain, Landmark, Trees, Users, Route } from "lucide-react";
import { motion } from "framer-motion";

const planCards = [
  { label: "Adventure", icon: Mountain, href: "#planner" },
  { label: "Culture", icon: Landmark, href: "#planner" },
  { label: "Nature", icon: Trees, href: "#planner" },
  { label: "Family", icon: Users, href: "#planner" },
  { label: "Custom Trip", icon: Route, href: "#planner" },
];

export default function PlanJourneySection() {
  return (
    <section id="plan-journey" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl font-bold text-[#054906] tracking-tight mb-8">
          PLAN YOUR JOURNEY
        </h2>

        {/* Icon Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {planCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.label}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)" }}
                className="bg-[#F8F9FA] rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-shadow duration-300 hover:shadow-md group"
              >
                <div className="w-14 h-14 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mb-3 group-hover:bg-[#F59E0B]/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <span className="text-sm font-semibold text-charcoal">
                  {card.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}