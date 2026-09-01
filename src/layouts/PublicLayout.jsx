import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'

const SITE_URL = "https://jobseek-one.vercel.app"; // production frontend domain
const SITE_NAME = "JoblessJob";

// Sitewide structured data — applies to every public page via this
// shared layout. WebSite + SearchAction can enable a sitelinks
// search box in Google results; Organization gives Google a
// canonical identity for the brand (helps knowledge panel eligibility).
const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/find-job?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org/",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

const PublicLayout = () => {
    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(websiteSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            </Helmet>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default PublicLayout
