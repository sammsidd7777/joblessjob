
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Seo from "../../common/Seo";
import {
  Building2,
  Camera,
  BriefcaseBusiness,
  CheckCircle2,
  Save,
  CalendarDays,
} from "lucide-react";

import {
  useGethrCompanyQuery,
  useUpdateCompanyMutation,
  
} from "../../../RTK/CompanyService";
import { useUpdateLogoMutation } from "../../../RTK/GlobalUploadService";



const CompanyProfile = () => {
  // GET COMPANY
  const {
    data,
    isLoading,
    isError,
  } = useGethrCompanyQuery();

  const company = data?.company;

  // UPDATE COMPANY
  const [
    updateCompany,
    { isLoading: saving },
  ] = useUpdateCompanyMutation();

  // UPDATE LOGO
  const [
    updateLogo,
    { isLoading: uploadingLogo },
  ] = useUpdateLogoMutation();

  // FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // LOGO PREVIEW
  const [preview, setPreview] = useState("");

  /*
  |--------------------------------------------------------------------------
  | PREFILL FORM
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!company) return;

    reset({
      companyName: company.companyName || "",
      industry: company.industry || "",
      founded: company.founded || "",
      description: company.description || "",
    });

    setPreview(company.companyLogo || "");
  }, [company, reset]);

  /*
  |--------------------------------------------------------------------------
  | UPDATE COMPANY DETAILS
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (updatedData) => {
    try {
      await updateCompany(updatedData).unwrap();

      alert("Company updated successfully");
    } catch (error) {
      alert(
        error?.data?.message ||
          "Failed to update company"
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | UPLOAD COMPANY LOGO
  |--------------------------------------------------------------------------
  */

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      /*
      |--------------------------------------------------------------------------
      | LOCAL PREVIEW
      |--------------------------------------------------------------------------
      */

      const localPreview = URL.createObjectURL(file);

      setPreview(localPreview);

      /*
      |--------------------------------------------------------------------------
      | FORM DATA
      |--------------------------------------------------------------------------
      */

      const formData = new FormData();

      formData.append("logo", file);

      /*
      |--------------------------------------------------------------------------
      | SEND TO BACKEND
      |--------------------------------------------------------------------------
      */

      await updateLogo(formData).unwrap();

      alert("Logo updated successfully");

    } catch (error) {
      console.error(error);

      alert(
        error?.data?.message ||
          "Logo upload failed"
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gray-50
        dark:bg-gray-950
      ">
        <p className="
          text-gray-500
          dark:text-gray-400
        ">
          Loading company profile...
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (isError) {
    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gray-50
        dark:bg-gray-950
      ">
        <p className="text-red-500">
          Failed to load company profile.
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="
      min-h-screen
      bg-gray-50
      p-4
      dark:bg-gray-950
      sm:p-6
      lg:p-8
    ">
      <Seo title="Company profile" noindex />

      {/* PAGE HEADER */}
      <div className="mb-8">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            rounded-xl
            bg-purple-100
            p-3
            text-purple-600
            dark:bg-purple-500/10
            dark:text-purple-400
          ">
            <Building2 size={24} />
          </div>

          <div>

            <h1 className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
              sm:text-3xl
            ">
              Company Profile
            </h1>

            <p className="
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
            ">
              Manage your company information and profile details.
            </p>

          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-3
      ">


        {/* COMPANY LOGO CARD */}
        <div className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          dark:border-gray-800
          dark:bg-gray-900
        ">

          <div className="
            flex
            flex-col
            items-center
            text-center
          ">

            {/* LOGO */}
            <div className="
              relative
              mb-5
              h-32
              w-32
              overflow-hidden
              rounded-2xl
              border-4
              border-gray-100
              bg-gray-100
              dark:border-gray-800
              dark:bg-gray-800
            ">

              {preview ? (

                <img
                  src={preview}
                  alt="Company Logo"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

              ) : (

                <div className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-gray-400
                ">
                  <Building2 size={40} />
                </div>

              )}

              {/* CAMERA BUTTON */}
              <label className="
                absolute
                bottom-2
                right-2
                flex
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-purple-600
                p-2
                text-white
                shadow-lg
                transition
                hover:bg-purple-700
              ">

                <Camera size={16} />

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleLogoUpload}
                  disabled={uploadingLogo}
                />

              </label>

            </div>


            {/* COMPANY NAME */}
            <h2 className="
              text-xl
              font-bold
              capitalize
              text-gray-900
              dark:text-white
            ">
              {company?.companyName ||
                "Your Company"}
            </h2>


            {/* INDUSTRY */}
            <p className="
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
            ">
              {company?.industry ||
                "Industry not provided"}
            </p>


            {/* UPLOAD BUTTON */}
            <label className="
              mt-5
              inline-flex
              cursor-pointer
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              px-4
              py-2.5
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              dark:border-gray-700
              dark:text-gray-300
              dark:hover:bg-gray-800
            ">

              <Camera size={16} />

              {uploadingLogo
                ? "Uploading..."
                : "Change Logo"}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleLogoUpload}
                disabled={uploadingLogo}
              />

            </label>

          </div>

        </div>


        {/* COMPANY DETAILS FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            dark:border-gray-800
            dark:bg-gray-900
            sm:p-7
            xl:col-span-2
          "
        >

          {/* FORM HEADER */}
          <div className="
            mb-6
            flex
            items-center
            gap-3
            border-b
            border-gray-200
            pb-5
            dark:border-gray-800
          ">

            <div className="
              rounded-xl
              bg-blue-100
              p-2.5
              text-blue-600
              dark:bg-blue-500/10
              dark:text-blue-400
            ">
              <Building2 size={20} />
            </div>

            <div>

              <h2 className="
                font-semibold
                text-gray-900
                dark:text-white
              ">
                Company Information
              </h2>

              <p className="
                mt-1
                text-xs
                text-gray-500
              ">
                Keep your company information updated.
              </p>

            </div>

          </div>


          {/* INPUT GRID */}
          <div className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          ">

            {/* COMPANY NAME */}
            <div>

              <label className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
                dark:text-gray-300
              ">
                Company Name
              </label>

              <input
                {...register("companyName", {
                  required:
                    "Company name is required",
                })}
                placeholder="Enter company name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-purple-500
                  focus:ring-4
                  focus:ring-purple-500/10
                  dark:border-gray-700
                  dark:bg-gray-950
                  dark:text-white
                "
              />

              {errors.companyName && (
                <p className="
                  mt-1
                  text-xs
                  text-red-500
                ">
                  {errors.companyName.message}
                </p>
              )}

            </div>


            {/* INDUSTRY */}
            <div>

              <label className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
                dark:text-gray-300
              ">
                Industry
              </label>

              <input
                {...register("industry")}
                placeholder="Technology, Finance..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-purple-500
                  focus:ring-4
                  focus:ring-purple-500/10
                  dark:border-gray-700
                  dark:bg-gray-950
                  dark:text-white
                "
              />

            </div>


            {/* FOUNDED YEAR */}
            <div>

              <label className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-gray-700
                dark:text-gray-300
              ">
                <CalendarDays size={16} />

                Founded Year
              </label>

              <input
                type="number"
                {...register("founded")}
                placeholder="2020"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-purple-500
                  focus:ring-4
                  focus:ring-purple-500/10
                  dark:border-gray-700
                  dark:bg-gray-950
                  dark:text-white
                "
              />

            </div>

          </div>


          {/* DESCRIPTION */}
          <div className="mt-5">

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-gray-700
              dark:text-gray-300
            ">
              About Company
            </label>

            <textarea
              {...register("description")}
              rows={6}
              placeholder="Tell candidates about your company..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-500/10
                dark:border-gray-700
                dark:bg-gray-950
                dark:text-white
              "
            />

          </div>


          {/* SAVE BUTTON */}
          <div className="
            mt-6
            flex
            justify-end
            border-t
            border-gray-200
            pt-5
            dark:border-gray-800
          ">

            <button
              type="submit"
              disabled={saving}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-purple-600/20
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              <Save size={17} />

              {saving
                ? "Saving Changes..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>


      {/* STATS */}
      <div className="
        mt-6
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
      ">


        {/* TOTAL JOBS */}
        <div className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          dark:border-gray-800
          dark:bg-gray-900
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              rounded-xl
              bg-blue-100
              p-3
              text-blue-600
              dark:bg-blue-500/10
              dark:text-blue-400
            ">
              <BriefcaseBusiness size={20} />
            </div>

            <div>

              <p className="
                text-sm
                text-gray-500
                dark:text-gray-400
              ">
                Total Jobs
              </p>

              <h2 className="
                mt-1
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              ">
                {company?.totalJobs || 0}
              </h2>

            </div>

          </div>

        </div>


        {/* OPEN JOBS */}
        <div className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          dark:border-gray-800
          dark:bg-gray-900
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              rounded-xl
              bg-green-100
              p-3
              text-green-600
              dark:bg-green-500/10
              dark:text-green-400
            ">
              <CheckCircle2 size={20} />
            </div>

            <div>

              <p className="
                text-sm
                text-gray-500
                dark:text-gray-400
              ">
                Open Jobs
              </p>

              <h2 className="
                mt-1
                text-2xl
                font-bold
                text-green-600
              ">
                {company?.openJobs || 0}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CompanyProfile;

