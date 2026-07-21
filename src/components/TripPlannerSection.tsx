"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Download,
  Share2,
  Calendar,
  DollarSign,
  Compass,
  Clock,
  MapPin,
  Users,
  Camera,
  Crown,
  Trees,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { travelStyles, generateTripPlan } from "@/lib/vth-data";
import { useVTH } from "@/components/vth-provider";
import type { TripPlan } from "@/lib/vth-data";

const styleIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Compass,
  Crown,
  Camera,
  Landmark,
  Trees,
};

const interestOptions = [
  "Nature",
  "Adventure",
  "Culture",
  "Wildlife",
  "Beach",
  "Photography",
  "Food",
  "Festivals",
];

const budgetOptions = [
  { id: "budget", label: "Budget", price: "$", description: "Affordable stays & local eats" },
  { id: "moderate", label: "Moderate", price: "$$", description: "Comfort mid-range & dining" },
  { id: "luxury", label: "Luxury", price: "$$$", description: "Premium resorts & fine dining" },
];

export default function TripPlannerSection() {
  const { setGeneratedPlan } = useVTH();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [selectedDays, setSelectedDays] = useState(3);
  const [selectedBudget, setSelectedBudget] = useState("moderate");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Nature"]);
  const [selectedStyle, setSelectedStyle] = useState("adventure");
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const revealElements = section.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateTripPlan(
        selectedDays,
        selectedBudget,
        selectedInterests,
        selectedStyle
      );
      setPlan(generated);
      setGeneratedPlan(generated);
      setIsGenerating(false);
    }, 1500);
  };

  const handleDownload = () => {
    if (!plan) return;
    const text = plan.itinerary
      .map(
        (d) =>
          `Day ${d.day}: ${d.title}\n${d.activities
            .map((a) => `  ${a.time} - ${a.activity} (${a.location}) [${a.cost}]`)
            .join("\n")}`
      )
      .join("\n\n");
    const blob = new Blob(
      [
        `Volta Tourism Hub — Your Trip Plan\n` +
          `${plan.days} Days | ${plan.budget} | ${plan.interests.join(", ")} | ${plan.style}\n` +
          `${"=".repeat(50)}\n\n${text}`,
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "volta-trip-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!plan) return;
    const text = `Check out my ${plan.days}-day Volta Region trip plan! 🌍 ${plan.interests.join(", ")} | ${plan.budget}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Volta Trip Plan", text });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="planner"
      className="relative py-24 md:py-32 bg-[#054906] text-white overflow-hidden"
      ref={sectionRef}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#054906]/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-[#F59E0B]/5 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-[#F59E0B]/5 blur-3xl" />

        <svg className="absolute top-16 left-[10%] opacity-[0.06]" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M60 10C60 10 20 40 20 70C20 95 40 110 60 110C80 110 100 95 100 70C100 40 60 10 60 10Z" fill="white" />
        </svg>
        <svg className="absolute bottom-20 right-[15%] opacity-[0.04] rotate-45" width="80" height="80" viewBox="0 0 120 120" fill="none">
          <path d="M60 10C60 10 20 40 20 70C20 95 40 110 60 110C80 110 100 95 100 70C100 40 60 10 60 10Z" fill="white" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 reveal">
          <span className="text-[#F59E0B] font-semibold tracking-widest text-sm uppercase">
            AI-POWERED PLANNER
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3">
            Plan Your Perfect Volta Adventure
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto mt-4 leading-relaxed">
            Let our intelligent travel assistant create a personalized itinerary
            tailored to your preferences, budget, and travel style.
          </p>
        </div>

        {/* Stats Row */}
        <div className="text-center mb-12 reveal">
          <p className="text-white/50 text-sm tracking-wide">
            50+ Destinations&nbsp;&nbsp;|&nbsp;&nbsp;200+
            Businesses&nbsp;&nbsp;|&nbsp;&nbsp;100+ Activities
          </p>
        </div>

        {/* Planning Form Card */}
        <AnimatePresence mode="wait">
          {!plan ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto text-charcoal"
            >
              {inView && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {/* Number of Days */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
                      <Calendar className="w-4 h-4 text-[#054906]" />
                      Number of Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDays(day)}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium border-2 transition-all ${
                            selectedDays === day
                              ? "border-[#054906] bg-[#054906] text-white"
                              : "border-border text-charcoal/70 hover:border-[#054906]/50"
                          }`}
                        >
                          {day} {day === 1 ? "Day" : "Days"}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Budget Range */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
                      <DollarSign className="w-4 h-4 text-[#054906]" />
                      Budget Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedBudget(opt.id)}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium border-2 transition-all text-left ${
                            selectedBudget === opt.id
                              ? "border-[#054906] bg-[#054906] text-white"
                              : "border-border text-charcoal/70 hover:border-[#054906]/50"
                          }`}
                        >
                          <span className="font-bold text-base">{opt.price}</span>{" "}
                          <span className="font-semibold">{opt.label}</span>
                          <p className={`text-xs mt-0.5 ${selectedBudget === opt.id ? "text-white/70" : "text-charcoal/50"}`}>
                            {opt.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Interests */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
                      <Compass className="w-4 h-4 text-[#054906]" />
                      Your Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-all ${
                            selectedInterests.includes(interest)
                              ? "border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]"
                              : "border-border text-charcoal/60 hover:border-[#F59E0B]/50"
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Travel Style */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
                      <Sparkles className="w-4 h-4 text-[#054906]" />
                      Travel Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {travelStyles.map((style) => {
                        const IconComponent = styleIconMap[style.icon];
                        const isSelected = selectedStyle === style.id;
                        return (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setSelectedStyle(style.id)}
                            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-3 text-left ${
                              isSelected
                                ? "border-[#054906] bg-[#054906]/5"
                                : "border-border hover:border-[#054906]/30"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-[#054906] text-white"
                                  : "bg-[#F8F9FA] text-[#054906]"
                              }`}
                            >
                              {IconComponent && <IconComponent className="w-5 h-5" />}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-charcoal">{style.label}</p>
                              <p className="text-xs text-charcoal/50 leading-snug">{style.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Generate Button */}
                  <motion.div variants={itemVariants}>
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full bg-[#F59E0B] text-[#042F2E] hover:bg-[#F59E0B]/80 font-bold rounded-xl py-4 text-lg transition-all"
                      size="lg"
                    >
                      {isGenerating ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="inline-block"
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.span>
                          Generating Your Perfect Trip...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Generate My Trip Plan
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto text-charcoal"
            >
              {/* Itinerary Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#054906]">
                    Your {plan.days}-Day Itinerary
                  </h3>
                  <p className="text-sm text-charcoal/60 mt-1">
                    {plan.budget.charAt(0).toUpperCase() + plan.budget.slice(1)} &bull;{" "}
                    {plan.style.charAt(0).toUpperCase() + plan.style.slice(1)} &bull;{" "}
                    {plan.interests.join(", ")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPlan(null);
                    setGeneratedPlan(null);
                  }}
                  className="border-[#054906] text-[#054906] hover:bg-[#054906] hover:text-white rounded-full"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  New Plan
                </Button>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

                <div className="space-y-8">
                  {plan.itinerary.map((dayPlan, dayIndex) => (
                    <motion.div
                      key={dayPlan.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.15, duration: 0.4 }}
                    >
                      <div className="relative md:grid md:grid-cols-2 md:gap-8">
                        <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-[#054906] text-white items-center justify-center font-bold text-sm shadow-lg">
                          {dayPlan.day}
                        </div>

                        <div className={`md:col-start-${dayIndex % 2 === 0 ? "1" : "2"}`}>
                          <div
                            className={`bg-[#F8F9FA] rounded-2xl p-5 border border-border/60 ${
                              dayIndex % 2 === 0
                                ? "md:pr-8"
                                : "md:pl-8 md:col-start-2"
                            }`}
                          >
                            <div className="md:hidden flex items-center gap-2 mb-3">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#054906] text-white text-xs font-bold">
                                {dayPlan.day}
                              </span>
                              <h4 className="text-lg font-heading font-semibold text-[#054906]">
                                {dayPlan.title}
                              </h4>
                            </div>

                            <h4 className="hidden md:block text-lg font-heading font-semibold text-[#054906] mb-4">
                              {dayPlan.title}
                            </h4>

                            <div className="space-y-3">
                              {dayPlan.activities.map((act, actIdx) => (
                                <motion.div
                                  key={actIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: dayIndex * 0.15 + actIdx * 0.06, duration: 0.3 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="flex flex-col items-center shrink-0 pt-0.5">
                                    <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                                    <div className={`w-px h-full min-h-[16px] ${actIdx < dayPlan.activities.length - 1 ? "bg-border" : "bg-transparent"}`} />
                                  </div>
                                  <div className="flex-1 min-w-0 pb-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xs font-semibold text-[#F59E0B]">
                                        {act.time}
                                      </span>
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#054906]/10 text-[#054906] font-medium">
                                        {act.cost}
                                      </span>
                                    </div>
                                    <p className="text-sm font-medium text-charcoal mt-1">{act.activity}</p>
                                    <p className="text-xs text-charcoal/50 flex items-center gap-1 mt-0.5">
                                      <MapPin className="w-3 h-3" />
                                      {act.location}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-10 pt-6 border-t border-border">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-[#054906] text-white hover:bg-[#054906]/80 font-semibold rounded-xl py-3"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Itinerary
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex-1 border-[#054906] text-[#054906] hover:bg-[#054906] hover:text-white font-semibold rounded-xl py-3"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}