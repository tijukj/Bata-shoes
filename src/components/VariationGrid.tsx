"use client";

import React from "react";
import { PRODUCT_VARIATIONS } from "@/data/productData";
import { VariationCard } from "./VariationCard";
import { Sparkles } from "lucide-react";

export const VariationGrid: React.FC = () => {
  return (
    <section id="variations" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-forme-border/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-forme-accentDark mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE COLLECTION</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-forme-dark">
              One Classic. Four Expressions.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-forme-textMuted font-sans max-w-md leading-relaxed">
            Find the style that fits your everyday uniform. Built on genuine catalog references
            ranging from traditional closed-lace Oxfords to effortless executive slip-ons.
          </p>
        </div>

        {/* 4 Cards Grid: 1 Row on Desktop, 2 Cols on Tablet, Swipeable/2-col on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {PRODUCT_VARIATIONS.map((variation, index) => (
            <VariationCard key={variation.id} variation={variation} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
