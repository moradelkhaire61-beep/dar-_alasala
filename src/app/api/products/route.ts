import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    await ensureSeeded();
    const allProducts = await db.select().from(products).orderBy(desc(products.id));
    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      category,
      description,
      ingredients,
      price,
      originalPrice,
      imageUrl,
      unit,
      inStock,
      isFeatured,
    } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^\w\u0621-\u064A\s-]/g, "")
      .replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4);

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        slug,
        category,
        description: description || "",
        ingredients: ingredients || "",
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        imageUrl: imageUrl || "/images/chebakia.jpg",
        unit: unit || "1 كيلوغرام",
        inStock: inStock !== undefined ? Boolean(inStock) : true,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : false,
      })
      .returning();

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
