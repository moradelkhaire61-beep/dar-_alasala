"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, MessageCircle, Star, ShieldCheck, Crown, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function QuickOrderModal() {
  const {
    isQuickOrderOpen,
    setIsQuickOrderOpen,
    quickOrderProduct,
    addToCart,
    openWhatsAppOrder,
    formatPrice,
    setIsCartOpen,
    getLocalizedProductName,
    getLocalizedProductDesc,
    getLocalizedIngredients,
    t,
    language,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(1);
  const [added, setAdded] = useState(false);

  const weightOptions = [
    {
      label: language === "fr" ? "500g (Demi-kilo)" : language === "en" ? "500g (Half Kilo)" : "500 غرام (نصف كيلو)",
      value: "500g",
      multiplier: 0.55,
      badge: language === "fr" ? "Découverte" : language === "en" ? "Sample" : "تجربة",
    },
    {
      label: language === "fr" ? "1 kg (Standard)" : language === "en" ? "1 kg (Standard)" : "1 كيلوغرام (القياسي)",
      value: "1kg",
      multiplier: 1.0,
      badge: language === "fr" ? "Populaire" : language === "en" ? "Most Popular" : "الأكثر طلباً",
    },
    {
      label: language === "fr" ? "2 kg (Éco Famille)" : language === "en" ? "2 kg (Family Save)" : "2 كيلوغرام (عائلي موفر)",
      value: "2kg",
      multiplier: 1.9,
      badge: language === "fr" ? "Économique" : language === "en" ? "Best Value" : "توفير",
    },
    {
      label: language === "fr" ? "Coffret Royal Doré (1kg)" : language === "en" ? "Royal Gold Gift Box (1kg)" : "علبة هدايا ملكية فاخرة (1 كغ)",
      value: "RoyalBox",
      multiplier: 1.25,
      badge: language === "fr" ? "Prestige" : language === "en" ? "Prestige" : "علبة مذهبة",
    },
  ];

  const selectedWeight = weightOptions[selectedWeightIndex] || weightOptions[1];

  useEffect(() => {
    if (isQuickOrderOpen) {
      setQuantity(1);
      setSelectedWeightIndex(1);
      setAdded(false);
    }
  }, [isQuickOrderOpen, quickOrderProduct]);

  if (!isQuickOrderOpen || !quickOrderProduct) return null;

  const displayName = getLocalizedProductName(quickOrderProduct);
  const displayDesc = getLocalizedProductDesc(quickOrderProduct);
  const displayIngredients = getLocalizedIngredients(quickOrderProduct);

  const currentPriceInMAD = Math.round(quickOrderProduct.price * selectedWeight.multiplier);
  const totalPriceInMAD = currentPriceInMAD * quantity;
  const originalTotalPriceInMAD = quickOrderProduct.originalPrice
    ? Math.round(quickOrderProduct.originalPrice * selectedWeight.multiplier * quantity)
    : null;

  const handleAddToCart = () => {
    addToCart(quickOrderProduct, quantity, selectedWeight.label, selectedWeight.multiplier);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsQuickOrderOpen(false);
      setIsCartOpen(true);
    }, 600);
  };

  const handleWhatsApp = () => {
    openWhatsAppOrder(quickOrderProduct, selectedWeight.label, quantity);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs animate-fade-in"
      onClick={() => setIsQuickOrderOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          type="button"
          onClick={() => setIsQuickOrderOpen(false)}
          className="absolute top-4 start-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 flex items-center justify-center shadow-md transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative h-64 md:h-auto min-h-[300px] bg-[#F7F3EB] overflow-hidden">
            <Image
              src={quickOrderProduct.imageUrl}
              alt={displayName}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
            <div className="absolute top-4 end-4 bg-[#1E1B18]/90 text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#D4AF37]/40 flex items-center gap-1.5 shadow">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{quickOrderProduct.category}</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-stone-600 font-semibold ms-1.5">
                  ({quickOrderProduct.reviewsCount || 42} {t.reviewsCountSuffix})
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug font-serif">
                {displayName}
              </h2>

              <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                {displayDesc}
              </p>

              {displayIngredients && (
                <div className="mt-3 p-3 bg-[#FAF7F2] rounded-xl border border-stone-200/60 text-xs text-stone-700">
                  <span className="font-bold text-[#996515]">{t.authenticIngredientsTag}: </span>
                  {displayIngredients}
                </div>
              )}

              {/* Weight selection */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  {t.chooseWeightOrPackaging}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {weightOptions.map((opt, idx) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedWeightIndex(idx)}
                      className={`relative p-2.5 rounded-xl text-start text-xs transition border flex flex-col justify-between cursor-pointer ${
                        selectedWeightIndex === idx
                          ? "border-[#B8860B] bg-[#FFFBF0] text-[#7A5600] font-bold shadow-sm ring-1 ring-[#D4AF37]"
                          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{opt.label}</span>
                        {selectedWeightIndex === idx && (
                          <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-stone-500 mt-1">
                        {formatPrice(Math.round(quickOrderProduct.price * opt.multiplier))}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Price Summary */}
              <div className="mt-5 flex items-center justify-between p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-700">{t.quantity}</span>
                  <div className="flex items-center bg-white rounded-lg border border-stone-300 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-stone-100 text-stone-600 rounded-s-lg transition cursor-pointer active:scale-95"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 hover:bg-stone-100 text-stone-600 rounded-e-lg transition cursor-pointer active:scale-95"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-end">
                  <div className="text-xs text-stone-500">{t.totalPrice}</div>
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="text-lg font-black text-[#996515]">
                      {formatPrice(totalPriceInMAD)}
                    </span>
                    {originalTotalPriceInMAD && (
                      <span className="text-xs text-stone-400 line-through">
                        {formatPrice(originalTotalPriceInMAD)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.pureHoneyAndAlmondSeal}
                </span>
                <span>•</span>
                <span>{t.freshGuaranteedSeal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={added}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] active:scale-98 transition font-bold shadow-lg border border-[#D4AF37]/50 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>{added ? `✓ ${t.addedSuccess}` : t.addToCart}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 active:scale-98 transition font-bold shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.orderViaWhatsApp} (0600-000000)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
