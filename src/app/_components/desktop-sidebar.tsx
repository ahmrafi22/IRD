"use client"

import Image from "next/image"
import Link from "next/link"

export function DesktopSidebar() {
  const navItems = [
    { href: "#", icon: "/svgs/home.svg", alt: "Home" },
    { href: "#", icon: "/svgs/tabs.svg", alt: "Tabs" },
    { href: "#", icon: "/svgs/lighside.svg", alt: "Light" },
    { href: "#", icon: "/svgs/save bar.svg", alt: "Save" },
    { href: "#", icon: "/svgs/med.svg", alt: "Medical" },
    { href: "#", icon: "/svgs/chat.svg", alt: "Chat" },
    { href: "#", icon: "/svgs/book.svg", alt: "Book" },
  ]

  return (
    <div className="hidden md:flex w-[100px] h-screen  bg-white border-r border-[#e2e2e2] flex-col items-center justify-between py-6 fixed left-0 top-0 z-30">
      {/* Top logo */}
      <div className="w-[73px] h-[73px] rounded-2xl flex items-center justify-center">
        <Image src="/logo.png" alt="App Icon" width={73} height={73} />
      </div>

      {/* Navigation icons*/}
      <div className="flex flex-col items-center justify-center flex-1 gap-[27px]">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <div className="rounded-full bg-[#e8f0f5] flex items-center justify-center group cursor-pointer">
              <Image
                src={item.icon}
                alt={item.alt}
                width={38}
                height={38}
                className="hover:scale-120 transition-transform duration-200 ease-in-out"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom support logo */}
      <div className=" rounded-2xl flex items-center justify-center">
        <Image src="/support.png" alt="Support" width={90} height={90} />
      </div>
    </div>
  )
}
