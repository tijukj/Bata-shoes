"use client";

import React, { useState, useEffect } from "react";
import { useShop } from "@/context/ShopContext";
import { PRODUCT_VARIATIONS, BRAND_CONFIG } from "@/data/productData";
import { ProductVariation } from "@/types";
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ProductDetailsModal: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    selectedVariation,
    setSelectedVariation,
    addToCart,
    isInWishlist,
    toggleWishlist,
    openSizeGuide,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);

  // Fallback to first variation if none selected
  const variation: ProductVariation = selectedVariation || PRODUCT_VARIATIONS[0];
  const isWishlisted = isInWishlist(variation.id);

  // Reset local state when variation changes
  useEffect(() => {
    setSelectedSize(null);
    setSelectedQuantity(1);
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [variation.id]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  const currentImage = variation.gallery[activeImageIndex] || variation.image;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    const success = addToCart(variation, selectedSize, selectedQuantity);
    if (success) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 25 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl bg-white border border-forme-border shadow-2xl z-10 my-auto flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-forme-border/80 bg-forme-surface/40 shrink-0">
          <div className="flex items-center gap-2 text-xs font-sans tracking-widest text-forme-textMuted uppercase">
            <span className="font-semibold text-forme-dark">{BRAND_CONFIG.name}</span>
            <span>/</span>
            <span>{variation.style}</span>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 text-forme-dark/60 hover:text-forme-dark transition-colors"
            aria-label="Close product modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-forme-border/80">
          {/* Left Column: Image Gallery & Zoom */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#FAF9F6] to-white">
            {/* Main Stage with Hover Zoom */}
            <div
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              className="relative w-full aspect-[4/3] bg-white border border-forme-border/80 p-6 flex items-center justify-center overflow-hidden cursor-crosshair group shadow-inner"
            >
              {/* Normal Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage}
                alt={variation.name}
                className={`max-h-[90%] max-w-[90%] object-contain transition-transform duration-200 drop-shadow-[0_15px_20px_rgba(0,0,0,0.1)] ${
                  isZoomed ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Zoomed Lens Image */}
              {isZoomed && (
                <div
                  className="absolute inset-0 bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: "220%",
                  }}
                />
              )}

              {/* Zoom hint badge */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 text-[9px] tracking-widest uppercase font-sans pointer-events-none group-hover:opacity-0 transition-opacity">
                Hover to magnify
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
              {variation.gallery.map((thumb, idx) => (
                <button
                  key={thumb}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 border shrink-0 bg-white p-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-forme-dark ring-1 ring-forme-dark shadow-sm"
                      : "border-forme-border hover:border-forme-dark/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Switch Variation Inside Modal */}
            <div className="mt-6 pt-5 border-t border-forme-border/80">
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-forme-textMuted block mb-2.5 font-medium">
                EXPLORE EXPRESSIONS ({PRODUCT_VARIATIONS.length} Available)
              </span>
              <div className="grid grid-cols-4 gap-2">
                {PRODUCT_VARIATIONS.map((v) => {
                  const isCurrent = v.id === variation.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariation(v)}
                      className={`p-2 border text-left transition-all ${
                        isCurrent
                          ? "border-forme-dark bg-forme-surface"
                          : "border-forme-border/80 bg-white hover:border-forme-dark/40"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span className="text-[10px] font-sans font-medium text-forme-dark truncate">
                          {v.colorName.split(" ")[0]}
                        </span>
                      </div>
                      <div className="text-[9px] font-serif text-forme-textMuted">
                        ₹{v.price.toLocaleString("en-IN")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Information, Size Selector, Cart Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div>
              {/* Badges & Rating */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase font-sans bg-forme-dark text-forme-bg px-2.5 py-0.5 font-medium">
                  {variation.accentBadge || "BATA FORMAL"}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-sans text-forme-textMuted">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(variation.rating)
                            ? "fill-amber-400"
                            : "fill-neutral-200 text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-forme-dark">{variation.rating.toFixed(1)}</span>
                  <span className="text-forme-textMuted/60">({variation.reviewCount})</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-3xl text-forme-dark font-normal tracking-tight mb-1">
                {variation.name}
              </h2>
              <p className="text-xs font-sans text-forme-accentDark tracking-wider uppercase mb-4">
                {variation.subtitle}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-forme-border/60">
                <span className="font-serif text-3xl font-medium text-forme-dark">
                  ₹{variation.price.toLocaleString("en-IN")}
                </span>
                {variation.originalPrice && (
                  <>
                    <span className="text-sm text-forme-textMuted/70 line-through font-sans">
                      ₹{variation.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-sans tracking-wider text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                      SAVE {variation.discount}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-forme-textMuted font-sans leading-relaxed mb-6">
                {variation.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-sans tracking-[0.18em] uppercase font-semibold text-forme-dark">
                    SELECT SIZE (UK / INDIA):
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="inline-flex items-center gap-1 text-[11px] font-sans tracking-wider text-forme-accentDark hover:text-forme-dark border-b border-forme-accentDark/40 transition-colors"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>

                {/* Size Chips */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {variation.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        disabled={!s.available}
                        onClick={() => setSelectedSize(s.size)}
                        className={`h-11 border text-xs font-sans flex flex-col items-center justify-center transition-all ${
                          !s.available
                            ? "bg-forme-surface/60 text-black/30 border-dashed border-forme-border cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-forme-dark text-white border-forme-dark font-medium shadow-md"
                            : "bg-white text-forme-dark border-forme-border hover:border-forme-dark/60 hover:bg-forme-surface"
                        }`}
                      >
                        <span className="font-semibold">UK {s.size}</span>
                        <span className="text-[9px] opacity-70">EU {s.size + 34}</span>
                      </button>
                    );
                  })}
                </div>

                {!selectedSize && (
                  <p className="text-[10px] text-amber-700 font-sans mt-2 tracking-wide">
                    * Please choose a size to continue
                  </p>
                )}
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-3 mb-6">
                {/* Quantity */}
                <div className="flex items-center border border-forme-border h-12 shrink-0">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    className="px-3 h-full hover:bg-forme-surface transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 text-forme-dark" />
                  </button>
                  <span className="w-10 text-center font-sans text-xs font-semibold">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    className="px-3 h-full hover:bg-forme-surface transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 text-forme-dark" />
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-forme-dark text-forme-bg text-xs font-sans tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-md group"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>ADD TO BAG</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(variation.id)}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors shrink-0 ${
                    isWishlisted
                      ? "border-forme-dark bg-forme-dark text-forme-accent"
                      : "border-forme-border text-forme-dark hover:border-forme-dark"
                  }`}
                  aria-label={isWishlisted ? "In wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-forme-accent" : ""}`} />
                </button>
              </div>

              {/* Reassurances */}
              <div className="space-y-2.5 pt-4 border-t border-forme-border/60 text-xs font-sans text-forme-textMuted">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-forme-accentDark shrink-0" />
                  <span>Complimentary express insured delivery on all orders</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-forme-accentDark shrink-0" />
                  <span>14-day seamless exchange & doorstep return guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-forme-accentDark shrink-0" />
                  <span>SKU: {variation.sku} • 100% Authenticity Verified</span>
                </div>
              </div>
            </div>

            {/* Accordion for Technical Specifications */}
            <div className="border-t border-forme-border/80 pt-4">
              <button
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full flex items-center justify-between text-xs font-sans tracking-wider uppercase font-semibold text-forme-dark py-1"
              >
                <span>SPECIFICATIONS & CRAFT DETAILS</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isDetailsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDetailsOpen && (
                <div className="mt-3 space-y-1.5 text-xs font-sans text-forme-textMuted pb-2">
                  {variation.details.map((d) => (
                    <div key={d.label} className="grid grid-cols-3 gap-2 py-1 border-b border-forme-border/40 text-[11px]">
                      <span className="font-medium text-forme-dark col-span-1">{d.label}:</span>
                      <span className="col-span-2 text-forme-textMuted">{d.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
