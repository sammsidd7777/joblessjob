
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Seo from "../../common/Seo";
import {
  BriefcaseBusiness,
  MapPin,
  IndianRupee,
  Plus,
  X,
  Sparkles,
} from "lucide-react";

import { useCreateJobMutation } from "../../../RTK/HrService";
import NotificationToasty from "../../common/NotificationToasty";

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createJob, { isLoading }] = useCreateJobMutation();

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const addSkill = () => {
    const newSkill = skillInput.trim();

    if (!newSkill) return;

    if (
      skills.some(
        (skill) => skill.toLowerCase() === newSkill.toLowerCase()
      )
    ) {
      return;
    }

    setSkills((prev) => [...prev, newSkill]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );
  };

  const onSubmit = async (data) => {
    if (skills.length === 0) {
      setToastMessage("Please add at least one required skill.");
      setToastType("error");
      return;
    }

    try {
      const payload = {
        title: data.title,
        description: data.description,
        location: data.location,
        company: "Nike",
        employmentType: data.employmentType,

        salaryRange: {
          min: Number(data.salaryMin),
          max: Number(data.salaryMax),
        },

        skills,

        recruiter: "673340f4b26afba75dc14c8e",

        isActive: true,
      };

      await createJob(payload).unwrap();

      setToastMessage("Job created successfully!");
      setToastType("success");

      reset();
      setSkills([]);
    } catch (error) {
      console.error(error);

      setToastMessage("Failed to create job!");
      setToastType("error");
    }
  };

  return (
    <>
      <Seo title="Post a job" noindex />
      <NotificationToasty
        message={toastMessage}
        type={toastType}
      />

      <div className="min-h-full bg-gray-50 p-4 dark:bg-gray-950 sm:p-6 lg:p-8">

        {/* HEADER */}
        <div className="mb-7">

          <div className="flex items-center gap-3">

            <div className="
              rounded-xl
              bg-purple-100
              p-3
              text-purple-600
              dark:bg-purple-500/10
              dark:text-purple-400
            ">
              <BriefcaseBusiness size={24} />
            </div>

            <div>
             

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Create New Job
              </h1>
            </div>

          </div>

        

        </div>

        {/* FORM CARD */}
        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          dark:border-gray-800
          dark:bg-gray-900
        ">

          {/* CARD HEADER */}
          <div className="
            border-b
            border-gray-200
            px-5
            py-5
            dark:border-gray-800
            sm:px-8
          ">

            <div className="flex items-center gap-3">

              <Sparkles
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Job Information
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Fill in the details below to publish your job.
                </p>
              </div>

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-7 p-5 sm:p-8"
          >

            {/* TITLE + EMPLOYMENT TYPE */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Job Title
                </label>

                <input
                  {...register("title", {
                    required: "Job title is required",
                  })}
                  placeholder="Frontend React Developer"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
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

                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Employment Type
                </label>

                <select
                  {...register("employmentType", {
                    required: true,
                  })}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-purple-500
                    focus:ring-4
                    focus:ring-purple-500/10
                    dark:border-gray-700
                    dark:bg-gray-950
                    dark:text-white
                  "
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Job Description
              </label>

              <textarea
                rows={6}
                {...register("description", {
                  required: "Job description is required",
                  minLength: {
                    value: 20,
                    message:
                      "Description should be at least 20 characters",
                  },
                })}
                placeholder="Describe the responsibilities, requirements, skills and expectations..."
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
                  text-gray-900
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

              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* LOCATION + SALARY */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <MapPin size={16} />
                  Location
                </label>

                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="Remote / Delhi"
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

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <IndianRupee size={16} />
                  Minimum Salary
                </label>

                <input
                  type="number"
                  {...register("salaryMin", {
                    required: "Minimum salary is required",
                  })}
                  placeholder="30000"
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

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <IndianRupee size={16} />
                  Maximum Salary
                </label>

                <input
                  type="number"
                  {...register("salaryMax", {
                    required: "Maximum salary is required",
                  })}
                  placeholder="60000"
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

            {/* SKILLS */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Required Skills
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  value={skillInput}
                  onChange={(e) =>
                    setSkillInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Type a skill, e.g. React"
                  className="
                    flex-1
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

                <button
                  type="button"
                  onClick={addSkill}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-purple-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-purple-700
                  "
                >
                  <Plus size={18} />
                  Add Skill
                </button>

              </div>

              {skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-purple-100
                        px-3
                        py-1.5
                        text-sm
                        font-medium
                        text-purple-700
                        dark:bg-purple-500/10
                        dark:text-purple-400
                      "
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(skill)
                        }
                        className="transition hover:text-red-500"
                      >
                        <X size={15} />
                      </button>
                    </span>
                  ))}

                </div>
              )}

            </div>

            {/* SUBMIT */}
            <div className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-gray-200
              pt-6
              sm:flex-row
              sm:justify-end
              dark:border-gray-800
            ">

              <button
                type="button"
                onClick={() => {
                  reset();
                  setSkills([]);
                }}
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  dark:border-gray-700
                  dark:text-gray-300
                  dark:hover:bg-gray-800
                "
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  px-8
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
                {isLoading ? "Creating Job..." : "Create Job"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </>
  );
};

export default CreateJob;

