"use client";

import React from "react";
import Image from "next/image";
import { Crown, MessageCircle, Gift, CheckCircle, Award } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function PrestigeSection() {
  const { openWhatsAppOrder, t } = useStore();

  const handleCustomTray = (trayName: string, price: number) => {
    openWhatsAppOrder({
      id: 999,
      name: trayName,
      slug: "custom-tray",
      category: "صواني الضيافة",
      description: t.prestigeDescription,
      price,
      imageUrl: "/images/plateau-royal.jpg",
    });
  };

  return (
    <section id="prestige" className="py-16 sm:py-24 bg-[#191614] text-[#FAF7F2] relative overflow-hidden">
      <div className="absolute inset-0 bg-moroccan-dark-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[360px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50">
              <Image
                src="/images/plateau-royal.jpg"
                alt={t.prestigeCardTitle}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 inset-x-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37] text-stone-900 text-xs font-black mb-2">
                  {t.prestigeFloatingBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {t.prestigeCardTitle}
                </h3>
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B2622] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.prestigeBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-serif leading-tight">
              {t.prestigeTitle}{" "}
              <span className="block mt-1 gold-gradient-text">
                {t.prestigeTitleHighlight}
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.prestigeDescription}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t.prestigePoint1Title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {t.prestigePoint1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t.prestigePoint2Title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {t.prestigePoint2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t.prestigePoint3Title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {t.prestigePoint3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => handleCustomTray(t.prestigeCardTitle, 450)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 hover:brightness-110 transition font-bold text-sm shadow-xl active:scale-98 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                <span>{t.orderCustomTray}</span>
              </button>

              <button
                type="button"
                onClick={() => openWhatsAppOrder(null)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2B2622] hover:bg-[#3D3630] text-[#F3E5AB] border border-[#D4AF37]/40 transition text-sm font-bold cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.freeWhatsAppConsultation} (0600-000000)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
