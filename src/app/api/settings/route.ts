import { NextResponse } from "next/server";
import { db } from "@/db";
import { storeSettings } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await ensureSeeded();
    const rows = await db.select().from(storeSettings);
    const settingsMap: Record<string, string> = {};
    for (const row of rows) {
      settingsMap[row.key] = row.value;
    }
    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Record<string, string>
    const entries = Object.entries(body) as [string, unknown][];

    for (const [key, rawVal] of entries) {
      const val = typeof rawVal === "object" ? JSON.stringify(rawVal) : String(rawVal ?? "");
      const existing = await db
        .select()
        .from(storeSettings)
        .where(eq(storeSettings.key, key));

      if (existing.length > 0) {
        await db
          .update(storeSettings)
          .set({ value: val, updatedAt: new Date() })
          .where(eq(storeSettings.key, key));
      } else {
        await db.insert(storeSettings).values({ key, value: val });
      }
    }

    const updatedRows = await db.select().from(storeSettings);
    const settingsMap: Record<string, string> = {};
    for (const row of updatedRows) {
      settingsMap[row.key] = row.value;
    }

    return NextResponse.json({ success: true, settings: settingsMap });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
