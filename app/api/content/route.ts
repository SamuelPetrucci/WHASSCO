import { NextResponse } from "next/server";
import { getContent, saveContent, restoreContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function isAuthorized(request: Request): boolean {
  if (!ADMIN_SECRET) return false;
  const secret = request.headers.get("x-admin-secret") || request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  return secret === ADMIN_SECRET;
}

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (e) {
    console.error("Content GET error:", e);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as SiteContent;
    await saveContent(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Content POST error:", e);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}

/** Restore content to the previous version (before last save). Requires admin auth. */
export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  if (url.searchParams.get("action") !== "restore") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  try {
    const ok = await restoreContent();
    if (!ok) {
      return NextResponse.json({ error: "No backup found to restore" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Content restore error:", e);
    return NextResponse.json({ error: "Failed to restore content" }, { status: 500 });
  }
}
