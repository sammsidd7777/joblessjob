import React from "react";

import Seo from "../../components/common/Seo";

import HeroSection from "../../components/home/HeroSection";
import FeaturedJobs from "../../components/home/FeaturedJobs";
import PopularCategories from "../../components/home/PopularCategories";
import StatsSection from "../../components/home/StatsSection";

import AdSlot from "../../components/common/AdSlot";
import JobJourney from "../../components/common/JobJourney";
import WhyJoblessJob from "../../components/home/WhyJoblessJob";

const Home = () => {
  return (
    <>
      {/* ================= SEO ================= */}

      <Seo
        title="Find your next great opportunity"
        description="Browse IT job opportunities across development, design, marketing, data and more. Search by skill, location, and role, and apply directly."
        path="/"
      />

      {/* ================= HERO ================= */}

      <HeroSection />
      
            <PopularCategories />

   

      {/* ================= FEATURED JOBS ================= */}

      <FeaturedJobs />
      

      {/* =====================================================
          AD 2
          Google AdSense → Google Ad
          No Google AdSense → LinkedIn Promotion
      ===================================================== */}

{/* <section className="bg-[#f7f7f3] dark:bg-[#06070a]">
  <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <AdSlot
      slot="YOUR_AD_SLOT_ID_2"
      className="w-full"
      label="Advertisement"
      fallbackTitle="More jobs. More updates. 🚀"
      fallbackDescription="Follow JoblessJob on LinkedIn for fresh job alerts, hiring updates and career opportunities."
      fallbackButton="Follow JoblessJob"
      fallbackUrl="YOUR_LINKEDIN_PAGE_LINK"
    />
  </div>
</section> */}

      {/* ================= CATEGORIES ================= */}

      {/* ================= WHY JOBLESSJOB ================= */}

      <StatsSection />

    

      {/* ================= FINAL CTA ================= */}

      {/* Removed:
          CTASection
          
          Hero already contains the main CTA/search experience.
      */}
    </>
  );
};

export default Home;