import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { 
  FaSearch, 
  FaEnvelope, 
  FaBullhorn 
} from "react-icons/fa";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <FaSearch size={14} className="text-white" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none placeholder-white"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-4 justify-end w-full">
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FaEnvelope size={18} className="text-white" />
        </div>
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <FaBullhorn size={18} className="text-white" />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-tertiary text-primary rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-white/80 text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
