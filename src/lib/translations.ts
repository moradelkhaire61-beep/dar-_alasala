export type Language = "ar" | "fr" | "en";

export interface Translations {
  // Brand
  brandName: string;
  brandSubtitle: string;
  brandTagline: string;
  brandCityYear: string;

  // Header & Nav
  announcement: string;
  home: string;
  chebakia: string;
  kaabGhazal: string;
  briouat: string;
  ghoriba: string;
  mhanncha: string;
  royalTrays: string;
  ourSecrets: string;
  cart: string;
  adminDashboard: string;
  orderViaWhatsApp: string;
  callUs: string;
  currency: string;
  language: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroDescription: string;
  browseMenu: string;
  almondPurityBadge: string;
  honeyPurityBadge: string;
  allCitiesDeliveryBadge: string;
  royalPackagingBadge: string;
  heroFloatingCardTitle: string;
  heroFloatingCardSubtitle: string;
  viewTrays: string;
  sidrHoneyTag: string;
  andalusianFlavor: string;

  // Product Grid
  productsBadge: string;
  productsTitle: string;
  productsSubtitle: string;
  searchPlaceholder: string;
  clear: string;
  allPastries: string;
  loadingPastries: string;
  noResultsTitle: string;
  noResultsSubtitle: string;
  viewAllPastries: string;
  addToCart: string;
  addedSuccess: string;
  unitKg: string;
  saveAmount: string;
  authenticIngredientsTag: string;
  viewDetails: string;
  reviewsCountSuffix: string;

  // Prestige Section (Trays & Events)
  prestigeBadge: string;
  prestigeTitle: string;
  prestigeTitleHighlight: string;
  prestigeDescription: string;
  prestigePoint1Title: string;
  prestigePoint1Desc: string;
  prestigePoint2Title: string;
  prestigePoint2Desc: string;
  prestigePoint3Title: string;
  prestigePoint3Desc: string;
  orderCustomTray: string;
  freeWhatsAppConsultation: string;
  prestigeFloatingBadge: string;
  prestigeCardTitle: string;

  // Heritage Section
  heritageBadge: string;
  heritageTitle: string;
  heritageSubtitle: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;
  guaranteeBannerTitle: string;
  guaranteeBannerDesc: string;
  madeInMorocco: string;

  // Reviews Section
  reviewsBadge: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  verifiedBuyer: string;
  customerOrder: string;

  // Footer
  footerAbout: string;
  footerQuickLinks: string;
  footerContact: string;
  allRightsReserved: string;
  cashOnDelivery: string;
  fastShipping: string;

  // Cart Drawer & Page
  cartTitle: string;
  cartEmptyTitle: string;
  cartEmptySubtitle: string;
  itemsInCart: string;
  freeShippingCongratulations: string;
  addMoreForFreeShipping: string;
  deliveryCity: string;
  freeDeliveryText: string;
  subtotal: string;
  deliveryFee: string;
  total: string;
  proceedToCheckout: string;
  goToCartPage: string;
  orderCartViaWhatsApp: string;
  royalGiftPackagingNotice: string;
  clearCart: string;
  cartBreadcrumbHome: string;
  cartPageTitle: string;
  unitPrice: string;
  continueShopping: string;
  orderSummary: string;
  itemsCountText: string;
  totalWithDeliveryNotice: string;
  securePaymentGuarantee: string;

  // Quick Order Modal
  chooseWeightOrPackaging: string;
  quantity: string;
  totalPrice: string;
  freshGuaranteedSeal: string;
  pureHoneyAndAlmondSeal: string;

  // Checkout Modal
  checkoutTitle: string;
  checkoutSubtitle: string;
  orderSuccessTitle: string;
  orderSuccessDesc: string;
  orderNumberLabel: string;
  customerNameLabel: string;
  phoneLabel: string;
  cityLabel: string;
  totalDueLabel: string;
  confirmViaWhatsAppBtn: string;
  returnToStore: string;
  deliveryInfoTitle: string;
  fullNameField: string;
  phoneField: string;
  addressField: string;
  notesField: string;
  notesPlaceholder: string;
  paymentMethodTitle: string;
  codOption: string;
  codOptionDesc: string;
  cardOption: string;
  cardOptionDesc: string;
  couponPlaceholder: string;
  applyCoupon: string;
  confirmOrderNow: string;
  processingOrder: string;

  // Floating Toast
  addedNotificationToast: string;
  goToCartToast: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    brandName: "دار الأصالة",
    brandSubtitle: "للحلويات المغربية الفاخرة",
    brandTagline: "الأصالة المغربية العريقة في أبهى حلتها - حلويات مصنوعة يدوياً باللوز البلدي والعسل الحر",
    brandCityYear: "فاس • 1948",

    announcement: "حلويات مغربية أصيلة 100% باللوز البلدي والعسل الحر | توصيل مجاني للطلبات فوق 350 درهم لجميع المدن المغربية",
    home: "الرئيسية",
    chebakia: "شباكية أصيلة",
    kaabGhazal: "كعب غزال",
    briouat: "بريوات باللوز",
    ghoriba: "غريبة بهلة",
    mhanncha: "محنشة ملكية",
    royalTrays: "صواني ملكية",
    ourSecrets: "أسرار الصنعة",
    cart: "السلة",
    adminDashboard: "لوحة التحكم",
    orderViaWhatsApp: "اطلب عبر واتساب",
    callUs: "اتصال مباشر",
    currency: "العملة",
    language: "اللغة",

    heroBadge: "أصالة الصناعة التقليدية الفاسية العريقة",
    heroTitle1: "حلويات مغربية فاخرة",
    heroTitleHighlight: "بأسرار الصنعة المتوارثة",
    heroDescription: "نصنع بأيدي أمهر المعلمين الفاسيين أشهى الشباكية المعسلة، وكعب الغزال الرقيق باللوز البلدي، والبريوات الذهبية المقرمشة، وغريبة البهلة الفاسية. جودة ملكية ومكونات طبيعية 100% تُصنع طازجة يومياً عند الطلب.",
    browseMenu: "تصفح قائمة الحلويات",
    almondPurityBadge: "لوز بلدي مغربي 100%",
    honeyPurityBadge: "عسل حر بدون إضافات",
    allCitiesDeliveryBadge: "توصيل لجميع المدن",
    royalPackagingBadge: "تغليف ملكي للهدايا",
    heroFloatingCardTitle: "صواني الضيافة والأعراس الفاخرة",
    heroFloatingCardSubtitle: "جاهزة للتسليم في علب مخملية وصواني فضية",
    viewTrays: "عرض الصواني",
    sidrHoneyTag: "عسل السدر الحر",
    andalusianFlavor: "نكهة أندلسية أصيلة",

    productsBadge: "قائمة الحلويات المغربية الملكية",
    productsTitle: "تشكيلة فاخرة تُصنع بحب وإتقان",
    productsSubtitle: "اختر من بين أشهر الحلويات المغربية التراثية، محضرة بأفضل المكونات الطبيعية: لوز بلدي 100%، عسل سدر خالص، وماء زهر مقطر.",
    searchPlaceholder: "ابحث عن حلوى، لوز، شباكية، بريوات...",
    clear: "مسح",
    allPastries: "جميع الحلويات",
    loadingPastries: "جاري تجهيز قائمة الحلويات المغربية...",
    noResultsTitle: "لم نجد نتائج مطابقة لبحثك",
    noResultsSubtitle: "جرب تغيير الكلمات المفتاحية أو اختيار تصنيف آخر.",
    viewAllPastries: "عرض جميع الحلويات",
    addToCart: "أضف للسلة",
    addedSuccess: "تمت الإضافة!",
    unitKg: "1 كغ",
    saveAmount: "وفر",
    authenticIngredientsTag: "لوز بلدي وعسل حر",
    viewDetails: "عرض التفاصيل والمقاسات",
    reviewsCountSuffix: "تقييم ممتاز",

    prestigeBadge: "تشكيلات حصرية للمناسبات الراقية",
    prestigeTitle: "صواني تقديم ملكية",
    prestigeTitleHighlight: "تليق بأفراحكم وأرقى ضيوفكم",
    prestigeDescription: "نوفر خدمة صواني الأعراس، الخطوبة، العقيقة، والمناسبات الدبلوماسية. تشكيلات مصممة بعناية فائقة تجمع أرقى الحلويات المغربية التراثية في صواني نحاسية وفضية منقوشة باليد أو علب مخملية ملكية مذهبة.",
    prestigePoint1Title: "تنسيق مخصص حسب الرغبة",
    prestigePoint1Desc: "إمكانية اختيار نسب وأنواع الحلويات، وتخصيص بطاقات التهنئة والشرائط الحريرية.",
    prestigePoint2Title: "لوز بلدي خالص 100% وعسل سدر حر",
    prestigePoint2Desc: "نلتزم بأعلى معايير النقاء دون خلط أو مساومات على الجودة الأصيلة.",
    prestigePoint3Title: "شحن سريع ومحكم لجميع المدن وخارج المغرب",
    prestigePoint3Desc: "تغليف عازل للحرارة والرطوبة يضمن وصول الصواني في أبهى حلة كما خرجت من المشغل.",
    orderCustomTray: "طلب صينية ضيافة مخصصة",
    freeWhatsAppConsultation: "استشارة مجانية عبر الواتساب",
    prestigeFloatingBadge: "خدمة الضيافة والأعراس الملكية",
    prestigeCardTitle: "صواني الضيافة الراقية للمناسبات الخاصة",

    heritageBadge: "سر الطعم والأصالة المغربية",
    heritageTitle: "لماذا تختار حلويات دار الأصالة؟",
    heritageSubtitle: "لأننا نؤمن أن الحلويات المغربية ليست مجرد مأكولات، بل هي سفيرة التراث العريق وتاريخ الضيافة الأندلسية والمغربية الأصيلة.",
    pillar1Title: "عقدة اللوز البلدي 100%",
    pillar1Desc: "نستخدم حصرياً اللوز البلدي المغربي المقطوف من جبال الأطلس وتازة، غني بالزيوت الطبيعية والنكهة العميقة دون أي خلط بالفول السوداني أو المنكهات الصناعية.",
    pillar2Title: "عسل السدر وزهر البرتقال الحر",
    pillar2Desc: "تعسيل أصيل وعميق في عسل طبيعي نقي 100% يمنح الشباكية والبريوات قرمشة ذهبية تدوم أسابيع مع لمعان طبيعي فتان.",
    pillar3Title: "ماء الزهر المقطر على الطريقة الفاسية",
    pillar3Desc: "ماء زهر النارنج المقطر قطرة بقطرة في أواني نحاسية تقليدية بفاس العتيقة، مع نفحات المسكة الحرة اليونانية الأصيلة وقرفة العود.",
    pillar4Title: "حرفية يدوية وصنعة متوارثة",
    pillar4Desc: "كل قطعة شباكية وكعب غزال ومحنشة تُشكل وتُطوى يدوياً بعناية متناهية على يد معلمات ومعلمين حملوا الصنعة أباً عن جد.",
    guaranteeBannerTitle: "ضمان الجودة والطراوة بنسبة 100%",
    guaranteeBannerDesc: "جميع طلبياتنا تُصنع طازجة يوم إرسالها وتُغلف بعناية فائقة في علب محكمة الإغلاق تحفظ طراوة وقرمشة الحلوى لأطول فترة ممكنة.",
    madeInMorocco: "صنع في المغرب 🇲🇦",

    reviewsBadge: "آراء زبنائنا الكرام",
    reviewsTitle: "شهادات نعتز بها من عملائنا",
    reviewsSubtitle: "أكثر من 2,500 عميل راضٍ في كافة المدن المغربية والمهجر يثقون في جودة دار الأصالة",
    verifiedBuyer: "عميل موثق",
    customerOrder: "الطلب",

    footerAbout: "نصنع الحلويات المغربية التراثية بأعلى درجات الإتقان الفاسي الأصيل، معتمدين على اللوز البلدي 100% والعسل الطبيعي الحر وماء الزهر المقطر. خدمة تليق بأفراحكم ومناسباتكم الراقية.",
    footerQuickLinks: "تشكيلة الحلويات والصفحات",
    footerContact: "التواصل والطلبات",
    allRightsReserved: "جميع الحقوق محفوظة",
    cashOnDelivery: "دفع عند الاستلام",
    fastShipping: "شحن سريع لجميع مدن المغرب",

    cartTitle: "سلة المشتريات",
    cartEmptyTitle: "سلتك فارغة من الحلويات",
    cartEmptySubtitle: "استكشف تشكيلات الشباكية، كعب غزال، والبريوات الأصيلة وأضف ما يعجبك.",
    itemsInCart: "قطع في السلة",
    freeShippingCongratulations: "مبروك! حصلت على توصيل مجاني لطلبك",
    addMoreForFreeShipping: "للحصول على توصيل مجاني (فوق 350 درهم)",
    deliveryCity: "مدينة التوصيل",
    freeDeliveryText: "توصيل مجاني",
    subtotal: "مجموع المنتجات",
    deliveryFee: "سعر التوصيل",
    total: "المجموع الكلي",
    proceedToCheckout: "متابعة تأكيد الطلب",
    goToCartPage: "الذهاب إلى صفحة السلة الكاملة",
    orderCartViaWhatsApp: "اطلب السلة عبر واتساب",
    royalGiftPackagingNotice: "تغليف ملكي محكم ومناسب للإهداء والضيافة",
    clearCart: "إفراغ السلة بالكامل",
    cartBreadcrumbHome: "الرئيسية",
    cartPageTitle: "سلة المشتريات والطلبيات",
    unitPrice: "سعر الوحدة",
    continueShopping: "متابعة التسوق وإضافة المزيد",
    orderSummary: "ملخص الطلبية والحساب الإجمالي",
    itemsCountText: "قطع",
    totalWithDeliveryNotice: "شامل المنتجات والتوصيل",
    securePaymentGuarantee: "دفع آمن عند الاستلام أو ببطاقة بنكية",

    chooseWeightOrPackaging: "اختر الوزن أو التغليف:",
    quantity: "الكمية:",
    totalPrice: "المجموع:",
    freshGuaranteedSeal: "توصيل طازج ومحكم الإغلاق",
    pureHoneyAndAlmondSeal: "عسل حر ولوز بلدي 100%",

    checkoutTitle: "إتمام وتأكيد الطلب",
    checkoutSubtitle: "يرجى تعبئة بيانات التوصيل بدقة لضمان وصول طلبيتك طازجة",
    orderSuccessTitle: "تم تأكيد طلبك بنجاح! 🎉",
    orderSuccessDesc: "سيتم تجهيز حلوياتك طازجة باستخدام أجود أنواع اللوز البلدي والعسل الطبيعي. سيتواصل معك فريقنا لتأكيد موعد التسليم.",
    orderNumberLabel: "رقم الطلب",
    customerNameLabel: "الاسم الكامل",
    phoneLabel: "الهاتف",
    cityLabel: "المدينة",
    totalDueLabel: "المبلغ الإجمالي",
    confirmViaWhatsAppBtn: "تأكيد ومتابعة الطلب فوراً عبر الواتساب",
    returnToStore: "العودة لتصفح المتجر",
    deliveryInfoTitle: "معلومات التوصيل",
    fullNameField: "الاسم الكامل",
    phoneField: "رقم الهاتف / الواتساب",
    addressField: "العنوان بالتفصيل",
    notesField: "ملاحظات للطلب أو إهداء (اختياري)",
    notesPlaceholder: "كتابة بطاقة إهداء أو تحديد وقت مفضل للتسليم...",
    paymentMethodTitle: "طريقة الدفع",
    codOption: "الدفع عند الاستلام",
    codOptionDesc: "ادفع نقداً عند استلام طلبيتك",
    cardOption: "بطاقة بنكية / CMI",
    cardOptionDesc: "دفع آمن 100% مغربي ودولي",
    couponPlaceholder: "كوبون الخصم (جرب: MAROC10)",
    applyCoupon: "تطبيق",
    confirmOrderNow: "تأكيد الطلب الآن",
    processingOrder: "جاري تسجيل الطلب...",

    addedNotificationToast: "تمت إضافة المنتج بنجاح إلى سلة المشتريات",
    goToCartToast: "الذهاب إلى السلة",
  },

  fr: {
    brandName: "Dar Al Asala",
    brandSubtitle: "Pâtisserie Royale Marocaine",
    brandTagline: "L'art de la haute pâtisserie marocaine traditionnelle aux amandes pures et miel d'oranger",
    brandCityYear: "Fès • 1948",

    announcement: "Pâtisseries marocaines 100% amandes beldi & miel pur | Livraison offerte dès 350 DH partout au Maroc",
    home: "Accueil",
    chebakia: "Chebakia Royale",
    kaabGhazal: "Cornes de Gazelle",
    briouat: "Briouates aux Amandes",
    ghoriba: "Ghoriba Bahla",
    mhanncha: "Mhanncha Royale",
    royalTrays: "Plateaux Prestige",
    ourSecrets: "Nos Secrets",
    cart: "Panier",
    adminDashboard: "Tableau de Bord",
    orderViaWhatsApp: "Commander via WhatsApp",
    callUs: "Appel direct",
    currency: "Devise",
    language: "Langue",

    heroBadge: "Savoir-faire artisanal ancestral de Fès",
    heroTitle1: "Pâtisserie Royale Marocaine",
    heroTitleHighlight: "L'excellence des recettes authentiques",
    heroDescription: "Préparées avec passion par nos maîtres artisans : Chebakia au miel pur et safran, Cornes de Gazelle fines aux amandes beldi, Briouates croustillantes et Ghoriba fondante. Qualité royale et fraîcheur artisanale garantie.",
    browseMenu: "Découvrir la carte",
    almondPurityBadge: "100% Amandes beldi du Maroc",
    honeyPurityBadge: "Miel pur naturel",
    allCitiesDeliveryBadge: "Livraison partout au Maroc",
    royalPackagingBadge: "Coffrets cadeaux prestigieux",
    heroFloatingCardTitle: "Plateaux de Réception & Mariages",
    heroFloatingCardSubtitle: "Présentation royale en plateaux argentés et coffrets velours",
    viewTrays: "Voir les plateaux",
    sidrHoneyTag: "Miel d'oranger & jujubier",
    andalusianFlavor: "Saveurs andalouses authentiques",

    productsBadge: "Carte des Pâtisseries Royales",
    productsTitle: "Une Sélection Raffinée et Faite Main",
    productsSubtitle: "Choisissez parmi nos grands classiques marocains, préparés avec les ingrédients les plus nobles : amandes du terroir, miel pur et eau de fleur d'oranger distillée.",
    searchPlaceholder: "Rechercher une pâtisserie, chebakia, amandes...",
    clear: "Effacer",
    allPastries: "Toutes les créations",
    loadingPastries: "Chargement des douceurs marocaines...",
    noResultsTitle: "Aucun résultat trouvé",
    noResultsSubtitle: "Essayez avec d'autres mots-clés ou parcourez nos catégories.",
    viewAllPastries: "Voir toutes les créations",
    addToCart: "Ajouter au panier",
    addedSuccess: "Ajouté !",
    unitKg: "1 kg",
    saveAmount: "Économisez",
    authenticIngredientsTag: "Amandes beldi & miel pur",
    viewDetails: "Voir détails et formats",
    reviewsCountSuffix: "avis vérifiés",

    prestigeBadge: "Collections exclusives pour réceptions",
    prestigeTitle: "Plateaux d'Honneur Royaux",
    prestigeTitleHighlight: "Pour vos mariages et moments d'exception",
    prestigeDescription: "Sublimez vos fêtes de mariage, fiançailles, baptêmes et dîners officiels. Nos plateaux rassemblent les chefs-d'œuvre de la pâtisserie fassie dans des serviteurs ciselés ou coffrets dorés d'exception.",
    prestigePoint1Title: "Assortiments sur mesure",
    prestigePoint1Desc: "Personnalisez la sélection de gâteaux, les rubans en satin et cartes de vœux calligraphiées.",
    prestigePoint2Title: "Amandes pures et miel garanti",
    prestigePoint2Desc: "Aucun compromis sur les ingrédients traditionnels : pureté totale et fraîcheur irréprochable.",
    prestigePoint3Title: "Expédition soignée et sécurisée",
    prestigePoint3Desc: "Emballage isotherme hermétique préservant le croustillant et les arômes délicats.",
    orderCustomTray: "Commander un plateau personnalisé",
    freeWhatsAppConsultation: "Conseil personnalisé via WhatsApp",
    prestigeFloatingBadge: "Service Réceptions Royales",
    prestigeCardTitle: "Plateaux de Prestige pour Événements",

    heritageBadge: "L'Âme de la Pâtisserie Marocaine",
    heritageTitle: "Pourquoi Choisir Dar Al Asala ?",
    heritageSubtitle: "Parce que chaque création est une célébration vivante du patrimoine arabo-andalou et de la généreuse hospitalité marocaine.",
    pillar1Title: "100% Pâte d'Amandes Beldi",
    pillar1Desc: "Amandes locales des montagnes du Rif et de l'Atlas, riches en huiles naturelles parfumées, sans arachide ni arômes de synthèse.",
    pillar2Title: "Miel d'Oranger & Safran Pur",
    pillar2Desc: "Imprégnation lente dans du miel pur qui confère ce croquant doré et cette brillance irrésistible.",
    pillar3Title: "Eau de Fleur d'Oranger Distillée",
    pillar3Desc: "Distillation artisanale dans la pure tradition fassie avec mastic grec d'origine et cannelle de Ceylan.",
    pillar4Title: "Fait Main par des Maîtres Artisans",
    pillar4Desc: "Chaque pièce est façonnée, pliée et décorée à la main avec une infinie délicatesse.",
    guaranteeBannerTitle: "Fraîcheur & Excellence 100% Garanties",
    guaranteeBannerDesc: "Vos commandes sont confectionnées le jour de l'expédition et scellées dans des boîtes hermétiques de haute protection.",
    madeInMorocco: "Fabriqué au Maroc 🇲🇦",

    reviewsBadge: "Avis Clients",
    reviewsTitle: "La Confiance de nos Clients",
    reviewsSubtitle: "Plus de 2 500 gourmets satisfaits au Maroc et à l'international recommandent Dar Al Asala.",
    verifiedBuyer: "Client vérifié",
    customerOrder: "Commande",

    footerAbout: "Haute pâtisserie marocaine d'exception, façonnée à la main selon les règles de l'art fassi traditionnel avec des ingrédients 100% purs et naturels.",
    footerQuickLinks: "Nos Pâtisseries & Pages",
    footerContact: "Contact & Commandes",
    allRightsReserved: "Tous droits réservés",
    cashOnDelivery: "Paiement à la livraison",
    fastShipping: "Livraison express partout au Maroc",

    cartTitle: "Mon Panier",
    cartEmptyTitle: "Votre panier est vide",
    cartEmptySubtitle: "Découvrez notre sélection de Chebakia, Cornes de Gazelle et Briouates faites main.",
    itemsInCart: "articles dans le panier",
    freeShippingCongratulations: "Félicitations ! Livraison offerte pour votre commande",
    addMoreForFreeShipping: "pour bénéficier de la livraison gratuite (dès 350 DH)",
    deliveryCity: "Ville de livraison",
    freeDeliveryText: "Livraison gratuite",
    subtotal: "Sous-total articles",
    deliveryFee: "Frais de livraison",
    total: "Total général",
    proceedToCheckout: "Valider ma commande",
    goToCartPage: "Accéder à la page panier complète",
    orderCartViaWhatsApp: "Commander le panier via WhatsApp",
    royalGiftPackagingNotice: "Emballage d'exception prêt à offrir ou à servir",
    clearCart: "Vider le panier",
    cartBreadcrumbHome: "Accueil",
    cartPageTitle: "Panier & Récapitulatif",
    unitPrice: "Prix unitaire",
    continueShopping: "Continuer mes achats",
    orderSummary: "Récapitulatif de la commande",
    itemsCountText: "articles",
    totalWithDeliveryNotice: "Articles et livraison inclus",
    securePaymentGuarantee: "Paiement sécurisé à la livraison ou par carte",

    chooseWeightOrPackaging: "Format ou coffret :",
    quantity: "Quantité :",
    totalPrice: "Total :",
    freshGuaranteedSeal: "Livraison hermétique ultra-fraîche",
    pureHoneyAndAlmondSeal: "Miel pur & 100% amandes nobles",

    checkoutTitle: "Finaliser votre commande",
    checkoutSubtitle: "Veuillez renseigner vos coordonnées pour une livraison dans les meilleures conditions",
    orderSuccessTitle: "Commande enregistrée avec succès ! 🎉",
    orderSuccessDesc: "Vos délices sont en cours de préparation artisanale. Notre service client vous contactera sans délai.",
    orderNumberLabel: "N° de Commande",
    customerNameLabel: "Nom complet",
    phoneLabel: "Téléphone",
    cityLabel: "Ville",
    totalDueLabel: "Montant à régler",
    confirmViaWhatsAppBtn: "Confirmer directement via WhatsApp",
    returnToStore: "Retourner à la boutique",
    deliveryInfoTitle: "Coordonnées de livraison",
    fullNameField: "Nom & Prénom",
    phoneField: "Numéro de téléphone / WhatsApp",
    addressField: "Adresse complète de livraison",
    notesField: "Instructions ou message cadeau (optionnel)",
    notesPlaceholder: "Message d'accompagnement ou créneau horaire souhaité...",
    paymentMethodTitle: "Mode de règlement",
    codOption: "Paiement à la livraison",
    codOptionDesc: "Réglez en espèces à la réception de votre colis",
    cardOption: "Carte bancaire / CMI",
    cardOptionDesc: "Paiement sécurisé 100% marocain et international",
    couponPlaceholder: "Code promo (ex: MAROC10)",
    applyCoupon: "Appliquer",
    confirmOrderNow: "Confirmer la commande",
    processingOrder: "Validation en cours...",

    addedNotificationToast: "Produit ajouté avec succès à votre panier",
    goToCartToast: "Aller au panier",
  },

  en: {
    brandName: "Dar Al Asala",
    brandSubtitle: "Royal Moroccan Pastries",
    brandTagline: "The timeless heritage of authentic Moroccan royal confectionery crafted with pure almonds and raw honey",
    brandCityYear: "Fez • 1948",

    announcement: "100% Authentic Moroccan Pastries with Pure Almonds & Raw Honey | Free Delivery on orders over 350 DH across Morocco",
    home: "Home",
    chebakia: "Royal Chebakia",
    kaabGhazal: "Gazelle Horns",
    briouat: "Almond Briouats",
    ghoriba: "Ghoriba Bahla",
    mhanncha: "Royal Mhanncha",
    royalTrays: "Prestige Trays",
    ourSecrets: "Our Craft Secrets",
    cart: "Cart",
    adminDashboard: "Admin Dashboard",
    orderViaWhatsApp: "Order via WhatsApp",
    callUs: "Direct Call",
    currency: "Currency",
    language: "Language",

    heroBadge: "Ancestral Fez Artisanal Mastery",
    heroTitle1: "Royal Moroccan Pastries",
    heroTitleHighlight: "Crafted with Time-Honored Secrets",
    heroDescription: "Handmade by master pastry chefs: golden honey Chebakia, delicate Gazelle Horns with pure Moroccan almonds, crispy Briouats, and melt-in-the-mouth Ghoriba. Royal craftsmanship, 100% natural, freshly prepared to order.",
    browseMenu: "Explore Our Pastries",
    almondPurityBadge: "100% Moroccan Beldi Almonds",
    honeyPurityBadge: "Pure Natural Flower Honey",
    allCitiesDeliveryBadge: "Nationwide & Global Delivery",
    royalPackagingBadge: "Prestige Gift Packaging",
    heroFloatingCardTitle: "Hospitality & Wedding Trays",
    heroFloatingCardSubtitle: "Presented in velvet gift boxes and handcrafted silver trays",
    viewTrays: "View Trays",
    sidrHoneyTag: "Pure Orange Blossom Honey",
    andalusianFlavor: "Authentic Andalusian Heritage",

    productsBadge: "Royal Moroccan Confectionery",
    productsTitle: "Artisanal Delights Crafted with Passion",
    productsSubtitle: "Select from Morocco's most celebrated heritage sweets, freshly prepared with pure mountain almonds, natural raw honey, and distilled orange blossom water.",
    searchPlaceholder: "Search pastries, chebakia, almonds...",
    clear: "Clear",
    allPastries: "All Pastries",
    loadingPastries: "Loading Moroccan delicacies...",
    noResultsTitle: "No pastries found",
    noResultsSubtitle: "Try different keywords or explore our categories.",
    viewAllPastries: "View all pastries",
    addToCart: "Add to Cart",
    addedSuccess: "Added!",
    unitKg: "1 kg",
    saveAmount: "Save",
    authenticIngredientsTag: "Beldi almonds & raw honey",
    viewDetails: "View Details & Sizes",
    reviewsCountSuffix: "verified reviews",

    prestigeBadge: "Exclusive Collections for Grand Celebrations",
    prestigeTitle: "Royal Hospitality Trays",
    prestigeTitleHighlight: "Honoring Your Guests & Cherished Occasions",
    prestigeDescription: "Dedicated catering service for Moroccan weddings, engagements, celebrations, and diplomatic receptions. Curated assortments presented in hand-chiseled trays and golden velvet gift boxes.",
    prestigePoint1Title: "Customized Assortments",
    prestigePoint1Desc: "Tailor the proportion of delicacies, customized calligraphy greeting cards, and satin ribbons.",
    prestigePoint2Title: "Pure Almonds & Raw Honey",
    prestigePoint2Desc: "Strict commitment to natural ingredients: no peanut blends, no artificial flavors.",
    prestigePoint3Title: "Secure Worldwide Shipping",
    prestigePoint3Desc: "Aroma-sealed and temperature-insulated packaging ensuring optimal bakery-fresh crispness.",
    orderCustomTray: "Order Custom Hospitality Tray",
    freeWhatsAppConsultation: "Free WhatsApp Consultation",
    prestigeFloatingBadge: "Royal Catering Service",
    prestigeCardTitle: "Prestige Platters for Special Events",

    heritageBadge: "The Essence of Moroccan Taste",
    heritageTitle: "Why Choose Dar Al Asala?",
    heritageSubtitle: "Because our pastries are not just delicacies, they are cultural ambassadors of centuries of Andalusian-Moroccan hospitality.",
    pillar1Title: "100% Pure Moroccan Almonds",
    pillar1Desc: "Sourced exclusively from the Atlas and Rif valleys, rich in aromatic natural oils without peanut substitution.",
    pillar2Title: "Raw Orange Blossom Honey",
    pillar2Desc: "Authentic deep soaking in pure flower honey that imparts weeks of lasting golden crunch.",
    pillar3Title: "Fez Distilled Blossom Water",
    pillar3Desc: "Artisan copper alembic distillation of bitter orange blossoms, paired with Greek mastic and cinnamon.",
    pillar4Title: "Handmade by Master Artisans",
    pillar4Desc: "Every single piece of Chebakia, Gazelle Horn, and Mhanncha is folded and sculpted by hand.",
    guaranteeBannerTitle: "100% Freshness & Authenticity Guarantee",
    guaranteeBannerDesc: "All orders are baked fresh on the day of dispatch and packed in hermetic protective containers.",
    madeInMorocco: "Made in Morocco 🇲🇦",

    reviewsBadge: "Customer Reviews",
    reviewsTitle: "Loved by Connoisseurs Worldwide",
    reviewsSubtitle: "Over 2,500 satisfied customers across Moroccan cities and abroad trust Dar Al Asala.",
    verifiedBuyer: "Verified Buyer",
    customerOrder: "Ordered",

    footerAbout: "Authentic royal Moroccan confectionary handcrafted according to ancient Fez master traditions using 100% pure almonds, wild honey, and distilled orange blossom water.",
    footerQuickLinks: "Pastries & Pages",
    footerContact: "Contact & Orders",
    allRightsReserved: "All rights reserved",
    cashOnDelivery: "Cash on delivery",
    fastShipping: "Express delivery across Morocco",

    cartTitle: "Shopping Cart",
    cartEmptyTitle: "Your cart is empty",
    cartEmptySubtitle: "Explore our handmade Chebakia, Gazelle Horns, and Almond Briouats.",
    itemsInCart: "items in cart",
    freeShippingCongratulations: "Congratulations! Free delivery on this order",
    addMoreForFreeShipping: "for free delivery (over 350 DH)",
    deliveryCity: "Delivery City",
    freeDeliveryText: "Free delivery",
    subtotal: "Products Subtotal",
    deliveryFee: "Delivery Fee",
    total: "Grand Total",
    proceedToCheckout: "Proceed to Checkout",
    goToCartPage: "Go to Full Cart Page",
    orderCartViaWhatsApp: "Order Cart via WhatsApp",
    royalGiftPackagingNotice: "Royal airtight packaging ready for gifting or hospitality",
    clearCart: "Empty Cart",
    cartBreadcrumbHome: "Home",
    cartPageTitle: "Shopping Cart & Order Summary",
    unitPrice: "Unit Price",
    continueShopping: "Continue Shopping",
    orderSummary: "Order Summary & Total Calculation",
    itemsCountText: "items",
    totalWithDeliveryNotice: "Includes items & delivery",
    securePaymentGuarantee: "Secure payment upon delivery or via credit card",

    chooseWeightOrPackaging: "Choose weight or packaging:",
    quantity: "Quantity:",
    totalPrice: "Total:",
    freshGuaranteedSeal: "Guaranteed fresh and airtight delivery",
    pureHoneyAndAlmondSeal: "100% pure honey & beldi almonds",

    checkoutTitle: "Complete & Confirm Order",
    checkoutSubtitle: "Please enter your delivery details carefully for fresh delivery",
    orderSuccessTitle: "Order Confirmed Successfully! 🎉",
    orderSuccessDesc: "Your pastries are being prepared fresh with pure almonds and raw honey. Our team will contact you shortly.",
    orderNumberLabel: "Order Number",
    customerNameLabel: "Full Name",
    phoneLabel: "Phone",
    cityLabel: "City",
    totalDueLabel: "Total Due",
    confirmViaWhatsAppBtn: "Confirm & Track via WhatsApp Now",
    returnToStore: "Return to Store",
    deliveryInfoTitle: "Delivery Information",
    fullNameField: "Full Name",
    phoneField: "Phone / WhatsApp Number",
    addressField: "Detailed Address",
    notesField: "Special Notes or Gift Message (optional)",
    notesPlaceholder: "Add a gift greeting card message or preferred delivery time...",
    paymentMethodTitle: "Payment Method",
    codOption: "Cash on Delivery",
    codOptionDesc: "Pay cash upon receiving your order",
    cardOption: "Credit Card / CMI",
    cardOptionDesc: "100% secure domestic & international payment",
    couponPlaceholder: "Discount coupon (try: MAROC10)",
    applyCoupon: "Apply",
    confirmOrderNow: "Confirm Order Now",
    processingOrder: "Processing your order...",

    addedNotificationToast: "Item successfully added to your shopping cart",
    goToCartToast: "Go to Cart",
  },
};
