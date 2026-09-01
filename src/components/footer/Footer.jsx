import { Link } from "react-router-dom";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";
import {
  ArrowUpRight,
  Heart,
  Search,
  FileCheck2,
  MessageCircle,
  CircleCheck,
} from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: <RiFacebookFill />,
    url: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: <RiInstagramLine />,
    url: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    icon: <RiLinkedinFill />,
    url: "https://www.linkedin.com/in/sammcoder/",
  },
  {
    name: "Twitter",
    icon: <RiTwitterXFill />,
    url: "https://twitter.com",
  },
];

const journeySteps = [
  {
    label: "Searching",
    icon: Search,
  },
  {
    label: "Applying",
    icon: FileCheck2,
  },
  {
    label: "Interview",
    icon: MessageCircle,
  },
  {
    label: "Hired",
    icon: CircleCheck,
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#07080d] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            -top-40
            h-96
            w-96
            rounded-full
            bg-violet-600/[0.08]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-40
            h-96
            w-96
            rounded-full
            bg-cyan-500/[0.06]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            [background-size:55px_55px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

        {/* =====================================================
            TOP BRAND AREA
        ====================================================== */}

        <div
          className="
            mb-14
            flex
            flex-col
            gap-10
            border-b
            border-white/[0.08]
            pb-12
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="max-w-xl">

            <Link
              to="/"
              aria-label="JoblessJob Home"
              className="group inline-flex items-center gap-3"
            >

              {/* LOGO */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  shadow-[4px_4px_0_#8b5cf6]
                  transition-all
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:shadow-[6px_6px_0_#8b5cf6]
                "
              >
                <img
                  src="/favicon.png"
                  alt="JoblessJob"
                  className="h-8 w-8 object-contain"
                />
              </div>

              {/* =================================================
                  ANIMATED BRAND NAME
              ================================================= */}

              <div className="relative">

                <div className="footer-brand-name text-2xl font-black tracking-[-0.04em]">

                  <span className="text-white">
                    Job
                  </span>

                  <span className="text-violet-400">
                    less
                  </span>

                  <span className="text-white">
                    Job
                  </span>

                </div>

                {/* Animated underline */}

                <div className="absolute -bottom-1 left-0 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">

                  <div className="footer-brand-line h-full w-1/3 rounded-full bg-violet-500" />

                </div>

              </div>

            </Link>

            {/* =================================================
                BRAND DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-md
                text-sm
                leading-7
                text-slate-400
              "
            >
              Find IT opportunities without the boring job-board experience.
              Less scrolling. More finding. 🚀
            </p>


          

          </div>


          {/* =================================================
              SOCIAL
          ================================================= */}

          <div>

            <p
              className="
                mb-4
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-slate-500
              "
            >
              Follow the journey
            </p>

            <div className="flex gap-2">

              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit JoblessJob on ${social.name}`}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.04]
                    text-slate-400
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-violet-500/40
                    hover:bg-violet-500
                    hover:text-white
                  "
                >
                  <span className="text-lg">
                    {social.icon}
                  </span>
                </a>
              ))}

            </div>

          </div>

        </div>


        {/* =====================================================
            LINKS
        ====================================================== */}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* JOB SEEKERS */}

          <div>

            <h3
              className="
                mb-5
                text-xs
                font-black
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              Job Seekers
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/find-job"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-1
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  Find Jobs

                  <ArrowUpRight
                    size={13}
                    className="
                      opacity-0
                      transition-all
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/companies"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-1
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  Browse Companies

                  <ArrowUpRight
                    size={13}
                    className="
                      opacity-0
                      transition-all
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </Link>
              </li>

            </ul>

          </div>


          {/* EMPLOYERS */}

          <div>

            <h3
              className="
                mb-5
                text-xs
                font-black
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              Employers
            </h3>

            <ul className="space-y-3">

              <li>
                <span className="text-sm text-slate-500">
                  Post a Job

                  <span className="ml-2 text-[9px] font-bold text-violet-400">
                    SOON
                  </span>
                </span>
              </li>

              <li>
                <span className="text-sm text-slate-500">
                  Employer Dashboard

                  <span className="ml-2 text-[9px] font-bold text-violet-400">
                    SOON
                  </span>
                </span>
              </li>

            </ul>

          </div>


          {/* COMPANY */}

          <div>

            <h3
              className="
                mb-5
                text-xs
                font-black
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              JoblessJob
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/about"
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/disclaimer"
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  Disclaimer
                </Link>
              </li>

            </ul>

          </div>


          {/* LEGAL */}

          <div>

            <h3
              className="
                mb-5
                text-xs
                font-black
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              Legal
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/privacy"
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  to="/cookies"
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                  "
                >
                  Cookie Policy
                </Link>
              </li>

            </ul>

          </div>

        </div>


        {/* =====================================================
            BOTTOM
        ====================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-5
            border-t
            border-white/[0.08]
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} JoblessJob. All rights reserved.
          </p>

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-medium
              text-slate-500
            "
          >
            From

            <span className="font-black text-white">
              jobless
            </span>

            to

            <span className="font-black text-violet-400">
              hired
            </span>

            with

            <span className="font-black text-white">
              JoblessJob
            </span>

            <Heart
              size={13}
              className="fill-red-500 text-red-500"
              aria-hidden="true"
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          ANIMATION
      ====================================================== */}

    

    </footer>
  );
};

export default Footer;