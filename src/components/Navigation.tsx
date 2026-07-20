"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { useVTH } from "@/components/vth-provider";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const navLinks: NavItem[] = [
  { label: "HOME", href: "#home" },
  {
    label: "EXPLORE VOLTA",
    href: "#experiences",
    hasDropdown: true,
    dropdownItems: [
      { label: "Experiences", href: "#experiences" },
      { label: "Destinations", href: "#destinations" },
    ],
  },
  {
    label: "THINGS TO DO",
    href: "#destinations",
    hasDropdown: true,
    dropdownItems: [
      { label: "Nature & Adventure", href: "#experiences" },
      { label: "Culture & Heritage", href: "#destinations" },
    ],
  },
  {
    label: "PLAN YOUR TRIP",
    href: "#planner",
    hasDropdown: true,
    dropdownItems: [
      { label: "Trip Planner", href: "#planner" },
    ],
  },
  { label: "EVENTS", href: "#events" },
  { label: "STORIES", href: "#stories" },
  { label: "DIRECTORY", href: "#business" },
  { label: "INVEST", href: "#investment" },
  { label: "ABOUT VTH", href: "#community" },
  { label: "CONTACT", href: "#footer" },
];

export default function Navigation() {
  const { mobileMenuOpen, setMobileMenuOpen, searchOpen, setSearchOpen } = useVTH();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
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

    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileMenuOpen(false);
    setHoveredDropdown(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setHoveredDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 150);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo - Vertical, overlapping the navbar */}
            <button
              onClick={() => handleNav("#home")}
              className="absolute left-4 sm:left-6 lg:left-8 top-0 z-10 flex flex-col items-center"
            >
              <img
                src="/vth-logo.png"
                alt="Volta Tourism Hub"
                className="h-28 sm:h-32 lg:h-40 w-auto object-contain drop-shadow-md"
              />
              <div className="hidden sm:block leading-tight -mt-1">
                <p className="text-[#F59E0B] font-bold font-[Poppins,sans-serif] text-[11px] tracking-wide">
                  VOLTA TOURISM HUB
                </p>
                <p className="text-[#054906] text-[9px] tracking-wider">
                  Tourism &bull; Heritage &amp; Identity
                </p>
              </div>
            </button>

            {/* Desktop Nav Links - Offset right to avoid logo overlap */}
            <div className="hidden lg:flex items-center gap-0.5 lg:pl-44">
              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href.replace("#", "") ||
                  link.dropdownItems?.some(
                    (item) => activeSection === item.href.replace("#", "")
                  );
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() =>
                      link.hasDropdown && handleMouseEnter(link.label)
                    }
                    onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
                  >
                    <button
                      onClick={() => handleNav(link.href)}
                      className={`flex items-center gap-1 px-2.5 py-2 text-[13px] font-bold tracking-wide transition-colors duration-200 text-[#054906] ${
                        isActive
                          ? "underline underline-offset-4"
                          : "hover:text-[#042F2E]"
                      }`}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {link.hasDropdown &&
                        hoveredDropdown === link.label &&
                        link.dropdownItems && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px]"
                            onMouseEnter={() =>
                              link.hasDropdown && handleMouseEnter(link.label)
                            }
                            onMouseLeave={handleMouseLeave}
                          >
                            {link.dropdownItems.map((item) => (
                              <button
                                key={item.href}
                                onClick={() => handleNav(item.href)}
                                className={`block w-full text-left px-4 py-2 text-sm font-bold transition-colors text-[#054906] ${
                                  activeSection === item.href.replace("#", "")
                                    ? "bg-[#054906]/5"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#222222] hover:text-[#054906] transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </button>

              <button
                onClick={() => handleNav("#planner")}
                className="hidden sm:flex items-center gap-2 bg-[#F59E0B] hover:bg-[#E5910A] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Briefcase className="w-4 h-4" />
                MY TRIP
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#222222] hover:text-[#054906] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <button
                  onClick={() => handleNav("#home")}
                  className="flex items-center gap-3"
                >
                  <img
                    src="/vth-logo.png"
                    alt="Volta Tourism Hub"
                    className="h-9 w-auto object-contain"
                  />
                  <div className="leading-tight">
                    <p className="text-[#F59E0B] font-bold font-[Poppins,sans-serif] text-sm tracking-wide">
                      VOLTA TOURISM HUB
                    </p>
                    <p className="text-[#054906] text-[10px] tracking-wider">
                      Tourism &bull; Heritage &amp; Identity
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#222222] hover:text-[#054906] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-0.5">
                  {navLinks.map((link, i) => {
                    const isActive =
                      activeSection === link.href.replace("#", "") ||
                      link.dropdownItems?.some(
                        (item) => activeSection === item.href.replace("#", "")
                      );
                    const isOpen = mobileDropdown === link.label;

                    if (link.hasDropdown && link.dropdownItems) {
                      return (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <button
                            onClick={() => toggleMobileDropdown(link.label)}
                            className={`flex items-center justify-between w-full py-3 px-4 text-base font-bold rounded-lg transition-colors text-[#054906] ${
                              isActive
                                ? "bg-[#054906]/5"
                                : "hover:text-[#042F2E]"
                            }`}
                          >
                            {link.label}
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 opacity-60" />
                            ) : (
                              <ChevronDown className="w-4 h-4 opacity-60" />
                            )}
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 pr-2 py-1 space-y-0.5">
                                  {link.dropdownItems.map((item) => (
                                    <button
                                      key={item.href}
                                      onClick={() => handleNav(item.href)}
                                      className={`block w-full text-left py-2.5 px-4 text-sm font-bold rounded-lg transition-colors text-[#054906] ${
                                        activeSection ===
                                        item.href.replace("#", "")
                                          ? "bg-[#054906]/5"
                                          : "hover:text-[#042F2E] hover:bg-gray-50"
                                      }`}
                                    >
                                      {item.label}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.button
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => handleNav(link.href)}
                        className={`block w-full text-left py-3 px-4 text-base font-bold rounded-lg transition-colors text-[#054906] ${
                          isActive
                            ? "bg-[#054906]/5"
                            : "hover:text-[#042F2E]"
                        }`}]
                      >
                        {link.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="px-5 py-5 border-t border-gray-100">
                <button
                  onClick={() => handleNav("#planner")}
                  className="flex items-center justify-center gap-2 w-full bg-[#F59E0B] hover:bg-[#E5910A] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  MY TRIP
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 lg:top-[72px] left-0 right-0 z-[55] bg-white shadow-lg border-b border-gray-100"
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations, events, stories..."
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/40 focus:border-[#F59E0B] transition-all"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-[#222222] hover:bg-gray-100 transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}