"use client";

import { logoutAction } from "@/actions/user.action";
import Link from "next/link";

export default function Logout() {
  return (
    <Link
      href="/"
      onClick={(e) => {
        e.preventDefault();
        logoutAction();
      }}
      style={{ color: "black" }}
      className="hover:underline"
    >
      Sign Out
    </Link>
  );
}
