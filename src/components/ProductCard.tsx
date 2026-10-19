"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, MessageCircle, Star, Crown, Check } from "lucide-react";
import { ProductData, useStore } from "@/context/StoreContext";

export default function ProductCard({ product }: { product: ProductData }) {
  const {
    addToCart,
    openWhatsAppOrder,
    formatPrice,
    openQuickOrder,
    getLocalizedProductName,
    getLocalizedProductDesc,
    t,
  } = useStore();
  const [added, setAdded] = useState(false);

  const displayName = getLocalizedProductName(product);
  const displayDesc = getLocalizedProductDesc(product);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.unit || "1 كيلوغرام", 1.0);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppOrder(product, product.unit || "1 كيلوغرام", 1);
  };

  return (
    <div
      onClick={() => openQuickOrder(product)}
      className="group relative bg-[#FFFFFF] rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative h-60 sm:h-64 w-full bg-[#FAF7F2] overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Pill */}
        <div className="absolute top-3 end-3 bg-[#1E1B18]/90 text-[#F3E5AB] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D4AF37]/40 backdrop-blur-xs flex items-center gap-1 shadow">
          <Crown className="w-3 h-3 text-[#D4AF37]" />
          <span>{product.category}</span>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 start-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
            {t.saveAmount} {formatPrice(product.originalPrice - product.price)}
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-4 py-2 rounded-xl bg-white/95 text-stone-900 text-xs font-bold shadow-lg border border-[#D4AF37]/40 backdrop-blur-xs transform -translate-y-2 group-hover:translate-y-0 transition-transform">
            {t.viewDetails}
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-800 text-xs">
                {product.rating || "5.0"}
              </span>
              <span className="text-stone-400 text-[11px]">
                ({product.reviewsCount || 36})
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              {product.unit || t.unitKg}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-base font-serif group-hover:text-[#996515] transition line-clamp-1">
            {displayName}
          </h3>

          {/* Description Excerpt */}
          <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-5 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-lg font-black text-[#996515]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through ms-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-medium">
              {t.authenticIngredientsTag}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-xs border cursor-pointer ${
                added
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] border-[#D4AF37]/50 active:scale-95"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.addedSuccess}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.addToCart}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 transition active:scale-95 cursor-pointer"
              title="0600-000000"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.orderViaWhatsApp}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
