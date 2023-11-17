"use client";

import { useState } from "react";
import { useAuth } from "../../../../providers/AuthProvider";
import { classNames } from "../../../../helpers";

interface DropdownButton {
  text: string;
  onClick: () => void;
}

export default function Dropdown() {
  const { user, signOut } = useAuth();
  const [hidden, setHidden] = useState<boolean>(true);

  const buttons: DropdownButton[] = [
    {
      text: "Sign Out",
      onClick: signOut,
    },
  ];

  return (
    <div className="flex items-center ml-3 relative">
      <div>
        <button
          type="button"
          className="flex text-sm bg-primary-800 rounded-full focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-600"
          aria-expanded="false"
          onClick={() => setHidden(!hidden)}
        >
          <span className="sr-only">Open user menu</span>
          <div className="w-8 h-8 bg-primary-200 rounded-full" />
        </button>
      </div>
      <div
        className={classNames(
          "z-50 absolute top-9 right-0 my-4",
          "text-base list-none bg-white divide-y divide-primary-100 rounded",
          "shadow dark:bg-primary-700 dark:divide-primary-600",
          hidden ? "hidden" : "",
        )}
      >
        <div className="px-4 py-3" role="none">
          <p
            className="text-sm text-primary-900 dark:text-white"
            role="none"
          >
            {`${user.firstName} ${user.lastName}`}
          </p>
          <p
            className="text-sm font-medium text-primary-900 truncate dark:text-primary-300"
            role="none"
          >
            @{user.username}
          </p>
          <p
            className="text-sm font-medium text-primary-900 truncate dark:text-primary-300"
            role="none"
          >
            {user.email}
          </p>
        </div>
        <ul className="py-1" role="none">
          {buttons.map((button) => (
            <li key={button.text}>
              <button
                className={classNames(
                  "block w-full text-left px-4 py-2 text-sm text-primary-700 hover:bg-primary-100",
                  "dark:text-primary-300 dark:hover:bg-primary-600 dark:hover:text-white",
                )}
                onClick={button.onClick}
              >
                {button.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
