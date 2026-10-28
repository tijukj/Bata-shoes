"use client";

import React from "react";
import { BRAND_CONFIG } from "@/data/productData";
import { ArrowUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const FinalCTA: React.FC = () => {
  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-28 lg:py-36 bg-[#F4F1EA] overflow-hidden border-b border-forme-border/80">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-forme-accent/10 via-transparent to-forme-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-forme-accentDark font-semibold mb-4">
            THE ATELIER CONCLUSION
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-forme-dark tracking-tight leading-[1.08] mb-6">
            Make Every Step Count.
          </h2>
          <p className="text-sm sm:text-base text-forme-textMuted font-sans leading-relaxed max-w-lg mb-8">
            Discover a timeless formal silhouette designed for your professional wardrobe. Handled
            with architectural precision, engineered with Boss-Grip traction, and crafted for
            enduring presence.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo("variations")}
              className="group bg-forme-dark text-forme-bg px-8 py-4 text-xs font-sans tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-3 hover:bg-black transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo("top")}
              className="inline-flex items-center justify-center gap-2 text-xs font-sans tracking-[0.2em] uppercase font-medium text-forme-dark/70 hover:text-forme-dark py-4 px-6 border border-forme-dark/20 hover:border-forme-dark transition-colors"
            >
              <span>BACK TO THE TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Editorial Hero Composite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex items-center justify-center relative"
        >
          <div className="relative w-full max-w-md aspect-[4/3] bg-white border border-forme-border p-6 shadow-xl flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/classic-black.png"
              alt="Bata Signature Formal Shoe"
              className="max-h-[85%] max-w-[90%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]"
            />
            <div className="absolute bottom-3 left-4 text-[9px] font-sans tracking-[0.25em] text-forme-textMuted uppercase">
              {BRAND_CONFIG.legalName}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
