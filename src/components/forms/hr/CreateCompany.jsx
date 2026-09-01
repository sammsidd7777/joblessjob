// src/components/Forms/CreateCompany.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Building2, Image, FileText, X } from "lucide-react";
import { useCreateCompanyMutation } from "../../../RTK/CompanyService";

const CreateCompany = ({ onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  const [createCompany, { isLoading }] =
    useCreateCompanyMutation();

  const onSubmit = async (companyData) => {
    setMessage("");

    try {
      const res = await createCompany(companyData).unwrap();

      setMessage("🎉 Company created successfully!");

      // Send created company back to Register.jsx
      if (onSuccess) {
        onSuccess(res.company || res.data || res);
      }

    } catch (err) {
      setMessage(
        err?.data?.message || "Error creating company"
      );
    }
  };

  return (
    <div className="relative w-full max-w-lg rounded-3xl bg-white p-6">

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <Building2 size={25} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Create New Company
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add your company details to create a new company profile.
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-600">
          {message}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Company Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Building2 size={16} />
            Company Name
          </label>

          <input
            {...register("companyName", {
              required: "Company name is required",
            })}
            placeholder="Google / Amazon"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />

          {errors.companyName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FileText size={16} />
            Description
          </label>

          <textarea
            rows="4"
            {...register("description")}
            placeholder="Write a short company description..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Logo */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Image size={16} />
            Logo URL
          </label>

          <input
            {...register("companyLogo")}
            placeholder="https://logo.com/image.png"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating..." : "Create Company"}
          </button>

        </div>
      </form>
    </div>
  );
};

export default CreateCompany;