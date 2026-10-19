"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Footer() {
  const { settings, openWhatsAppOrder } = useStore();

  const storePhone = settings.phone_number || "0600-000000";

  return (
    <footer className="bg-[#191614] text-[#FAF7F2] border-t-2 border-[#D4AF37]/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Brand Name */}
        <h3 className="text-2xl font-black font-serif text-[#F3E5AB] tracking-wide">
          دار الأصالة
        </h3>

        {/* Phone & Direct WhatsApp Action */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-300">
          <a
            href={`tel:${storePhone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-2 hover:text-[#D4AF37] transition font-bold"
            dir="ltr"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>{storePhone}</span>
          </a>

          <span className="text-stone-600 hidden sm:inline">•</span>

          <button
            type="button"
            onClick={() => openWhatsAppOrder(null)}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition font-bold cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>واتساب: {storePhone}</span>
          </button>
        </div>

        {/* Exact Copyright 2026 */}
        <div className="pt-2 border-t border-stone-800 text-xs text-stone-400">
          <p>© الحقوق 2026 دار الأصالة.</p>
        </div>
      </div>
    </footer>
  );
}
