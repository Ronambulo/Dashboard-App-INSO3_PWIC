"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Verification from "./Verification"; // Importamos la pantalla de verificación
import register from "@/app/lib/register";
import Image from "next/image";
import ClosedEyeSVG from "@/../public/eye-closed.svg";
import OpenEyeSVG from "@/../public/eye-open.svg";

export default function Register() {
  const [isVerification, setIsVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await register(data.email, data.password);
      setIsVerification(true); // Cambiar a la pantalla de verificación
    } catch (error) {
      alert("Error during registration.");
    }
  };

  if (isVerification) return <Verification />;

  return (
    <div className="w-[448px]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white">
          Create your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...formRegister("email", { required: "Email is required" })}
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
                {...formRegister("password", {
                  required: "Password is required",
                })}
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
            Sign up with email
          </button>
        </form>
      </div>
    </div>
  );
}
