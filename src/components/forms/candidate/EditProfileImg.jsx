import React from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Image as ImageIcon } from "lucide-react";

import { useUploadImageMutation } from "../../../RTK/GlobalUploadService";
import { useUploadProfileImgMutation } from "../../../RTK/AuthService";

const EditProfileImg = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uploadImage, { isLoading: uploading }] =
    useUploadImageMutation();

  const [UploadProfileImg, { isLoading: updating }] =
    useUploadProfileImgMutation();

 

  const onSubmit = async (data) => {
    try {

      const formData = new FormData();

      formData.append("image", data.image[0]);

      // Upload image
      const uploadResponse = await uploadImage(formData).unwrap();

      const imageUrl =
        uploadResponse.url ||
        uploadResponse.image ||
        uploadResponse.data?.url;

      if (!imageUrl) {
        throw new Error("Image URL not returned from server");
      }

      // Update user profile image
      await UploadProfileImg({
        url: imageUrl,
      }).unwrap();

      onClose(false);

    } catch (error) {
      console.error("Profile image update failed:", error);
      alert("Failed to update profile image");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Update Profile Picture
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose a new profile image
            </p>
          </div>

          <button
            type="button"
            onClick={() => onClose(false)}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={20} />
          </button>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* FILE INPUT */}
          <label
            htmlFor="profile-image"
            className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-500 dark:hover:bg-blue-950/20"
          >

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:scale-105 dark:bg-blue-900/40 dark:text-blue-400">
              <ImageIcon size={30} />
            </div>

            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Choose Profile Image
            </p>

            <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
              JPG, PNG or WEBP
            </p>

            <input
              id="profile-image"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              {...register("image", {
                required: "Profile image is required",
              })}
              className="hidden"
            />

          </label>


          {/* ERROR */}
          {errors.image && (
            <p className="text-sm text-red-500">
              {errors.image.message}
            </p>
          )}


          {/* ACTIONS */}
          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading || updating}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Upload size={17} />

              {uploading || updating
                ? "Updating..."
                : "Update Image"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProfileImg;