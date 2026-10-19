"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Gift,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";

export default function CartPage() {
  const {
    cart,
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
    clearCart,
    getLocalizedProductName,
    t,
  } = useStore();

  const totalAmountInMAD = cartSubtotal + deliveryFee;
  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#26211C]">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Title */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <Link href="/" className="hover:text-[#B8860B] transition">
                  {t.cartBreadcrumbHome}
                </Link>
                <span>/</span>
                <span className="text-stone-800 font-bold">{t.cart}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif flex items-center gap-2">
                <ShoppingBag className="w-7 h-7 text-[#D4AF37]" />
                <span>{t.cartPageTitle}</span>
              </h1>
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-stone-500 hover:text-red-600 transition flex items-center gap-1.5 py-1 px-3 rounded-lg border border-stone-200 bg-white cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearCart}</span>
              </button>
            )}
          </div>

          {/* If cart is empty */}
          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#D4AF37]/30 shadow-sm p-8 sm:p-16 text-center max-w-xl mx-auto my-8">
              <div className="w-24 h-24 rounded-full bg-[#FAF0D7] border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-5 text-[#996515]">
                <ShoppingBag className="w-12 h-12" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mb-2">
                {t.cartEmptyTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
                {t.cartEmptySubtitle}
              </p>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] font-bold text-sm shadow-xl border border-[#D4AF37]/50 hover:bg-[#332E29] transition"
              >
                <span>{t.browseMenu}</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Products List */}
              <div className="lg:col-span-7 space-y-4">
                {/* Free Delivery Bar */}
                <div className="bg-white p-4 rounded-2xl border border-[#D4AF37]/30 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="flex items-center gap-1.5 text-stone-800">
                      <Truck className="w-4 h-4 text-[#B8860B]" />
                      {isFreeDelivery ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {t.freeShippingCongratulations}
                        </span>
                      ) : (
                        <span>
                          {t.saveAmount || "أضف"}{" "}
                          <strong className="text-[#996515]">
                            {amountNeededForFreeDelivery} {formatPrice(amountNeededForFreeDelivery)}
                          </strong>{" "}
                          {t.addMoreForFreeShipping}
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] font-bold text-stone-500">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
                  {cart.map((item) => {
                    const itemName = getLocalizedProductName(item);
                    return (
                      <div
                        key={item.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF7F2]/50 transition"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-50">
                            <Image
                              src={item.imageUrl}
                              alt={itemName}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-bold text-stone-900 text-sm font-serif line-clamp-1">
                              {itemName}
                            </h3>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="inline-block bg-[#FAF0D7] text-[#8C6207] text-[11px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/30">
                                {item.weight}
                              </span>
                              <span className="text-xs text-stone-500">
                                {t.unitPrice}: {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls & Price */}
                        <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                          {/* Quantity Counter */}
                          <div className="flex items-center bg-stone-50 rounded-xl border border-stone-300 shadow-xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-stone-200 text-stone-700 rounded-s-xl transition active:scale-95 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-xs font-bold text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-stone-200 text-stone-700 rounded-e-xl transition active:scale-95 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line total */}
                          <div className="text-start shrink-0">
                            <div className="text-sm font-black text-[#996515]">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Remove item"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Link
                    href="/#products"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#996515] hover:text-[#7A5600]"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
                    <span>{t.continueShopping}</span>
                  </Link>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/40 shadow-md space-y-5">
                  <h2 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
                    {t.orderSummary}
                  </h2>

                  {/* Delivery City Selector */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>{t.deliveryCity}:</span>
                      </span>
                      <span className="text-[11px] font-normal text-stone-500">
                        {isFreeDelivery ? t.freeDeliveryText : formatPrice(deliveryFee)}
                      </span>
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
                    >
                      {cityFees.map((c) => (
                        <option key={c.city} value={c.city}>
                          {c.city} ({formatPrice(c.fee)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>
                        {t.subtotal} ({cart.reduce((s, i) => s + i.quantity, 0)} {t.itemsCountText}):
                      </span>
                      <span className="font-bold text-stone-900">{formatPrice(cartSubtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        {t.deliveryFee} ({selectedCity}):
                      </span>
                      <span className={isFreeDelivery ? "font-bold text-emerald-700" : "font-bold text-stone-900"}>
                        {isFreeDelivery ? t.freeDeliveryText : formatPrice(deliveryFee)}
                      </span>
                    </div>

                    <div className="pt-3 border-t-2 border-dashed border-stone-200 flex items-baseline justify-between text-stone-900">
                      <div>
                        <span className="text-sm font-bold block">{t.total}:</span>
                        <span className="text-[10px] text-stone-400">{t.totalWithDeliveryNotice}</span>
                      </div>
                      <div className="text-end">
                        <span className="text-2xl font-black text-[#996515] font-serif">
                          {formatPrice(totalAmountInMAD)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={openCheckout}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition font-bold text-sm shadow-xl border border-[#D4AF37]/50 active:scale-98 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>{t.proceedToCheckout} ({formatPrice(totalAmountInMAD)})</span>
                      <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                    </button>

                    <button
                      type="button"
                      onClick={() => openWhatsAppOrder(null)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 transition font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-98 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.orderCartViaWhatsApp} (0600-000000)</span>
                    </button>
                  </div>

                  {/* Guarantees */}
                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-[11px] text-stone-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t.securePaymentGuarantee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span>{t.royalGiftPackagingNotice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
