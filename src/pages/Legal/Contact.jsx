import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  BriefcaseBusiness,
  AlertTriangle,
  HelpCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      return;
    }

    const emailSubject = encodeURIComponent(
      `JoblessJob - ${subject}`
    );

    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:siddarrthg936@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">

        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[120px]" />

          <div className="absolute right-[-120px] top-[25%] h-[350px] w-[350px] rounded-full bg-indigo-500/[0.07] blur-[110px]" />

          <div className="absolute bottom-[-150px] left-[-100px] h-[320px] w-[320px] rounded-full bg-cyan-500/[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            {/* Badge */}
            <div
              className="
                mb-6 inline-flex items-center gap-2
                rounded-full
                border border-blue-200
                bg-blue-50
                px-4 py-2
                text-xs font-semibold
                text-blue-600
                dark:border-blue-900/50
                dark:bg-blue-950/30
                dark:text-blue-400
              "
            >
              <MessageSquare size={14} aria-hidden="true" />
              Get in touch
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl font-black tracking-tight
                text-slate-950
                sm:text-5xl
                lg:text-6xl
                dark:text-white
              "
            >
              Let's
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-600
                  to-violet-600
                  bg-clip-text
                  text-transparent
                "
              >
                talk.
              </span>
            </h1>

            <p
              className="
                mx-auto mt-6 max-w-2xl
                text-base leading-7
                text-slate-500
                sm:text-lg
                dark:text-slate-400
              "
            >
              Have a question, suggestion, feedback, or want to
              report an issue? We'd love to hear from you.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =================================================
              LEFT
          ================================================== */}
          <div>

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Contact JoblessJob
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              How can we help?
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Whether you have a question about JoblessJob, want to
              share feedback, or need to report an issue with a job
              listing, you can reach us by email.
            </p>

            {/* Email Card */}
            <div
              className="
                mt-8 rounded-2xl
                border border-slate-200
                bg-white p-6
                shadow-sm
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex items-start gap-4">

                <div
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                    dark:bg-blue-950/40
                    dark:text-blue-400
                  "
                >
                  <Mail size={22} aria-hidden="true" />
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>

                  <a
                    href="mailto:siddarrthg936@gmail.com"
                    className="
                      mt-1 block break-all
                      text-sm font-bold
                      text-slate-900
                      transition
                      hover:text-blue-600
                      dark:text-white
                      dark:hover:text-blue-400
                    "
                  >
                    siddarrthg936@gmail.com
                  </a>

                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    For general questions, feedback, job listing
                    issues, and other enquiries.
                  </p>

                </div>

              </div>
            </div>

            {/* Owner Card */}
            <div
              className="
                mt-4 rounded-2xl
                border border-slate-200
                bg-white p-6
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex items-start gap-4">

                <div
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-indigo-100
                    text-indigo-600
                    dark:bg-indigo-950/40
                    dark:text-indigo-400
                  "
                >
                  <MessageSquare size={22} aria-hidden="true" />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    JoblessJob
                  </p>

                  <p className="mt-1 text-base font-bold">
                    Managed by Siddarth
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    For website-related enquiries, please use the
                    email address provided above.
                  </p>

                </div>

              </div>
            </div>

          </div>

          {/* =================================================
              RIGHT - FORM
          ================================================== */}
          <div
            className="
              rounded-3xl
              border border-slate-200
              bg-white p-7
              shadow-[0_25px_70px_-30px_rgba(15,23,42,0.25)]
              sm:p-9
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div className="mb-7">

              <h2 className="text-2xl font-black tracking-tight">
                Send us a message
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Fill in the details below and we'll receive your
                message through email.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>

                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Enter your name"
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-3
                    text-sm text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-slate-700
                    dark:bg-slate-800/70
                    dark:text-white
                    dark:focus:bg-slate-800
                  "
                />

              </div>

              {/* Email */}
              <div>

                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-3
                    text-sm text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-slate-700
                    dark:bg-slate-800/70
                    dark:text-white
                    dark:focus:bg-slate-800
                  "
                />

              </div>

              {/* Subject */}
              <div>

                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  defaultValue=""
                  required
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-3
                    text-sm text-slate-900
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-slate-700
                    dark:bg-slate-800/70
                    dark:text-white
                    dark:focus:bg-slate-800
                  "
                >

                  <option value="" disabled>
                    Select a subject
                  </option>

                  <option value="General Enquiry">
                    General Enquiry
                  </option>

                  <option value="Job Listing Issue">
                    Job Listing Issue
                  </option>

                  <option value="Company Information">
                    Company Information
                  </option>

                  <option value="Website Feedback">
                    Website Feedback
                  </option>

                  <option value="Partnership Enquiry">
                    Partnership Enquiry
                  </option>

                  <option value="Advertising Enquiry">
                    Advertising Enquiry
                  </option>

                  <option value="Privacy Request">
                    Privacy Request
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* Message */}
              <div>

                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Write your message..."
                  className="
                    w-full resize-none rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-3
                    text-sm leading-6
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-slate-700
                    dark:bg-slate-800/70
                    dark:text-white
                    dark:focus:bg-slate-800
                  "
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  group flex w-full
                  items-center justify-center gap-2
                  rounded-xl
                  bg-slate-950
                  px-5 py-3.5
                  text-sm font-bold
                  text-white
                  shadow-lg
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-blue-600
                  hover:shadow-blue-600/20
                  active:translate-y-0
                  dark:bg-blue-600
                  dark:hover:bg-blue-700
                "
              >

                <Send
                  size={17}
                  aria-hidden="true"
                />

                Send Message

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />

              </button>

              {/* Success message */}
              {submitted && (
                <div
                  className="
                    flex items-start gap-3
                    rounded-xl
                    border border-green-200
                    bg-green-50
                    p-4
                    text-sm
                    text-green-700
                    dark:border-green-900/40
                    dark:bg-green-950/20
                    dark:text-green-400
                  "
                  role="status"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <p>
                    Your email client should open shortly. If it doesn't,
                    please email us directly at{" "}
                    <a
                      href="mailto:siddarrthg936@gmail.com"
                      className="font-bold underline"
                    >
                      siddarrthg936@gmail.com
                    </a>
                    .
                  </p>
                </div>
              )}

            </form>

          </div>

        </div>
      </section>

      {/* =====================================================
          REASONS TO CONTACT
      ====================================================== */}
      <section
        className="
          border-y border-slate-200
          bg-white
          dark:border-slate-800
          dark:bg-slate-900/40
        "
      >

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Need Help?
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              You can contact us about
            </h2>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* Job */}
            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-slate-50
                p-6
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              <BriefcaseBusiness
                size={23}
                className="text-blue-600 dark:text-blue-400"
              />

              <h3 className="mt-4 text-base font-bold">
                Job Listing
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Report incorrect, outdated, or misleading job information.
              </p>

            </div>

            {/* Feedback */}
            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-slate-50
                p-6
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              <MessageSquare
                size={23}
                className="text-indigo-600 dark:text-indigo-400"
              />

              <h3 className="mt-4 text-base font-bold">
                Website Feedback
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Share suggestions or ideas to improve JoblessJob.
              </p>

            </div>

            {/* General */}
            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-slate-50
                p-6
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              <HelpCircle
                size={23}
                className="text-violet-600 dark:text-violet-400"
              />

              <h3 className="mt-4 text-base font-bold">
                General Enquiry
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Have a question about JoblessJob? Send us a message.
              </p>

            </div>

            {/* Report */}
            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-slate-50
                p-6
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              <AlertTriangle
                size={23}
                className="text-orange-600 dark:text-orange-400"
              />

              <h3 className="mt-4 text-base font-bold">
                Report an Issue
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Let us know if something on the website isn't working correctly.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT JOB NOTICE
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div
          className="
            rounded-3xl
            border border-blue-200
            bg-blue-50
            p-7
            dark:border-blue-900/40
            dark:bg-blue-950/20
            sm:p-10
          "
        >

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-xl
                bg-blue-100
                text-blue-600
                dark:bg-blue-950/50
                dark:text-blue-400
              "
            >
              <AlertTriangle size={22} />
            </div>

            <div>

              <h2 className="text-lg font-bold">
                Before applying for a job
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Always verify the company, recruiter, job requirements,
                application process, and other important details before
                sharing personal or financial information.
              </p>

              <Link
                to="/disclaimer"
                className="
                  mt-4 inline-flex
                  items-center gap-2
                  text-sm font-bold
                  text-blue-600
                  transition
                  hover:text-blue-700
                  dark:text-blue-400
                  dark:hover:text-blue-300
                "
              >
                Read our Disclaimer
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;