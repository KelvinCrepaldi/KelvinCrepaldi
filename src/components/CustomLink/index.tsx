import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type CustomLinkProps = { children: ReactNode } & LinkProps;

const CustomLink = ({ children, ...props }: CustomLinkProps): JSX.Element => {
  return (
    <Link
      {...props}
      className=" bg-teal-500 text-gray-800 py-3 px-7 rounded-full font-jetbrains font-bold text-base"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
