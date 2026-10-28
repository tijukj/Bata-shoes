"use client";

import React from "react";
import { CRAFTSMANSHIP_FEATURES } from "@/data/productData";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Check } from "lucide-react";

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-24 lg:py-32 bg-[#F4F1EA] text-forme-dark border-b border-forme-border/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-forme-accentDark mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>ATELIER SPECIFICATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-forme-dark mb-6">
            Designed for the Way You Move.
          </h2>
          <p className="text-sm sm:text-base text-forme-textMuted font-sans leading-relaxed">
            A harmonious synthesis of traditional formal footwear aesthetics and utilitarian comfort.
            Explore the four architectural pillars behind our signature derby silhouette.
          </p>
        </div>

        {/* 4 Feature Blocks with Alternating Editorial Layouts */}
        <div className="space-y-20 lg:space-y-32">
          {CRAFTSMANSHIP_FEATURES.map((feature, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Showcase */}
                <div
                  className={`lg:col-span-7 relative ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[16/11] bg-white border border-forme-border shadow-md overflow-hidden p-6 sm:p-10 flex items-center justify-center group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_15px_20px_rgba(0,0,0,0.1)]"
                    />

                    {/* Corner Index Tag */}
                    <div className="absolute top-4 left-4 bg-forme-dark text-forme-bg text-[11px] font-sans font-semibold tracking-wider px-2.5 py-1">
                      FEATURE {feature.number}
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center space-y-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-forme-accentDark font-semibold">
                      {feature.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-forme-dark mt-1">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-forme-textMuted font-sans leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-2 border-t border-forme-border/60">
                    {feature.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs font-sans text-forme-dark">
                        <span className="w-1.5 h-1.5 rounded-full bg-forme-accentDark" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
