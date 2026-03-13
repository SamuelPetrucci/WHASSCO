import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function isAuthorized(request: Request): boolean {
  if (!ADMIN_SECRET) return false;
  const secret = request.headers.get("x-admin-secret") || request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  return secret === ADMIN_SECRET;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    const pathname = formData.get("pathname") as string | null;
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const relativePath = pathname || `uploads/${Date.now()}-${safeName}`;

    // Local dev / no blob token: save to public/uploads so images work during development
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      const publicDir = path.join(process.cwd(), "public");
      const fullPath = path.join(publicDir, relativePath);
      await mkdir(path.dirname(fullPath), { recursive: true });
      const arrayBuffer = await file.arrayBuffer();
      await writeFile(fullPath, Buffer.from(arrayBuffer));
      const url = `/${relativePath.replace(/\\\\/g, "/")}`;
      return NextResponse.json({ url });
    }

    // Production / blob enabled: upload to Vercel Blob
    const blob = await put(relativePath, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("Upload error:", e);
    const message = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
