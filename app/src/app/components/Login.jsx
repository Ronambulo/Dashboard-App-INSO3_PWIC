"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import login from "@/app/lib/login";
import Image from "next/image";
import ClosedEyeSVG from "@/../public/eye-closed.svg";
import OpenEyeSVG from "@/../public/eye-open.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      if (response.token) {
        router.push("/dashboard/clients");
      } else {
        alert("Login failed");
        setValue("password", ""); // Clear the password field
      }
    } catch (error) {
      alert("Login failed: " + error.message);
      setValue("password", ""); // Clear the password field
    }
  };

  return (
    <div className="w-[448px]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-5 py-3 text-lg text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="h-5 text-base text-red-500">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-5 py-3 text-lg text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                <Image
                  src={showPassword ? OpenEyeSVG : ClosedEyeSVG}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={28}
                  height={28}
                />
              </button>
            </div>
            <p className="h-5 text-base text-red-500">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
