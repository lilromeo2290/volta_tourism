"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/lib/vth-data";
import type { Destination } from "@/lib/vth-data";

function ImageSlider({
  images,
  name,
  fallback,
}: {
  images: string[] | undefined;
  name: string;
  fallback?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const hasMultiple = images && images.length > 1;

  const next = useCallback(() => {
    if (!images) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images]);

  const prev = useCallback(() => {
    if (!images) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images]);

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, hasMultiple]);

  if (!hasMultiple) {
    return (
      <Image
        src={images?.[0] || fallback || ""}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${name} - Image ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-4" : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>
    </>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function DestinationsSection() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#054906] mb-4">
            Explore Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the hidden gems of the Volta Region, from majestic
            waterfalls to serene lakes and sacred forests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setSelectedDestination(dest)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <ImageSlider
                  images={dest.images}
                  name={dest.name}
                  fallback={dest.image}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#054906] transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1 text-[#054906]" />
                  <span className="text-sm">{dest.location}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {dest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDestination(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={selectedDestination.images?.[0] || selectedDestination.image}
                  alt={selectedDestination.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {selectedDestination.name}
              </h3>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="w-5 h-5 mr-2 text-[#054906]" />
                <span>{selectedDestination.location}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {selectedDestination.description}
              </p>
              {selectedDestination.highlights && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Highlights
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedDestination.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => setSelectedDestination(null)}
                className="w-full bg-[#054906] text-white py-3 rounded-xl font-semibold hover:bg-[#043a05] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}