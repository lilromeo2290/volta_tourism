"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Heart, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVTH } from "@/components/vth-provider";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Explore", href: "#experiences" },
  { label: "Destinations", href: "#destinations" },
  { label: "Plan Trip", href: "#planner" },
  { label: "Events", href: "#events" },
  { label: "Stories", href: "#stories" },
  { label: "Invest", href: "#investment" },
  { label: "Community", href: "#community" },
  { label: "Directory", href: "#business" },
  { label: "Contact", href: "#footer" },
];

export default function Navigation() {
  const { darkMode, toggleDarkMode, favourites, mobileMenuOpen, setMobileMenuOpen } = useVTH();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef(new Map());

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRefs.current.set(entry.target.id, entry);
        });
        const visible = Array.from(sectionRefs.current.entries()).find(
          ([, e]) => e.isIntersecting
        );
        if (visible) setActiveSection(visible[0]);
      },
      { threshold: 0.15, rootMargin: "-80px 0px -50% 0px" }
    );

    navLinks.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-cream shadow-lg shadow-forest/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNav("#home")}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <MapIcon className="w-5 h-5 text-warm-gold" />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold text-forest text-lg leading-tight block">
                  VTH
                </span>
                <span className="text-[10px] text-charcoal/50 font-medium tracking-wide leading-none block">
                  VOLTA TOURISM HUB
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-forest font-semibold bg-forest/5"
                      : "text-charcoal/70 hover:text-forest hover:bg-forest/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-charcoal/60 hover:text-forest hover:bg-forest/5 transition-all"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => handleNav("#planner")}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center text-charcoal/60 hover:text-forest hover:bg-forest/5 transition-all"
                aria-label="Favourites"
              >
                <Heart className="w-5 h-5" />
                {favourites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-warm-gold text-forest-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favourites.length}
                  </span>
                )}
              </button>

              <Button
                onClick={() => handleNav("#planner")}
                className="hidden sm:flex bg-warm-gold text-forest-dark hover:bg-warm-gold-light font-semibold rounded-full px-5 py-2.5 shadow-md hover:shadow-lg transition-all text-sm"
              >
                Plan Your Trip
              </Button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-charcoal/70 hover:text-forest transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-cream"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center">
                    <MapIcon className="w-5 h-5 text-warm-gold" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-forest text-lg block">
                      VTH
                    </span>
                    <span className="text-[10px] text-charcoal/50 font-medium tracking-wide block">
                      VOLTA TOURISM HUB
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-charcoal/70 hover:text-forest transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNav(link.href)}
                      className={`block w-full text-left text-2xl font-heading font-semibold py-3 px-4 rounded-xl transition-colors ${
                        activeSection === link.href.replace("#", "")
                          ? "text-forest bg-forest/5"
                          : "text-charcoal/70 hover:text-forest hover:bg-forest/5"
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 px-4">
                  <Button
                    onClick={() => handleNav("#planner")}
                    className="w-full bg-warm-gold text-forest-dark hover:bg-warm-gold-light font-semibold rounded-full py-4 text-lg shadow-lg"
                  >
                    Plan Your Trip
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}