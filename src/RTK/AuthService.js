// src/redux/services/AuthService.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthService = createApi({
  reducerPath: "AuthService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://job-hunt-backend-sigma.vercel.app/", // ✅ backend base URL
    credentials: "include", // ✅ send and receive cookies

  }),

  endpoints: (builder) => ({
    // 📝 REGISTER USER
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // 🔑 LOGIN USER
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
    }),

    // 👤 GET CURRENT USER PROFILE (protected)
    getProfile: builder.query({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
    }),

    getUserDashboard: builder.query({
      query: () => ({
        url: "users/dashboad",
        method: "GET",
      }),
    }),


    getApplyList: builder.query({
      query: () => ({
        url: "applications/my",
        method: "GET"
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "users/profile",
        method: "PUT",
        body: data
      }),
    }),

    UploadResume: builder.mutation({
      query: (formData) => ({
        url: "users/updtRes",
        method: "post",
        body: formData
      }),
    }),

    UploadProfileImg: builder.mutation({
      query: (url) => ({
        url: "users/profilePic",
        method: "post",
        body: url
      }),
    }),



    addEducation: builder.mutation({
      query: (data) => ({
        url: "users/addEducation",
        method: "post",
        body: data
      }),
    }),

    // 🚪 LOGOUT USER
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),


    getFilteredJobs: builder.query({
      query: ({ search, location, employmentType, skill }) => ({
        url: "/jobs",
        params: {
          title: search || "",
          location: location || "",
          employmentType: employmentType,
          skill: skill || ""
        },
      }),
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useLogoutUserMutation,
  useUpdateProfileMutation,
  useGetApplyListQuery,
  useGetFilteredJobsQuery,
  useUploadResumeMutation,
  useGetUserDashboardQuery,
  useUploadProfileImgMutation,
  useAddEducationMutation,
} = AuthService;
