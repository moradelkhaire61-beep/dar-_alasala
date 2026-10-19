"use client";

import React, { useState, useEffect } from "react";
import { Search, Crown, SlidersHorizontal, RefreshCw } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { ProductData, useStore } from "@/context/StoreContext";

export default function ProductGrid() {
  const { t, language, getLocalizedProductName, getLocalizedProductDesc } = useStore();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { key: "all", label: t.allPastries },
    { key: "شباكية", label: t.chebakia },
    { key: "كعب غزال", label: t.kaabGhazal },
    { key: "بريوات", label: t.briouat },
    { key: "غريبة", label: t.ghoriba },
    { key: "محنشة", label: t.mhanncha },
    { key: "تشكيلات وصواني", label: t.royalTrays },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const name = getLocalizedProductName(product).toLowerCase();
    const desc = getLocalizedProductDesc(product).toLowerCase();
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch =
      q === "" ||
      name.includes(q) ||
      desc.includes(q) ||
      (product.ingredients && product.ingredients.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-14 sm:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0D7] border border-[#D4AF37]/50 text-[#8C6207] text-xs font-bold mb-3">
            <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>{t.productsBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-serif">
            {t.productsTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.productsSubtitle}
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl border border-[#D4AF37]/30 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute start-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl ps-10 pe-16 py-2.5 text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute end-3 top-2.5 text-stone-400 hover:text-stone-700 text-xs font-bold cursor-pointer"
              >
                {t.clear}
              </button>
            )}
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer active:scale-95 ${
                  selectedCategory === cat.key
                    ? "bg-[#1E1B18] text-[#F3E5AB] border border-[#D4AF37]/50 shadow-xs ring-1 ring-[#D4AF37]/40"
                    : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-stone-600">
              {t.loadingPastries}
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#D4AF37]/40 max-w-md mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-[#FAF0D7] flex items-center justify-center mx-auto mb-3 text-[#996515]">
              <SlidersHorizontal className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-stone-900 font-serif">
              {t.noResultsTitle}
            </h4>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              {t.noResultsSubtitle}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-xl bg-[#1E1B18] text-[#F3E5AB] text-xs font-bold hover:bg-[#332E29] transition cursor-pointer"
            >
              {t.viewAllPastries}
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
