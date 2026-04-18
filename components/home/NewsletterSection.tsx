"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

type FormValues = {
  name: string;
  email: string;
};

export const NewsletterSection = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      setStatus("idle");
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      await axios.post(`${baseUrl}/newsletter`, values);
      setStatus("success");
      reset();
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-page max-w-6xl mx-auto grid gap-10 md:grid-cols-[2fr,3fr] items-center px-6">

        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Get Hand-Picked Travel Ideas
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-6">
            Be the first to know about new packages, seasonal deals and
            exclusive travel inspiration. No spam — just unforgettable trips.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Name Field */}
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-500">
                Name
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1f6f9f]"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-500">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1f6f9f]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email"
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Button & Status */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-[#1f6f9f] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#155a80] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Join Newsletter"}
            </button>

            {status === "success" && (
              <p className="text-xs text-emerald-600">
                You&apos;re subscribed. Check your inbox.
              </p>
            )}

            {status === "error" && (
              <p className="text-xs text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};