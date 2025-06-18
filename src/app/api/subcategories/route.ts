import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const cat_id = url.searchParams.get("cat_id");

  if (!cat_id) return NextResponse.json([], { status: 400 });

  const stmt = db.prepare("SELECT subcat_id, subcat_name_en FROM sub_category WHERE cat_id = ?");
  const subcategories = stmt.all(cat_id);

  return NextResponse.json(subcategories);
}