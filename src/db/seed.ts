import { db } from "@/db";
import { products, storeSettings } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function ensureSeeded() {
  try {
    // Check if products exist
    const existing = await db.select({ count: sql<number>`count(*)` }).from(products);
    const count = Number(existing[0]?.count || 0);

    if (count === 0) {
      await db.insert(products).values([
        {
          name: "شباكية ملكية بالعسل الحر والزعفران واللوز",
          nameFr: "Chebakia Royale au Miel Pur, Safran & Amandes",
          nameEn: "Royal Chebakia with Raw Honey, Saffron & Almonds",
          slug: "chebakia-royale",
          category: "شباكية",
          description: "شباكية تقليدية فاسية عريقة محضرة بعسل السدر الطبيعي الحر، والزعفران الحر التالويني، واللوز البلدي المنقى، وحبات السمسم الذهبي المحمص. مقرمشة ومعسلة حتى القلب بطعم الأصالة المغربية.",
          descriptionFr: "Pâtisserie traditionnelle fassie au miel pur de jujubier, safran pur de Taliouine, amandes beldi et sésame doré. Croustillante et fondante au cœur.",
          descriptionEn: "Traditional Fez Chebakia prepared with pure raw honey, Taliouine saffron, local almonds, and toasted sesame seeds. Delicately crispy and rich.",
          ingredients: "دقيق ممتاز، لوز بلدي مطحون، عسل حر طبيعي، ماء زهر فاس المقطر، قرفة بلدية، نافع، حبة حلاوة، زعفران حر تالوين، سمسم محمص، سمن بلدي معتق.",
          ingredientsFr: "Farine premium, amandes beldi moulues, miel pur, eau de fleur d'oranger de Fès, cannelle, safran de Taliouine, sésame grillé, smen traditionnel.",
          ingredientsEn: "Premium flour, ground beldi almonds, pure raw honey, distilled Fez blossom water, cinnamon, Taliouine saffron, roasted sesame, aged traditional butter.",
          price: 130,
          originalPrice: 160,
          imageUrl: "/images/chebakia.jpg",
          unit: "1 كيلوغرام",
          inStock: true,
          isFeatured: true,
          rating: "5.0",
          reviewsCount: 48,
        },
        {
          name: "كعب غزال أصيل باللوز البلدي وماء الزهر المقطر",
          nameFr: "Cornes de Gazelle Authentiques aux Amandes Beldi & Fleur d'Oranger",
          nameEn: "Authentic Gazelle Horns with Beldi Almonds & Orange Blossom",
          slug: "kaab-el-ghazal-prestige",
          category: "كعب غزال",
          description: "كعب غزال فاسي رفيع بعقدة اللوز البلدي 100% الفاخرة، معطرة بماء زهر البرتقال الطبيعي المقطر وقبصة المسكة الحرة، في عجينة رقيقة كالورق وناعمة تذوب فوراً في الفم.",
          descriptionFr: "Pâtisserie emblématique de Fès avec 100% pâte d'amandes beldi parfumée à l'eau de fleur d'oranger distillée et mastic noble, enveloppée dans une pâte ultrafine.",
          descriptionEn: "Signature Fez pastry filled with 100% pure Moroccan almond paste, perfumed with distilled orange blossom and mastic, wrapped in wafer-thin delicate pastry.",
          ingredients: "لوز بلدي مغربي منقى، ماء زهر البرتقال البلدي المقطر، سكر صقيل، مسكة حرة أصيلة، زبدة بلدية فاخرة، قرفة بلدية.",
          ingredientsFr: "Amandes beldi émondées, eau de fleur d'oranger pure, sucre glace, gomme arabique pure, beurre fermier de qualité, cannelle.",
          ingredientsEn: "Blanched Moroccan beldi almonds, pure orange blossom water, confectioners sugar, pure mastic, gourmet butter, cinnamon.",
          price: 180,
          originalPrice: 210,
          imageUrl: "/images/kaab-ghazal.jpg",
          unit: "1 كيلوغرام",
          inStock: true,
          isFeatured: true,
          rating: "5.0",
          reviewsCount: 62,
        },
        {
          name: "بريوات مقرمشة باللوز المحمر وعسل زهر الليمون",
          nameFr: "Briouates Croustillantes aux Amandes Grillées & Miel d'Oranger",
          nameEn: "Crispy Almond Briouats with Orange Blossom Honey",
          slug: "briouat-aux-amandes",
          category: "بريوات",
          description: "مثلثات البريوات الذهبية الشهية بورقة بسطيلة مقرمشة وخفيفة، محشوة بلوز بلدي مقلي ومطحون بدقة مع القرفة والمسكة الحرة، ومغموسة بعناية في عسل زهر الليمون الطبيعي ومزينة برقائق اللوز المحمص.",
          descriptionFr: "Triangles dorés de pâte warqa croustillante garnis d'amandes beldi dorées, infusés dans du miel pur d'oranger et parsemés d'amandes effilées.",
          descriptionEn: "Golden pastry triangles filled with freshly crushed roasted beldi almonds, cinnamon and mastic, dipped in pure orange blossom honey and toasted almond slices.",
          ingredients: "ورقة بسطيلة حريرية رقيقة، لوز بلدي مقلي، عسل طبيعي زهر البرتقال، قرفة بلدية، ماء زهر مقطر، مسكة حرة، رقائق لوز ذهبية.",
          ingredientsFr: "Feuille de brick artisanale, amandes beldi dorées, miel pur d'oranger, cannelle, eau de fleur d'oranger, mastic, amandes effilées.",
          ingredientsEn: "Artisanal pastry leaf, roasted beldi almonds, pure blossom honey, cinnamon, distilled orange blossom water, mastic, flaked almonds.",
          price: 160,
          originalPrice: 190,
          imageUrl: "/images/briouat.jpg",
          unit: "1 كيلوغرام",
          inStock: true,
          isFeatured: true,
          rating: "4.9",
          reviewsCount: 39,
        },
        {
          name: "غريبة البهلة الفاسية بالسمن البلدي واللوز",
          nameFr: "Ghoriba Bahla Fassia au Smen Pur & Amandes Concassées",
          nameEn: "Ghoriba Bahla of Fez with Aged Butter & Crushed Almonds",
          slug: "ghoriba-bahla-fassi",
          category: "غريبة",
          description: "غريبة البهلة الفاسية التاريخية بتشققاتها البديعة وقوامها المرمل الفاتن الذي يذوب في الفم، منسمة بالسمن البلدي المعتق ومحشوة بحبيبات اللوز البلدي المهرمش والسمسم المحمص الذهبي.",
          descriptionFr: "Ghoriba sablée traditionnelle de Fès avec sa texture craquelée inimitable qui fond en bouche, parfumée au smen et amandes croquantes.",
          descriptionEn: "Historic Fez cracked shortbread cookie with a delicate crumbly texture that melts in the mouth, scented with aged butter, crunchy almonds and toasted sesame.",
          ingredients: "دقيق ممتاز، سمسم بلدي محمص، لوز بلدي مجروش، سمن بلدي أصيل، زبدة بلدية، قرفة، فانيليا طبيعية.",
          ingredientsFr: "Farine premium, graines de sésame grillées, amandes beldi concassées, smen marocain authentique, beurre fermier, cannelle, vanille.",
          ingredientsEn: "Premium flour, toasted sesame seeds, crushed beldi almonds, traditional aged butter, cinnamon, natural vanilla.",
          price: 110,
          originalPrice: 135,
          imageUrl: "/images/ghoriba.jpg",
          unit: "1 كيلوغرام",
          inStock: true,
          isFeatured: true,
          rating: "4.9",
          reviewsCount: 35,
        },
        {
          name: "محنشة ملكية باللوز والبيستاش وماء الورد",
          nameFr: "Mhanncha Royale aux Amandes, Pistaches & Eau de Rose",
          nameEn: "Royal Mhanncha with Almonds, Pistachios & Rose Water",
          slug: "mhanncha-royale",
          category: "محنشة",
          description: "تحفة الحلويات المغربية: محنشة ملكية دائرية ملفوفة بدقة متناهية، محشوة بعقدة اللوز البلدي المعطر بماء الورد والمسكة الحرة، معسلة ومزينة بفستق حلبي أخضر ناعم وبتلات الورد الجوري الطبيعي.",
          descriptionFr: "Spirale royale de fine pâte feuilletée farcie de pâte d'amandes parfumée à l'eau de rose et mastic, enrobée de miel pur, pistaches et pétales de rose séchés.",
          descriptionEn: "Moroccan royal serpent coil pastry filled with aromatic almond paste, infused with rose water and mastic, glazed with honey, emerald pistachios and rose petals.",
          ingredients: "عقدة لوز بلدي ممتاز، ورق بسطيلة رفيع، عسل طبيعي، فستق حلبي فاخر، ماء ورد مقطر، مسكة حرة، بتلات ورد بلدي مجفف.",
          ingredientsFr: "Pâte d'amandes beldi, feuille de brick fine, miel naturel, pistaches de premier choix, eau de rose distillée, boutons de rose séchés.",
          ingredientsEn: "Beldi almond paste, delicate pastry, raw honey, premium pistachios, distilled rose water, pure mastic, edible dried rosebuds.",
          price: 190,
          originalPrice: 230,
          imageUrl: "/images/mhanncha.jpg",
          unit: "1 كيلوغرام",
          inStock: true,
          isFeatured: false,
          rating: "5.0",
          reviewsCount: 27,
        },
        {
          name: "صينية الضيافة الملكية المشكلة الفاخرة",
          nameFr: "Plateau de Prestige Royal Assorti (Réceptions & Mariages)",
          nameEn: "Prestige Royal Assorted Moroccan Hospitality Platter",
          slug: "plateau-royal-prestige",
          category: "تشكيلات وصواني",
          description: "صينية ضيافة فاخرة راقية تجمع أرقى إبداعات الصنعة المغربية التقليدية (كعب غزال، بريوات باللوز، شباكية، غريبة بهلة، ومحنشة). مثالية لتقديمها في أرقى المناسبات، الأعراس، والأعياد وكهدية ملكية لا تُنسى.",
          descriptionFr: "Plateau d'apparat réunissant les plus grandes douceurs fassies (Cornes de Gazelle, Briouates, Chebakia, Ghoriba et Mhanncha). Idéal pour mariages et cérémonies d'exception.",
          descriptionEn: "Grand prestige ceremonial platter featuring the finest Fez confectioneries (Gazelle Horns, Almond Briouats, Chebakia, Ghoriba and Mhanncha). Perfect for weddings and gala events.",
          ingredients: "تشكيلة مختارة بعناية من حلويات اللوز البلدي، العسل الحر، والزعفران، مرتبة بعناية فائقة في صينية تقديم ملكية أنيقة.",
          ingredientsFr: "Assortiment d'exception préparé aux amandes beldi, miel pur et safran, dressé sur plateau d'honneur ciselé.",
          ingredientsEn: "Curated selection of pure almond pastries, wild raw honey and saffron, presented on a handcrafted royal ceremonial platter.",
          price: 320,
          originalPrice: 380,
          imageUrl: "/images/plateau-royal.jpg",
          unit: "صينية فاخرة 1.5 كغ",
          inStock: true,
          isFeatured: true,
          rating: "5.0",
          reviewsCount: 74,
        },
      ]);
    } else {
      // Ensure existing records have French and English names populated if null
      await db.execute(sql`
        UPDATE products SET 
          name_fr = COALESCE(name_fr, CASE 
            WHEN category = 'شباكية' THEN 'Chebakia Royale au Miel Pur & Safran'
            WHEN category = 'كعب غزال' THEN 'Cornes de Gazelle Authentiques aux Amandes Beldi'
            WHEN category = 'بريوات' THEN 'Briouates Croustillantes aux Amandes'
            WHEN category = 'غريبة' THEN 'Ghoriba Bahla Fassia aux Amandes'
            WHEN category = 'محنشة' THEN 'Mhanncha Royale aux Amandes & Pistaches'
            ELSE 'Plateau Royal de Pâtisseries Marocaines' END),
          name_en = COALESCE(name_en, CASE 
            WHEN category = 'شباكية' THEN 'Royal Chebakia with Raw Honey & Saffron'
            WHEN category = 'كعب غزال' THEN 'Authentic Gazelle Horns with Pure Almonds'
            WHEN category = 'بريوات' THEN 'Crispy Almond Briouats'
            WHEN category = 'غريبة' THEN 'Fez Ghoriba Bahla with Almonds'
            WHEN category = 'محنشة' THEN 'Royal Mhanncha with Pistachios'
            ELSE 'Prestige Royal Moroccan Pastry Platter' END)
        WHERE name_fr IS NULL OR name_en IS NULL;
      `);
    }

    // Default settings
    const defaultSettings: Record<string, string> = {
      store_name: "دار الأصالة للحلويات المغربية الفاخرة",
      store_tagline: "الأصالة المغربية العريقة في أبهى حلتها - حلويات مصنوعة يدويًا باللوز البلدي والعسل الحر",
      store_logo_url: "/images/logo-dar-alasala.svg",
      whatsapp_number: "0600-000000",
      phone_number: "0600-000000",
      email: "contact@daralasala-sweets.ma",
      address: "الحي الراقي، شارع النخيل، الدار البيضاء، المغرب",
      announcement: "حلويات مغربية أصيلة 100% باللوز البلدي والعسل الحر | توصيل مجاني للطلبات فوق 350 درهم لجميع المدن المغربية",
      delivery_fee_base: "35",
      delivery_free_threshold: "350",
      delivery_city_fees: JSON.stringify([
        { city: "الدار البيضاء", fee: 20 },
        { city: "الرباط وسلا", fee: 25 },
        { city: "مراكش", fee: 30 },
        { city: "فاس ومكناس", fee: 25 },
        { city: "طنجة وتطوان", fee: 30 },
        { city: "أكادير", fee: 35 },
        { city: "وجدة والشرق", fee: 35 },
        { city: "باقي المدن المغربية", fee: 40 },
        { city: "شحن دولي (فرنسا، إسبانيا، أوروبا)", fee: 180 },
        { city: "شحن دولي (الخليج، المملكة العربية السعودية، كندا)", fee: 240 },
      ]),
      currency_rates: JSON.stringify({
        MAD: { symbol: "د.م", rate: 1, name: "درهم مغربي" },
        SAR: { symbol: "ر.س", rate: 0.38, name: "ريال سعودي" },
        USD: { symbol: "$", rate: 0.1, name: "دولار أمريكي" },
        EUR: { symbol: "€", rate: 0.092, name: "يورو" },
      }),
      facebook_pixel_id: "",
      tiktok_pixel_id: "",
      google_analytics_id: "",
    };

    for (const [key, val] of Object.entries(defaultSettings)) {
      await db
        .insert(storeSettings)
        .values({ key, value: val })
        .onConflictDoNothing();
    }
  } catch (error) {
    console.error("Seed error:", error);
  }
}
