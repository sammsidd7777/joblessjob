import Seo from "../../components/common/Seo";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-16 text-slate-900 dark:bg-[#080b14] dark:text-white sm:px-6">
      <Seo
        title="Terms of Service"
        description="Read the terms and conditions for using JoblessJob, a job discovery platform."
        path="/terms"
      />

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div>
          <span
            className="
              inline-flex rounded-full
              border border-blue-200
              bg-blue-50
              px-3 py-1
              text-xs font-semibold
              text-blue-600
              dark:border-blue-900/50
              dark:bg-blue-950/30
              dark:text-blue-400
            "
          >
            JoblessJob
          </span>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Terms of Service
          </h1>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated: August 26, 2026
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-10 space-y-10 text-[14px] leading-7 text-slate-600 dark:text-slate-300">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>

            <p className="mt-3">
              By accessing or using JoblessJob, you agree to comply with these
              Terms of Service. If you do not agree with these terms, please
              discontinue use of the website.
            </p>

            <p className="mt-3">
              JoblessJob is owned and managed by Siddarth.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. About JoblessJob
            </h2>

            <p className="mt-3">
              JoblessJob is a job discovery platform that provides users with
              access to job opportunities and related career information.
            </p>

            <p className="mt-3">
              Job listings may contain information about companies, positions,
              locations, salaries, skills, and application opportunities.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Job Listings
            </h2>

            <p className="mt-3">
              JoblessJob aims to provide useful and relevant job information,
              but we do not guarantee that every job listing is accurate,
              complete, current, available, or suitable for a particular user.
            </p>

            <p className="mt-3">
              Job listings may change, expire, or be removed without prior
              notice.
            </p>

            <p className="mt-3">
              Users should independently verify important information about a
              job, company, recruiter, salary, location, and application
              process before applying.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. External Links and Applications
            </h2>

            <p className="mt-3">
              Some job listings may direct you to external websites,
              recruitment platforms, company websites, or application pages.
            </p>

            <p className="mt-3">
              These external websites are not controlled by JoblessJob. We are
              not responsible for their content, availability, security,
              privacy practices, or terms.
            </p>

            <p className="mt-3">
              Any application submitted through an external website is subject
              to that website's policies and terms.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. User Responsibilities
            </h2>

            <p className="mt-3">
              When using JoblessJob, you agree to use the website lawfully and
              responsibly.
            </p>

            <p className="mt-3">
              You must not:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Use the website for unlawful or fraudulent purposes.
              </li>

              <li>
                Attempt to interfere with or damage the website.
              </li>

              <li>
                Attempt to gain unauthorized access to restricted areas or
                systems.
              </li>

              <li>
                Use automated methods to excessively scrape or abuse the
                website.
              </li>

              <li>
                Submit or distribute misleading, harmful, or illegal content
                through the website.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              6. Job Applications
            </h2>

            <p className="mt-3">
              JoblessJob is primarily intended to help users discover
              opportunities. A job listing on JoblessJob does not guarantee an
              interview, employment, compensation, or any other outcome.
            </p>

            <p className="mt-3">
              Decisions regarding applications, interviews, hiring,
              compensation, and employment are made by the relevant employer
              or recruiting organization.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              7. No Employment Guarantee
            </h2>

            <p className="mt-3">
              JoblessJob does not act as an employer, recruitment agency, or
              representative of employers unless explicitly stated.
            </p>

            <p className="mt-3">
              We do not guarantee that users will obtain employment through
              the use of the website.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              8. Advertising
            </h2>

            <p className="mt-3">
              JoblessJob may display advertisements from third-party
              advertising providers.
            </p>

            <p className="mt-3">
              Advertisements may link to third-party websites. JoblessJob is
              not responsible for the products, services, claims, or content
              provided by advertisers or external websites.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              9. Intellectual Property
            </h2>

            <p className="mt-3">
              Unless otherwise stated, the JoblessJob website, branding,
              design, logos, original text, graphics, and other original
              content are owned by or used by JoblessJob with appropriate
              rights.
            </p>

            <p className="mt-3">
              You may not reproduce, copy, modify, distribute, or commercially
              exploit JoblessJob's original content without appropriate
              permission.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              10. Website Availability
            </h2>

            <p className="mt-3">
              We aim to keep JoblessJob available and functioning properly,
              but we do not guarantee uninterrupted or error-free access.
            </p>

            <p className="mt-3">
              We may modify, suspend, restrict, or discontinue any part of the
              website at any time.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              11. Disclaimer
            </h2>

            <p className="mt-3">
              JoblessJob is provided on an "as available" basis. We make no
              guarantee that the website or its job information will always
              be accurate, complete, reliable, or available.
            </p>

            <p className="mt-3">
              Users should independently verify information before making
              decisions based on a job listing or other information available
              through JoblessJob.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              12. Limitation of Liability
            </h2>

            <p className="mt-3">
              To the extent permitted by applicable law, JoblessJob and its
              owner shall not be responsible for losses or damages resulting
              from the use of the website, reliance on job listings, external
              websites, advertisements, or employment-related decisions.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              13. Changes to These Terms
            </h2>

            <p className="mt-3">
              We may update these Terms of Service from time to time.
              Changes will be published on this page along with an updated
              "Last updated" date.
            </p>

            <p className="mt-3">
              Your continued use of JoblessJob after changes are published
              means that you accept the updated terms.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              14. Contact Us
            </h2>

            <p className="mt-3">
              If you have any questions about these Terms of Service, you can
              contact JoblessJob at:
            </p>

            <div
              className="
                mt-4 rounded-2xl
                border border-slate-200
                bg-white p-5
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Siddarth
              </p>

              <a
                href="mailto:siddarrthg936@gmail.com"
                className="
                  mt-1 inline-block
                  text-sm font-medium
                  text-blue-600
                  hover:text-blue-700
                  dark:text-blue-400
                  dark:hover:text-blue-300
                "
              >
                siddarrthg936@gmail.com
              </a>
            </div>
          </section>

          {/* FINAL NOTICE */}
          <section
            className="
              rounded-2xl
              border border-blue-200
              bg-blue-50
              p-5
              dark:border-blue-900/40
              dark:bg-blue-950/20
            "
          >
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              By using JoblessJob, you acknowledge that you have read and
              understood these Terms of Service.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
};

export default TermsOfService;