"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
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
  <div className="h-screen flex">
    {/* Left Section */}
    <div className="w-1/2 relative flex flex-col justify-between text-white p-12">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/homepage_bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="flex gap-4 relative z-10">
        <Image src="/logo.gif" alt="Logo" width={100} height={100} />
        <div className="flex flex-col-reverse">
          <h1 className="text-2xl ">
            Portal
          </h1>
          <h1 className="text-4xl font-bold">College</h1>
        </div>
      </div>
      <p className="relative z-10 text-center text-sm border-b border-white/50 p-2">
        QUALITY EDUCATION FOR A BRIGHT FUTURE
      </p>
    </div>
    {/* Right Section */}
    <div className="w-1/2 flex items-center justify-center bg-[#997739]">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-blue-900/90 p-12 rounded-xl shadow-2xl flex flex-col gap-6"
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
                className="pl-10 p-2 w-full rounded-xl ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
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
                className="pl-10 p-2 w-full rounded-xl ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-[#007aff] text-white my-1 rounded-xl text-lg p-[8px] hover:bg-[#0062cc] transition duration-300"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  </div>

    // <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      // <SignIn.Root>
      //   <SignIn.Step
      //     name="start"
      //     className="bg-[#8d8d8d] p-12 rounded-md shadow-2xl flex flex-col gap-2"
      //   >
      //     <h1 className="text-xl font-bold flex items-center gap-3">
      //       <Image src="/logo.png" alt="" width={60} height={60} />
      //       College
      //     </h1>
      //     <h2 className="text-gray-300">Sign in to your account</h2>
      //     <Clerk.GlobalError className="text-sm text-red-400" />
      //     <Clerk.Field name="identifier" className="flex flex-col gap-1">
      //       <Clerk.Label className="text-xs text-gray-300">
      //         Username
      //       </Clerk.Label>
      //       <Clerk.Input
      //         type="text"
      //         required
      //         className="p-2 rounded-md ring-1 ring-gray-300"
      //       />
      //       <Clerk.FieldError className="text-xs text-red-400" />
      //     </Clerk.Field>
      //     <Clerk.Field name="password" className="flex flex-col gap-1">
      //       <Clerk.Label className="text-xs text-gray-300">
      //         Password
      //       </Clerk.Label>
      //       <Clerk.Input
      //         type="password"
      //         required
      //         className="p-2 rounded-md ring-1 ring-gray-300"
      //       />
      //       <Clerk.FieldError className="text-xs text-red-400" />
      //     </Clerk.Field>
      //     <SignIn.Action
      //       submit
      //       className="bg-[#616161] sm:text-white my-1 rounded-md text-sm p-[12px]"
      //     >
      //       Sign In
      //     </SignIn.Action>
      //   </SignIn.Step>
      // </SignIn.Root>
    // </div>
  );
};

export default LoginPage;
