"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RotateCw, Sparkles, Check, ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  // 4 high-res camera angles for 360° rotation
  const angles = [
    {
      id: "perspective",
      label: "3/4 View",
      degrees: "45° Front",
      src: "/products/classic-black.png",
      tag: "Boss-Grip Derby",
    },
    {
      id: "profile",
      label: "Profile",
      degrees: "90° Lateral",
      src: "/products/craftsmanship-profile.png",
      tag: "Low-Drag Stance",
    },
    {
      id: "heel",
      label: "Heel & Sole",
      degrees: "180° Rear",
      src: "/products/craftsmanship-pair.png",
      tag: "Layered 28mm Heel",
    },
    {
      id: "texture",
      label: "Macro Texture",
      degrees: "Vamp Detail",
      src: "/products/craftsmanship-texture.png",
      tag: "Pebbled Finish",
    },
  ];

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startIndexRef = useRef(0);

  // Mouse drag handler for 360 turntable
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startIndexRef.current = activeAngleIndex;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    // Every 80px of horizontal drag switches to next angle
    const step = Math.round(deltaX / 80);
    const newIndex = (startIndexRef.current + step + angles.length * 10) % angles.length;
    setActiveAngleIndex(newIndex);
  }, [angles.length]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      startIndexRef.current = activeAngleIndex;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const step = Math.round(deltaX / 70);
    const newIndex = (startIndexRef.current + step + angles.length * 10) % angles.length;
    setActiveAngleIndex(newIndex);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const scrollTo = (id: string) => {
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

  const currentAngle = angles[activeAngleIndex];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-12 lg:pt-28 lg:pb-16 bg-[#FAFAFA] overflow-hidden select-none"
    >
      {/* 1. Dynamic Architectural Ribbon Background (monochromatic luxury curve inspired by Dribbble reference) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover opacity-90"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 220C250 80 500 520 900 360C1250 220 1380 480 1550 560"
            stroke="url(#ribbon-gradient)"
            strokeWidth="110"
            strokeLinecap="round"
            className="blur-[2px]"
          />
          <path
            d="M-50 250C300 120 560 550 940 390C1280 260 1400 500 1580 580"
            stroke="url(#ribbon-highlight)"
            strokeWidth="24"
            strokeLinecap="round"
            className="opacity-70 blur-[1px]"
          />
          <defs>
            <linearGradient id="ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5E5E5" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#D4D4D8" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#A1A1AA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E4E4E7" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="ribbon-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#F4F4F5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A1A1AA" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 my-auto">
        {/* Top Headline Banner (Large bold typographic anchor on top-right as in reference) */}
        <div className="w-full flex justify-end mb-2 sm:mb-4 lg:-mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] tracking-tight text-neutral-900 leading-[0.92] text-right"
          >
            Crafted For <br />
            <span className="text-neutral-400">Every Step.</span>
          </motion.h1>
        </div>

        {/* Center Grid: Left Copy & Floating Footwear Centerpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Clean supporting copy and primary CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start z-20 space-y-6 pt-4 lg:pt-0"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[11px] font-heading font-semibold tracking-[0.2em] uppercase">
              BATA BOSS-GRIP ATELIER
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-sm">
              Discover the perfect blend of timeless formal style and everyday performance. Built
              for the modern professional who demands uncompromised elegance.
            </p>

            {/* Primary CTA: "Shop Now >" (exact styling as in Dribbble reference) */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo("variations")}
                className="group bg-black text-white px-8 py-4 text-xs font-heading font-bold tracking-[0.15em] uppercase flex items-center gap-3 hover:bg-neutral-800 transition-all shadow-xl hover:-translate-y-0.5"
              >
                <span>Shop Now</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo("deconstruction")}
                className="text-xs font-heading font-semibold tracking-wider uppercase text-neutral-800 hover:text-black py-4 px-4 border-b border-black/20 hover:border-black transition-colors"
              >
                View Anatomy
              </button>
            </div>
          </motion.div>

          {/* Right/Center: Giant Floating Shoe OUT OF ANY BOX (Blends seamlessly with background) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
            {/* Floating Sale / Feature Badge with Curved Line (matching Dribbble reference) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-2 sm:top-6 left-4 sm:left-12 z-20 pointer-events-none"
            >
              <div className="relative flex flex-col items-center">
                {/* 3D Circular Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-neutral-800 to-black text-white flex flex-col items-center justify-center shadow-2xl border-2 border-white/20 transform -rotate-12">
                  <span className="text-[10px] sm:text-[11px] font-heading font-bold tracking-wider uppercase">
                    SALE!
                  </span>
                  <span className="text-[11px] sm:text-xs font-heading font-black text-neutral-300">
                    20% OFF
                  </span>
                </div>

                {/* Curved Leader Line connecting to the shoe */}
                <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  className="absolute top-12 left-10 sm:left-14 text-neutral-400 stroke-current"
                >
                  <path
                    d="M5 5C15 35 45 35 65 65"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle cx="65" cy="65" r="3" fill="#111111" />
                </svg>
              </div>
            </motion.div>

            {/* Seamless Floating Shoe Stage (NO BOX, NO BORDERS, PURE BLENDING) */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing group"
              title="Drag horizontally to spin 360°"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAngle.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex items-center justify-center w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentAngle.src}
                    alt="Bata Boss-Grip Classic Formal Shoe"
                    className="max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] w-auto object-contain mix-blend-multiply drop-shadow-[0_28px_32px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Angle Tag Indicator */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 border border-neutral-200 text-[10px] font-heading uppercase tracking-widest text-neutral-700 shadow-sm flex items-center gap-2">
                <RotateCw className="w-3 h-3 text-black animate-spin-slow" />
                <span>{currentAngle.degrees} • {currentAngle.tag}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 360° Interactive Turntable Navigation (Clean, minimal, zero cognitive complexity) */}
        <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quick-Angle Preset Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-neutral-400 mr-2 shrink-0">
              360° View:
            </span>
            {angles.map((ang, idx) => {
              const isActive = activeAngleIndex === idx;
              return (
                <button
                  key={ang.id}
                  onClick={() => setActiveAngleIndex(idx)}
                  className={`px-3.5 py-1.5 text-xs font-heading font-medium tracking-wide transition-all shrink-0 ${
                    isActive
                      ? "bg-black text-white shadow-md font-semibold"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-black hover:text-black"
                  }`}
                >
                  {ang.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Drag Hint */}
          <div className="text-[11px] font-sans text-neutral-500 flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>Click or drag shoe left/right to rotate 360°</span>
          </div>
        </div>
      </div>
    </section>
  );
};
