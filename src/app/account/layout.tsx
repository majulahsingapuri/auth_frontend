import React, { ReactElement } from "react";
import { classNames } from "../../../helpers";
import {
  Bars3Icon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface SidebarItem {
  icon: any;
  text: string;
  href: string;
  annotation: string | number | null;
}

export default function Layout(props: {
  children: React.ReactNode;
  dropdown: React.ReactNode;
}) {
  const sidebarItems: SidebarItem[] = [
    {
      icon: UserIcon,
      text: "Profile",
      href: "/account",
      annotation: null,
    },
  ];

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-primary-200 dark:bg-primary-800 dark:border-primary-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className={classNames(
                  "inline-flex items-center p-2 text-sm",
                  "text-primary-500 rounded-lg sm:hidden hover:bg-red-500 focus:outline-none focus:ring-2",
                  "focus:ring-primary-200 dark:text-primary-400 dark:hover:bg-primary-700",
                  "dark:focus:ring-primary-600",
                )}
              >
                <span className="sr-only">
                  Open sidebar
                </span>
                <Bars3Icon className="w-6 h-6" />
              </button>
              <Link
                href="/account"
                className="flex ml-4 md:mr-24"
              >
                <div className="h-8 w-8 bg-primary-200 mr-3" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Auth
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              {props.dropdown}
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-primary-200 sm:translate-x-0 dark:bg-primary-800 dark:border-primary-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-primary-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-primary-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700 group"
                >
                  <item.icon className="flex-shrink-0 w-5 h-5 text-primary-500 transition duration-75 dark:text-primary-400 group-hover:text-primary-900 dark:group-hover:text-white" />
                  <span className="ml-3">{item.text}</span>
                  {item.annotation ? (
                    typeof item.annotation === "string" ? (
                      <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full dark:bg-primary-700 dark:text-primary-300">
                        {item.annotation}
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {item.annotation}
                      </span>
                    )
                  ) : (
                    ""
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">{props.children}</div>
      </div>
    </div>
  );
}
