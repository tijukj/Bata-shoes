"use client";

import React, { useRef, useState, useEffect } from "react";
import { DECONSTRUCTION_LAYERS } from "@/data/productData";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronRight, Eye, Sparkles, CheckCircle2, RotateCcw } from "lucide-react";

export const ShoeDeconstruction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const totalFrames = 80;

  // Calculate current frame (1 to 80) based on scrollProgress (0 to 1)
  const currentFrame = Math.min(
    totalFrames,
    Math.max(1, Math.round(1 + scrollProgress * (totalFrames - 1)))
  );

  const getFrameSrc = (frame: number) => {
    const padded = String(frame).padStart(3, "0");
    return `/herophotos/frame_${padded}.png`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // How far down we've scrolled inside the container
      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);

      // Determine active layer based on progress
      if (progress < 0.25) {
        setActiveLayerIndex(0);
      } else if (progress < 0.5) {
        setActiveLayerIndex(1);
      } else if (progress < 0.75) {
        setActiveLayerIndex(2);
      } else {
        setActiveLayerIndex(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to specific layer frame
  const jumpToLayer = (index: number) => {
    setActiveLayerIndex(index);
    if (!containerRef.current) return;
    const targetProgress = index === 0 ? 0.15 : index === 1 ? 0.45 : index === 2 ? 0.7 : 0.95;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;
    const targetScrollY = window.scrollY + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const activeLayer = DECONSTRUCTION_LAYERS[activeLayerIndex];

  return (
    <section
      id="deconstruction"
      ref={containerRef}
      className="relative bg-white text-forme-dark"
      style={{ height: "320vh" }} // Provides smooth scroll space for 80-frame deconstruction
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-8 lg:px-12 py-8 lg:py-12 z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-forme-border/60 pb-6 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-forme-accentDark mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Scroll-Controlled Deconstruction</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-forme-dark">
              Anatomy of a Classic
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-forme-textMuted font-sans max-w-md">
            Every detail has a purpose. Discover the construction behind the silhouette as each
            architectural layer separates beneath your scroll.
          </p>
        </div>

        {/* Central Exploded Stage */}
        <div className="relative max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto min-h-0">
          {/* Left Column: Layer Details & Selector */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 z-20 order-2 lg:order-1">
            {/* Layer Tabs */}
            <div className="flex flex-wrap lg:flex-col gap-2">
              {DECONSTRUCTION_LAYERS.map((layer, idx) => {
                const isActive = activeLayerIndex === idx;
                return (
                  <button
                    key={layer.number}
                    onClick={() => jumpToLayer(idx)}
                    className={`text-left p-3.5 transition-all duration-300 border flex items-center justify-between group ${
                      isActive
                        ? "bg-forme-dark text-white border-forme-dark shadow-md"
                        : "bg-forme-bg/80 text-forme-dark/70 border-forme-border hover:border-forme-dark/40 hover:bg-forme-surface"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-sans font-semibold tracking-wider ${
                          isActive ? "text-forme-accent" : "text-forme-textMuted"
                        }`}
                      >
                        {layer.number}
                      </span>
                      <div>
                        <p className="text-xs font-sans tracking-[0.15em] uppercase font-medium">
                          {layer.title}
                        </p>
                        <p
                          className={`text-[10px] font-sans hidden sm:block ${
                            isActive ? "text-white/70" : "text-forme-textMuted"
                          }`}
                        >
                          {layer.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive
                          ? "text-forme-accent translate-x-1"
                          : "text-forme-textMuted group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Layer Deep Dive Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-forme-surface/60 border border-forme-border p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-widest text-forme-accentDark uppercase font-sans font-semibold">
                    COMPONENT {activeLayer.number} / 04
                  </span>
                  <span className="text-[10px] tracking-wider text-forme-textMuted font-sans">
                    Frame {currentFrame} / 80
                  </span>
                </div>
                <h3 className="font-serif text-xl font-normal text-forme-dark mb-2">
                  {activeLayer.title} — {activeLayer.subtitle}
                </h3>
                <p className="text-xs text-forme-textMuted font-sans leading-relaxed mb-4">
                  {activeLayer.description}
                </p>

                <div className="border-t border-forme-border/60 pt-3 flex flex-col gap-1.5 text-[11px] font-sans">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-forme-dark font-medium">{activeLayer.keyFeature}</span>
                  </div>
                  <div className="text-[10px] text-forme-textMuted pl-5 italic">
                    {activeLayer.materialsNote}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Exploded Visual Canvas */}
          <div className="lg:col-span-8 relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] flex items-center justify-center order-1 lg:order-2">
            {/* Visual Frame */}
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getFrameSrc(currentFrame)}
                alt="Shoe Deconstruction Anatomy Frame"
                className="max-h-full max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] transition-opacity duration-75 select-none"
                draggable={false}
              />

              {/* Connecting Guide Lines and Numbered Callouts (when separation begins, Frame 25+) */}
              {currentFrame >= 25 && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Layer 01 Upper Callout */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-[18%] right-[4%] sm:right-[10%] flex items-center gap-2"
                  >
                    <div className="hidden sm:block w-12 lg:w-20 h-[1px] bg-forme-dark/40" />
                    <div className="w-2 h-2 rounded-full bg-forme-dark" />
                    <div className="bg-forme-dark text-white px-3 py-1 text-[11px] font-sans tracking-wider uppercase shadow-md">
                      <span className="text-forme-accent font-semibold mr-1">01</span> UPPER
                    </div>
                  </motion.div>

                  {/* Layer 02 Lining Callout */}
                  {currentFrame >= 45 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-[42%] left-[4%] sm:left-[8%] flex items-center gap-2"
                    >
                      <div className="bg-forme-dark text-white px-3 py-1 text-[11px] font-sans tracking-wider uppercase shadow-md">
                        <span className="text-forme-accent font-semibold mr-1">02</span> LINING
                      </div>
                      <div className="w-2 h-2 rounded-full bg-forme-dark" />
                      <div className="hidden sm:block w-12 lg:w-20 h-[1px] bg-forme-dark/40" />
                    </motion.div>
                  )}

                  {/* Layer 03 Footbed Callout */}
                  {currentFrame >= 55 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-[58%] right-[4%] sm:right-[10%] flex items-center gap-2"
                    >
                      <div className="hidden sm:block w-12 lg:w-20 h-[1px] bg-forme-dark/40" />
                      <div className="w-2 h-2 rounded-full bg-forme-dark" />
                      <div className="bg-forme-dark text-white px-3 py-1 text-[11px] font-sans tracking-wider uppercase shadow-md">
                        <span className="text-forme-accent font-semibold mr-1">03</span> FOOTBED
                      </div>
                    </motion.div>
                  )}

                  {/* Layer 04 Foundation Callout */}
                  {currentFrame >= 65 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-[78%] left-[4%] sm:left-[8%] flex items-center gap-2"
                    >
                      <div className="bg-forme-dark text-white px-3 py-1 text-[11px] font-sans tracking-wider uppercase shadow-md">
                        <span className="text-forme-accent font-semibold mr-1">04</span> FOUNDATION
                      </div>
                      <div className="w-2 h-2 rounded-full bg-forme-dark" />
                      <div className="hidden sm:block w-12 lg:w-20 h-[1px] bg-forme-dark/40" />
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div className="max-w-7xl mx-auto w-full pt-4 border-t border-forme-border/60 flex items-center justify-between text-xs font-sans text-forme-textMuted shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase">Explosion Sequence</span>
            <span className="font-mono text-[11px] text-forme-dark font-medium">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="flex-1 max-w-md mx-6 h-[2px] bg-forme-border/80 overflow-hidden">
            <div
              className="h-full bg-forme-dark transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          <div className="text-[10px] tracking-widest uppercase text-forme-textMuted hidden sm:block">
            {scrollProgress >= 0.95 ? "Deconstruction Complete" : "Keep scrolling to separate"}
          </div>
        </div>
      </div>
    </section>
  );
};
