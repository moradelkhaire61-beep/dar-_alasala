"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Check,
  X,
  ArrowRight,
  MessageCircle,
  Truck,
  Share2,
  Crown,
  RefreshCw,
  Search,
  ExternalLink,
  Image as ImageIcon,
  ShieldCheck,
  Lock,
  LogOut,
  KeyRound,
  Delete as DeleteIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ProductData, useStore } from "@/context/StoreContext";

interface OrderData {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  notes?: string | null;
  items: string;
  subtotal: number;
  deliveryFee: number;
  discount?: number | null;
  total: number;
  currency?: string | null;
  paymentMethod?: string | null;
  status: string;
  createdAt: string;
}

const MOROCCAN_IMAGE_PRESETS = [
  { label: "شباكية ملكية", url: "/images/chebakia.jpg" },
  { label: "كعب غزال فاسي", url: "/images/kaab-ghazal.jpg" },
  { label: "بريوات باللوز", url: "/images/briouat.jpg" },
  { label: "غريبة البهلة", url: "/images/ghoriba.jpg" },
  { label: "محنشة ملكية", url: "/images/mhanncha.jpg" },
  { label: "صينية ضيافة ملكية", url: "/images/plateau-royal.jpg" },
];

export default function AdminPage() {
  const { refreshSettings } = useStore();

  // Authentication & PIN Pad State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "settings" | "security">("products");

  // Security Settings Form State
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [securitySuccess, setSecuritySuccess] = useState("");
  const [securityError, setSecurityError] = useState("");

  // Products state
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState<{
    id?: number;
    name: string;
    nameFr?: string;
    nameEn?: string;
    category: string;
    description: string;
    descriptionFr?: string;
    descriptionEn?: string;
    ingredients: string;
    price: number;
    originalPrice: number | "";
    imageUrl: string;
    unit: string;
    inStock: boolean;
    isFeatured: boolean;
  }>({
    name: "",
    nameFr: "",
    nameEn: "",
    category: "شباكية",
    description: "",
    descriptionFr: "",
    descriptionEn: "",
    ingredients: "",
    price: 150,
    originalPrice: "",
    imageUrl: "/images/chebakia.jpg",
    unit: "1 كيلوغرام",
    inStock: true,
    isFeatured: false,
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Orders state
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderFilter, setOrderFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");

  // Settings state
  const [settingsForm, setSettingsForm] = useState({
    store_name: "",
    store_logo_url: "/images/logo-dar-alasala.svg",
    whatsapp_number: "0600-000000",
    phone_number: "0600-000000",
    email: "contact@daralasala-sweets.ma",
    announcement: "",
    delivery_free_threshold: "350",
    delivery_fee_base: "35",
    facebook_pixel_id: "",
    tiktok_pixel_id: "",
    google_analytics_id: "",
  });
  const [cityFeesList, setCityFeesList] = useState<{ city: string; fee: number }[]>([]);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Check saved session on mount
  useEffect(() => {
    try {
      const session = sessionStorage.getItem("dar_asala_admin_session");
      if (session === "authenticated") {
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  // Fetch initial data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
      fetchSettings();
    }
  }, [isAuthenticated]);

  // Handle Physical Keyboard Input on Lock Screen
  useEffect(() => {
    if (isAuthenticated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleDigitPress(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Escape") {
        handleClearPin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthenticated, pinInput]);

  // Handle PIN Digit Press
  const handleDigitPress = (digit: string) => {
    if (pinInput.length >= 6) return;
    setPinError("");

    const updatedPin = pinInput + digit;
    setPinInput(updatedPin);

    // Auto verify when 6 digits reached
    if (updatedPin.length === 6) {
      verifyPin(updatedPin);
    }
  };

  const handleBackspace = () => {
    setPinError("");
    setPinInput((prev) => prev.slice(0, -1));
  };

  const handleClearPin = () => {
    setPinError("");
    setPinInput("");
  };

  // Verify PIN
  const verifyPin = (enteredPin: string) => {
    let savedPin = "123456";
    try {
      const stored = localStorage.getItem("admin_code");
      if (stored && stored.trim().length === 6) {
        savedPin = stored.trim();
      }
    } catch {
      // fallback
    }

    if (enteredPin === savedPin) {
      setPinError("");
      try {
        sessionStorage.setItem("dar_asala_admin_session", "authenticated");
      } catch {
        // ignore
      }
      setIsAuthenticated(true);
      setPinInput("");
    } else {
      setPinError("كود خاطئ");
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setPinInput("");
      }, 650);
    }
  };

  // Logout
  const handleLogout = () => {
    try {
      sessionStorage.removeItem("dar_asala_admin_session");
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setPinInput("");
    setPinError("");
  };

  // Change Security PIN
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError("");
    setSecuritySuccess("");

    let currentPin = "123456";
    try {
      const stored = localStorage.getItem("admin_code");
      if (stored && stored.trim().length === 6) {
        currentPin = stored.trim();
      }
    } catch {
      // fallback
    }

    if (oldPin.trim() !== currentPin) {
      setSecurityError("الكود القديم غير صحيح!");
      return;
    }

    if (!/^\d{6}$/.test(newPin.trim())) {
      setSecurityError("يجب أن يتكون الكود الجديد من 6 أرقام بالضبط (مثال: 654321)");
      return;
    }

    if (newPin.trim() !== confirmPin.trim()) {
      setSecurityError("الكود الجديد وتأكيد الكود غير متطابقين!");
      return;
    }

    try {
      localStorage.setItem("admin_code", newPin.trim());
      setSecuritySuccess("تم تغيير الكود بنجاح! سيتم طلب الكود الجديد عند تسجيل الدخول القادم.");
      setOldPin("");
      setNewPin("");
      setConfirmPin("");
    } catch {
      setSecurityError("حدث خطأ أثناء حفظ الكود في المتصفح");
    }
  };

  // Reset to default PIN
  const handleResetDefaultPin = () => {
    if (confirm("هل تريد استعادة الكود الافتراضي (123456)؟")) {
      try {
        localStorage.setItem("admin_code", "123456");
        setSecuritySuccess("تمت استعادة الكود الافتراضي (123456) بنجاح!");
        setSecurityError("");
        setOldPin("");
        setNewPin("");
        setConfirmPin("");
      } catch {
        setSecurityError("حدث خطأ أثناء استعادة الكود");
      }
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch settings
  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings) {
        setSettingsForm({
          store_name: data.settings.store_name || "دار الأصالة للحلويات المغربية الفاخرة",
          store_logo_url: data.settings.store_logo_url || "/images/logo-dar-alasala.svg",
          whatsapp_number: data.settings.whatsapp_number || "0600-000000",
          phone_number: data.settings.phone_number || "0600-000000",
          email: data.settings.email || "contact@daralasala-sweets.ma",
          announcement: data.settings.announcement || "",
          delivery_free_threshold: data.settings.delivery_free_threshold || "350",
          delivery_fee_base: data.settings.delivery_fee_base || "35",
          facebook_pixel_id: data.settings.facebook_pixel_id || "",
          tiktok_pixel_id: data.settings.tiktok_pixel_id || "",
          google_analytics_id: data.settings.google_analytics_id || "",
        });

        if (data.settings.delivery_city_fees) {
          try {
            const parsed = JSON.parse(data.settings.delivery_city_fees);
            if (Array.isArray(parsed)) {
              setCityFeesList(parsed);
            }
          } catch {
            // fallback
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Upload product image handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setProductForm((prev) => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("حدث خطأ أثناء رفع الصورة من جهازك");
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload custom brand logo handler
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setSettingsForm((prev) => ({ ...prev, store_logo_url: data.url }));
        alert("تم رفع الشعار بنجاح! لا تنس النقر على 'حفظ جميع الإعدادات' في الأسفل.");
      }
    } catch (err) {
      console.error("Logo upload failed:", err);
      alert("حدث خطأ أثناء رفع الشعار من جهازك");
    } finally {
      setUploadingLogo(false);
    }
  };

  // Open Edit Product Modal
  const openEditProduct = (prod: ProductData) => {
    setEditingProduct(prod);
    setProductForm({
      id: prod.id,
      name: prod.name,
      nameFr: prod.nameFr || "",
      nameEn: prod.nameEn || "",
      category: prod.category,
      description: prod.description,
      descriptionFr: prod.descriptionFr || "",
      descriptionEn: prod.descriptionEn || "",
      ingredients: prod.ingredients || "",
      price: prod.price,
      originalPrice: prod.originalPrice || "",
      imageUrl: prod.imageUrl,
      unit: prod.unit || "1 كيلوغرام",
      inStock: prod.inStock ?? true,
      isFeatured: prod.isFeatured ?? false,
    });
    setIsAddProductOpen(true);
  };

  // Open Add Product Modal
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      nameFr: "",
      nameEn: "",
      category: "شباكية",
      description: "",
      descriptionFr: "",
      descriptionEn: "",
      ingredients: "",
      price: 140,
      originalPrice: "",
      imageUrl: "/images/chebakia.jpg",
      unit: "1 كيلوغرام",
      inStock: true,
      isFeatured: false,
    });
    setIsAddProductOpen(true);
  };

  // Save product (create or update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });

      if (res.ok) {
        setIsAddProductOpen(false);
        fetchProducts();
      } else {
        alert("فشل في حفظ المنتج");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج نهائياً؟")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // WhatsApp contact customer for order
  const handleOrderWhatsApp = (order: OrderData) => {
    let cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "212" + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith("212") && (cleanPhone.startsWith("6") || cleanPhone.startsWith("7")) && cleanPhone.length === 9) {
      cleanPhone = "212" + cleanPhone;
    }
    const msg = `السلام عليكم ورحمة الله أستاذ(ة) ${order.customerName}،
معكم متجر *دار الأصالة للحلويات المغربية الفاخرة*.
بخصوص طلبيتكم رقم *${order.orderNumber}* بمبلغ *${order.total} درهم مغربي* لمدينة *${order.customerCity}*.
نود إبلاغكم بأن طلبيتكم تم استلامها وجاري تحضيرها بعناية فائقة لتصلكم طازجة.`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSavedSuccess(false);

    try {
      const payload = {
        ...settingsForm,
        delivery_city_fees: JSON.stringify(cityFeesList),
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSettingsSavedSuccess(true);
        refreshSettings();
        setTimeout(() => setSettingsSavedSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في حفظ الإعدادات");
    } finally {
      setSavingSettings(false);
    }
  };

  // Update city fee in settings
  const handleUpdateCityFee = (index: number, newFee: number) => {
    setCityFeesList((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, fee: newFee } : item))
    );
  };

  // 1. Initial Loading Screen
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#191614] flex items-center justify-center text-[#F3E5AB]">
        <RefreshCw className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  // 2. PIN LOCK SCREEN (6-DIGIT PASSCODE PAD)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#191614] text-[#FAF7F2] flex flex-col justify-center items-center p-4 selection:bg-[#EEDCA2] selection:text-[#5E4108]">
        {/* Subtle Moroccan background pattern */}
        <div className="absolute inset-0 bg-moroccan-dark-pattern opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm bg-[#1E1B18]/95 border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center">
          {/* Logo & Header */}
          <div className="mx-auto w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-[#FAF7F2] shadow-lg mb-3 relative flex items-center justify-center">
            <Image
              src="/images/logo-dar-alasala.svg"
              alt="دار الأصالة"
              fill
              className="object-contain p-1"
            />
          </div>

          <h1 className="text-xl font-black font-serif text-[#F3E5AB]">
            دار الأصالة
          </h1>
          <p className="text-xs text-[#D4AF37] font-semibold mt-0.5 tracking-wider">
            لوحة التحكم المحمية
          </p>

          <div className="mt-5 mb-2">
            <p className="text-xs text-stone-300">
              أدخل الرمز السري المكون من 6 أرقام للدخول
            </p>
          </div>

          {/* Error Message */}
          {pinError ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-500/60 rounded-full text-red-400 text-xs font-bold my-2 animate-bounce">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              <span>{pinError}</span>
            </div>
          ) : (
            <div className="h-7 my-2" />
          )}

          {/* 6 PIN Indicator Dots */}
          <div
            className={`flex items-center justify-center gap-3.5 my-4 ${
              isShaking ? "animate-pin-shake" : ""
            }`}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const isFilled = index < pinInput.length;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isFilled
                      ? "bg-[#D4AF37] border-2 border-[#FFF0B3] scale-110 shadow-lg shadow-[#D4AF37]/50"
                      : "bg-[#2B2622] border-2 border-[#D4AF37]/40"
                  }`}
                />
              );
            })}
          </div>

          {/* Numeric Keypad (1-9, Clear, 0, Backspace) */}
          <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto mt-6">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDigitPress(num)}
                className="w-18 h-14 mx-auto rounded-2xl bg-[#2B2622] hover:bg-[#3D3630] active:scale-95 text-[#F3E5AB] font-bold text-xl border border-[#D4AF37]/30 transition-all flex items-center justify-center shadow cursor-pointer select-none"
              >
                {num}
              </button>
            ))}

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClearPin}
              className="w-18 h-14 mx-auto rounded-2xl bg-[#2B2622]/60 hover:bg-[#3D3630] active:scale-95 text-stone-400 hover:text-white font-bold text-xs border border-stone-700/50 transition-all flex items-center justify-center cursor-pointer select-none"
              title="مسح الكل"
            >
              مسح
            </button>

            {/* Digit 0 */}
            <button
              type="button"
              onClick={() => handleDigitPress("0")}
              className="w-18 h-14 mx-auto rounded-2xl bg-[#2B2622] hover:bg-[#3D3630] active:scale-95 text-[#F3E5AB] font-bold text-xl border border-[#D4AF37]/30 transition-all flex items-center justify-center shadow cursor-pointer select-none"
            >
              0
            </button>

            {/* Backspace Button */}
            <button
              type="button"
              onClick={handleBackspace}
              className="w-18 h-14 mx-auto rounded-2xl bg-[#2B2622]/60 hover:bg-[#3D3630] active:scale-95 text-stone-400 hover:text-white font-bold text-xs border border-stone-700/50 transition-all flex items-center justify-center cursor-pointer select-none"
              title="حذف رقم"
            >
              <DeleteIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Default PIN Helper Note & Quick Change */}
          <div className="mt-6 pt-4 border-t border-stone-800 space-y-2">
            <div className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>الرمز الحالي: <strong className="text-[#F3E5AB] font-mono">123456</strong></span>
            </div>
            <p className="text-[10px] text-stone-500">
              يمكنك كتابة الرمز بالضغط على الأرقام أعلاه أو عبر لوحة المفاتيح
            </p>
          </div>

          <div className="mt-4">
            <Link
              href="/"
              className="text-[11px] text-stone-500 hover:text-[#D4AF37] transition inline-flex items-center gap-1"
            >
              <span>العودة إلى واجهة المتجر</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 text-right pb-24">
      {/* Top Admin Header */}
      <header className="bg-[#191614] text-white border-b border-[#D4AF37]/30 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-[#2B2622] hover:bg-[#3D3630] text-[#D4AF37] transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="العودة إلى المتجر"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="hidden sm:inline">العودة للمتجر</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37] bg-white">
                <Image
                  src={settingsForm.store_logo_url || "/images/logo-dar-alasala.svg"}
                  alt="دار الأصالة"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold font-serif text-[#F3E5AB]">
                  لوحة تحكم دار الأصالة
                </h1>
                <p className="text-[11px] text-stone-400 -mt-1 hidden sm:block">
                  إدارة الشعار، المنتجات، الصور، الأسعار، الطلبات، وبكسلات التتبع
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-white transition px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-[#2B2622]"
            >
              <span>معاينة المتجر</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-red-300 hover:text-white hover:bg-red-900/60 transition px-3 py-1.5 rounded-lg border border-red-500/40 bg-[#2B2622] cursor-pointer"
              title="تسجيل الخروج وقفل لوحة التحكم"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4 mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "products"
                ? "bg-[#1E1B18] text-[#F3E5AB] shadow-md border border-[#D4AF37]/50"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <span>إدارة المنتجات والأسعار والصور</span>
            <span className="bg-[#D4AF37]/20 text-[#8C6207] px-2 py-0.5 rounded-full text-[11px] font-black">
              {products.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#1E1B18] text-[#F3E5AB] shadow-md border border-[#D4AF37]/50"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>طلبيات الزبناء</span>
            <span className="bg-[#D4AF37]/20 text-[#8C6207] px-2 py-0.5 rounded-full text-[11px] font-black">
              {orders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#1E1B18] text-[#F3E5AB] shadow-md border border-[#D4AF37]/50"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Settings className="w-4 h-4 text-[#D4AF37]" />
            <span>الإعدادات العامة والشعار</span>
          </button>

          {/* Security Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "security"
                ? "bg-[#1E1B18] text-[#F3E5AB] shadow-md border border-[#D4AF37]/50"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <KeyRound className="w-4 h-4 text-[#D4AF37]" />
            <span>إعدادات الأمان وتغيير الكود السري</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                  قائمة المنتجات والحلويات
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  تعديل اسم الحلوى بالعربية والفرنسية والإنجليزية، الثمن، وتغيير صورتها من جهازك.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddProduct}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition font-bold text-xs shadow-md border border-[#D4AF37]/50 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>إضافة حلوى جديدة</span>
              </button>
            </div>

            {loadingProducts ? (
              <div className="py-20 text-center">
                <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto mb-2" />
                <p className="text-xs text-stone-500 font-bold">جاري تحميل المنتجات...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#D4AF37] transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                        <Image
                          src={prod.imageUrl}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/75 text-[#F3E5AB] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                          {prod.category}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-sm text-stone-900 font-serif line-clamp-1">
                          {prod.name}
                        </h3>
                        {prod.nameFr && (
                          <p className="text-[11px] text-stone-500 italic truncate">{prod.nameFr}</p>
                        )}

                        <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                          {prod.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                          <div>
                            <span className="font-black text-sm text-[#996515]">
                              {prod.price} د.م
                            </span>
                            {prod.originalPrice && (
                              <span className="text-[11px] text-stone-400 line-through mr-1.5">
                                {prod.originalPrice} د.م
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            {prod.unit || "1 كغ"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => openEditProduct(prod)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-[#FFF9E6] text-stone-800 hover:text-[#996515] hover:border-[#D4AF37] border border-stone-200 text-xs font-bold transition cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                  طلبيات الزبناء المسجلة ({orders.length})
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  تتبع حالة الطلبات والاتصال بالزبون عبر الواتساب بنقرة واحدة.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute right-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="بحث برقم الطلب أو اسم العميل..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="text-xs bg-stone-50 border border-stone-200 rounded-xl pr-9 pl-3 py-2 text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="pending">جديد</option>
                  <option value="preparing">قيد التجهيز</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">تم التسليم</option>
                </select>
              </div>
            </div>

            {loadingOrders ? (
              <div className="py-20 text-center">
                <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto mb-2" />
                <p className="text-xs text-stone-500">جاري تحميل الطلبيات...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <h4 className="font-bold text-stone-800 text-sm">لا توجد طلبيات مسجلة بعد</h4>
              </div>
            ) : (
              <div className="space-y-4">
                {orders
                  .filter((o) => {
                    const matchStatus = orderFilter === "all" || o.status === orderFilter;
                    const matchSearch =
                      !orderSearch ||
                      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
                      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                      o.customerPhone.includes(orderSearch);
                    return matchStatus && matchSearch;
                  })
                  .map((order) => {
                    let parsedItems: { name: string; quantity: number; weight: string; price: number }[] = [];
                    try {
                      parsedItems = JSON.parse(order.items);
                    } catch {
                      // ignore
                    }

                    return (
                      <div
                        key={order.id}
                        className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-[#D4AF37]/50 transition space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold bg-[#FAF0D7] text-[#996515] px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                              {order.orderNumber}
                            </span>
                            <span className="text-xs text-stone-500">
                              {new Date(order.createdAt).toLocaleString("ar-MA")}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-stone-500">الحالة:</span>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(order.id, e.target.value)
                              }
                              className="text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none"
                            >
                              <option value="pending">جديد (قيد المراجعة)</option>
                              <option value="preparing">قيد التجهيز بالمشغل</option>
                              <option value="shipped">تم الشحن مع الموزع</option>
                              <option value="delivered">تم التسليم بنجاح ✓</option>
                              <option value="cancelled">ملغى</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-stone-400 block mb-0.5">الزبون:</span>
                            <p className="font-bold text-stone-900">{order.customerName}</p>
                            <p className="text-stone-600 font-mono" dir="ltr">
                              {order.customerPhone}
                            </p>
                          </div>

                          <div>
                            <span className="text-stone-400 block mb-0.5">عنوان التوصيل:</span>
                            <p className="font-bold text-stone-900">{order.customerCity}</p>
                            <p className="text-stone-600">{order.customerAddress}</p>
                          </div>

                          <div>
                            <span className="text-stone-400 block mb-0.5">المبلغ وطريقة الأداء:</span>
                            <p className="font-black text-sm text-[#996515]">
                              {order.total} {order.currency || "د.م"}
                            </p>
                            <p className="text-stone-500 text-[11px]">
                              {order.paymentMethod === "cod" ? "الدفع عند الاستلام" : "بطاقة بنكية"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => handleOrderWhatsApp(order)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>مراسلة الزبون بالواتساب لتأكيد الطلب</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SETTINGS (LOGO UPLOAD & PIXELS) */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-8">
            {settingsSavedSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-2xl flex items-center gap-2 font-bold text-xs shadow-sm">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>تم حفظ وتحديث إعدادات المتجر والشعار بنجاح!</span>
              </div>
            )}

            {/* Logo Customization Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <ImageIcon className="w-5 h-5 text-[#B8860B]" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base font-serif">
                    شعار متجر دار الأصالة (رفع شعار خاص من جهازك)
                  </h3>
                  <p className="text-xs text-stone-500">
                    يمكنك رفع صورة شعارك الخاص من هاتفك أو حاسوبك، أو استخدام الشعار الملكي التراثي لدار الأصالة.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Logo Preview */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-[#D4AF37] bg-[#FAF7F2] shadow-lg shrink-0 flex items-center justify-center">
                  <Image
                    src={settingsForm.store_logo_url || "/images/logo-dar-alasala.svg"}
                    alt="الشعار الحالي"
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <input
                      type="file"
                      ref={logoInputRef}
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploadingLogo}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-black text-xs shadow-md hover:brightness-110 transition cursor-pointer active:scale-95"
                    >
                      <Upload className="w-4 h-4" />
                      <span>
                        {uploadingLogo ? "جاري رفع الشعار..." : "اختر صورة شعارك الخاص من جهازك 💻📱"}
                      </span>
                    </button>
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      يقبل صيغ PNG, JPG, SVG ذات خلفية شفافة أو دائرية. يظهر في الهيدر يميناً وفي الفوتر.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-600">أو رابط الشعار:</span>
                    <input
                      type="text"
                      value={settingsForm.store_logo_url}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, store_logo_url: e.target.value })
                      }
                      className="flex-1 text-xs bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSettingsForm({
                          ...settingsForm,
                          store_logo_url: "/images/logo-dar-alasala.svg",
                        })
                      }
                      className="text-xs px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
                    >
                      استعادة الشعار الملكي الأصلي
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Information & WhatsApp */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base font-serif">
                    معلومات المتجر ورقم الواتساب
                  </h3>
                  <p className="text-xs text-stone-500">
                    رقم الواتساب هو الذي تُرسل إليه طلبات الشراء تلقائياً.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    اسم المتجر
                  </label>
                  <input
                    type="text"
                    value={settingsForm.store_name}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, store_name: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    رقم الواتساب للطلبيات (WhatsApp)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={settingsForm.whatsapp_number}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    رقم الهاتف للاتصال
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={settingsForm.phone_number}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone_number: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    value={settingsForm.email}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, email: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Fees */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Truck className="w-5 h-5 text-[#B8860B]" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base font-serif">
                    إعدادات أسعار التوصيل والشحن
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    حد التوصيل المجاني (بالدرهم)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.delivery_free_threshold}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        delivery_free_threshold: e.target.value,
                      })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    السعر الافتراضي للتوصيل (MAD)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.delivery_fee_base}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, delivery_fee_base: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  أسعار التوصيل حسب المدينة:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {cityFeesList.map((item, idx) => (
                    <div
                      key={item.city}
                      className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs"
                    >
                      <span className="font-semibold text-stone-800">{item.city}</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={item.fee}
                          onChange={(e) => handleUpdateCityFee(idx, Number(e.target.value))}
                          className="w-16 bg-white border border-stone-300 rounded px-2 py-1 text-center font-bold text-[#996515] text-xs"
                        />
                        <span className="text-stone-500 text-[10px]">د.م</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pixels Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Share2 className="w-5 h-5 text-[#B8860B]" />
                <h3 className="font-bold text-stone-900 text-base font-serif">
                  بكسلات التتبع الإعلاني (Facebook Pixel & TikTok Pixel)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Facebook Pixel ID (ميتا بيكسل)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="Ex: 948271048291048"
                    value={settingsForm.facebook_pixel_id}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, facebook_pixel_id: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    TikTok Pixel ID (تيك توك بيكسل)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="Ex: C61G4VRC77U2A2J0Q1GG"
                    value={settingsForm.tiktok_pixel_id}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, tiktok_pixel_id: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition font-bold text-sm shadow-xl border border-[#D4AF37]/50 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>{savingSettings ? "جاري الحفظ..." : "حفظ جميع الإعدادات والشعار"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: SECURITY SETTINGS (CHANGE PIN CODE) */}
        {activeTab === "security" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-md">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-6">
                <div className="p-2.5 rounded-2xl bg-[#FAF0D7] text-[#996515]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-serif text-stone-900">
                    إعدادات الأمان وحماية لوحة التحكم
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    قم بتغيير كود الدخول السري المكون من 6 أرقام لحماية المتجر.
                  </p>
                </div>
              </div>

              {securitySuccess && (
                <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-bold mb-5 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{securitySuccess}</span>
                </div>
              )}

              {securityError && (
                <div className="p-4 bg-red-50 text-red-700 border border-red-300 rounded-2xl flex items-center gap-2 text-xs font-bold mb-5 shadow-xs">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{securityError}</span>
                </div>
              )}

              <form onSubmit={handleChangePin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                    <span>الكود القديم <span className="text-red-500">*</span></span>
                    <span className="text-[11px] text-stone-400 font-normal">الافتراضي: 123456</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute start-3.5 top-3.5 text-stone-400" />
                    <input
                      type="password"
                      maxLength={6}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      required
                      placeholder="أدخل الكود القديم (6 أرقام)"
                      value={oldPin}
                      onChange={(e) => setOldPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                      className="w-full text-sm bg-stone-50 border border-stone-300 rounded-xl ps-10 pe-4 py-3 font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      الكود الجديد (6 أرقام) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute start-3.5 top-3.5 text-stone-400" />
                      <input
                        type="password"
                        maxLength={6}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        required
                        placeholder="مثال: 654321"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                        className="w-full text-sm bg-stone-50 border border-stone-300 rounded-xl ps-10 pe-4 py-3 font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      تأكيد الكود الجديد <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute start-3.5 top-3.5 text-stone-400" />
                      <input
                        type="password"
                        maxLength={6}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        required
                        placeholder="أعد إدخال الكود الجديد"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                        className="w-full text-sm bg-stone-50 border border-stone-300 rounded-xl ps-10 pe-4 py-3 font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-stone-100">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] transition font-bold text-xs shadow-md border border-[#D4AF37]/50 cursor-pointer active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>تغيير الكود السري</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetDefaultPin}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
                  >
                    استعادة الكود الافتراضي (123456)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm">
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden text-right max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-base font-serif flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#C59B27]" />
                <span>
                  {editingProduct ? `تعديل: ${editingProduct.name}` : "إضافة حلوى مغربية جديدة"}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Product Names in AR / FR / EN */}
              <div className="space-y-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-stone-800 block">أسماء الحلوى حسب اللغة:</span>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    الاسم بالعربية <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: شباكية فاسية بالعسل الحر"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      الاسم بالفرنسية (Français)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="Ex: Chebakia Royale au Miel Pur"
                      value={productForm.nameFr}
                      onChange={(e) => setProductForm({ ...productForm, nameFr: e.target.value })}
                      className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3 py-2 text-start"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      الاسم بالإنجليزية (English)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="Ex: Royal Chebakia with Raw Honey"
                      value={productForm.nameEn}
                      onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                      className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3 py-2 text-start"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    التصنيف <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 focus:bg-white"
                  >
                    <option value="شباكية">شباكية</option>
                    <option value="كعب غزال">كعب غزال</option>
                    <option value="بريوات">بريوات</option>
                    <option value="غريبة">غريبة</option>
                    <option value="محنشة">محنشة</option>
                    <option value="تشكيلات وصواني">تشكيلات وصواني</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    السعر الحالي (MAD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 font-bold text-[#996515]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    السعر قبل الخصم
                  </label>
                  <input
                    type="number"
                    placeholder="مثال: 180"
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        originalPrice: e.target.value ? Number(e.target.value) : "",
                      })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5"
                  />
                </div>
              </div>

              {/* Image Upload From Device */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-300/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-[#B8860B]" />
                    <span>صورة المنتج (رفع من جهازك)</span>
                  </label>
                  <span className="text-[11px] text-stone-500">JPG, PNG, WebP</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] text-xs font-bold hover:bg-[#332E29] transition border border-[#D4AF37]/50 shadow-xs cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>
                      {uploadingImage ? "جاري رفع الصورة..." : "اختر صورة جديدة من جهازك 💻📱"}
                    </span>
                  </button>

                  <input
                    type="text"
                    placeholder="رابط الصورة / URL"
                    value={productForm.imageUrl}
                    onChange={(e) =>
                      setProductForm({ ...productForm, imageUrl: e.target.value })
                    }
                    className="flex-1 text-xs bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 block mb-1">
                    أو اختر من صور الحلويات المتوفرة:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {MOROCCAN_IMAGE_PRESETS.map((p) => (
                      <button
                        type="button"
                        key={p.url}
                        onClick={() => setProductForm({ ...productForm, imageUrl: p.url })}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition ${
                          productForm.imageUrl === p.url
                            ? "bg-[#1E1B18] text-[#F3E5AB] border-[#D4AF37]"
                            : "bg-white text-stone-700 hover:bg-stone-100 border-stone-200"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {productForm.imageUrl && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#D4AF37]/50 bg-stone-100 shadow-sm">
                      <Image
                        src={productForm.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs text-stone-600">
                      <div className="font-bold text-stone-900">معاينة الصورة الحالية</div>
                      <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        جاهزة للعرض في المتجر ✓
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Ingredients */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  وصف الحلوى
                </label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-3 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  المكونات
                </label>
                <input
                  type="text"
                  placeholder="لوز بلدي، عسل حر، ماء زهر..."
                  value={productForm.ingredients}
                  onChange={(e) =>
                    setProductForm({ ...productForm, ingredients: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1E1B18] text-[#F3E5AB] hover:bg-[#332E29] text-xs font-bold transition shadow-md border border-[#D4AF37]/50 cursor-pointer"
                >
                  {editingProduct ? "حفظ التعديلات" : "إضافة المنتج"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
