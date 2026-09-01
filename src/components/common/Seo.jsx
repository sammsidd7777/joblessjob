import { Helmet } from "react-helmet-async";

const SITE_NAME = "JoblessJob";
const SITE_URL = "https://jobseek-one.vercel.app"; // production frontend domain

/**
 * Seo
 *
 * Drop this at the top of any page to set its <title>, meta
 * description, and canonical URL. Centralizing it here means every
 * page's SEO tags stay consistent, and the site name / domain only
 * need updating in one place.
 *
 * - Public pages (Home, FindJob, BrowseCompanies, JobDetails): pass
 *   title + description as normal, leave noindex false.
 * - Private/login-gated pages (candidate dashboard, HR panel, etc.):
 *   pass noindex — logged-in-only pages have no value in search
 *   results and Google flags "thin"/duplicate account pages as a
 *   quality issue for the whole site.
 *
 * Usage:
 *   <Seo title="Find your next job" description="Browse verified listings..." path="/find-job" />
 *   <Seo title="My applications" noindex />
 */
const Seo = ({ title, description, path, noindex = false, image }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = path ? `${SITE_URL}${path}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />

      {!noindex && (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:title" content={fullTitle} />
          {description && <meta property="og:description" content={description} />}
          {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
          {image && <meta property="og:image" content={image} />}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={fullTitle} />
          {description && <meta name="twitter:description" content={description} />}
        </>
      )}
    </Helmet>
  );
};

export default Seo;
