import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    return NextResponse.json({ orders: allOrders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      notes,
      items,
      subtotal,
      deliveryFee,
      discount = 0,
      total,
      currency = "MAD",
      paymentMethod = "cod",
    } = body;

    if (!customerName || !customerPhone || !customerCity || !customerAddress || !items) {
      return NextResponse.json({ error: "المرجو ملء جميع المعلومات الإلزامية" }, { status: 400 });
    }

    const orderNumber = `ASL-${new Date().getFullYear().toString().slice(-2)}${(Math.floor(1000 + Math.random() * 9000))}`;

    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName,
        customerPhone,
        customerCity,
        customerAddress,
        notes: notes || "",
        items: typeof items === "string" ? items : JSON.stringify(items),
        subtotal: Number(subtotal),
        deliveryFee: Number(deliveryFee),
        discount: Number(discount || 0),
        total: Number(total),
        currency,
        paymentMethod,
        status: "pending",
      })
      .returning();

    return NextResponse.json({ order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "فشل في حفظ الطلب" }, { status: 500 });
  }
}
