"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  MessageCircle,
  Gift,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    deliveryFee,
    isFreeDelivery,
    freeShippingThreshold,
    amountNeededForFreeDelivery,
    cityFees,
    selectedCity,
    setSelectedCity,
    formatPrice,
    openCheckout,
    openWhatsAppOrder,
    getLocalizedProductName,
    t,
  } = useStore();

  if (!isCartOpen) return null;

  const totalAmountInMAD = cartSubtotal + deliveryFee;
  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="absolute inset-y-0 start-0 max-w-full flex">
        <div
          className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col border-e border-[#D4AF37]/30 text-start animate-in slide-in-from-start duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#EEDCA2]/50 text-[#996515]">
                <ShoppingBag className="w-5 h-5 text-[#996515]" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base font-serif">
                  {t.cartTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {cart.length === 0
                    ? t.cartEmptyTitle
                    : `${cart.reduce((s, i) => s + i.quantity, 0)} ${t.itemsInCart}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="text-[11px] font-bold text-[#996515] hover:text-[#7A5600] flex items-center gap-1 bg-stone-100 hover:bg-[#FFF9E6] px-2.5 py-1 rounded-lg border border-stone-200 transition"
                title={t.goToCartPage}
              >
                <span>{t.cart}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-full transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-[#FFFDF9] border-b border-stone-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Truck className="w-4 h-4 text-[#B8860B]" />
                {isFreeDelivery ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {t.freeShippingCongratulations}
                  </span>
                ) : (
                  <span>
                    {t.saveAmount || "أضف"}{" "}
                    <strong className="text-[#996515]">
                      {formatPrice(amountNeededForFreeDelivery)}
                    </strong>{" "}
                    {t.addMoreForFreeShipping}
                  </span>
                )}
              </span>
              <span className="text-[11px] text-stone-500 font-bold">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF7F2] border border-dashed border-[#D4AF37]/50 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-9 h-9 text-[#B8860B]/60" />
                </div>
                <h4 className="font-bold text-stone-800 text-base font-serif">
                  {t.cartEmptyTitle}
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  {t.cartEmptySubtitle}
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] text-xs font-bold shadow-md hover:bg-[#332E29] transition cursor-pointer"
                >
                  <span>{t.browseMenu}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemName = getLocalizedProductName(item);
                return (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200/80 flex gap-3 items-center group relative hover:border-[#D4AF37]/60 transition"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-white">
                      <Image
                        src={item.imageUrl}
                        alt={itemName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 truncate font-serif">
                          {itemName}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition p-1 cursor-pointer"
                          title="Remove"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1.5">
                        <span className="bg-white px-2 py-0.5 rounded border border-stone-200 font-medium">
                          {item.weight}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center bg-white rounded-lg border border-stone-300 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-s-lg transition cursor-pointer active:scale-90"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-e-lg transition cursor-pointer active:scale-90"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-[#996515]">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#FFFDF9] border-t border-stone-200 space-y-3">
              {/* City Delivery Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                    {t.deliveryCity}:
                  </span>
                  <span className="text-[11px] font-normal text-stone-500">
                    {isFreeDelivery ? t.freeDeliveryText : formatPrice(deliveryFee)}
                  </span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  {cityFees.map((c) => (
                    <option key={c.city} value={c.city}>
                      {c.city} ({formatPrice(c.fee)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{t.subtotal}:</span>
                  <span className="font-bold text-stone-800">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{t.deliveryFee} ({selectedCity}):</span>
                  <span
                    className={
                      isFreeDelivery
                        ? "font-bold text-emerald-600"
                        : "font-semibold text-stone-800"
                    }
                  >
                    {isFreeDelivery ? t.freeDeliveryText : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-bold pt-2 border-t border-dashed border-stone-200">
                  <span className="text-stone-900">{t.total}:</span>
                  <div className="text-end">
                    <span className="text-xl font-black text-[#996515] font-serif">
                      {formatPrice(totalAmountInMAD)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={openCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition font-bold shadow-lg border border-[#D4AF37]/50 active:scale-98 cursor-pointer"
                >
                  <span>{t.proceedToCheckout} ({formatPrice(totalAmountInMAD)})</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition text-xs font-bold border border-stone-300 active:scale-98"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#996515]" />
                  <span>{t.goToCartPage}</span>
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
                </Link>

                <button
                  type="button"
                  onClick={() => openWhatsAppOrder(null)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 transition text-xs font-bold shadow-md active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.orderCartViaWhatsApp} (0600-000000)</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1 pt-1">
                <Gift className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{t.royalGiftPackagingNotice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
