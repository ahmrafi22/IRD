"use client";

import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";

interface HeaderProps {
  onCategoriesOpen: () => void;
  onSettingsOpen: () => void;
}

export function Header({ onCategoriesOpen, onSettingsOpen }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b mb-2 border-[#e2e2e2] p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu */}
        <button
          onClick={onCategoriesOpen}
          className="md:hidden w-10 h-10 p-0 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <AiOutlineMenu className="w-5 h-5 text-[#393939]" />
        </button>
        <h1 className="text-xl font-semibold text-[#393939]">Dua Page</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden xl:flex mr-50 items-center border border-gray-200 w-[371px] focus-within:border-green-500 transition duration-300 pr-3 gap-2 h-[52px] rounded-2xl overflow-hidden">
          <input
            type="text"
            placeholder="Search by Dua Name"
            className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
          />
          <div className="w-14 h-10 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
            <CiSearch className="text-gray-500 w-6 h-6" />
          </div>
        </div>

        <button
          className="xl:hidden w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <CiSearch className="w-5 h-5 text-gray-600" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onSettingsOpen}
          className="xl:hidden w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <AiOutlineSetting className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-[#393939] hidden sm:block">
            Rafi Ahmed
          </span>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100">
            <Image
              src="/svgs/profile.svg"
              alt="Profile"
              width={45}
              height={45}
              className="w-6 h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}