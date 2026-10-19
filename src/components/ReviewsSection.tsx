"use client";

import React from "react";
import { Star, CheckCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ReviewsSection() {
  const { t, language } = useStore();

  const reviewsAr = [
    {
      name: "فاطمة الزهراء العلمي",
      city: "الدار البيضاء (المعاريف)",
      comment:
        "أفضل شباكية وكعب غزال ذقتهما منذ سنوات! العقدة معمرة باللوز البلدي وماء الزهر رائع جداً، والتوصيل وصل في أقل من 24 ساعة ومحكم التغليف. تبارك الله عليكم.",
      rating: 5,
      date: "منذ 3 أيام",
      product: "شباكية ملكية + كعب غزال",
    },
    {
      name: "د. عمر بنجلون",
      city: "الرباط (حي الرياض)",
      comment:
        "طلبت صينية الضيافة لمناسبة عائلية خاصة، كانت النتيجة مبهرة للضيوف بدون استثناء. البريوات مقرمشة ومعسلة والبهلة تذوب في الفم. شكراً على الالتزام والرقي في التعامل.",
      rating: 5,
      date: "منذ أسبوع",
      product: "صينية الضيافة الملكية المشكلة",
    },
    {
      name: "سناء المرابط",
      city: "طنجة",
      comment:
        "طلبت عبر الواتساب وكان التجاوب سريع جداً ومحترم. الحلويات وصلت طازجة تماماً كأنها خرجت من الفرن للتو. أنصح بها بشدة لكل من يبحث عن الجودة الفاسية الحقيقية.",
      rating: 5,
      date: "منذ 5 أيام",
      product: "بريوات باللوز + محنشة",
    },
    {
      name: "كريم الإدريسي",
      city: "باريس (فرنسا)",
      comment:
        "الشحن الدولي وصل في ظرف 3 أيام فقط لعند باب البيت في باريس! الرائحة الفاسية والمذاق الأصيل جعلانا نشعر بأجواء المغرب الحبيبة. برافو دار الأصالة.",
      rating: 5,
      date: "منذ 10 أيام",
      product: "تشكيلة هدايا ملكية (شحن دولي)",
    },
  ];

  const reviewsFr = [
    {
      name: "Fatima-Zahra Alami",
      city: "Casablanca (Maârif)",
      comment:
        "Les meilleures cornes de gazelle et chebakia dégustées depuis des années ! La pâte d'amande beldi est parfumée à souhait et la livraison est arrivée en moins de 24h, emballage impeccable.",
      rating: 5,
      date: "Il y a 3 jours",
      product: "Chebakia Royale + Cornes de Gazelle",
    },
    {
      name: "Dr. Omar Benjelloun",
      city: "Rabat (Hay Riad)",
      comment:
        "Commandé pour une réception de mariage familiale : tous les convives étaient sous le charme. Briouates très croustillantes et ghoriba fondante. Bravo pour votre grand professionnalisme.",
      rating: 5,
      date: "Il y a 1 semaine",
      product: "Plateau Prestige Royal Assorti",
    },
    {
      name: "Sanaa Lamrabet",
      city: "Tanger",
      comment:
        "Commande par WhatsApp ultra-rapide et service très attentionné. Les gâteaux sont arrivés tièdes et croustillants comme sortis du fournil de Fès. Une adresse d'excellence.",
      rating: 5,
      date: "Il y a 5 jours",
      product: "Briouates aux Amandes + Mhanncha",
    },
    {
      name: "Karim Idrissi",
      city: "Paris (France)",
      comment:
        "Livraison express à domicile à Paris en 3 jours ! Le parfum de fleur d'oranger authentique et le vrai goût des amandes beldi du pays. Merci Dar Al Asala pour ce voyage gustatif.",
      rating: 5,
      date: "Il y a 10 jours",
      product: "Coffret Cadeau Prestige (International)",
    },
  ];

  const reviewsEn = [
    {
      name: "Fatima-Zahra Alami",
      city: "Casablanca (Maarif)",
      comment:
        "By far the finest Gazelle Horns and Chebakia I've had in years! Loaded with aromatic Moroccan almonds and raw blossom honey. Arrived in pristine airtight condition.",
      rating: 5,
      date: "3 days ago",
      product: "Royal Chebakia + Gazelle Horns",
    },
    {
      name: "Dr. Omar Benjelloun",
      city: "Rabat (Hay Riad)",
      comment:
        "Ordered the royal platter for an anniversary banquet: every guest was enchanted. Crispy almond briouats and exquisite melt-in-mouth Ghoriba. Exemplary service.",
      rating: 5,
      date: "1 week ago",
      product: "Royal Assorted Moroccan Platter",
    },
    {
      name: "Sanaa Lamrabet",
      city: "Tangier",
      comment:
        "Placed an order via WhatsApp in seconds. The pastries taste so bakery-fresh as if just pulled from the oven in the old Medina of Fez. Highly recommended!",
      rating: 5,
      date: "5 days ago",
      product: "Almond Briouats + Mhanncha",
    },
    {
      name: "Karim Idrissi",
      city: "Paris (France)",
      comment:
        "International shipping arrived in Paris in just 3 days! The authentic orange blossom aroma and pure almond richness brought back cherished memories of Morocco.",
      rating: 5,
      date: "10 days ago",
      product: "Prestige Gift Assortment (Global Shipping)",
    },
  ];

  const reviews = language === "fr" ? reviewsFr : language === "en" ? reviewsEn : reviewsAr;

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-serif">
            {t.reviewsTitle}
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200/80 hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between relative shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1">
                      <span>{rev.name}</span>
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </h4>
                    <span className="text-[11px] text-stone-500">{rev.city}</span>
                  </div>
                </div>
                <div className="text-[10px] text-[#996515] font-semibold mt-1">
                  {t.customerOrder}: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
