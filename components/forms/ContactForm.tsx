"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>();

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setStatus("idle");
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      await axios.post(`${baseUrl}/enquiries/contact`, values);
      setStatus("success");
      reset();
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl bg-white p-5 shadow-card"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs text-slate-600">Full name</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-xs text-slate-600">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="text-xs text-slate-600">Phone (optional)</label>
        <input
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
          {...register("phone")}
        />
      </div>
      <div>
        <label className="text-xs text-slate-600">How can we help?</label>
        <textarea
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
          {...register("message", {
            required: "Please tell us about your trip or question"
          })}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
        {status === "success" && (
          <p className="text-xs text-emerald-600">
            Message received — a consultant will get back to you.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
};

