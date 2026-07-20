"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/vth-data";

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numericPart = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9,]/g, "");
  const target = parseInt(numericPart, 10) || 0;

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-warm-gold mb-2 transition-transform duration-300 group-hover:scale-110">
        {isInView ? (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {target > 0 ? (
              <CounterValue target={target} suffix={suffix} />
            ) : (
              value
            )}
          </motion.span>
        ) : (
          <span className="text-warm-gold/30">0</span>
        )}
      </div>
      <div className="text-sm md:text-base text-white/70 font-medium tracking-wide">
        {label}
      </div>
    </div>
  );
}

function CounterValue({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-forest-dark overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-warm-gold rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-volta-blue rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-warm-gold font-semibold tracking-widest text-sm uppercase">
            VOLTA REGION AT A GLANCE
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3">
            Numbers That Tell Our Story
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}