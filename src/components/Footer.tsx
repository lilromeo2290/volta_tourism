"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Map,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const exploreLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Things To Do", href: "#experiences" },
  { label: "Plan Trip", href: "#plan" },
  { label: "Events", href: "#events" },
  { label: "Stories", href: "#stories" },
  { label: "Map", href: "#map" },
];

const resourceLinks = [
  { label: "Business Directory", href: "#directory" },
  { label: "Investment", href: "#investment" },
  { label: "Community Tourism", href: "#community" },
  { label: "Media Centre", href: "#media" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
];

const socialIcons = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

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
    <footer id="footer" className="bg-forest-dark text-white">
      {/* Back to Top */}
      <div className="flex justify-center -mt-6 relative z-10">
        <motion.button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-warm-gold hover:bg-warm-gold-light text-forest-dark flex items-center justify-center shadow-lg shadow-warm-gold/20 transition-colors cursor-pointer"
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
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/vth-logo.jpg"
                  alt="Volta Tourism Hub"
                  className="h-11 w-auto object-contain rounded-lg brightness-0 invert"
                />
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
                The definitive digital gateway to Ghana&apos;s Volta Region.
                Discover, plan, and experience the beauty of Volta.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialIcons.map((social) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-warm-gold/20 flex items-center justify-center transition-colors duration-200 group"
                    >
                      <IconComp className="w-4 h-4 text-white/60 group-hover:text-warm-gold transition-colors duration-200" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2 - Explore */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-warm-gold mb-5">
                Explore
              </h4>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-warm-gold/40 group-hover:bg-warm-gold transition-colors duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Resources */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-warm-gold mb-5">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-warm-gold/40 group-hover:bg-warm-gold transition-colors duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact & Emergency */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-warm-gold mb-5">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Map className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/60 leading-relaxed">
                    Volta Regional Coordinating Council, Ho, Ghana
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white/40 shrink-0" />
                  <a
                    href="tel:+233XXXXXXXXX"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    +233 XXX XXX XXX
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/40 shrink-0" />
                  <a
                    href="mailto:info@voltatourismhub.com"
                    className="text-sm text-white/60 hover:text-white transition-colors break-all"
                  >
                    info@voltatourismhub.com
                  </a>
                </li>
              </ul>

              {/* Emergency */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-3.5 h-3.5 text-warm-gold" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-warm-gold">
                    Emergency
                  </span>
                </div>
                <a
                  href="tel:+233XXXXXXXXX"
                  className="text-sm font-semibold text-warm-gold hover:text-warm-gold-light transition-colors"
                >
                  +233 XXX XXX XXX
                </a>
                <p className="text-xs text-white/40 mt-1">
                  24/7 Tourist Assistance Line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-forest py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-heading font-semibold text-lg text-white">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-sm text-white/50 mt-1">
                Get the latest Volta Region travel updates and exclusive offers.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 pl-10 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-warm-gold/30 focus-visible:border-warm-gold/50 text-sm"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-11 px-6 rounded-xl bg-warm-gold hover:bg-warm-gold-light text-forest-dark font-semibold shrink-0"
              >
                {subscribed ? (
                  <span className="text-sm">Subscribed!</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    <span className="text-sm">Subscribe</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Left - Copyright */}
            <p className="text-xs text-white/40">
              © 2026 Volta Tourism Hub. All rights reserved.
            </p>

            {/* Center - Love */}
            <p className="text-xs text-white/30 hidden lg:block">
              Built with{" "}
              <span className="text-warm-gold" aria-label="love">
                ♥
              </span>{" "}
              for the Volta Region
            </p>

            {/* Right - Links */}
            <div className="flex items-center gap-4">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}