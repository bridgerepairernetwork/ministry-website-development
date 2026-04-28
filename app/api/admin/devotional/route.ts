import { NextResponse } from "next/server";
import { requireDbAdmin } from "@/lib/firebase-admin";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await verifyAuth(request);
    const body = await request.json();
    const db = requireDbAdmin();

    // Use the date (YYYY-MM-DD) as the document ID
    const docId = body.date;

    await db
      .collection("devotionals")
      .doc(docId)
      .set({
        ...body,
        createdAt: new Date().toISOString(),
      });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Devotional POST Error:", err);
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await verifyAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const db = requireDbAdmin();
    await db.collection("devotionals").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}
