import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loader from "../helper/Loader ";

// =====================================================
// PUBLIC / COMMON
// =====================================================

import JobDetailPage from "../components/jobs/JobDetailPage";

import PrivacyPolicy from "../pages/Legal/PrivacyPolicy";
import TermsOfService from "../pages/Legal/TermsOfService";
import About from "../pages/Legal/About";
import Contact from "../pages/Legal/Contact";
import Disclaimer from "../pages/Legal/Disclaimer";
import CookiePolicy from "../pages/Legal/CookiePolicy";
import SavedJobsHome from "../pages/candidate/SavedJobsHome";

// =====================================================
// PUBLIC LAYOUT
// =====================================================

const PublicLayout = lazy(
  () => import("../layouts/PublicLayout")
);

// =====================================================
// PUBLIC PAGES
// =====================================================

const Home = lazy(
  () => import("../pages/public/Home")
);

const BrowseCompanies = lazy(
  () => import("../pages/public/BrowseCompanies")
);

const FindJob = lazy(
  () => import("../pages/public/FindJob")
);

const CompanyDetails = lazy(
  () => import("../pages/public/CompanyDetails")
);

// =====================================================
// COMMON
// =====================================================

const NotFound = lazy(
  () => import("../components/common/NotFound")
);

const UnderConstruction = lazy(
  () => import("../components/common/UnderConstruction")
);

// =====================================================
// CANDIDATE
// =====================================================

const CandidateLayout = lazy(
  () => import("../layouts/CandidateLayout")
);

const Dashboard = lazy(
  () => import("../pages/candidate/Dashboard")
);

const Applications = lazy(
  () => import("../pages/candidate/Applications")
);

const Savejob = lazy(
  () => import("../pages/candidate/SavedJobs")
);

const Profile = lazy(
  () => import("../pages/candidate/Profile")
);

// =====================================================
// ADMIN
// =====================================================

const AdminLayout = lazy(
  () => import("../layouts/AdminLayout")
);

const AdminDashboard = lazy(
  () => import("../pages/admin/AdminDashboard")
);

const AdminJobs = lazy(
  () => import("../pages/admin/AdminJobs")
);

const AdminAddJob = lazy(
  () => import("../pages/admin/AdminJobForm")
);

const AdminEditJob = lazy(
  () => import("../pages/admin/AdminEditJob")
);

// =====================================================
// LOADABLE
// =====================================================

const Loadable = (Component) => (
  <Suspense
    fallback={
      <Loader message="Loading website..." />
    }
  >
    <Component />
  </Suspense>
);

// =====================================================
// ROUTER
// =====================================================

const router = createBrowserRouter([
  // ===================================================
  // PUBLIC WEBSITE
  // ===================================================

  {
    path: "/",
    element: Loadable(PublicLayout),

    children: [
      // Home
      {
        index: true,
        element: Loadable(Home),
      },

      {
        path: "find-job",
        element: Loadable(FindJob),
      },

      {
        path: "find-job/:searchTerm",
        element: Loadable(FindJob),
      },

      {
        path: "find-job/:searchTerm/:location",
        element: Loadable(FindJob),
      },

      // Job Details
      {
        path: "jobs/:id",
        element: Loadable(JobDetailPage),
      },
      {
        path: "jobs/:title/:location/:category/:id",
        element: Loadable(JobDetailPage),
      },

      // Companies
      {
        path: "companies",
        element: Loadable(BrowseCompanies),
      },

      // Company Details
      {
        path: "company/:id",
        element: Loadable(CompanyDetails),
      },
      {
        path:"saved-jobs",
        element:<SavedJobsHome />
      },


      // =================================================
      // LEGAL
      // =================================================

      {
        path: "about",
        element: Loadable(About),
      },

      {
        path: "contact",
        element: Loadable(Contact),
      },

      {
        path: "privacy",
        element: Loadable(PrivacyPolicy),
      },

      {
        path: "terms",
        element: Loadable(TermsOfService),
      },

      {
        path: "disclaimer",
        element: Loadable(Disclaimer),
      },

      {
        path: "cookies",
        element: Loadable(CookiePolicy),
      },

      // =================================================
      // PUBLIC 404
      // =================================================

      {
        path: "*",
        element: Loadable(NotFound),
      },
    ],
  },

  // ===================================================
  // ADMIN
  // ===================================================

  {
    path: "/admin",
    element: Loadable(AdminLayout),

    children: [
      // /admin
      {
        index: true,
        element: Loadable(AdminDashboard),
      },

      // /admin/dashboard
      {
        path: "dashboard",
        element: Loadable(AdminDashboard),
      },

      // /admin/jobs
      {
        path: "jobs",
        element: Loadable(AdminJobs),
      },

      // /admin/jobs/add
      {
        path: "jobs/new",
        element: Loadable(AdminAddJob),
      },

      // /admin/jobs/edit/:id
      {
        path: "jobs/edit/:id",
        element: Loadable(AdminEditJob),
      },

      // Future admin pages
      {
        path: "*",
        element: Loadable(UnderConstruction),
      },
    ],
  },

  // ===================================================
  // HR / EMPLOYER
  // Currently disabled
  // ===================================================

  /*
  {
    path: "/hr",
    element: Loadable(HRLayout),

    children: [
      {
        index: true,
        element: Loadable(HRDashboard),
      },

      {
        path: "dashboard",
        element: Loadable(HRDashboard),
      },

      {
        path: "add-job",
        element: Loadable(CreateJob),
      },

      {
        path: "manage-jobs",
        element: Loadable(ManageJobs),
      },

      {
        path: "applicants",
        element: Loadable(ApplicantDetails),
      },

      {
        path: "company",
        element: Loadable(CompanyProfile),
      },

      {
        path: "settings",
        element: Loadable(Settings),
      },

      {
        path: "messages",
        element: Loadable(Messages),
      },

      {
        path:
          "candidates/:candidateId/:applicationId",

        element: Loadable(ApplicantDetails),
      },
    ],
  },
  */

  // ===================================================
  // CANDIDATE
  // ===================================================

  {
    path: "/candidate",
    element: Loadable(CandidateLayout),

    children: [
      // Candidate Dashboard
      {
        index: true,
        element: Loadable(Dashboard),
      },

      // Dashboard
      {
        path: "dashboard",
        element: Loadable(Dashboard),
      },

      // Applied Jobs
      {
        path: "applications",
        element: Loadable(Applications),
      },

      // Saved Jobs
      {
        path: "saved-jobs",
        element: Loadable(Savejob),
      },

      // Profile
      {
        path: "profile",
        element: Loadable(Profile),
      },

      // Candidate 404
      {
        path: "*",
        element: Loadable(UnderConstruction),
      },
    ],
  },
]);

export default router;