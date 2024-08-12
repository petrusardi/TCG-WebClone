import { cookies } from "next/headers";
import Link from "next/link";
import Logout from "./logout";

export default function Navbar() {
  const cookieStore = cookies();
  const authorization = cookieStore.get("Authorization");
  return (
    <>
      <div className="navbar bg-info">
        <div className="navbar-start">
          <Link className="btn btn-ghost text-xl" href={"/"}>
            <img src="/logo.png" className="w-48" />
          </Link>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          <label className="input input-bordered flex items-center gap-2 bg-white text-slate-950">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            ></svg>
          </label>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <Link className="btn btn-ghost text-xl" href={"/wishlist"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-info rounded-box w-52"
            >
              <li
                style={{ listStyleType: "none" }}
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                {authorization?.value ? (
                  <Logout />
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
