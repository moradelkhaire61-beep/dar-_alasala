import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameFr: text("name_fr"),
  nameEn: text("name_en"),
  slug: text("slug").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  descriptionFr: text("description_fr"),
  descriptionEn: text("description_en"),
  ingredients: text("ingredients").default(""),
  ingredientsFr: text("ingredients_fr").default(""),
  ingredientsEn: text("ingredients_en").default(""),
  price: integer("price").notNull(), // price in MAD
  originalPrice: integer("original_price"), // for discount display
  imageUrl: text("image_url").notNull(),
  unit: text("unit").default("1 كيلوغرام"),
  inStock: boolean("in_stock").default(true),
  isFeatured: boolean("is_featured").default(false),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("5.0"),
  reviewsCount: integer("reviews_count").default(32),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerCity: text("customer_city").notNull(),
  customerAddress: text("customer_address").notNull(),
  notes: text("notes"),
  items: text("items").notNull(), // JSON string array of cart items
  subtotal: integer("subtotal").notNull(),
  deliveryFee: integer("delivery_fee").notNull(),
  discount: integer("discount").default(0),
  total: integer("total").notNull(),
  currency: text("currency").default("MAD"),
  paymentMethod: text("payment_method").default("cod"),
  status: text("status").default("pending"), // pending, preparing, shipped, delivered, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const storeSettings = pgTable("store_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type StoreSetting = typeof storeSettings.$inferSelect;
