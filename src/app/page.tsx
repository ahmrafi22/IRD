"use client"

import { useState } from "react"
import { DesktopSidebar } from "./_components/desktop-sidebar"
import { MobileSidebar } from "./_components/mobile-sidebar"
import { Header } from "./_components/header"
import { SettingsPanel } from "./_components/settings"
import MainContentWithCategories from "./_components/main-content"

export default function Page() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col md:flex-row">
      <DesktopSidebar />

      <div className="md:ml-[100px] ">
        <Header
          onCategoriesOpen={() => setCategoriesOpen(true)}
          onSettingsOpen={() => setSettingsOpen(true)}
        />

        <div className="flex">
          <MainContentWithCategories
            categoriesOpen={categoriesOpen}
            onCategoriesClose={() => setCategoriesOpen(false)}
          />

         
          <SettingsPanel
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        </div>
      </div>

      <MobileSidebar />

      {(categoriesOpen || settingsOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setCategoriesOpen(false)
            setSettingsOpen(false)
          }}
        />
      )}
    </div>
  )
}
