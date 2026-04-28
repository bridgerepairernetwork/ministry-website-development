import { NextResponse } from "next/server";
import { requireDbAdmin } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const limit = searchParams.get("limit");

  try {
    const db = requireDbAdmin();
    const collection = db.collection("devotionals");

    if (date) {
      const doc = await collection.doc(date).get();
      if (!doc.exists) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    }

    // Handle listing if no date is provided
    const snapshot = await collection
      .orderBy("date", "desc")
      .limit(parseInt(limit || "30"))
      .get();

    const items: any[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error("Devotional GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
