"use client";

import React from "react";
import { ProductVariation } from "@/types";
import { useShop } from "@/context/ShopContext";
import { Heart, ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";

interface VariationCardProps {
  variation: ProductVariation;
  index: number;
}

export const VariationCard: React.FC<VariationCardProps> = ({ variation, index }) => {
  const { openModal, isInWishlist, toggleWishlist } = useShop();
  const isWishlisted = isInWishlist(variation.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-forme-card border border-forme-border/80 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-forme-dark/40"
    >
      {/* Top Badges & Wishlist Action */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Accent / Original Badge */}
        {variation.isOriginal ? (
          <span className="bg-forme-dark text-forme-bg text-[10px] tracking-[0.2em] uppercase font-sans px-2.5 py-1 font-medium pointer-events-auto">
            ORIGINAL DERBY
          </span>
        ) : (
          <span className="bg-forme-surface text-forme-textMuted text-[10px] tracking-[0.18em] uppercase font-sans px-2 py-0.5 border border-forme-border pointer-events-auto">
            {variation.accentBadge || "CONCEPT VARIANT"}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(variation.id);
          }}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-forme-border flex items-center justify-center text-forme-dark transition-all duration-200 hover:scale-110 pointer-events-auto shadow-sm"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-forme-accent text-forme-accent" : "text-forme-dark/70"
            }`}
          />
        </button>
      </div>

      {/* Product Image Stage */}
      <div
        onClick={() => openModal(variation)}
        className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#FDFCFB] to-forme-surface/40 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={variation.image}
          alt={variation.name}
          className="max-h-[85%] max-w-[90%] object-contain transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 drop-shadow-[0_12px_16px_rgba(0,0,0,0.08)]"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="bg-forme-dark/95 text-white px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase font-sans font-medium flex items-center gap-1.5 shadow-lg">
            VIEW DETAILS
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-6 border-t border-forme-border/60 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Color & Finish Indicator */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-black/20 shrink-0 shadow-inner"
                style={{ backgroundColor: variation.colorHex }}
              />
              <span className="text-[11px] font-sans text-forme-textMuted tracking-wider uppercase">
                {variation.colorName}
              </span>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 text-[11px] font-sans text-forme-textMuted">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{variation.rating.toFixed(1)}</span>
              <span className="text-black/30">({variation.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openModal(variation)}
            className="font-serif text-lg sm:text-xl text-forme-dark hover:text-forme-accentDark transition-colors cursor-pointer mb-1 leading-snug"
          >
            {variation.name}
          </h3>

          {/* Short Style Description */}
          <p className="text-xs text-forme-textMuted font-sans line-clamp-2 leading-relaxed mb-4">
            {variation.subtitle}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-forme-border/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-medium text-forme-dark">
              ₹{variation.price.toLocaleString("en-IN")}
            </span>
            {variation.originalPrice && (
              <span className="text-xs text-forme-textMuted/70 line-through font-sans">
                ₹{variation.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            onClick={() => openModal(variation)}
            className="text-xs font-sans tracking-[0.18em] uppercase font-medium text-forme-dark border-b border-forme-dark/40 hover:border-forme-dark hover:text-forme-accentDark transition-all py-0.5"
          >
            SELECT SIZE
          </button>
        </div>
      </div>
    </motion.div>
  );
};
