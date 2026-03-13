import { NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

/**
 * POST /api/admin/verify
 * Body: { password: string } or header x-admin-secret
 * Returns 200 if password matches ADMIN_SECRET, 401 otherwise.
 * Used so the admin UI only "logs in" after server-side validation.
 */
export async function POST(request: Request) {
  if (!ADMIN_SECRET) {
    return NextResponse.json(
      { error: "Admin auth not configured" },
      { status: 503 }
    );
  }
  let secret: string | null =
    request.headers.get("x-admin-secret") ||
    request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "") ||
    null;
  if (!secret) {
    try {
      const body = await request.json();
      if (body && typeof body.password === "string") secret = body.password;
    } catch {
      // no body or invalid JSON
    }
  }
  if (!secret || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
