"use client";

import React, { useState, useMemo } from "react";
import { REVIEWS_DATA } from "@/data/productData";
import { Review } from "@/types";
import { Star, Filter, ArrowUpDown, CheckCircle, ThumbsUp, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ReviewSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"highest" | "recent">("highest");
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Calculate prototype stats from sample data
  const totalReviews = REVIEWS_DATA.length;
  const avgRating = useMemo(() => {
    const sum = REVIEWS_DATA.reduce((acc, r) => acc + r.rating, 0);
    return (sum / totalReviews).toFixed(1);
  }, [totalReviews]);

  // Distribution
  const distribution = useMemo(() => {
    const counts: { [star: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    REVIEWS_DATA.forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1;
    });
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: counts[stars] || 0,
      percentage: Math.round(((counts[stars] || 0) / totalReviews) * 100),
    }));
  }, [totalReviews]);

  // Filter & Sort
  const filteredReviews = useMemo(() => {
    let list = [...REVIEWS_DATA];
    if (selectedFilter !== "all") {
      list = list.filter((r) => r.rating === selectedFilter);
    }
    if (sortBy === "highest") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // most recent
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return list;
  }, [selectedFilter, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const displayedReviews = filteredReviews;

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#FAF9F6] border-b border-forme-border/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-forme-accentDark mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COMMUNITY FEEDBACK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-forme-dark mb-4">
            Worn to Work. Styled for Life.
          </h2>
          <p className="text-xs sm:text-sm text-forme-textMuted font-sans max-w-xl leading-relaxed">
            Discover what customers think about their everyday formal footwear. Representative
            feedback compiled for prototype demonstration.
          </p>
        </div>

        {/* Rating Breakdown & Filter Summary Card */}
        <div className="bg-white border border-forme-border p-6 sm:p-8 lg:p-10 mb-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Average Rating Block */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left md:border-r border-forme-border/80 md:pr-8">
            <span className="font-serif text-5xl sm:text-6xl font-light text-forme-dark">
              {avgRating}
            </span>
            <div className="flex items-center gap-1 my-2 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(Number(avgRating))
                      ? "fill-amber-400 text-amber-400"
                      : "fill-neutral-200 text-neutral-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-sans text-forme-textMuted">
              Based on {totalReviews} sample user experiences
            </p>
            <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 mt-3 font-sans">
              Prototype sample dataset
            </span>
          </div>

          {/* Star Distribution Bars */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-2">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3 text-xs font-sans">
                <button
                  onClick={() =>
                    setSelectedFilter(selectedFilter === d.stars ? "all" : d.stars)
                  }
                  className={`w-12 text-left font-medium hover:text-forme-dark transition-colors ${
                    selectedFilter === d.stars ? "text-forme-dark font-bold underline" : "text-forme-textMuted"
                  }`}
                >
                  {d.stars} Stars
                </button>
                <div className="flex-1 h-2 bg-forme-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forme-accentDark transition-all duration-500"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-forme-textMuted font-mono text-[11px]">
                  {d.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters & Sorting Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-forme-border/80 mb-8">
          {/* Star Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-sans text-forme-textMuted flex items-center gap-1.5 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {(["all", 5, 4, 3] as const).map((star) => (
              <button
                key={star}
                onClick={() => setSelectedFilter(star)}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors shrink-0 ${
                  selectedFilter === star
                    ? "bg-forme-dark text-white font-medium"
                    : "bg-white text-forme-textMuted border border-forme-border hover:border-forme-dark/40"
                }`}
              >
                {star === "all" ? "All Ratings" : `${star} Stars`}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-forme-textMuted" />
            <span className="text-xs font-sans text-forme-textMuted">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "highest" | "recent")}
              className="bg-white border border-forme-border text-xs font-sans text-forme-dark py-1.5 px-3 focus:outline-none focus:border-forme-dark cursor-pointer"
            >
              <option value="highest">Highest Rated</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedReviews.map((rev) => {
              const isExpanded = expandedReviews.includes(rev.id);
              return (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-forme-border/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-shadow relative"
                >
                  <div>
                    {/* Header: Author & Verified Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-serif text-base font-normal text-forme-dark">
                          {rev.author}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] font-sans text-emerald-700 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Verified Purchase</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-sans text-forme-textMuted font-mono">
                        {rev.date}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-neutral-200 text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Title */}
                    <h5 className="font-sans text-xs font-semibold text-forme-dark mb-2">
                      &ldquo;{rev.title}&rdquo;
                    </h5>

                    {/* Content */}
                    <p
                      className={`text-xs text-forme-textMuted font-sans leading-relaxed ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {rev.content}
                    </p>

                    {rev.content.length > 120 && (
                      <button
                        onClick={() => toggleExpand(rev.id)}
                        className="text-[11px] font-sans text-forme-accentDark hover:text-forme-dark font-medium mt-2 underline"
                      >
                        {isExpanded ? "Show Less" : "Read Full Review"}
                      </button>
                    )}
                  </div>

                  {/* Footer Badge & Helpful Action */}
                  <div className="pt-4 mt-6 border-t border-forme-border/60 flex items-center justify-between text-[11px] font-sans text-forme-textMuted">
                    <span className="italic opacity-70">Sample review — prototype content</span>
                    <button
                      onClick={() => {}}
                      className="inline-flex items-center gap-1.5 hover:text-forme-dark transition-colors"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Read All Reviews Button */}
        {filteredReviews.length > 4 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="bg-transparent border border-forme-dark text-forme-dark px-8 py-3.5 text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-forme-dark hover:text-white transition-colors"
            >
              {showAllReviews ? "SHOW LESS" : `READ ALL REVIEWS (${filteredReviews.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
