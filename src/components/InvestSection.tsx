"use client";

import { motion } from "framer-motion";

export default function InvestSection() {
  return (
    <section id="investment" className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl font-bold text-[#054906] tracking-tight mb-8">
          INVEST IN VOLTA
        </h2>

        {/* Single Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white shadow-sm"
        >
          {/* Content — Left 50% */}
          <div className="flex flex-col justify-center p-6 md:p-10 md:w-[50%] order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-charcoal leading-tight">
              Building a Sustainable Tourism Future
            </h3>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
              The Volta Region is Ghana&apos;s next big tourism frontier. With untapped
              natural beauty, rich cultural heritage, and strong government backing,
              investing here means being part of one of West Africa&apos;s most promising
              tourism destinations.
            </p>
            <a
              href="#investment"
              className="inline-flex items-center justify-center mt-6 bg-[#054906] text-white font-semibold text-sm px-7 py-2.5 rounded-full hover:bg-[#054906]/90 transition-colors w-fit"
            >
              LEARN MORE
            </a>
          </div>

          {/* Image — Right 50% */}
          <div className="w-full md:w-[50%] h-64 md:h-auto shrink-0 order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
              alt="Lake Volta scenic view"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}