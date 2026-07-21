"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Play,
  Film,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    title: "Wli Waterfalls",
    category: "Waterfall",
    height: "h-80",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Mount Afadjato Peaks",
    category: "Mountain",
    height: "h-96",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    title: "Keta Coastline",
    category: "Beach",
    height: "h-64",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    title: "Volta River Sunset",
    category: "River",
    height: "h-80",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    title: "Tafi Atome Monkey Sanctuary",
    category: "Wildlife",
    height: "h-64",
  },
  {
    src: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
    title: "Agbamevoza Festival",
    category: "Culture",
    height: "h-96",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    title: "Tagbo Falls Trail",
    category: "Nature",
    height: "h-64",
  },
  {
    src: "https://images.unsplash.com/photo-1518173946687-a1e4e6e7ecc2?w=800&q=80",
    title: "Lake Volta Panorama",
    category: "Lake",
    height: "h-80",
  },
];

const videos = [
  {
    title: "Wli Falls Aerial Tour",
    duration: "4:32",
    thumbnail:
      "https://images.unsplash.com/photo-1432405972618-c6b0cfba8948?w=800&q=80",
  },
  {
    title: "Volta Festival Highlights 2025",
    duration: "6:15",
    thumbnail:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
];

const downloads = [
  {
    label: "Press Kit",
    description: "Official media resources",
    icon: Film,
  },
  {
    label: "Logo Pack",
    description: "Brand assets & guidelines",
    icon: ImageIcon,
  },
  {
    label: "Brochures",
    description: "Visitor guides & maps",
    icon: ExternalLink,
  },
  {
    label: "Fact Sheet",
    description: "Key figures & data",
    icon: Download,
  },
];

export default function MediaCenterSection() {
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
    <section id="media" className="py-24 md:py-32 bg-[#F8F9FA]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-[#F59E0B] font-semibold tracking-widest text-sm uppercase">
            MEDIA CENTRE
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mt-3">
            Visual Stories of Volta
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
            Explore the breathtaking landscapes, vibrant festivals, and rich
            cultural heritage of Ghana&apos;s Volta Region through our curated media
            collection.
          </p>
        </div>

        {/* Photo Gallery Grid - Masonry-like */}
        <div className="mb-20 reveal">
          <div className="flex items-center gap-3 mb-8">
            <ImageIcon className="w-5 h-5 text-[#054906]" />
            <h3 className="text-xl font-heading font-semibold text-charcoal">
              Photo Gallery
            </h3>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className="premium-card break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className={`${img.height} w-full relative`}>
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#054906]/90 via-[#054906]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                    <span className="text-[#F59E0B] text-xs font-semibold uppercase tracking-wider mb-1">
                      {img.category}
                    </span>
                    <h4 className="text-white font-heading font-semibold text-lg leading-tight mb-3">
                      {img.title}
                    </h4>
                    <Button
                      size="sm"
                      className="w-fit rounded-full bg-[#F59E0B] text-[#042F2E] hover:bg-[#F59E0B]/80 text-xs font-semibold"
                    >
                      <ExternalLink className="w-3 h-3 mr-1.5" />
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Showcase */}
        <div className="mb-20 reveal">
          <div className="flex items-center gap-3 mb-8">
            <Film className="w-5 h-5 text-[#054906]" />
            <h3 className="text-xl font-heading font-semibold text-charcoal">
              Video Showcase
            </h3>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                className="premium-card group relative rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div className="relative h-64 md:h-72 w-full">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-charcoal/50 group-hover:bg-charcoal/70 transition-colors duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F59E0B]/90 flex items-center justify-center shadow-lg shadow-[#F59E0B]/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-[#042F2E] ml-1" />
                    </motion.div>
                  </div>

                  <div className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {video.duration}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Film className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span className="text-[#F59E0B] text-xs font-semibold uppercase tracking-wider">
                        Video
                      </span>
                    </div>
                    <h4 className="text-white font-heading font-semibold text-lg leading-tight">
                      {video.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-8">
            <Download className="w-5 h-5 text-[#054906]" />
            <h3 className="text-xl font-heading font-semibold text-charcoal">
              Media Downloads
            </h3>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {downloads.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.button
                  key={index}
                  className="premium-card group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-border/50 hover:border-[#054906]/20 text-center cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#054906]/10 flex items-center justify-center group-hover:bg-[#054906] group-hover:text-white transition-colors duration-300">
                    <IconComp className="w-5 h-5 text-[#054906] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="block font-heading font-semibold text-charcoal text-sm">
                      {item.label}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}