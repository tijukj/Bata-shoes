"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal, clearCart } = useShop();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const handleCheckoutDemo = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCart}
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
              <ShoppingBag className="w-5 h-5 text-forme-dark" />
              <h2 className="font-serif text-xl font-normal text-forme-dark">Shopping Bag</h2>
              <span className="text-xs font-sans text-forme-textMuted font-mono">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-forme-dark/60 hover:text-forme-dark transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-forme-surface/60 border-b border-forme-border/60 text-xs font-sans">
            {remainingForFreeShipping > 0 ? (
              <p className="text-forme-textMuted mb-2">
                Add <span className="font-semibold text-forme-dark">₹{remainingForFreeShipping}</span> more
                for complimentary express delivery
              </p>
            ) : (
              <p className="text-emerald-700 font-medium mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                You&apos;ve qualified for complimentary express shipping!
              </p>
            )}
            <div className="w-full h-1.5 bg-forme-border rounded-full overflow-hidden">
              <div
                className="h-full bg-forme-accentDark transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-forme-border/60">
            {orderComplete ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-forme-dark">Order Confirmed!</h3>
                <p className="text-xs text-forme-textMuted font-sans max-w-xs mx-auto leading-relaxed">
                  Thank you for shopping with Bata. In a live environment, you would
                  receive an order confirmation via email and SMS.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    closeCart();
                  }}
                  className="bg-forme-dark text-forme-bg px-6 py-3 text-xs font-sans tracking-widest uppercase font-medium mt-4 hover:bg-black"
                >
                  CONTINUE BROWSING
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-forme-border mx-auto stroke-1" />
                <p className="font-serif text-lg text-forme-dark">Your bag is empty</p>
                <p className="text-xs text-forme-textMuted font-sans max-w-xs mx-auto">
                  Explore our footwear collection and select your size to begin your tailored order.
                </p>
                <button
                  onClick={closeCart}
                  className="bg-forme-dark text-white px-6 py-3 text-xs font-sans tracking-widest uppercase font-medium hover:bg-black transition-colors"
                >
                  DISCOVER COLLECTION
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-forme-surface/60 border border-forme-border p-2 shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.variationName} className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-normal text-forme-dark truncate">
                      {item.variationName}
                    </h4>
                    <p className="text-[11px] font-sans text-forme-textMuted mt-0.5">
                      Size: <span className="font-semibold text-forme-dark">UK {item.size}</span> • {item.colorName}
                    </p>
                    <p className="font-serif text-sm font-medium text-forme-dark mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-forme-border h-7 text-xs font-sans">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 h-full hover:bg-forme-surface"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 h-full hover:bg-forme-surface"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
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

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && !orderComplete && (
            <div className="border-t border-forme-border/80 p-6 bg-forme-surface/40 space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-forme-textMuted">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm text-forme-dark">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-forme-textMuted">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-700 font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base font-serif font-medium text-forme-dark pt-2 border-t border-forme-border/60">
                  <span>Order Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                disabled={isCheckingOut}
                onClick={handleCheckoutDemo}
                className="w-full h-12 bg-forme-dark text-forme-bg text-xs font-sans tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>PROCESSING DEMO ORDER...</span>
                ) : (
                  <>
                    <span>PROCEED TO DEMO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-sans text-forme-textMuted text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-forme-accentDark" />
                <span>Interactive prototype cart • No live payment charged</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
