import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-10 flex flex-col items-center bg-gray-900">
      <ul className="flex space-x-5 justify-center">
        <li>
          <Link
            className="text-blue-400 font-bold"
            href={"https://github.com/KelvinCrepaldi"}
          >
            Github
          </Link>
        </li>
        <li>
          <Link
            className="text-green-400 font-bold"
            href={"https://www.linkedin.com/in/kelvincrepaldi/"}
          >
            Linkedin
          </Link>
        </li>
        <li className="text-yellow-300 font-bold">(41) 9 9674-8781</li>
      </ul>
      <div className="flex flex-col items-center">
        <p>
          <span className="text-red-400">Kelvin Crepaldi</span> © 2023 |
          Curitiba - PR - Brasil
        </p>
        <p>Next.js ❤ Tailwind</p>
      </div>
    </footer>
  );
}
