"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import Cookies from "js-cookie";

interface LoginForm {
  username: string;
  otp: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await apiService.login(data.username, data.otp);

      // Set cookies directly
      Cookies.set("token", response.token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      Cookies.set("username", data.username, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Update store
      login(response.token, data.username);

      router.push("/quotes");
      // eslint-disable-next-line
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="OTP"
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^1234$/,
                  message: "Invalid OTP",
                },
              })}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
