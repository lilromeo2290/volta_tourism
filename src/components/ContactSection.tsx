"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Globe,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+233 244 183 058",
    href: "tel:+233244183058",
    color: "#054906",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+233 244 183 058",
    href: "https://wa.me/233244183058",
    color: "#25D366",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@voltatourismhub.com",
    href: "mailto:info@voltatourismhub.com",
    color: "#F59E0B",
  },
  {
    icon: Globe,
    label: "Website",
    value: "voltatourismhub.com",
    href: "https://voltatourismhub.com",
    color: "#0EA5E9",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Ho, Volta Region, Ghana",
    href: "#",
    color: "#7C5A3A",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Sat: 8:00 AM - 6:00 PM",
    href: "#",
    color: "#054906",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim() && form.email.trim() && form.message.trim()) {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-[#FAFAF5] to-white"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-3">
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#054906]">
            Contact Us
          </h2>
          <p className="mt-4 text-[#6C757D] max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Have a question, need travel assistance, or want to partner with us?
            We&apos;d love to hear from you. Reach out and our team will respond promptly.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left — Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#054906]/20 transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${item.color}12` }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6C757D]">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-[#222222] group-hover:text-[#054906] transition-colors truncate">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* Emergency banner */}
            <div className="mt-6 p-5 rounded-xl bg-[#054906] text-white">
              <h4 className="font-bold text-sm mb-2">Emergency Contacts</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p>
                  <span className="font-semibold text-white">Police:</span> 191
                </p>
                <p>
                  <span className="font-semibold text-white">Ambulance:</span> 112 / 193
                </p>
                <p>
                  <span className="font-semibold text-white">Fire Service:</span> 192
                </p>
                <p>
                  <span className="font-semibold text-white">Tourism Hotline:</span>{" "}
                  <a
                    href="tel:+233202892223"
                    className="text-[#F59E0B] hover:text-[#FBBF24] transition-colors"
                  >
                    +233 202 892 223
                  </a>
                  {" / "}
                  <a
                    href="tel:+233244183058"
                    className="text-[#F59E0B] hover:text-[#FBBF24] transition-colors"
                  >
                    +233 244 183 058
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#054906] mb-1">
                Send Us a Message
              </h3>
              <p className="text-sm text-[#6C757D] mb-6">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-[#054906] mb-4" />
                  <h4 className="text-xl font-bold text-[#054906] mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-[#6C757D] max-w-sm">
                    Thank you for reaching out. Our team will respond to your inquiry
                    shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#222222] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#054906] focus:ring-2 focus:ring-[#054906]/20 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#222222] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#054906] focus:ring-2 focus:ring-[#054906]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#222222] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+233 XX XXX XXXX"
                        className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#054906] focus:ring-2 focus:ring-[#054906]/20 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#222222] mb-1.5">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-[#222222] focus:border-[#054906] focus:ring-2 focus:ring-[#054906]/20 focus:outline-none transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="trip">Trip Planning Help</option>
                        <option value="partnership">Partnership / Business</option>
                        <option value="media">Media & Press</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="complaint">Complaint</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#222222] mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#054906] focus:ring-2 focus:ring-[#054906]/20 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-[#054906] hover:bg-[#042F2E] text-white font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}