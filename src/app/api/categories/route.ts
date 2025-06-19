import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET() {
  const stmt = db.prepare(`
    SELECT 
      c.cat_id, 
      c.cat_name_en,
      COUNT(DISTINCT sc.subcat_id) AS no_of_subcat,
      COUNT(DISTINCT d.dua_id) AS no_of_dua
    FROM category c
    LEFT JOIN sub_category sc ON c.cat_id = sc.cat_id
    LEFT JOIN dua d ON sc.subcat_id = d.subcat_id
    GROUP BY c.cat_id, c.cat_name_en
    ORDER BY c.cat_id
  `);

  const categoriesWithCounts = stmt.all();

  return NextResponse.json(categoriesWithCounts);
}
