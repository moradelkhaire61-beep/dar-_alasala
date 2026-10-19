"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Phone,
  MessageCircle,
  Menu,
  X,
  Crown,
  Settings,
  ChevronDown,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { useStore, Currency } from "@/context/StoreContext";
import { Language } from "@/lib/translations";

export default function Header() {
  const {
    cartCount,
    setIsCartOpen,
    currency,
    setCurrency,
    language,
    setLanguage,
    t,
    settings,
    logoUrl,
    openWhatsAppOrder,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const announcement = settings.announcement || t.announcement;
  const storePhone = settings.phone_number || "0600-000000";

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: "MAD", label: "درهم مغربي (MAD)", symbol: "د.م" },
    { code: "SAR", label: "ريال سعودي (SAR)", symbol: "ر.س" },
    { code: "USD", label: "دولار أمريكي (USD)", symbol: "$" },
    { code: "EUR", label: "يورو (EUR)", symbol: "€" },
  ];

  const languages: { code: Language; label: string; flag: string; short: string }[] = [
    { code: "ar", label: "العربية", flag: "🇲🇦", short: "AR" },
    { code: "fr", label: "Français", flag: "🇫🇷", short: "FR" },
    { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/40"
          : "bg-white border-b border-[#D4AF37]/25 shadow-xs"
      }`}
    >
      {/* Announcement Bar */}
      <div className="bg-[#191614] text-[#F3E5AB] text-xs py-2 px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <div className="flex items-center gap-2 truncate">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-medium tracking-wide text-[11px] sm:text-xs">
              {announcement}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] shrink-0">
            <a
              href={`tel:${storePhone.replace(/[^0-9+]/g, "")}`}
              className="hidden md:flex items-center gap-1.5 text-stone-300 hover:text-[#D4AF37] transition"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span dir="ltr">{storePhone}</span>
            </a>

            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1 bg-[#2B2622] hover:bg-[#3D3630] text-[#F3E5AB] px-2.5 py-1 rounded-md text-[11px] border border-[#D4AF37]/30 transition cursor-pointer"
              >
                <span>
                  {currency} ({currencies.find((c) => c.code === currency)?.symbol})
                </span>
                <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full mt-1 end-0 w-36 bg-[#1E1B18] border border-[#D4AF37]/40 rounded-lg shadow-xl z-50 overflow-hidden py-1">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#2F2A25] transition cursor-pointer ${
                        currency === c.code ? "text-[#D4AF37] font-bold" : "text-stone-300"
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="font-mono text-[10px]">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* زر الإعدادات / لوحة التحكم */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-[#F3E5AB] hover:text-white bg-[#2B2622] hover:bg-[#3D3630] px-2.5 py-1 rounded-md text-[11px] border border-[#D4AF37]/40 transition shadow-2xs cursor-pointer font-bold"
              title="الإعدادات / لوحة التحكم"
            >
              <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>الإعدادات</span>
            </Link>

          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* Brand Logo - Placed in the right in RTL (natural start) or left in LTR, beautiful medium size */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            {/* Medium size round/medallion Logo Container */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform bg-[#FAF7F2] shrink-0">
              <Image
                src={logoUrl}
                alt={t.brandName}
                fill
                priority
                className="object-contain p-0.5"
                sizes="64px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-serif group-hover:text-[#996515] transition">
                {t.brandName}
              </span>
              <span className="text-[10px] sm:text-xs text-[#996515] font-bold -mt-0.5 tracking-wider uppercase">
                {t.brandSubtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-stone-700">
            <Link
              href="/"
              className="hover:text-[#B8860B] transition pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
            >
              {t.home}
            </Link>
            <Link
              href="/#products"
              className="hover:text-[#B8860B] transition pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
            >
              {t.chebakia}
            </Link>
            <Link
              href="/#products"
              className="hover:text-[#B8860B] transition pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
            >
              {t.kaabGhazal}
            </Link>
            <Link
              href="/#products"
              className="hover:text-[#B8860B] transition pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
            >
              {t.briouat}
            </Link>
            <Link
              href="/#products"
              className="hover:text-[#B8860B] transition pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
            >
              {t.ghoriba}
            </Link>
            <Link
              href="/#prestige"
              className="hover:text-[#B8860B] transition pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
            >
              {t.royalTrays}
            </Link>
            <Link
              href="/#heritage"
              className="hover:text-[#B8860B] transition pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
            >
              {t.ourSecrets}
            </Link>
          </nav>

          {/* Header Left Actions (Language switcher, WhatsApp, Cart, Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Dropdown on Header Left */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF0D7] hover:bg-[#F3E5AB] text-[#7A4C07] border border-[#D4AF37]/50 text-xs font-bold transition cursor-pointer shadow-2xs"
                title="تغيير اللغة / Changer de langue / Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="hidden sm:inline font-bold">{currentLangObj.label}</span>
                <span className="sm:hidden font-mono font-bold text-[11px]">{currentLangObj.short}</span>
                <ChevronDown className="w-3 h-3 text-[#B8860B]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full mt-1.5 end-0 w-44 bg-white border border-[#D4AF37]/40 rounded-xl shadow-2xl z-50 overflow-hidden py-1 divide-y divide-stone-100">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#FAF7F2] transition cursor-pointer ${
                        language === l.code
                          ? "bg-[#FFF9E6] text-[#8C5810] font-black"
                          : "text-stone-700 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{l.flag}</span>
                        <span>{l.label}</span>
                      </div>
                      {language === l.code && (
                        <span className="text-[#8C5810] text-[10px] font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp Contact Button */}
            <button
              type="button"
              onClick={() => openWhatsAppOrder(null)}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
              title="0600-000000"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.orderViaWhatsApp}</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition border border-[#D4AF37]/50 shadow-md group cursor-pointer active:scale-95"
              aria-label={t.cart}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">{t.cart}</span>
            </button>

            {/* Mobile Menu Toggle (Three Lines Button) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 lg:hidden text-stone-800 hover:text-stone-950 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 transition cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-over */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 end-0 w-[82%] max-w-sm bg-white shadow-2xl border-s border-[#D4AF37]/30 flex flex-col justify-between p-5 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="space-y-5">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37] bg-[#FAF7F2]">
                    <Image
                      src={logoUrl}
                      alt={t.brandName}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm font-serif text-stone-900">
                      {t.brandName}
                    </h3>
                    <p className="text-[10px] text-[#996515] font-semibold">{t.brandSubtitle}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language selection in mobile drawer */}
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#D4AF37]/30">
                <span className="text-[11px] font-bold text-stone-600 block mb-1.5">
                  {t.language} / Language :
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLanguage(l.code);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition ${
                        language === l.code
                          ? "bg-[#1E1B18] text-[#F3E5AB] border border-[#D4AF37]"
                          : "bg-white text-stone-700 border border-stone-200"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.short}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1.5 text-xs font-bold text-stone-800">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#996515] transition flex items-center justify-between"
                >
                  <span>{t.home}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <Link
                  href="/#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#996515] transition flex items-center justify-between"
                >
                  <span>{t.chebakia}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <Link
                  href="/#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#996515] transition flex items-center justify-between"
                >
                  <span>{t.kaabGhazal}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <Link
                  href="/#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#996515] transition flex items-center justify-between"
                >
                  <span>{t.briouat}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <Link
                  href="/#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#996515] transition flex items-center justify-between"
                >
                  <span>{t.ghoriba}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <Link
                  href="/#prestige"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#996515] transition flex items-center justify-between"
                >
                  <span>{t.royalTrays}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <Link
                  href="/#heritage"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-[#FAF7F2] hover:text-[#996515] transition flex items-center justify-between"
                >
                  <span>{t.ourSecrets}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>

                {/* Direct Cart Page Link */}
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-[#FAF0D7] text-[#8C6207] hover:bg-[#F3E5AB] transition flex items-center justify-between border border-[#D4AF37]/40"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C59B27]" />
                    <span>{t.cart} ({t.goToCartPage})</span>
                  </span>
                  <span className="bg-[#1E1B18] text-[#F3E5AB] text-[11px] font-black px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                </Link>

                {/* زر الإعدادات في قائمة الهاتف */}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-[#FAF0D7] hover:text-[#8C6207] transition flex items-center justify-between border border-stone-200"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <Settings className="w-4 h-4 text-[#C59B27]" />
                    <span>الإعدادات / لوحة التحكم</span>
                  </span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-400 rtl:rotate-0 ltr:rotate-180" />
                </Link>

              </nav>
            </div>

            {/* Bottom Actions inside Mobile Drawer */}
            <div className="pt-5 border-t border-stone-200 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  openWhatsAppOrder(null);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.orderViaWhatsApp} (0600-000000)</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-stone-500">
                  {t.callUs}:{" "}
                  <a
                    href={`tel:${storePhone.replace(/[^0-9+]/g, "")}`}
                    className="font-bold text-stone-800"
                    dir="ltr"
                  >
                    {storePhone}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
