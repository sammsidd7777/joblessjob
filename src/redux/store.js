import { configureStore } from "@reduxjs/toolkit";
import { AuthService } from "../RTK/AuthService";
import authReducer from "./authSlice";
import { HrService } from "../RTK/HrService";
import { CompanyService } from "../RTK/CompanyService";
import { savedJobsApi } from "../RTK/savedJobsApi";
import { GlobalUploadService } from "../RTK/GlobalUploadService";
import { adminApi } from "../RTK/adminApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [AuthService.reducerPath]: AuthService.reducer,
    [HrService.reducerPath]: HrService.reducer,
    [CompanyService.reducerPath]: CompanyService.reducer,
    [savedJobsApi.reducerPath]:savedJobsApi.reducer,
    [GlobalUploadService.reducerPath]:GlobalUploadService.reducer,
    [adminApi.reducerPath]:adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthService.middleware).concat(HrService.middleware).concat(CompanyService.middleware).concat(savedJobsApi.middleware).concat(GlobalUploadService.middleware).concat(adminApi.middleware                                ),
});
