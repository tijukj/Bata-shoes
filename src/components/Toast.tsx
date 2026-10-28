"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { toast, hideToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3 bg-forme-dark text-white px-5 py-4 rounded-none shadow-2xl border border-forme-darkMuted/60 max-w-md"
          >
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === "warning" && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === "info" && <Info className="w-5 h-5 text-forme-accent shrink-0" />}

            <p className="text-xs font-sans tracking-wide leading-relaxed text-forme-bg/90 flex-1">
              {toast.message}
            </p>

            <button
              onClick={hideToast}
              className="text-white/50 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
