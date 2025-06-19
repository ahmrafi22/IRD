"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";

import { Category, SubCategory, Dua } from "../../../types";

interface MainContentWithCategoriesProps {
  categoriesOpen: boolean;
  onCategoriesClose: () => void;
}

export default function MainContentWithCategories({
  categoriesOpen = false,
  onCategoriesClose = () => {},
}: MainContentWithCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCat, setExpandedCat] = useState<number | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [duas, setDuas] = useState<Dua[]>([]);
  const [selectedSubcatId, setSelectedSubcatId] = useState<number | null>(null);

  useEffect(() => {
    axios.get("/api/categories").then(async (res) => {
      const categoriesData = res.data;
      setCategories(categoriesData);

      if (categoriesData.length > 0) {
        const firstCatId = categoriesData[0].cat_id;
        setExpandedCat(firstCatId);

        const [subcatRes, duaRes] = await Promise.all([
          axios.get("/api/subcategories", { params: { cat_id: firstCatId } }),
          axios.get("/api/duas", { params: { cat_id: firstCatId } }),
        ]);

        setSubcategories(subcatRes.data);
        setDuas(dedupeById(duaRes.data));
      }
    });
  }, []);

  const dedupeById = (duas: Dua[]): Dua[] => {
    const seen = new Set();
    return duas.filter((d) => {
      if (seen.has(d.dua_id)) return false;
      seen.add(d.dua_id);
      return true;
    });
  };

  const handleCategoryClick = async (catId: number) => {
    const newExpandedCat = expandedCat === catId ? null : catId;
    setExpandedCat(newExpandedCat);
    setSelectedSubcatId(null);

    if (newExpandedCat === null) {
      setSubcategories([]);
      setDuas([]);
    } else {
      const [subcatRes, duaRes] = await Promise.all([
        axios.get("/api/subcategories", { params: { cat_id: catId } }),
        axios.get("/api/duas", { params: { cat_id: catId } }),
      ]);

      setSubcategories(subcatRes.data);
      setDuas(dedupeById(duaRes.data));
    }
  };

  const handleSubcategoryClick = async (catId: number, subcatId: number) => {
    setSelectedSubcatId(subcatId);
    const duaRes = await axios.get("/api/duas", {
      params: { cat_id: catId, subcat_id: subcatId },
    });
    setDuas(dedupeById(duaRes.data));
  };

  const handleCopyDua = async (duaArabic: string) => {
    if (duaArabic) {
      try {
        await navigator.clipboard.writeText(duaArabic);
        console.log("Dua copied to clipboard");
      } catch (err) {
        console.error("Failed to copy dua:", err);
      }
    }
  };

  const getSubcategoryName = (id: number | null) => {
    if (id === null) return "General";
    return (
      subcategories.find((s) => s.subcat_id === id)?.subcat_name_en ?? "Other"
    );
  };

  const groupedDuas = duas.reduce((acc: Record<string, Dua[]>, dua) => {
    const key = dua.subcat_id === null ? "null" : dua.subcat_id.toString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(dua);
    return acc;
  }, {});

  const getCategorySvgPath = (index: number) => {
    return `/svgs/${index + 1}.svg`;
  };

  const CategoryContent = () => (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="p-4 flex-shrink-0">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7e7e7e] w-4 h-4" />
          <input
            placeholder="Search by Categories"
            className="w-full pl-10 pr-4 py-2 border border-[#e2e2e2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fa45b] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 green-scrollbar">
        {categories.map((cat, index) => (
          <div key={cat.cat_id} className="mb-4">
            <div
              className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                expandedCat === cat.cat_id
                  ? "bg-[#f9f9f9]"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleCategoryClick(cat.cat_id)}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-[#e8f0f5] text-white rounded-2xl flex items-center justify-center text-sm font-medium">
                  <Image
                    width={50}
                    height={50}
                    src={getCategorySvgPath(index)}
                    alt={cat.cat_name_en}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-inter font-semibold text-base leading-none text-[#1fa45b]">
                    {cat.cat_name_en}
                  </div>
                  <div className="font-poppins font-normal text-sm leading-none text-[#7e7e7e] mt-1">
                    Subcategory: {cat.no_of_subcat}
                  </div>
                </div>
                <div className="text-right flex items-center">
                  <div className="w-0.5 h-8 bg-gray-300 mr-2 rounded-full"></div>
                  <div>
                    <div className="font-inter font-semibold text-base leading-none text-[#393939]">
                      {cat.no_of_dua}
                    </div>
                    <div className="font-poppins font-normal text-sm leading-none text-[#7e7e7e] mt-1">
                      Duas
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subcategories */}
            {expandedCat === cat.cat_id && subcategories.length > 0 && (
              <div className="ml-5 mt-3">
                <div className="relative">
                  {/* Dotted lines */}
                  {subcategories.length > 1 && (
                    <div className="absolute left-1 top-0 bottom-0 w-0 border-l-2 border-dotted border-[#1fa45b] opacity-60"></div>
                  )}

                  {subcategories.length === 1 && (
                    <div className="absolute left-0 top-3 w-2 h-2 bg-[#1fa45b] rounded-full z-10"></div>
                  )}

                  <div className="space-y-3 relative pl-1">
                    {subcategories.map((sub) => (
                      <div
                        key={sub.subcat_id}
                        className={`flex items-center relative cursor-pointer transition-colors duration-200 font-inter font-medium text-base leading-[25px] ${
                          selectedSubcatId === sub.subcat_id
                            ? "text-[#1fa45b]"
                            : "text-[#373737] hover:text-[#1fa45b]"
                        }`}
                        onClick={() =>
                          handleSubcategoryClick(cat.cat_id, sub.subcat_id)
                        }
                      >
                        {subcategories.length > 1 && (
                          <div
                            className="w-2 h-2 bg-[#1fa45b] rounded-full mr-3 relative z-10 flex-shrink-0"
                            style={{ marginLeft: "-3px" }}
                          ></div>
                        )}

                        <span
                          className={subcategories.length === 1 ? "ml-4" : ""}
                        >
                          {sub.subcat_name_en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex ">
      {/* category sidebar */}
      <div className="hidden md:flex w-1/4 bg-white border-r border-[#e2e2e2] flex-col overflow-hidden fixed left-27 mt-1.5 top-22 h-screen z-40 ">
        <div className="bg-[#1fa45b] text-white p-4 text-center font-medium  ">
          Categories
        </div>
        <CategoryContent />
      </div>

      {/* Mobile category panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-[#e2e2e2] transform transition-transform duration-300 ease-in-out ${
          categoriesOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden overflow-hidden flex flex-col h-screen rounded-2xl`}
      >
        <div className="bg-[#1fa45b] text-white p-4 flex items-center justify-between flex-shrink-0 rounded-t-2xl">
          <span className="font-medium">Categories</span>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <button
              className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded flex items-center justify-center transition-colors"
              onClick={onCategoriesClose}
            >
              <AiOutlineClose className="w-4 h-4" />
            </button>
          </div>
        </div>
        <CategoryContent />
      </div>

      {/* Dua content */}
      <div className="flex-1 overflow-y-auto pb-20 -mt-5 md:pb-6">
        <div className="md:ml-[27%] md:pl-[10px]">
          <div className="p-4 md:p-6 xl:mr-[346px]">
            {Object.entries(groupedDuas).map(([subcatId, duaList]) => (
              <div key={subcatId} className="mb-[10px]">
                <div className="bg-white rounded-lg p-3 mb-[10px] border border-[#e2e2e2] h-12 flex items-center">
                  <h2 className="font-inter font-medium text-base leading-[25px] text-[#393939]">
                    <span className="text-[#1fa45b]">Section</span>:{" "}
                    {getSubcategoryName(
                      subcatId === "null" ? null : Number(subcatId)
                    )}
                  </h2>
                </div>
                {duaList.map((dua) => (
                  <div
                    key={dua.dua_id}
                    className="bg-white rounded-lg p-4 md:p-6 mb-[10px] border border-[#e2e2e2]"
                  >
                    <div className="flex items-center mb-[10px]">
                      <div className="rounded-full flex items-center justify-center mr-3">
                        <Image
                          src="/svgs/dua.svg"
                          alt="Dua"
                          height={35}
                          width={35}
                        />
                      </div>
                      <h3 className="text-[#1fa45b] font-inter font-medium text-base leading-[25px]">
                        {dua.dua_name_en}
                      </h3>
                    </div>

                    <p className="text-[#393939] mb-[10px] font-inter text-base leading-[24px] whitespace-pre-wrap">
                      {dua.top_en}
                    </p>

                    {dua.dua_arabic && (
                      <div className="bg-[#f9f9f9] p-4 md:p-6 rounded-lg mb-[10px] text-right">
                        <p
                          className="text-xl md:text-2xl leading-relaxed text-[#393939] font-arabic"
                          dir="rtl"
                        >
                          {dua.dua_arabic}
                        </p>
                      </div>
                    )}

                    {dua.transliteration_en && (
                      <div className="mb-[10px]">
                        <p className="text-[#393939] font-inter font-medium text-base leading-[25px] inline">
                          Transliteration:{" "}
                        </p>
                        <span className="text-[#7e7e7e] font-inter italic text-base leading-[24px] whitespace-pre-wrap">
                          {dua.transliteration_en}
                        </span>
                      </div>
                    )}
                    {dua.translation_en && (
                      <div className="mb-[10px]">
                        <p className="text-[#393939] font-inter font-medium text-base leading-[25px] inline">
                          Translation:{" "}
                        </p>
                        <span className="text-[#393939] font-inter text-base leading-[24px] whitespace-pre-wrap">
                          {dua.translation_en}
                        </span>
                      </div>
                    )}

                    {dua.refference_en && (
                      <div className="mb-[10px]">
                        <div className="text-[#1fa45b] font-inter font-medium mb-[10px] text-base leading-[25px]">
                          Reference:
                        </div>
                        <div className="text-[#393939] font-inter text-base leading-[24px]">
                          {dua.refference_en}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <button className="bg-[#1fa45b] hover:bg-[#1fa45b]/90 rounded-full w-12 h-12 p-0 flex items-center justify-center transition-colors">
                        <FaPlay className="w-4 h-4 ml-1 text-white" />
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          onClick={() => handleCopyDua(dua.dua_arabic)}
                        >
                          <Image
                            src="/svgs/copy.svg"
                            alt="Copy"
                            width={16}
                            height={16}
                          />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Image
                            src="/svgs/save.svg"
                            alt="Save"
                            width={16}
                            height={16}
                          />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Image
                            src="/svgs/light.svg"
                            alt="Light"
                            width={19}
                            height={19}
                          />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Image
                            src="/svgs/share.svg"
                            alt="Share"
                            width={17}
                            height={17}
                          />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Image
                            src="/svgs/info.svg"
                            alt="Info"
                            width={19}
                            height={19}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
