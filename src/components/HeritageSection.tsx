"use client";

import React from "react";
import { Award } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function HeritageSection() {
  const { t } = useStore();

  const secrets = [
    {
      title: t.pillar1Title,
      desc: t.pillar1Desc,
      icon: "🌰",
    },
    {
      title: t.pillar2Title,
      desc: t.pillar2Desc,
      icon: "🍯",
    },
    {
      title: t.pillar3Title,
      desc: t.pillar3Desc,
      icon: "🌸",
    },
    {
      title: t.pillar4Title,
      desc: t.pillar4Desc,
      icon: "👑",
    },
  ];

  return (
    <section id="heritage" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0D7] border border-[#D4AF37]/50 text-[#8C6207] text-xs font-bold mb-3">
            <span>👑</span>
            <span>{t.heritageBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-serif">
            {t.heritageTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.heritageSubtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {secrets.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#D4AF37]/30 shadow-xs hover:shadow-lg transition-all group hover:border-[#D4AF37]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF0D7] border border-[#D4AF37]/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-stone-900 text-base font-serif mb-2 group-hover:text-[#996515] transition">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#FAF0D7] via-[#FFFDF9] to-[#FAF0D7] p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-black text-stone-900 font-serif flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C59B27]" />
              <span>{t.guaranteeBannerTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              {t.guaranteeBannerDesc}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-bold text-[#8C6207] bg-white px-4 py-2 rounded-xl border border-[#D4AF37]/40 shadow-xs">
              {t.madeInMorocco}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
