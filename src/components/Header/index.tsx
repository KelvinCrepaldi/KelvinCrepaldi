"use client";

import { usePathname } from "next/navigation";

import { AiFillGithub } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsLinkedin } from "react-icons/bs";
import Link from "next/link";
import { MotionDiv } from "../animations/MotionDiv";

export default function Header(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className=" pt-2 pb-4 sticky top-0 z-40 bg-gray-800 font-jetbrains w-full">
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-between max-w-[1300px] m-auto md:px-10 px-5"
      >
        <div>
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
        <div className="text-2xl sm:text-4xl flex space-x-4 p-1 items-center text-gray-300">
          <Link
            href={"https://github.com/KelvinCrepaldi"}
            className="hover:text-teal-400"
            target="_blank"
          >
            <AiFillGithub />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/kelvincrepaldi/"}
            className="hover:text-teal-400"
            target="_blank"
          >
            <BsLinkedin />
          </Link>

          <Link
            target="_blank"
            href={
              "https://docs.google.com/document/d/1NR8mf-RluCrRMOSXRZJBYCCWxIFfgIFynhGd1jbs3AQ/edit?usp=sharing"
            }
            className="hover:text-teal-400 "
          >
            <CgProfile />
          </Link>
        </div>
      </MotionDiv>
    </nav>
  );
}
