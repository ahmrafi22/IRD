import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET() {
  const stmt = db.prepare("SELECT cat_id, cat_name_en FROM category");
  const categories = stmt.all();
  return NextResponse.json(categories);
}
