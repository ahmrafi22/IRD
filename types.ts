export type Category = {
  cat_id: number;
  cat_name_en: string;
  no_of_subcat: number;
  no_of_dua: number;
};
export type SubCategory = {
  subcat_id: number;
  subcat_name_en: string;
  no_of_dua: number;
};
export type Dua = {
  dua_id: number;
  dua_name_en: string;
  top_en: string;
  dua_arabic: string;
  transliteration_en: string;
  translation_en: string;
  refference_en: string;
  subcat_id: number | null;
};