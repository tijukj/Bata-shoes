"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { PRODUCT_VARIATIONS } from "@/data/productData";
import { X, Heart, ArrowRight, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, closeWishlist, toggleWishlist, openModal } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCT_VARIATIONS.filter((v) => wishlist.includes(v.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeWishlist}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-Over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-screen max-w-md bg-white border-l border-forme-border shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-forme-border/80 flex items-center justify-between bg-forme-surface/30">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-forme-accent fill-forme-accent" />
              <h2 className="font-serif text-xl font-normal text-forme-dark">Saved Pieces</h2>
              <span className="text-xs font-sans text-forme-textMuted font-mono">
                ({wishlistedProducts.length})
              </span>
            </div>
            <button
              onClick={closeWishlist}
              className="p-1.5 text-forme-dark/60 hover:text-forme-dark transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-forme-border/60">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <Heart className="w-12 h-12 text-forme-border mx-auto stroke-1" />
                <p className="font-serif text-lg text-forme-dark">Your wishlist is empty</p>
                <p className="text-xs text-forme-textMuted font-sans max-w-xs mx-auto">
                  Click the heart icon on any formal silhouette to curate your personal style wardrobe.
                </p>
                <button
                  onClick={closeWishlist}
                  className="bg-forme-dark text-white px-6 py-3 text-xs font-sans tracking-widest uppercase font-medium hover:bg-black transition-colors"
                >
                  BROWSE COLLECTION
                </button>
              </div>
            ) : (
              wishlistedProducts.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      closeWishlist();
                      openModal(item);
                    }}
                    className="w-20 h-20 bg-forme-surface/60 border border-forme-border p-2 shrink-0 flex items-center justify-center cursor-pointer hover:border-forme-dark transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        closeWishlist();
                        openModal(item);
                      }}
                      className="font-serif text-sm font-normal text-forme-dark hover:text-forme-accentDark transition-colors cursor-pointer truncate"
                    >
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-sans text-forme-textMuted mt-0.5">
                      {item.colorName} • {item.style}
                    </p>
                    <p className="font-serif text-sm font-medium text-forme-dark mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => {
                          closeWishlist();
                          openModal(item);
                        }}
                        className="text-xs font-sans tracking-wider uppercase font-semibold text-forme-dark border-b border-forme-dark/40 hover:border-forme-dark flex items-center gap-1"
                      >
                        <span>SELECT SIZE</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="text-forme-textMuted/60 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-forme-border/80 bg-forme-surface/40">
              <button
                onClick={closeWishlist}
                className="w-full bg-forme-dark text-forme-bg py-3.5 text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-black transition-colors"
              >
                RETURN TO EXPLORATION
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
