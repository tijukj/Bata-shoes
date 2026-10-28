"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ShoeDeconstruction } from "@/components/ShoeDeconstruction";
import { VariationGrid } from "@/components/VariationGrid";
import { CraftsmanshipSection } from "@/components/CraftsmanshipSection";
import { ReviewSection } from "@/components/ReviewSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <main className="min-h-screen bg-forme-bg text-forme-dark">
      {/* 1. Premium navigation bar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* 2. Hero section with interactive 80-frame shoe scrubber & hotspots */}
      <HeroSection />

      {/* 3. Scroll-driven four-layer shoe deconstruction */}
      <ShoeDeconstruction />

      {/* 4. Four product variation cards */}
      <VariationGrid />

      {/* 6. Product features and craftsmanship */}
      <CraftsmanshipSection />

      {/* 7. Customer reviews with star filter & sorting */}
      <ReviewSection />

      {/* 8. Frequently asked questions accordion */}
      <FAQAccordion />

      {/* 9. Final call-to-action */}
      <FinalCTA />

      {/* 10. Footer */}
      <Footer />

      {/* Interactive Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  );
}
