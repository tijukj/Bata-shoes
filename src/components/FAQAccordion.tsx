"use client";

import React, { useState } from "react";
import { FAQ_DATA } from "@/data/productData";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white border-b border-forme-border/60">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-forme-accentDark mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ASSISTANCE & INQUIRIES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-forme-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-forme-textMuted font-sans max-w-lg mx-auto leading-relaxed">
            Everything you need to know regarding formal shoe sizing, materials, delivery, and
            aftercare protocols.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-forme-border border-y border-forme-border">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-2">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-forme-dark group-hover:text-forme-accentDark transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-forme-border flex items-center justify-center shrink-0 group-hover:border-forme-dark transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 text-forme-dark transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-forme-textMuted font-sans leading-relaxed pb-6 pr-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
