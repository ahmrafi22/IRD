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
    <div className="sticky top-0 z-50 bg-white border-b mb-2 border-[#e2e2e2] px-3 py-2 flex items-center justify-between h-[70px]">
      <div className="flex items-center space-x-3">
        {/* Hamburger Menu */}
        <button
          onClick={onCategoriesOpen}
          className="md:hidden w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <AiOutlineMenu className="w-5 h-5 text-[#393939]" />
        </button>
        <h1 className="text-lg font-semibold text-[#393939] font-poppins">Dua Page</h1>
      </div>

      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="hidden xl:flex items-center mr-60 border border-gray-200 w-[300px] focus-within:border-green-500 transition duration-300 pr-2 gap-2 h-[40px] rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Search by Dua Name"
            className="w-full h-full pl-3 outline-none placeholder-gray-500 text-sm font-inter "
          />
          <div className="w-10 h-[32px] bg-[#F3F4F6] rounded-lg flex items-center justify-center">
            <CiSearch className="text-gray-500 w-5 h-5" />
          </div>
        </div>

        <button className="xl:hidden w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <CiSearch className="w-5 h-5 text-gray-600" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onSettingsOpen}
          className="xl:hidden w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <AiOutlineSetting className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-[#393939] hidden font-poppins sm:block">
            Rafi Ahmed
          </span>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
            <Image
              src="/svgs/profile.svg"
              alt="Profile"
              width={36}
              height={36}
              className="w-6 h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
