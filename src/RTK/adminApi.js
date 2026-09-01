import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://job-hunt-backend-sigma.vercel.app";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/admin`,
    credentials: "include",
  }),
  tagTypes: ["AdminJobs"],
  endpoints: (builder) => ({
    getExternalJobs: builder.query({
      query: () => "/external-jobs",
      providesTags: ["AdminJobs"],
    }),

    getExternalJobById: builder.query({
      query: (id) => `/external-jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "AdminJobs", id }],
    }),

    createExternalJob: builder.mutation({
      query: (body) => ({
        url: "/external-jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminJobs"],
    }),

    updateExternalJob: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/external-jobs/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminJobs"],
    }),

    deleteExternalJob: builder.mutation({
      query: (id) => ({
        url: `/external-jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminJobs"],
    }),

    toggleExternalJobStatus: builder.mutation({
      query: (id) => ({
        url: `/external-jobs/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminJobs"],
    }),
  }),
});

export const {
  useGetExternalJobsQuery,
  useGetExternalJobByIdQuery,
  useCreateExternalJobMutation,
  useUpdateExternalJobMutation,
  useDeleteExternalJobMutation,
  useToggleExternalJobStatusMutation,
} = adminApi;
