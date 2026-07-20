"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Send, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const exploreLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Things To Do", href: "#experiences" },
  { label: "Plan Trip", href: "#plan" },
  { label: "Events", href: "#events" },
  { label: "Stories", href: "#stories" },
];

const businessLinks = [
  { label: "Directory", href: "#directory" },
  { label: "Invest", href: "#investment" },
  { label: "Community", href: "#community" },
  { label: "About VTH", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialIcons = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: XIcon, label: "X / Twitter", href: "#" },
  { icon: TikTokIcon, label: "TikTok", href: "#" },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#042F2E] text-white">
      {/* Back to Top */}
      <div className="flex justify-center -mt-6 relative z-10">
        <motion.button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-[#042F2E] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Main Footer Content */}
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1 - Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/vth-logo.jpg"
                  alt="Volta Tourism Hub"
                  className="h-16 w-auto object-contain rounded-lg brightness-0 invert"
                />
              </div>
              <p className="text-lg font-semibold text-[#F59E0B]">
                Volta Tourism Hub
              </p>
              <p className="text-sm text-white/60 leading-relaxed mt-1">
                Your gateway to Ghana&apos;s Volta Region. Discover, plan, and experience.
              </p>
            </div>

            {/* Column 2 - Explore */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-[#F59E0B] mb-5">
                EXPLORE
              </h4>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Business */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-[#F59E0B] mb-5">
                BUSINESS
              </h4>
              <ul className="space-y-3">
                {businessLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Follow Us */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-[#F59E0B] mb-5">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3">
                {socialIcons.map((social) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F59E0B]/20 flex items-center justify-center transition-colors duration-200 group"
                    >
                      <IconComp className="w-4 h-4 text-white/60 group-hover:text-[#F59E0B] transition-colors duration-200" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-lg text-white">
                Stay Inspired. Stay Connected.
              </h4>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md gap-2"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-11 rounded-full bg-white/10 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]/50 text-sm"
                required
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-[#042F2E] font-semibold text-sm shrink-0 transition-colors cursor-pointer"
              >
                {subscribed ? "Done!" : (
                  <>
                    <Send className="w-4 h-4 mr-2 inline" />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs text-white/40">
              © 2026 Volta Tourism Hub. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#privacy"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Terms
              </a>
            </div>

            <p className="text-xs text-white/30 hidden lg:block">
              Made with <span className="text-[#F59E0B]">❤️</span> for Volta
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}