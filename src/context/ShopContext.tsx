"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductVariation, CartItem } from "@/types";
import { PRODUCT_VARIATIONS } from "@/data/productData";

interface ShopContextType {
  cart: CartItem[];
  addToCart: (variation: ProductVariation, size: number, quantity?: number) => boolean;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  
  wishlist: string[];
  toggleWishlist: (variationId: string) => void;
  isInWishlist: (variationId: string) => boolean;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  selectedVariation: ProductVariation | null;
  setSelectedVariation: (variation: ProductVariation | null) => void;
  isModalOpen: boolean;
  openModal: (variation: ProductVariation) => void;
  closeModal: () => void;

  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  toast: { message: string; type: "success" | "info" | "warning" } | null;
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
  hideToast: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  // Restore cart & wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("forme_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("forme_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("forme_cart", JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("forme_wishlist", JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Handle body scroll locking when modal or drawer is open
  useEffect(() => {
    if (isModalOpen || isCartOpen || isWishlistOpen || isSizeGuideOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isCartOpen, isWishlistOpen, isSizeGuideOpen]);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const hideToast = () => setToast(null);

  const addToCart = (variation: ProductVariation, size: number, quantity: number = 1): boolean => {
    if (!size) {
      showToast("Please select your shoe size before adding to bag", "warning");
      return false;
    }

    const itemId = `${variation.id}-size-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          variationId: variation.id,
          variationName: variation.name,
          colorName: variation.colorName,
          size,
          price: variation.price,
          image: variation.image,
          quantity,
        },
      ];
    });

    showToast(`Added ${variation.name} (UK ${size}) to your Shopping Bag`, "success");
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast("Item removed from your bag", "info");
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleWishlist = (variationId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(variationId);
      const variation = PRODUCT_VARIATIONS.find((v) => v.id === variationId);
      const name = variation ? variation.name : "Product";
      if (exists) {
        showToast(`Removed ${name} from your Wishlist`, "info");
        return prev.filter((id) => id !== variationId);
      } else {
        showToast(`Added ${name} to your Wishlist`, "success");
        return [...prev, variationId];
      }
    });
  };

  const isInWishlist = (variationId: string) => wishlist.includes(variationId);

  const openModal = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart,
        closeCart,

        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        openWishlist,
        closeWishlist,

        selectedVariation,
        setSelectedVariation,
        isModalOpen,
        openModal,
        closeModal,

        isSizeGuideOpen,
        openSizeGuide,
        closeSizeGuide,

        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
