"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { useTheme } from "next-themes";

const LoginPage = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!isLoaded) return;
    const role = user?.publicMetadata?.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-darkyellow/90 text-white">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-between p-8 md:p-12 bg-light dark:bg-dark relative text-white">
      <div
        className="md:w-1/2 absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/homepage_bg.jpg')" }}
      />
      <div className="md:w-1/2 absolute inset-0 bg-black/25 dark:bg-black/50" />
      <div className="flex gap-4 relative z-10 items-center justify-center md:justify-start">
        <Image
          src="/logo.gif"
          alt="Logo"
          width={100}
          height={100}
          unoptimized
        />
        <div className="flex flex-col-reverse">
          <h1 className="text-xl md:text-2xl">Portal</h1>
          <h1 className="text-2xl md:text-4xl font-bold">College</h1>
        </div>
        {/* Theme Toggle */}
        <button
          className="ml-auto p-2 w-10 h-10 flex items-center justify-center rounded-full bg-lightgrey/60 dark:bg-darkgrey/60 transition"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <LuLightbulbOff size={32} className="text-lightyellow" />
          ) : (
            <LuLightbulb size={32} className="text-black" />
          )}
        </button>
      </div>
      <div className="flex md:w-1/2 md:ml-auto flex-col gap-4 items-center justify-center">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="z-10 bg-darkyellow/80 dark:bg-darkgrey/60 p-8 md:p-12 rounded-xl shadow-2xl 
              shadow-[0px_0px_100px_5px_rgba(0,0,0,0.4)] flex flex-col gap-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold flex justify-center items-center">
              Welcome back!
            </h1>
            <Clerk.GlobalError className="text-sm text-red-400" />
            <Clerk.Field name="identifier" className="flex flex-col gap-1">
              <div className="relative flex items-center">
                <FiUser className="absolute left-3 text-gray-400 text-lg" />
                <Clerk.Input
                  type="text"
                  required
                  placeholder="Username"
                  className="pl-10 p-2 w-full rounded-xl placeholder-gray-400 text-black dark:text-white bg-white dark:bg-black/70"
                />
              </div>
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="flex flex-col gap-1">
              <div className="relative flex items-center">
                <FiLock className="absolute left-3 text-gray-400 text-lg" />
                <Clerk.Input
                  type="password"
                  required
                  placeholder="Password"
                  className="pl-10 p-2 w-full rounded-xl placeholder-gray-400 text-black dark:text-white bg-white dark:bg-black/70"
                />
              </div>
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="bg-darkgrey dark:bg-darkyellow text-white my-1 rounded-xl text-lg p-[8px] 
              hover:bg-darkgrey/75 dark:hover:bg-darkyellow/60 transition duration-300 w-full"
            >
              Sign In
            </SignIn.Action>
          </SignIn.Step>
        </SignIn.Root>
      </div>
      <div className="flex md:w-1/2 md:flex-col justify-center">
        <p className="relative z-10 text-center text-xs md:text-sm border-b border-white/50 md:mr-[48px]">
          QUALITY EDUCATION FOR A BRIGHT FUTURE
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
