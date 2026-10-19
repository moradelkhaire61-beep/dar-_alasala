"use client";

import React from "react";
import Image from "next/image";
import { Crown, MessageCircle, ArrowDown, Award, HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Hero() {
  const { openWhatsAppOrder, t } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#FAF7F2] py-12 lg:py-20 border-b border-[#D4AF37]/20">
      {/* Subtle Moroccan background elements */}
      <div className="absolute inset-0 bg-moroccan-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Royal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0D7] border border-[#D4AF37]/50 text-[#8C6207] text-xs font-bold shadow-xs">
              <Crown className="w-4 h-4 text-[#C59B27]" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.25] font-serif">
              {t.heroTitle1}{" "}
              <span className="block mt-1 gold-gradient-text font-black">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              {t.heroDescription}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="/#products"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition font-bold text-sm shadow-xl border border-[#D4AF37]/50 group cursor-pointer active:scale-95"
              >
                <span>{t.browseMenu}</span>
                <ArrowDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => openWhatsAppOrder(null)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 transition font-bold text-sm shadow-lg shadow-emerald-600/20 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.orderViaWhatsApp} (0600-000000)</span>
              </button>
            </div>

            {/* Guarantees Badges */}
            <div className="pt-6 border-t border-[#D4AF37]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-stone-700">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#FAF0D7] text-[#996515]">
                  <Award className="w-4 h-4" />
                </div>
                <span>{t.almondPurityBadge}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#FAF0D7] text-[#996515]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>{t.honeyPurityBadge}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#FAF0D7] text-[#996515]">
                  <Truck className="w-4 h-4" />
                </div>
                <span>{t.allCitiesDeliveryBadge}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#FAF0D7] text-[#996515]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span>{t.royalPackagingBadge}</span>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 via-transparent to-[#B8860B]/30 blur-sm" />

              <div className="relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 bg-[#FAF7F2]">
                <Image
                  src="/images/hero-moroccan.jpg"
                  alt={t.heroFloatingCardTitle}
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#D4AF37]/40 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900 font-serif">
                      {t.heroFloatingCardTitle}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {t.heroFloatingCardSubtitle}
                    </div>
                  </div>
                  <a
                    href="#prestige"
                    className="px-3 py-1.5 rounded-lg bg-[#1E1B18] text-[#F3E5AB] text-xs font-bold hover:bg-[#332E29] transition shrink-0"
                  >
                    {t.viewTrays}
                  </a>
                </div>
              </div>

              {/* Little Floating Seal Card */}
              <div className="absolute -top-4 -end-4 bg-[#FFFFFF] p-3 rounded-2xl border border-[#D4AF37]/40 shadow-xl hidden sm:flex items-center gap-2.5 text-stone-800">
                <span className="text-2xl">🍯</span>
                <div>
                  <div className="text-[11px] font-bold text-stone-900">{t.sidrHoneyTag}</div>
                  <div className="text-[10px] text-stone-500">{t.andalusianFlavor}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
