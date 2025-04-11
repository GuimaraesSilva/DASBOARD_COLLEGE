"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiLock, FiUser } from "react-icons/fi";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div
      className="h-screen flex bg-darkyellow/90 relative 
    flex flex-col justify-between text-white p-12"
    >
      <div
        className="md:w-1/2 absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/homepage_bg.jpg')" }}
      />
      <div className="md:w-1/2 absolute inset-0 bg-black/50" />
      <div className="flex gap-4 relative z-10">
        <Image
          src="/logo.gif"
          alt="Logo"
          width={100}
          height={100}
          unoptimized={true}
        />
        <div className="flex flex-col-reverse">
          <h1 className="text-2xl ">Portal</h1>
          <h1 className="text-4xl font-bold">College</h1>
        </div>
      </div>
      <div className="flex md:w-1/2 md:ml-auto flex-col gap-4 items-center justify-center">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="z-10 bg-lightgrey/60 p-12 rounded-xl shadow-2xl flex flex-col gap-6 
              shadow-[0px_0px_80px_10px_rgba(0,0,0,0.6)]"
          >
            <h1 className="text-3xl text-white font-bold flex justify-center items-center">
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
                  className="pl-10 p-2 w-full rounded-xl placeholder-gray-400 text-black"
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
                  className="pl-10 p-2 w-full rounded-xl placeholder-gray-400 text-black"
                />
              </div>
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="bg-darkgrey text-white my-1 rounded-xl text-lg p-[8px] hover:bg-darkgrey/75 transition duration-300"
            >
              Sign In
            </SignIn.Action>
          </SignIn.Step>
        </SignIn.Root>
      </div>
      <div className="flex md:w-1/2 md:flex-col justify-center">
        <p className="relative z-10 text-center text-sm border-b border-white/50">
          QUALITY EDUCATION FOR A BRIGHT FUTURE
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
