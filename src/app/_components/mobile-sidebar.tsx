"use client";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "#", icon: "/svgs/home.svg", alt: "Home" },
  { href: "#", icon: "/svgs/tabs.svg", alt: "Tabs" },
  { href: "#", icon: "/svgs/light.svg", alt: "Light" },
  { href: "#", icon: "/svgs/chat.svg", alt: "Chat" },
  { href: "#", icon: "/svgs/book.svg", alt: "Book" },
];

export function MobileSidebar() {
  return (
    <div className="md:hidden rounded-2xl fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e2e2] z-30 h-[80px] flex items-center justify-between px-4">
      <div className="flex flex-1 justify-evenly items-center gap-1">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <div className="rounded-full bg-[#e8f0f5] flex items-center justify-center  cursor-pointer">
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
    </div>
  );
}
