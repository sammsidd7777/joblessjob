import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import Seo from "./Seo";

/**
 * NotFound
 *
 * Public-facing 404. Distinct from <UnderConstruction /> (which is
 * used for HR/candidate features that are simply unbuilt yet) —
 * this is for genuinely nonexistent public URLs, so it's marked
 * noindex and offers real links back into the site instead of a
 * dead end, which also helps keep visitors (and crawlers) engaged
 * with real content rather than bouncing.
 */
const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f8fc] px-4 text-slate-900 dark:bg-[#080b14] dark:text-white">
      <Seo title="Page not found" noindex />
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 dark:bg-white/[0.06] dark:text-slate-500">
          <SearchX size={36} />
        </div>
        <h1 className="font-serif text-2xl font-medium tracking-[-0.01em] text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
          >
            Go home
          </Link>
          <Link
            to="/find-job/*"
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
