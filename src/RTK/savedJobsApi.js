import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const savedJobsApi = createApi({
  reducerPath: "savedJobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://job-hunt-backend-sigma.vercel.app/jobs",
    credentials: "include",
  }),
  tagTypes: ["SavedJobs"],
  endpoints: (builder) => ({
    getSavedJobs: builder.query({
      query: () => "/saved-jobs",
    //   providesTags: ["SavedJobs"],
    }),

    deleteSavedJob: builder.mutation({
      query: (id) => ({
        url: `/saved-jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
    savedJob :builder.mutation({
        query:(id) =>({
            url:`/saved-jobs/${id}`,
            method:"POST",

        })
    })
  }),
});

export const {
  useGetSavedJobsQuery,
  useDeleteSavedJobMutation,
  useSavedJobMutation
} = savedJobsApi;
