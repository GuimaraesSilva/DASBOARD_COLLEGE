import prisma from "@/lib/prisma";
import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";

const UserCard = async ({ type }: { type: "admin" | "teacher" | "student" | "parent" }) => {
  const modelMap : Record <typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  }
  
  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl bg-tertiary p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[12px] bg-white px-2 py-1 rounded-full text-primary">
          2025/26
        </span>
        <TfiMoreAlt className="text-primary" />
      </div>
      <h1 className="text-3xl font-semibold my-4 flex items-center gap-2 text-secondary">
        <FaUsers className="text-primary" />
        {data}
      </h1>
      <h2 className="capitalize text-md font-medium text-secondary">{type}</h2>
    </div>
  );
};

export default UserCard;
