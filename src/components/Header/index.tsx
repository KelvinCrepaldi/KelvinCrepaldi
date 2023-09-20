"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="p-2 pb-4 m-auto w-full flex-col sticky top-0 z-40 bg-gray-800 font-jetbrains">
      <div className="max-w-[1200px] m-auto md:px-10">
        <h1 className="hidden sm:flex  mb-1 text-2xl font-bold text-gray-300">
          Kelvin Crepaldi
        </h1>
        <ul className="flex text-lg space-x-4 text-gray-400">
          <li
            className={
              pathname === "/"
                ? "border-b-2 border-green-500 "
                : "border-b-2 border-transparent hover:border-green-500 transition"
            }
          >
            <Link href="/">Home</Link>
          </li>

          <li
            className={
              pathname === "/about"
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-transparent hover:border-blue-500 transition"
            }
          >
            <Link href="/about">Sobre</Link>
          </li>

          <li
            className={
              pathname === "/portfolio"
                ? "border-b-2 border-red-500"
                : "border-b-2 border-transparent hover:border-red-500 transition"
            }
          >
            <Link href="/portfolio">Portfólio</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
