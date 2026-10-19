"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ShoppingBag, X, ArrowLeft } from "lucide-react";
import { Language, translations, Translations } from "@/lib/translations";

export interface CartItem {
  id: string; // unique cart item id (product.id + weight)
  productId: number;
  name: string;
  nameFr?: string | null;
  nameEn?: string | null;
  price: number; // base price for selected weight in MAD
  originalPrice?: number | null;
  imageUrl: string;
  quantity: number;
  weight: string; // e.g. "500 غرام", "1 كيلوغرام", "2 كيلوغرام", "علبة هدايا ملكية فاخرة"
  weightMultiplier: number; // multiplier for weight calculation
}

export interface ProductData {
  id: number;
  name: string;
  nameFr?: string | null;
  nameEn?: string | null;
  slug: string;
  category: string;
  description: string;
  descriptionFr?: string | null;
  descriptionEn?: string | null;
  ingredients?: string | null;
  ingredientsFr?: string | null;
  ingredientsEn?: string | null;
  price: number;
  originalPrice?: number | null;
  imageUrl: string;
  unit?: string | null;
  inStock?: boolean | null;
  isFeatured?: boolean | null;
  rating?: string | null;
  reviewsCount?: number | null;
}

export interface CityFee {
  city: string;
  fee: number;
}

export type Currency = "MAD" | "SAR" | "USD" | "EUR";

interface AddedNotification {
  message: string;
  productName?: string;
  imageUrl?: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: ProductData, quantity?: number, weight?: string, multiplier?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  setItemQuantity: (cartId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Language & Translations
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: "rtl" | "ltr";
  getLocalizedProductName: (product: { name: string; nameFr?: string | null; nameEn?: string | null }) => string;
  getLocalizedProductDesc: (product: { description: string; descriptionFr?: string | null; descriptionEn?: string | null }) => string;
  getLocalizedIngredients: (product: { ingredients?: string | null; ingredientsFr?: string | null; ingredientsEn?: string | null }) => string;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInMAD: number) => string;

  // Settings & Delivery
  settings: Record<string, string>;
  refreshSettings: () => Promise<void>;
  cityFees: CityFee[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  deliveryFee: number;
  freeShippingThreshold: number;
  isFreeDelivery: boolean;
  amountNeededForFreeDelivery: number;

  // Logo
  logoUrl: string;

  // Modals & WhatsApp
  isQuickOrderOpen: boolean;
  setIsQuickOrderOpen: (open: boolean) => void;
  quickOrderProduct: ProductData | null;
  openQuickOrder: (product: ProductData) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  openCheckout: () => void;
  openWhatsAppOrder: (productOrCart?: ProductData | null, customWeight?: string, customQty?: number) => void;
  notification: AddedNotification | null;
  showNotification: (msg: string, productName?: string, imageUrl?: string) => void;
  dismissNotification: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Helper to format Moroccan phone number into WhatsApp international wa.me format
export function formatWhatsAppNumber(phone: string): string {
  let cleaned = (phone || "").replace(/[^0-9]/g, "");
  if (!cleaned) return "212600000000";

  if (cleaned.startsWith("0")) {
    cleaned = "212" + cleaned.slice(1);
  } else if (!cleaned.startsWith("212") && (cleaned.startsWith("6") || cleaned.startsWith("7")) && cleaned.length === 9) {
    cleaned = "212" + cleaned;
  }
  return cleaned;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [quickOrderProduct, setQuickOrderProduct] = useState<ProductData | null>(null);
  const [currency, setCurrencyState] = useState<Currency>("MAD");
  const [language, setLanguageState] = useState<Language>("ar");
  const [selectedCity, setSelectedCity] = useState("الدار البيضاء");
  const [settings, setSettings] = useState<Record<string, string>>({
    whatsapp_number: "0600-000000",
    phone_number: "0600-000000",
    store_logo_url: "/images/logo-dar-alasala.svg",
  });
  const [notification, setNotification] = useState<AddedNotification | null>(null);

  // Load cart, language, and currency from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("dar_asala_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCurrency = localStorage.getItem("dar_asala_currency") as Currency;
      if (savedCurrency && ["MAD", "SAR", "USD", "EUR"].includes(savedCurrency)) {
        setCurrencyState(savedCurrency);
      }
      const savedLang = localStorage.getItem("dar_asala_lang") as Language;
      if (savedLang && ["ar", "fr", "en"].includes(savedLang)) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      }
      const savedCity = localStorage.getItem("dar_asala_city");
      if (savedCity) {
        setSelectedCity(savedCity);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("dar_asala_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Load settings from API
  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("dar_asala_currency", c);
    } catch {
      // ignore
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("dar_asala_lang", lang);
    } catch {
      // ignore
    }
    // Update HTML root attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const handleSetCity = (city: string) => {
    setSelectedCity(city);
    try {
      localStorage.setItem("dar_asala_city", city);
    } catch {
      // ignore
    }
  };

  const showNotification = (msg: string, productName?: string, imageUrl?: string) => {
    setNotification({ message: msg, productName, imageUrl });
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification]);

  // Translations object based on active language
  const t = translations[language] || translations.ar;
  const dir = language === "ar" ? "rtl" : "ltr";

  const getLocalizedProductName = (product: { name: string; nameFr?: string | null; nameEn?: string | null }): string => {
    if (language === "fr" && product.nameFr) return product.nameFr;
    if (language === "en" && product.nameEn) return product.nameEn;
    return product.name;
  };

  const getLocalizedProductDesc = (product: { description: string; descriptionFr?: string | null; descriptionEn?: string | null }): string => {
    if (language === "fr" && product.descriptionFr) return product.descriptionFr;
    if (language === "en" && product.descriptionEn) return product.descriptionEn;
    return product.description;
  };

  const getLocalizedIngredients = (product: { ingredients?: string | null; ingredientsFr?: string | null; ingredientsEn?: string | null }): string => {
    if (language === "fr" && product.ingredientsFr) return product.ingredientsFr;
    if (language === "en" && product.ingredientsEn) return product.ingredientsEn;
    return product.ingredients || "";
  };

  // Logo URL from settings or default SVG
  const logoUrl = settings.store_logo_url || "/images/logo-dar-alasala.svg";

  // Parse city fees
  let cityFees: CityFee[] = [
    { city: "الدار البيضاء", fee: 20 },
    { city: "الرباط وسلا", fee: 25 },
    { city: "مراكش", fee: 30 },
    { city: "فاس ومكناس", fee: 25 },
    { city: "طنجة وتطوان", fee: 30 },
    { city: "أكادير", fee: 35 },
    { city: "وجدة والشرق", fee: 35 },
    { city: "باقي المدن المغربية", fee: 40 },
    { city: "شحن دولي (فرنسا، أوروبا)", fee: 180 },
    { city: "شحن دولي (الخليج، أمريكا)", fee: 240 },
  ];

  if (settings.delivery_city_fees) {
    try {
      const parsed = JSON.parse(settings.delivery_city_fees);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cityFees = parsed;
      }
    } catch {
      // use default
    }
  }

  const freeShippingThreshold = Number(settings.delivery_free_threshold || 350);

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const matchedCity = cityFees.find((c) => c.city === selectedCity);
  const baseCityFee = matchedCity ? matchedCity.fee : Number(settings.delivery_fee_base || 35);

  const isFreeDelivery = cartSubtotal >= freeShippingThreshold && cartSubtotal > 0;
  const deliveryFee = isFreeDelivery ? 0 : baseCityFee;
  const amountNeededForFreeDelivery = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Format price helper with currency exchange
  const formatPrice = (amountInMAD: number): string => {
    if (currency === "SAR") {
      const sarRate = 0.38;
      const val = Math.round(amountInMAD * sarRate);
      if (language === "fr" || language === "en") {
        return `${val} SAR`;
      }
      return `${val} ر.س`;
    }
    if (currency === "USD") {
      const usdRate = 0.1;
      return `$${(amountInMAD * usdRate).toFixed(1)}`;
    }
    if (currency === "EUR") {
      const eurRate = 0.092;
      return `€${(amountInMAD * eurRate).toFixed(1)}`;
    }
    if (language === "fr" || language === "en") {
      return `${Math.round(amountInMAD)} DH`;
    }
    return `${Math.round(amountInMAD)} د.م`;
  };

  // Add to cart
  const addToCart = (
    product: ProductData,
    quantity = 1,
    weight = "1 كيلوغرام",
    multiplier = 1
  ) => {
    const calculatedPrice = Math.round(product.price * multiplier);
    const calculatedOriginalPrice = product.originalPrice
      ? Math.round(product.originalPrice * multiplier)
      : null;
    const cartItemId = `${product.id}-${weight}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          nameFr: product.nameFr,
          nameEn: product.nameEn,
          price: calculatedPrice,
          originalPrice: calculatedOriginalPrice,
          imageUrl: product.imageUrl,
          quantity,
          weight,
          weightMultiplier: multiplier,
        },
      ];
    });

    const displayName = getLocalizedProductName(product);
    showNotification(t.addedNotificationToast, displayName, product.imageUrl);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setItemQuantity = (cartId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openQuickOrder = (product: ProductData) => {
    setQuickOrderProduct(product);
    setIsQuickOrderOpen(true);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // WhatsApp Order Generator - sending to 0600-000000 (212600000000)
  const openWhatsAppOrder = (
    singleProduct?: ProductData | null,
    customWeight = "1 كيلوغرام",
    customQty = 1
  ) => {
    const rawNumber = settings.whatsapp_number || "0600-000000";
    const waNumber = formatWhatsAppNumber(rawNumber);

    let message = "";
    if (language === "fr") {
      message = "Bonjour,\n";
      message += "Je souhaite passer commande auprès de *Dar Al Asala - Pâtisserie Royale Marocaine*:\n\n";

      if (singleProduct) {
        const prodName = getLocalizedProductName(singleProduct);
        const price = singleProduct.price;
        message += `▫️ *Pâtisserie :* ${prodName}\n`;
        message += `▫️ *Poids / Format :* ${customWeight}\n`;
        message += `▫️ *Quantité :* ${customQty}\n`;
        message += `▫️ *Prix total :* ${price * customQty} DH (${formatPrice(price * customQty)})\n\n`;
      } else if (cart.length > 0) {
        message += "🛍️ *Détails du Panier :*\n";
        cart.forEach((item, idx) => {
          const itemTitle = getLocalizedProductName(item);
          message += `${idx + 1}. ${itemTitle} (${item.weight}) × ${item.quantity} = ${item.price * item.quantity} DH\n`;
        });
        message += `\n▫️ *Sous-total :* ${cartSubtotal} DH\n`;
        message += `▫️ *Ville de livraison :* ${selectedCity}\n`;
        message += `▫️ *Frais de livraison :* ${isFreeDelivery ? "Gratuit" : `${deliveryFee} DH`}\n`;
        message += `▫️ *Total général :* ${cartSubtotal + deliveryFee} DH (${formatPrice(cartSubtotal + deliveryFee)})\n\n`;
      } else {
        message += "Je souhaite me renseigner sur vos pâtisseries traditionnelles marocaines et les modalités de livraison.\n\n";
      }
      message += "Merci de bien vouloir confirmer ma commande et m'indiquer le délai de livraison !";
    } else if (language === "en") {
      message = "Hello,\n";
      message += "I would like to place an order from *Dar Al Asala - Royal Moroccan Pastries*:\n\n";

      if (singleProduct) {
        const prodName = getLocalizedProductName(singleProduct);
        const price = singleProduct.price;
        message += `▫️ *Item:* ${prodName}\n`;
        message += `▫️ *Weight / Size:* ${customWeight}\n`;
        message += `▫️ *Quantity:* ${customQty}\n`;
        message += `▫️ *Total Price:* ${price * customQty} DH (${formatPrice(price * customQty)})\n\n`;
      } else if (cart.length > 0) {
        message += "🛍️ *Cart Summary:*\n";
        cart.forEach((item, idx) => {
          const itemTitle = getLocalizedProductName(item);
          message += `${idx + 1}. ${itemTitle} (${item.weight}) × ${item.quantity} = ${item.price * item.quantity} DH\n`;
        });
        message += `\n▫️ *Subtotal:* ${cartSubtotal} DH\n`;
        message += `▫️ *Delivery City:* ${selectedCity}\n`;
        message += `▫️ *Delivery Fee:* ${isFreeDelivery ? "Free" : `${deliveryFee} DH`}\n`;
        message += `▫️ *Grand Total:* ${cartSubtotal + deliveryFee} DH (${formatPrice(cartSubtotal + deliveryFee)})\n\n`;
      } else {
        message += "I would like to inquire about your traditional Moroccan pastries and delivery details.\n\n";
      }
      message += "Please confirm my order and inform me about delivery timing, thank you!";
    } else {
      message = "السلام عليكم ورحمة الله وبركاته،\n";
      message += "أود تقديم طلب من متجر *دار الأصالة للحلويات المغربية الفاخرة*:\n\n";

      if (singleProduct) {
        const price = singleProduct.price;
        message += `▫️ *المنتج:* ${singleProduct.name}\n`;
        message += `▫️ *الوزن / الحجم:* ${customWeight}\n`;
        message += `▫️ *الكمية:* ${customQty}\n`;
        message += `▫️ *السعر الإجمالي:* ${price * customQty} درهم مغربي (${formatPrice(price * customQty)})\n\n`;
      } else if (cart.length > 0) {
        message += "🛍️ *تفاصيل سلة المشتريات:*\n";
        cart.forEach((item, idx) => {
          message += `${idx + 1}. ${item.name} (${item.weight}) × ${item.quantity} = ${item.price * item.quantity} د.م\n`;
        });
        message += `\n▫️ *مجموع المنتجات:* ${cartSubtotal} د.م (${formatPrice(cartSubtotal)})\n`;
        message += `▫️ *مدينة التوصيل:* ${selectedCity}\n`;
        message += `▫️ *رسوم التوصيل:* ${isFreeDelivery ? "مجاني" : `${deliveryFee} د.م`}\n`;
        message += `▫️ *المجموع الكلي النهائي:* ${cartSubtotal + deliveryFee} درهم مغربي (${formatPrice(cartSubtotal + deliveryFee)})\n\n`;
      } else {
        message += "أود الاستفسار عن الحلويات المغربية المتوفرة لديكم وطريقة التوصيل والأسعار.\n\n";
      }
      message += "المرجو تأكيد الطلب وتحديد موعد التوصيل، وشكراً لكم!";
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setItemQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        language,
        setLanguage,
        t,
        dir,
        getLocalizedProductName,
        getLocalizedProductDesc,
        getLocalizedIngredients,
        currency,
        setCurrency,
        formatPrice,
        settings,
        refreshSettings,
        cityFees,
        selectedCity,
        setSelectedCity: handleSetCity,
        deliveryFee,
        freeShippingThreshold,
        isFreeDelivery,
        amountNeededForFreeDelivery,
        logoUrl,
        isQuickOrderOpen,
        setIsQuickOrderOpen,
        quickOrderProduct,
        openQuickOrder,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout,
        openWhatsAppOrder,
        notification,
        showNotification,
        dismissNotification,
      }}
    >
      {children}

      {/* Floating Added-to-Cart Toast Notification */}
      {notification && (
        <aside
          aria-label="تنبيه السلة"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-[#1E1B18] text-[#F3E5AB] border-2 border-[#D4AF37] px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="truncate">
              <p className="font-bold text-xs text-white truncate">
                {notification.message}
              </p>
              {notification.productName && (
                <p className="text-[11px] text-[#D4AF37] truncate font-medium">
                  {notification.productName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/cart"
              onClick={dismissNotification}
              className="flex items-center gap-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-110 text-stone-950 px-3 py-1.5 rounded-xl text-xs font-black shadow transition active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.goToCartToast}</span>
              <ArrowLeft className="w-3 h-3 rtl:rotate-0 ltr:rotate-180" />
            </Link>

            <button
              onClick={dismissNotification}
              className="p-1 text-stone-400 hover:text-white rounded-lg transition"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
