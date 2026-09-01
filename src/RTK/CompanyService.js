import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CompanyService = createApi({
  reducerPath: "CompanyService",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://job-hunt-backend-sigma.vercel.app/", // ✅ backend base URL
    credentials: "include", // ✅ allows cookies (JWT sessions)
  }),

  tagTypes: ["company", "Applications"], // 👈 added for cache invalidation if needed

  endpoints: (builder) => ({

    // 🟢 CREATE JOB
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "company/",
        method: "POST",
        body: companyData,
      }),
      invalidatesTags: ["company"],
    }),

    // 🟠 UPDATE JOB
    updateCompany: builder.mutation({
      query: (updatedData) => ({
        url: `company/`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["company"],
    }),

    // 🔴 DELETE JOB
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),

    // 🔵 GET ALL company
    getAllcompany: builder.query({
      query: () => ({
        url: "company/",
        method: "GET",
      }),
      providesTags: ["company"],
    }),


    gethrCompany: builder.query({
      query: () => "company/hrCompany",
    }),

    // 🟣 GET SINGLE COMPANY (public detail page)
    getCompanyById: builder.query({
      query: (id) => `company/${id}`,
      providesTags: (result, error, id) => [{ type: "company", id }],
    }),


    applyJob: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `applications/${jobId}`,
        method: "POST",
        body: data,
      }),
    }),









  }),
});

// ✅ Export hooks
export const {
  useCreateCompanyMutation,
  useGetAllcompanyQuery,
  useApplyJobMutation,
  useUpdateCompanyMutation,
  useGethrCompanyQuery,
  useGetCompanyByIdQuery,

} = CompanyService;
