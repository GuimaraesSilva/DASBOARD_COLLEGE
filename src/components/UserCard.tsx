import prisma from "@/lib/prisma";
import Image from "next/image";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { FaUserShield, FaUserTie } from "react-icons/fa6";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  // Maping icons
  const iconMap = {
    admin: (
      <FaUserShield className="text-3xl mr-4 text-darkyellow dark:text-yellow" />
    ),
    teacher: (
      <FaChalkboardTeacher className="text-3xl mr-4 text-darkyellow dark:text-yellow" />
    ),
    student: (
      <FaUsers className="text-3xl mr-4 text-darkyellow dark:text-yellow" />
    ),
    parent: (
      <FaUserTie className="text-3xl mr-4 text-darkyellow dark:text-yellow" />
    ),
  };

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl bg-seclightyellow dark:bg-darkgrey p-[12px] flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] px-2 py-1 text-darkgrey dark:text-extralightgrey">
          2024/25
        </span>
        <TfiMoreAlt className="text-darkgrey/75 dark:text-yellow cursor-pointer" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          {iconMap[type]}
          <h2 className="capitalize text-md font-medium text-gray-500 dark:text-lightyellow">
            {type}s
          </h2>
        </div>
        <h1 className="text-2xl font-semibold text-darkgrey/75 dark:text-extralightgrey">
          {data}
        </h1>
      </div>
    </div>
  );
};

export default UserCard;
