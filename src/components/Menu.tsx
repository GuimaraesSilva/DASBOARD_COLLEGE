import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { 
  FaHome, 
  FaChalkboardTeacher,
  FaUser, 
  FaUsers, 
  FaUserTie, 
  FaBook,
  FaBookOpen, 
  FaClipboard, 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaBullhorn ,
} from 'react-icons/fa';
import { 
  FaChalkboard,
  FaClipboardCheck,
} from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: FaHome, 
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaChalkboardTeacher, 
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaUsers, 
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaUserTie, 
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaBook, 
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: FaChalkboard, 
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaBookOpen, 
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaGraduationCap, 
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaClipboard, 
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaGraduationCap, 
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaClipboardCheck, 
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaCalendarAlt, 
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaEnvelope, 
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaBullhorn, 
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: FaUser, 
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FiSettings, 
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FiLogOut, 
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <div className="mt-2 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-1" key={i.title}>
          <span className="hidden lg:block text-white font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-white/60 py-2 md:px-2 rounded-md hover:bg-tertiary hover:text-primary"
                >
                  <item.icon size={20} /> 
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
