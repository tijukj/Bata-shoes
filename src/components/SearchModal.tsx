"use client";

import React, { useState, useEffect, useRef } from "react";
import { PRODUCT_VARIATIONS } from "@/data/productData";
import { useShop } from "@/context/ShopContext";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const { openModal } = useShop();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = PRODUCT_VARIATIONS.filter((v) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      v.name.toLowerCase().includes(q) ||
      v.subtitle.toLowerCase().includes(q) ||
      v.colorName.toLowerCase().includes(q) ||
      v.style.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Search Container */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl bg-white border border-forme-border shadow-2xl z-10 overflow-hidden"
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-6 py-4 border-b border-forme-border gap-3">
          <Search className="w-5 h-5 text-forme-textMuted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, finish, or style (e.g. Oxford, Slip-On, Derby, Brown)..."
            className="w-full text-sm font-sans text-forme-dark placeholder-forme-textMuted/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-forme-textMuted hover:text-forme-dark transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto divide-y divide-forme-border/60 p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-xs font-sans text-forme-textMuted">
              No formal models match &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  openModal(item);
                }}
                className="p-3.5 hover:bg-forme-surface/60 transition-colors cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white border border-forme-border p-1.5 shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-forme-dark group-hover:text-forme-accentDark transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-sans text-forme-textMuted">
                      {item.colorName} • {item.style}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm font-medium text-forme-dark">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <ArrowRight className="w-4 h-4 text-forme-textMuted group-hover:translate-x-1 group-hover:text-forme-dark transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
