import React, { useState } from 'react'
import { useGetProfileQuery, useUploadResumeMutation } from '../../RTK/AuthService';
import Seo from '../../components/common/Seo';

const Resume = () => {

  const { data: user } = useGetProfileQuery();
  const [showResumeModel, setShowResumeModal] = useState(false)
  const [uploadResume] = useUploadResumeMutation();



  const prev = user?.user?.resume || user?.resume

  const handleSubmit = async (e) => {

    try {
      const resume = e?.target?.files[0];

      const formData = new FormData();
      formData.append("resume", resume);

      console.log(formData,"formdata")
      const uptRes = await uploadResume(formData).unwrap()

      if (!uptRes) {
        throw new Error("api error");

      }

      console.log(uptRes, "updtres")

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="w-full">
      <Seo title="My resume" noindex />

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Your Resume
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Keep your resume updated to improve your job opportunities.
            </p>
          </div>

        
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

          {/* LEFT */}
          <div className="space-y-6 xl:col-span-2">

            {/* CURRENT RESUME */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Current Resume
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your active resume used for job applications
                  </p>
                </div>

                {prev && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    ● Active
                  </span>
                )}
              </div>

              {prev ? (
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">
                      PDF
                    </div>

                    <div>
                      <p className="max-w-[280px] truncate font-medium">
                        {prev.split("/").pop()}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Active resume
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-2">

                    <a
                      href={`http://localhost:5000/${prev}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-white dark:border-slate-700 dark:hover:bg-slate-700"
                    >
                      View
                    </a>
                    {/* 
                  <button
                    type="button"
                    onClick={() => setShowResumeModal(true)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Replace
                  </button> */}

                  </div>

                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">

                  <div className="mb-3 text-3xl">
                    📄
                  </div>

                  <p className="text-sm text-slate-500">
                    No resume uploaded yet.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowResumeModal(true)}
                    className="mt-3 text-sm font-medium text-blue-600 hover:underline"
                  >
                    Upload Resume
                  </button>

                </div>
              )}

            </div>

            {/* UPDATE RESUME */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-5">
                <h3 className="font-semibold">
                  Update Resume
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Upload your latest resume to keep your profile up to date.
                </p>
              </div>

              <form >
                <label
                  htmlFor="resume-upload"
                  className="block w-full cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 p-12 text-center transition hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/30"
                >
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.rtf"
                    className="hidden"
                    onChange={(e) => handleSubmit(e)}
                  />

                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-950/40">
                    ☁️
                  </div>

                  <p className="font-medium">
                    Click to upload a new resume
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    PDF, DOCX, RTF • Maximum 5MB
                  </p>
                </label>
              </form>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* PREVIEW */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Resume Preview
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Preview your current resume
                  </p>
                </div>

                <span className="text-xl">
                  👁
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">

                {prev ? (
                  <object
                    data={`http://localhost:5000/${prev}`}
                    type="application/pdf"
                    className="h-[420px] w-full bg-white"
                  >
                    <div className="p-5 text-sm text-slate-500">
                      PDF preview is not supported.

                      <a
                        href={prev}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1 text-blue-600 underline"
                      >
                        Open Resume
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex h-[420px] items-center justify-center text-sm text-slate-400">
                    No resume available
                  </div>
                )}

              </div>

            </div>

            {/* TIP */}
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">

              <h3 className="mb-2 font-semibold text-blue-800 dark:text-blue-300">
                💡 Resume Tip
              </h3>

              <p className="text-sm leading-6 text-blue-700 dark:text-blue-400">
                Keep your resume concise and highlight your achievements using measurable results whenever possible.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* YOUR MODAL + API LOGIC HERE */}

    </div>
  );
}

export default Resume
