"use client";
import { useState } from "react";

export const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState();
  const handleToggleMegaMenu = () => {
    setShowMegaMenu(() => !showMegaMenu);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow sticky top-0 z-10 bg-[#FBF3D5]">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/favicon.ico"
            className="h-8 rounded"
            alt="Doc Truyen Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            DocTruyen
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse hidden md:flex">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-red-900 font-bold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Đăng ký
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-green-900 font-bold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Đăng nhập
              </a>
            </li>
          </ul>
          <button
            data-collapse-toggle="mega-menu-icons"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mega-menu-icons"
            aria-expanded={showMegaMenu}
            onClick={handleToggleMegaMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          id="mega-menu-icons"
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            showMegaMenu ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col mt-4 font-medium w-full md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Xuyên không
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Kinh dị
              </a>
            </li>
            <li className="md:hidden">
              <a
                href="#"
                className="block py-2 px-3 text-red-900 font-bold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Đăng ký
              </a>
            </li>
            <li className="md:hidden">
              <a
                href="#"
                className="block py-2 px-3 text-green-900 font-bold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Đăng nhập
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
