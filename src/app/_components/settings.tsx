"use client"

import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
}

export function SettingsPanel({ isOpen, onClose, isMobile = false }: SettingsPanelProps) {
  const SettingsContent = () => {
    const [activeItem, setActiveItem] = useState("appearance")

    const settingsItems = [
      {
        id: "language",
        svg: "lang.svg",
        label: "Language Settings",
      },
      {
        id: "general",
        svg: "cards.svg",
        label: "General Settings",
      },
      {
        id: "font",
        svg: "sett.svg",
        label: "Font Settings",
      },
      {
        id: "appearance",
        svg: "sett.svg",
        label: "Appearance Settings",
      },
    ]

    return (
      <div className="space-y-2">
        {settingsItems.map((item) => {
          const isActive = activeItem === item.id

          return (
            <div
              key={item.id}
              className={`relative flex items-center space-x-3 p-3 rounded-2xl cursor-pointer transition-colors duration-200 font-inter ${
                isActive ? "bg-[#f0f9f4] text-[#1fa45b]" : "text-[#393939] hover:bg-[#f5f5f5]"
              }`}
              onClick={() => setActiveItem(item.id)}
            >

              {isActive && <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#1fa45b] rounded-l-full"></div>}

              <Image
                src={`/svgs/${item.svg}`}
                alt={item.label}
                width={38}
                height={38}
                className={`w-5 h-5 ${isActive ? "brightness-0 saturate-100" : ""}`}
                style={{
                  filter: isActive ? "brightness(0) saturate(100%) invert(32%) sepia(83%) saturate(3151%) hue-rotate(120deg) brightness(95%) contrast(92%)" : ""
                }}
              />
              <span className={`font-medium ${isActive ? "text-[#1fa45b]" : "text-[#393939]"}`}>{item.label}</span>
            </div>
          )
        })}

        <div className="pt-4 mt-6">
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#f5f5f5] transition-colors duration-200">
            <span className="text-[#393939] font-medium font-inter">Night Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1fa45b]"></div>
            </label>
          </div>
        </div>
      </div>
    )
  }
  
 // Mobile
  if (isMobile) {
    return (
      <div
        className={`fixed inset-y-0 right-0 z-50 w-3/4 md:w-1/2 h-screen bg-white border-l border-[#e2e2e2] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } xl:hidden`}
      >
        <div className="bg-white p-4 flex items-center justify-between  z-10">
          <h2 className="text-xl font-semibold text-[#393939]">Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-2xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
          >
            <AiOutlineClose className="w-4 h-4" />
          </button>
        </div>


        <div className="p-6  h-full pb-20">
          <SettingsContent />
        </div>
      </div>
    )
  }

  // Desktop 
  return (
    <div className="hidden xl:flex xl:fixed xl:right-0 mt-1  bg-white border  h-screen border-[#e2e2e2] flex-col overflow-hidden" style={{ width: '330px' }}>
        <h2 className="text-xl mt-6 text-center font-semibold text-[#393939]">Settings</h2>
      
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <SettingsContent />
      </div>
    </div>
  )
}