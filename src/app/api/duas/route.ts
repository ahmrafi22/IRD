import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const cat_id = url.searchParams.get("cat_id");
  const subcat_id = url.searchParams.get("subcat_id");

  if (!cat_id) {
    return NextResponse.json({ error: "cat_id is required" }, { status: 400 });
  }

  const stmt = subcat_id
    ? db.prepare("SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?")
    : db.prepare("SELECT * FROM dua WHERE cat_id = ?");

  const duas = subcat_id
    ? stmt.all(cat_id, subcat_id)
    : stmt.all(cat_id);

  return NextResponse.json(duas);
}
