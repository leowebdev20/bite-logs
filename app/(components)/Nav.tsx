import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white">
      {/* /<nav className="text-white flex flex-row items-center justify-between p-2 bg-hero-pattern bg-no-repeat"> */}
      <ul>
        <li>
          <Link href="/" className="pl-4 text-xl drop-shadow-md">
            <strong>BiteLogs</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li className="w-32">
          {/* <Link className="btn" href="/entry/create" role={"button"}>
            New Entry
          </Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
