"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  MessageCircle,
  Crown,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    isFreeDelivery,
    cityFees,
    selectedCity,
    setSelectedCity,
    currency,
    formatPrice,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    settings,
    getLocalizedProductName,
    t,
  } = useStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  // Promo code
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [createdOrder, setCreatedOrder] = useState<{
    orderNumber: string;
    total: number;
    customerName: string;
    customerPhone: string;
    customerCity: string;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const cleaned = couponCode.trim().toUpperCase();
    if (cleaned === "MAROC10" || cleaned === "ASALA10" || cleaned === "RAMADAN") {
      setDiscountPercent(10);
      setCouponSuccess("Code promo -10% appliqué avec succès ! / تم تطبيق خصم 10%");
    } else {
      setCouponError("Code invalide / رمز الخصم غير صالح");
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("المرجو إدخال الاسم / Please enter your full name");
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg("المرجو إدخال رقم هاتف صحيح / Please enter a valid phone number");
      return;
    }
    if (!address.trim()) {
      setErrorMsg("المرجو إدخال عنوان التوصيل / Please enter delivery address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName.trim(),
          customerPhone: phone.trim(),
          customerCity: selectedCity,
          customerAddress: address.trim(),
          notes: notes.trim(),
          items: cart,
          subtotal: cartSubtotal,
          deliveryFee,
          discount: discountAmount,
          total: totalAmount,
          currency,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order");
      }

      setCreatedOrder({
        orderNumber: data.order.orderNumber,
        total: totalAmount,
        customerName: fullName.trim(),
        customerPhone: phone.trim(),
        customerCity: selectedCity,
      });

      clearCart();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppConfirm = () => {
    if (!createdOrder) return;
    const rawNumber = settings.whatsapp_number || "0600-000000";
    let waNumber = rawNumber.replace(/[^0-9]/g, "");
    if (waNumber.startsWith("0")) {
      waNumber = "212" + waNumber.slice(1);
    } else if (!waNumber.startsWith("212")) {
      waNumber = "212" + waNumber;
    }

    const msg = `السلام عليكم ورحمة الله وبركاته،
أود تأكيد طلبي من متجر *دار الأصالة للحلويات المغربية الفاخرة*:
▫️ رقم الطلب: *${createdOrder.orderNumber}*
▫️ الاسم الكامل: ${createdOrder.customerName}
▫️ المدينة: ${createdOrder.customerCity}
▫️ المبلغ الإجمالي: ${createdOrder.total} درهم مغربي (${formatPrice(createdOrder.total)})
▫️ طريقة الأداء: ${paymentMethod === "cod" ? "الدفع عند الاستلام نقداً" : "بطاقة بنكية"}

شكراً لكم وفي انتظار تواصلكم لتأكيد موعد التسليم!`;

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCreatedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden text-start max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF7F2] to-[#FFFDF9] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#EEDCA2]/50 text-[#996515]">
              <Crown className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-lg font-serif">
                {createdOrder ? t.orderSuccessTitle : t.checkoutTitle}
              </h3>
              <p className="text-xs text-stone-500">
                {createdOrder ? t.orderSuccessDesc : t.checkoutSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {createdOrder ? (
            /* Success Order View */
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-[#FFF9E6] border border-[#D4AF37]/40 text-[#996515] text-xs font-bold rounded-full mb-2">
                  {t.orderNumberLabel}: {createdOrder.orderNumber}
                </span>
                <h4 className="text-2xl font-bold text-stone-900 font-serif">
                  {t.orderSuccessTitle}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  {t.orderSuccessDesc}
                </p>
              </div>

              {/* Order Info Card */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 text-xs text-stone-700 max-w-md mx-auto text-start space-y-2">
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500">{t.customerNameLabel}:</span>
                  <span className="font-bold text-stone-900">{createdOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500">{t.phoneLabel}:</span>
                  <span className="font-bold text-stone-900" dir="ltr">{createdOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500">{t.cityLabel}:</span>
                  <span className="font-bold text-stone-900">{createdOrder.customerCity}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-500">{t.totalDueLabel}:</span>
                  <span className="font-black text-sm text-[#996515]">{formatPrice(createdOrder.total)}</span>
                </div>
              </div>

              {/* WhatsApp Confirm Action */}
              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppConfirm}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-green-700 transition active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.confirmViaWhatsAppBtn} (0600-000000)</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold transition cursor-pointer"
                >
                  {t.returnToStore}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {t.deliveryInfoTitle}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.fullNameField} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Laila Alami"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.phoneField} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="06 XX XX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-start"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                      <span>{t.cityLabel} <span className="text-red-500">*</span></span>
                      <span className="text-[11px] text-stone-400 font-normal">
                        {isFreeDelivery ? t.freeDeliveryText : formatPrice(deliveryFee)}
                      </span>
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
                    >
                      {cityFees.map((c) => (
                        <option key={c.city} value={c.city}>
                          {c.city} ({formatPrice(c.fee)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.addressField} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Rue, quartier, n°..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.notesField}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t.notesPlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {t.paymentMethodTitle}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-xl border text-start transition flex items-center gap-3 cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-[#B8860B] bg-[#FFFBF0] text-[#7A5600] font-bold ring-1 ring-[#D4AF37]"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#B8860B] shrink-0" />
                    <div>
                      <div className="text-xs font-bold">{t.codOption}</div>
                      <div className="text-[10px] text-stone-500">{t.codOptionDesc}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border text-start transition flex items-center gap-3 cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-[#B8860B] bg-[#FFFBF0] text-[#7A5600] font-bold ring-1 ring-[#D4AF37]"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#B8860B] shrink-0" />
                    <div>
                      <div className="text-xs font-bold">{t.cardOption}</div>
                      <div className="text-[10px] text-stone-500">{t.cardOptionDesc}</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Coupon input */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute start-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      placeholder={t.couponPlaceholder}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs bg-white border border-stone-300 rounded-lg ps-9 pe-3 py-2 text-stone-800 uppercase focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#1E1B18] text-[#F3E5AB] text-xs font-bold rounded-lg hover:bg-[#332E29] transition cursor-pointer"
                  >
                    {t.applyCoupon}
                  </button>
                </div>
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1.5">
                    {couponSuccess}
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1.5">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="bg-[#FAF7F2] rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{t.subtotal} ({cart.length}):</span>
                  <span className="font-semibold text-stone-800">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discountPercent}%):</span>
                    <span>- {formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>{t.deliveryFee} ({selectedCity}):</span>
                  <span className={isFreeDelivery ? "font-bold text-emerald-600" : "font-semibold text-stone-800"}>
                    {isFreeDelivery ? t.freeDeliveryText : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-stone-300 text-sm font-bold">
                  <span className="text-stone-900">{t.totalDueLabel}:</span>
                  <span className="text-xl font-black text-[#996515]">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition font-bold text-sm shadow-xl border border-[#D4AF37]/50 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {isSubmitting ? t.processingOrder : `${t.confirmOrderNow} (${formatPrice(totalAmount)})`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.securePaymentGuarantee}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                  {t.fastShipping}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
