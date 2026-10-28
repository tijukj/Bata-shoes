"use client";

import React, { useState, useEffect } from "react";
import { useShop } from "@/context/ShopContext";
import { BataLogo } from "./BataLogo";
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { cartCount, wishlist, openCart, openWishlist } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Shop", href: "#variations" },
    { label: "Men", href: "#variations" },
    { label: "Collections", href: "#variations" },
    { label: "Craftsmanship", href: "#craftsmanship" },
    { label: "Reviews", href: "#reviews" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 py-4 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Bata Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer select-none"
            aria-label="Bata Home"
          >
            <BataLogo height={32} variant="black" className="transition-transform group-hover:scale-105" />
          </a>

          {/* Desktop Center Navigation (matching Dribbble inspiration: Home, Shop, Men, Collections, etc.) */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-xs lg:text-[13px] font-sans font-medium text-neutral-800 hover:text-black transition-colors py-1 group tracking-normal"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-200 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Bag, Account */}
          <div className="flex items-center space-x-4 lg:space-x-5">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-neutral-700 hover:text-black transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={openWishlist}
              className="p-1.5 text-neutral-700 hover:text-black transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart
                className={`w-5 h-5 stroke-[1.8] ${
                  wishlist.length > 0 ? "fill-black text-black" : ""
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-sans rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={openCart}
              className="p-1.5 text-neutral-900 hover:text-black transition-colors relative flex items-center"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-sans rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Icon (as in Dribbble reference) */}
            <button
              onClick={() => {}}
              className="hidden sm:inline-flex p-1.5 text-neutral-700 hover:text-black transition-colors"
              aria-label="Account profile"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-black"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-white/98 backdrop-blur-xl md:hidden pt-28 px-8 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col space-y-5">
              <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 border-b border-neutral-100 pb-2">
                Menu
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl font-heading font-semibold text-neutral-900 hover:text-black transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-neutral-400" />
                </a>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-6 flex flex-col space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full bg-black text-white py-4 text-xs font-heading tracking-[0.15em] uppercase font-semibold hover:bg-neutral-800 transition-colors"
              >
                VIEW BAG ({cartCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
