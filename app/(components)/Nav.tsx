import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="text-white flex flex-row items-center justify-between p-2">
      <ul>
        <li>
          <Link href="/" className="pl-2 text-lg">
            <strong>Bite Logs</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li className="w-32">
          <Link className="btn" href="/entry/create" role={"button"}>
            New Entry
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
