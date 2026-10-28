"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { X, Ruler, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useShop();

  if (!isSizeGuideOpen) return null;

  const sizeTable = [
    { uk: 5, eu: 39, us: 5.5, cm: "23.40 - 24.10" },
    { uk: 6, eu: 40, us: 6.5, cm: "24.20 - 24.90" },
    { uk: 7, eu: 41, us: 7.5, cm: "25.00 - 25.70" },
    { uk: 8, eu: 42, us: 8.5, cm: "25.80 - 26.50" },
    { uk: 9, eu: 43, us: 9.5, cm: "26.60 - 27.30" },
    { uk: 10, eu: 44, us: 10.5, cm: "27.40 - 28.10" },
    { uk: 11, eu: 45, us: 11.5, cm: "28.20 - 28.90" },
    { uk: 12, eu: 46, us: 12.5, cm: "29.00 - 29.70" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSizeGuide}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white border border-forme-border shadow-2xl p-6 sm:p-8 z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={closeSizeGuide}
            className="absolute top-5 right-5 p-2 text-forme-dark/60 hover:text-forme-dark transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-forme-accentDark mb-2">
            <Ruler className="w-4 h-4" />
            <span>FIT & MEASUREMENT CONVERSION</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-forme-dark mb-4">
            Men&apos;s Formal Footwear Size Guide
          </h2>
          <p className="text-xs text-forme-textMuted font-sans leading-relaxed mb-6">
            Our formal shoes adhere to standard Indian (UK) footwear grading. Use the conversion
            matrix below or reference the official catalog measurement guide.
          </p>

          {/* Conversion Table */}
          <div className="overflow-x-auto border border-forme-border mb-6">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-forme-surface/80 text-forme-dark border-b border-forme-border font-medium tracking-wider uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">UK / India</th>
                  <th className="py-2.5 px-3">EU</th>
                  <th className="py-2.5 px-3">US</th>
                  <th className="py-2.5 px-3">Foot Length (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forme-border/60">
                {sizeTable.map((row) => (
                  <tr key={row.uk} className="hover:bg-forme-surface/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-forme-dark">Size {row.uk}</td>
                    <td className="py-2.5 px-3 text-forme-textMuted">{row.eu}</td>
                    <td className="py-2.5 px-3 text-forme-textMuted">{row.us}</td>
                    <td className="py-2.5 px-3 font-mono text-forme-textMuted">{row.cm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Instructions */}
          <div className="bg-forme-surface/50 p-4 border border-forme-border/80 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/products/size-chart.jpg"
                alt="Foot measurement diagram"
                className="w-full h-auto object-contain border border-forme-border"
              />
            </div>
            <div className="text-xs font-sans text-forme-textMuted leading-relaxed space-y-1">
              <p className="font-medium text-forme-dark text-xs uppercase tracking-wider">
                How to Measure Your Foot:
              </p>
              <p>1. Stand on a blank sheet of paper with your heel against a flat wall.</p>
              <p>2. Mark the tip of your longest toe with a pencil held vertically.</p>
              <p>3. Measure the distance in centimeters and compare against the chart above.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
