"use client";

import { useTheme } from "next-themes";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  return (
    <div className="flex items-center rounded-full m-2 justify-between p-2 transition-colors bg-lightyellow dark:bg-darkgrey text-black dark:text-text">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-darkgrey dark:ring-yellow px-2">
        <FiSearch className="text-black dark:text-yellow" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none text-black dark:text-text placeholder:text-black dark:placeholder:text-yellow"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-4 justify-end w-full">
        <button
          className="p-2 w-8 h-8 flex items-center justify-center rounded-full text-black dark:text-yellow transition"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <LuLightbulbOff size={24} />
          ) : (
            <LuLightbulb size={24} />
          )}
        </button>

        <div className="w-8 h-8 flex items-center justify-center cursor-pointer dark:text-yellow">
          <TiMessages />
        </div>
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer relative dark:text-yellow">
          <IoNotificationsOutline />
          <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-lightgrey dark:bg-yellow text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-black dark:text-yellow leading-3 font-medium">
            {user?.fullName || "User"}
          </span>
          <span className="text-[10px] text-darkgrey dark:text-lightyellow text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
