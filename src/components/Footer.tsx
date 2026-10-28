"use client";

import React, { useState } from "react";
import { BRAND_CONFIG, PRODUCT_VARIATIONS } from "@/data/productData";
import { BataLogo } from "./BataLogo";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setNewsletterStatus("error");
      setStatusMessage("Please provide a valid email address.");
      return;
    }

    setNewsletterStatus("success");
    setStatusMessage("Thank you for joining our private dispatch. (Demo confirmation)");
    setEmail("");
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
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

  return (
    <footer className="bg-forme-dark text-forme-bg pt-20 pb-12 border-t border-forme-darkMuted">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Statement Column */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <BataLogo height={36} variant="white" />
            <p className="text-xs font-sans text-forme-bg/70 leading-relaxed max-w-sm">
              Crafted for every step. Modern formal footwear for ambitious professionals who value
              understated style, durability, and craftsmanship.
            </p>
            <div className="pt-2 text-[10px] font-sans tracking-widest text-white/50 uppercase">
              EST. {BRAND_CONFIG.established} • BATA FORMAL COLLECTION
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-sans tracking-[0.2em] uppercase font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans text-forme-bg/60">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  The Shoe
                </a>
              </li>
              <li>
                <a
                  href="#deconstruction"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#deconstruction");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Anatomy
                </a>
              </li>
              <li>
                <a
                  href="#variations"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#variations");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href="#craftsmanship"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#craftsmanship");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Craftsmanship
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#reviews");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Expressions Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-sans tracking-[0.2em] uppercase font-semibold text-white">
              Expressions
            </h4>
            <ul className="space-y-2 text-xs font-sans text-forme-bg/60">
              {PRODUCT_VARIATIONS.map((v) => (
                <li key={v.id}>
                  <a
                    href="#variations"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#variations");
                    }}
                    className="hover:text-white transition-colors truncate block"
                  >
                    {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] font-sans tracking-[0.2em] uppercase font-semibold text-white">
              Atelier Dispatch
            </h4>
            <p className="text-xs font-sans text-forme-bg/70 leading-relaxed">
              Receive seasonal curation notes, private previews of upcoming formal silhouettes, and
              insider atelier releases.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex items-center border border-white/20 bg-white/5 focus-within:border-forme-accent transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setNewsletterStatus("idle");
                  }}
                  placeholder="Enter your email address..."
                  className="bg-transparent px-4 py-3 text-xs font-sans text-white placeholder-white/40 flex-1 focus:outline-none"
                  aria-label="Newsletter email input"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-white text-forme-dark hover:bg-forme-accent hover:text-white transition-colors text-xs font-sans font-semibold shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {newsletterStatus === "error" && (
                <p className="text-[11px] font-sans text-rose-400 mt-1">{statusMessage}</p>
              )}
              {newsletterStatus === "success" && (
                <p className="text-[11px] font-sans text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{statusMessage}</span>
                </p>
              )}
            </form>
            <span className="text-[10px] font-sans text-white/40 block">
              * Demo form. No promotional emails will be sent.
            </span>
          </div>
        </div>

        {/* Bottom Legal & Prototype Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-forme-bg/50">
          <div>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <a
              href={BRAND_CONFIG.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forme-accent hover:underline flex items-center gap-1"
            >
              <span>Amazon Product Reference</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
