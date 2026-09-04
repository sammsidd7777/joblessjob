import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowUpRight,
    Bookmark,
    CheckCircle2,
    Clock3,
    ExternalLink,
    MapPin,
    MessageCircle,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Share2,
    ShieldCheck,
    Mail,
    X,
    Phone,
} from "lucide-react";

import ApplyJobForm from "../../components/forms/hr/ApplyJobForm";
import Seo from "../../components/common/Seo";

const JobDetail = ({
    job,
    isSaved,
    isSaving,
    onSave,
    onApply,
    onBack,
}) => {
    const [isApply, setIsApply] = useState(false);
    const [showExternalPopup, setShowExternalPopup] = useState(false);
    const [selectedApplyMethod, setSelectedApplyMethod] = useState("");

    if (!job) return null;

    /* =========================================================
       COMPANY
    ========================================================= */

    const companyName =
        job?.company?.companyName ||
        job?.company?.name ||
        job?.companyName ||
        "Company";

    const companyLogo =
        job?.companyLogo ||
        job?.company?.companyLogo ||
        job?.company?.logo ||
        "";

    /* =========================================================
       JOB DATA
    ========================================================= */

    const title =
        job?.title || "Untitled Job";

    const location =
        job?.location || "Location not specified";

    const employmentType =
        job?.employmentType || "Full-time";

    const skills = Array.isArray(job?.skills)
        ? job.skills
        : [];

    const description =
        job?.description ||
        "No job description available.";

    /* =========================================================
       APPLY DATA
    ========================================================= */

    const applicationEmail =
        job?.applicationEmail ||
        job?.email ||
        job?.applyEmail ||
        "";

    const externalApplyUrl =
        job?.externalApplyUrl ||
        job?.applyUrl ||
        job?.websiteUrl ||
        job?.applicationUrl ||
        "";

    /*
     * MOBILE / WHATSAPP
     *
     * Supports multiple possible backend field names.
     */

    const whatsappNumber =
        job?.whatsappNumber ||
        job?.whatsapp ||
        job?.whatsappPhone ||
        job?.mobileNumber ||
        job?.mobile ||
        job?.phoneNumber ||
        job?.phone ||
        job?.contactNumber ||
        job?.applicationPhone ||
        job?.recruiterPhone ||
        job?.hrPhone ||
        "";

    const whatsappMessage =
        job?.whatsappMessage ||
        "";

    /* =========================================================
       APPLY METHOD
    ========================================================= */

    const applyMethod = String(
        job?.applyMethod || ""
    )
        .trim()
        .toLowerCase();

    /* =========================================================
       AVAILABLE APPLY METHODS
    ========================================================= */

    const hasEmailApply = Boolean(
        String(applicationEmail).trim()
    );

    const hasWhatsAppApply = Boolean(
        String(whatsappNumber).trim()
    );

    const hasWebsiteApply = Boolean(
        String(externalApplyUrl).trim()
    );

    const hasDirectApply =
        hasEmailApply ||
        hasWhatsAppApply ||
        hasWebsiteApply;

    /*
     * Internal apply only when there is
     * absolutely no external application method.
     */

    const isInternalApply =
        !hasDirectApply &&
        (
            !applyMethod ||
            applyMethod === "internal"
        );

    const isEmailApply =
        selectedApplyMethod === "email";

    const isWhatsAppApply =
        selectedApplyMethod === "whatsapp";

    const isWebsiteApply =
        selectedApplyMethod === "website";

    /* =========================================================
       SALARY
    ========================================================= */

    const getSalaryText = () => {
        const salary = job?.salaryRange;

        if (!salary) {
            return "Negotiable";
        }

        if (typeof salary === "string") {
            return salary.trim() || "Negotiable";
        }

        if (typeof salary === "number") {
            return `₹${salary.toLocaleString("en-IN")}`;
        }

        if (typeof salary === "object") {
            const min =
                salary?.min ??
                salary?.minimum ??
                "";

            const max =
                salary?.max ??
                salary?.maximum ??
                "";

            if (min && max) {
                return `₹${Number(min).toLocaleString(
                    "en-IN"
                )} – ₹${Number(max).toLocaleString(
                    "en-IN"
                )}`;
            }

            if (min) {
                return `₹${Number(min).toLocaleString(
                    "en-IN"
                )}+`;
            }

            if (max) {
                return `Up to ₹${Number(max).toLocaleString(
                    "en-IN"
                )}`;
            }
        }

        return "Negotiable";
    };

    const salaryText = getSalaryText();

    /* =========================================================
       DATE
    ========================================================= */

    const postedDate = job?.createdAt
        ? new Date(job.createdAt).toLocaleDateString(
              "en-IN",
              {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
              }
          )
        : null;

    /* =========================================================
       EMAIL APPLICATION
    ========================================================= */

    const openEmailApplication = () => {
        if (!applicationEmail) {
            return;
        }

        const subject =
            `Application for ${title}`;

        const body = `Hello,

I am interested in applying for the ${title} position at ${companyName}.

Please find my updated CV/resume attached.

Thank you.`;

        const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1` +
            `&to=${encodeURIComponent(applicationEmail)}` +
            `&su=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        window.open(
            gmailUrl,
            "_blank",
            "noopener,noreferrer"
        );

        setShowExternalPopup(false);
    };

    /* =========================================================
       WHATSAPP APPLICATION
    ========================================================= */

    const openWhatsAppApplication = () => {
        if (!whatsappNumber) {
            return;
        }

        let cleanNumber =
            String(whatsappNumber).replace(/\D/g, "");

        /*
         * Automatically add India country code
         * for 10 digit numbers.
         */

        if (cleanNumber.length === 10) {
            cleanNumber = `91${cleanNumber}`;
        }

        const message =
            whatsappMessage ||
            `Hello, I am interested in applying for the ${title} position at ${companyName}.`;

        const whatsappUrl =
            `https://wa.me/${cleanNumber}` +
            `?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

        setShowExternalPopup(false);
    };

    /* =========================================================
       WEBSITE APPLICATION
    ========================================================= */

    const openWebsiteApplication = () => {
        if (!externalApplyUrl) {
            return;
        }

        let url =
            String(externalApplyUrl).trim();

        if (
            !url.startsWith("http://") &&
            !url.startsWith("https://")
        ) {
            url = `https://${url}`;
        }

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

        setShowExternalPopup(false);
    };

    /* =========================================================
       APPLY HANDLER
    ========================================================= */

    const handleApply = (method = null) => {
        /*
         * External method selected
         */

        if (method) {
            setSelectedApplyMethod(method);
            setShowExternalPopup(true);
            return;
        }

        /*
         * Internal application
         */

        if (isInternalApply) {
            setIsApply(true);

            if (onApply) {
                onApply(job);
            }

            return;
        }

        /*
         * If only one external method exists,
         * open its popup directly.
         */

        if (hasEmailApply && !hasWhatsAppApply && !hasWebsiteApply) {
            setSelectedApplyMethod("email");
            setShowExternalPopup(true);
            return;
        }

        if (!hasEmailApply && hasWhatsAppApply && !hasWebsiteApply) {
            setSelectedApplyMethod("whatsapp");
            setShowExternalPopup(true);
            return;
        }

        if (!hasEmailApply && !hasWhatsAppApply && hasWebsiteApply) {
            setSelectedApplyMethod("website");
            setShowExternalPopup(true);
            return;
        }

        setIsApply(true);
    };

    /* =========================================================
       SHARE
    ========================================================= */

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    text: `${title} at ${companyName}`,
                    url: window.location.href,
                });

                return;
            }

            if (navigator.clipboard) {
                await navigator.clipboard.writeText(
                    window.location.href
                );
            }
        } catch (error) {
            console.log(
                "Unable to share:",
                error
            );
        }
    };

    /* =========================================================
       SAVE
    ========================================================= */

    const handleSave = () => {
        if (!isSaving && onSave) {
            onSave(job._id);
        }
    };

    /* =========================================================
       APPLICATION METHODS ARRAY
    ========================================================= */

    const applicationMethods = [];

    if (hasEmailApply) {
        applicationMethods.push({
            key: "email",
            label: "Email",
            icon: Mail,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        });
    }

    if (hasWhatsAppApply) {
        applicationMethods.push({
            key: "whatsapp",
            label: "WhatsApp",
            icon: MessageCircle,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        });
    }

    if (hasWebsiteApply) {
        applicationMethods.push({
            key: "website",
            label: "Company Website",
            icon: ExternalLink,
            color: "text-violet-500",
            bg: "bg-violet-500/10",
        });
    }

    /* =========================================================
       APPLY METHOD TEXT
    ========================================================= */

    const getApplyMethodText = () => {
        if (applicationMethods.length === 0) {
            return "Apply on JoblessJob";
        }

        if (applicationMethods.length === 1) {
            return applicationMethods[0].label;
        }

        return applicationMethods
            .map((method) => method.label)
            .join(" & ");
    };

    /* =========================================================
       POPUP DATA
    ========================================================= */

    const getPopupTitle = () => {
        if (isEmailApply) {
            return "Continue to Email?";
        }

        if (isWhatsAppApply) {
            return "Continue to WhatsApp?";
        }

        if (isWebsiteApply) {
            return "Continue to Company Website?";
        }

        return "You're leaving JoblessJob";
    };

    const getPopupDescription = () => {
        if (isEmailApply) {
            return "You will be redirected to your email application. The application email will be pre-filled for you.";
        }

        if (isWhatsAppApply) {
            return "You will be redirected to WhatsApp to contact the recruiter directly about this job.";
        }

        if (isWebsiteApply) {
            return "You will be redirected to the company's application page to complete your application.";
        }

        return "You will be redirected to complete your application.";
    };

    const getPopupButtonText = () => {
        if (isEmailApply) {
            return "Continue to Email";
        }

        if (isWhatsAppApply) {
            return "Continue to WhatsApp";
        }

        if (isWebsiteApply) {
            return "Continue to Apply";
        }

        return "Continue";
    };

    const handleExternalContinue = () => {
        if (isEmailApply) {
            openEmailApplication();
            return;
        }

        if (isWhatsAppApply) {
            openWhatsAppApplication();
            return;
        }

        if (isWebsiteApply) {
            openWebsiteApplication();
        }
    };

    /* =========================================================
       APPLY BUTTON
    ========================================================= */

    const renderApplyButton = () => {
        const buttons = [];


        /*
         * EMAIL
         */

        if (hasEmailApply) {
            buttons.push(
                <button
                    key="email"
                    type="button"
                    onClick={() =>
                        handleApply("email")
                    }
                    className="
                        flex w-full items-center
                        justify-center gap-2
                        rounded-2xl
                        bg-blue-600
                        px-5 py-4
                        text-sm font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-blue-700
                        hover:shadow-xl
                        active:translate-y-0
                    "
                >
                    <Mail size={18} />
                    Apply via Email
                </button>
            );
        }

        /*
         * WHATSAPP / MOBILE
         */

        if (hasWhatsAppApply) {
            buttons.push(
                <button
                    key="whatsapp"
                    type="button"
                    onClick={() =>
                        handleApply("whatsapp")
                    }
                    className="
                        flex w-full items-center
                        justify-center gap-2
                        rounded-2xl
                        bg-emerald-600
                        px-5 py-4
                        text-sm font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-emerald-700
                        hover:shadow-xl
                        active:translate-y-0
                    "
                >
                    <MessageCircle size={18} />
                    Apply via WhatsApp
                </button>
            );
        }

        /*
         * WEBSITE
         */

        if (hasWebsiteApply) {
            buttons.push(
                <button
                    key="website"
                    type="button"
                    onClick={() =>
                        handleApply("website")
                    }
                    className="
                        flex w-full items-center
                        justify-center gap-2
                        rounded-2xl
                        bg-slate-900
                        px-5 py-4
                        text-sm font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-slate-800
                        hover:shadow-xl
                        active:translate-y-0
                        dark:bg-white
                        dark:text-slate-900
                        dark:hover:bg-slate-100
                    "
                >
                    <ExternalLink size={17} />
                    Apply Directly
                </button>
            );
        }

        /*
         * INTERNAL
         */

        if (buttons.length === 0) {
            return (
                <button
                    type="button"
                    onClick={() => handleApply()}
                    className="
                        flex w-full items-center
                        justify-center gap-2
                        rounded-2xl
                        bg-blue-600
                        px-5 py-4
                        text-sm font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-blue-700
                        hover:shadow-xl
                    "
                >
                    Apply Now
                    <ArrowUpRight size={17} />
                </button>
            );
        }

        console.log(buttons)


        return (
            <div className="flex w-full flex-col gap-3">
                {buttons}
            </div>
        );
    };

    return (
        <main
            className="
                min-h-screen
                bg-[#f7f8fc]
                text-slate-900
                dark:bg-[#080b14]
                dark:text-white
            "
        >
            {/* =================================================
                SEO
            ================================================= */}

            <Seo
                title={`${title} - ${companyName}`}
                description={`${title} at ${companyName}. View job details, skills, location and application information.`}
                path={`/jobs/${job._id}`}
            />

            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <div
                className="
                    mx-auto max-w-7xl
                    px-4 pt-6
                    sm:px-6
                    lg:px-8
                "
            >
                <button
                    type="button"
                    onClick={onBack}
                    className="
                        mt-20
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        px-3 py-2
                        text-sm
                        font-medium
                        text-slate-500
                        transition
                        hover:bg-white
                        hover:text-slate-900
                        dark:hover:bg-slate-900
                        dark:hover:text-white
                    "
                >
                    <ArrowLeft size={17} />
                    Back to jobs
                </button>
            </div>

            {/* =================================================
                WHATSAPP GROUP
            ================================================= */}

            <div
                className="
                    mx-auto max-w-7xl
                    px-4 sm:px-6 lg:px-8
                "
            >
                <div
                    className="
                        my-6
                        overflow-hidden
                        rounded-2xl
                        border
                        border-emerald-200
                        bg-emerald-50
                        px-5 py-4
                        dark:border-emerald-900/40
                        dark:bg-emerald-950/20
                    "
                >
                    <div
                        className="
                            flex flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="
                                    flex h-11 w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-emerald-600
                                    text-white
                                "
                            >
                                <MessageCircle size={22} />
                            </div>

                            <div>
                                <h2
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Get Job Updates on WhatsApp
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-slate-600
                                        dark:text-slate-400
                                    "
                                >
                                    Join our WhatsApp group to get
                                    the latest job openings and
                                    hiring updates directly.
                                </p>
                            </div>
                        </div>

                        <a
                            href="https://chat.whatsapp.com/CXcT25i881eB8ogzk8P7GE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-emerald-600
                                px-5 py-3
                                text-sm
                                font-bold
                                text-white
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:bg-emerald-700
                                hover:shadow-lg
                                active:translate-y-0
                            "
                        >
                            <MessageCircle size={17} />
                            Join WhatsApp Group
                            <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <section
                className="
                    mx-auto max-w-7xl
                    px-4 pb-16
                    sm:px-6
                    lg:px-8
                "
            >
                <div
                    className="
                        grid gap-8
                        lg:grid-cols-[1fr_350px]
                    "
                >
                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}

                    <div className="space-y-6">

                        {/* JOB HEADER */}

                        <div
                            className="
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                sm:p-8
                                dark:border-slate-800
                                dark:bg-slate-900
                            "
                        >
                            <div
                                className="
                                    flex flex-col gap-6
                                    sm:flex-row
                                    sm:items-start
                                "
                            >
                                {/* LOGO */}

                                <div
                                    className="
                                        flex h-20 w-20
                                        shrink-0
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        dark:border-slate-700
                                        dark:bg-slate-800
                                    "
                                >
                                    {companyLogo ? (
                                        <img
                                            src={companyLogo}
                                            alt={`${companyName} logo`}
                                            className="
                                                h-full
                                                w-full
                                                object-contain
                                            "
                                        />
                                    ) : (
                                        <Building2
                                            size={32}
                                            className="text-slate-400"
                                        />
                                    )}
                                </div>

                                {/* JOB INFO */}

                                <div className="min-w-0 flex-1">

                                    <div
                                        className="
                                            flex flex-wrap
                                            items-center gap-2
                                        "
                                    >
                                        <span
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                bg-blue-50
                                                px-3 py-1
                                                text-xs
                                                font-semibold
                                                text-blue-600
                                                dark:bg-blue-950/30
                                                dark:text-blue-400
                                            "
                                        >
                                            <BriefcaseBusiness
                                                size={13}
                                            />

                                            {employmentType}
                                        </span>

                                        {hasDirectApply && (
                                            <span
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-1.5
                                                    rounded-full
                                                    bg-emerald-50
                                                    px-3 py-1
                                                    text-xs
                                                    font-semibold
                                                    text-emerald-600
                                                    dark:bg-emerald-950/30
                                                    dark:text-emerald-400
                                                "
                                            >
                                                <CheckCircle2
                                                    size={13}
                                                />

                                                Direct Apply
                                            </span>
                                        )}
                                    </div>

                                    <h1
                                        className="
                                            mt-3
                                            text-3xl
                                            font-black
                                            tracking-tight
                                            sm:text-4xl
                                        "
                                    >
                                        {title}
                                    </h1>

                                    <p
                                        className="
                                            mt-2
                                            text-base
                                            font-medium
                                            text-slate-600
                                            dark:text-slate-300
                                        "
                                    >
                                        {companyName}
                                    </p>

                                    <div
                                        className="
                                            mt-4
                                            flex flex-wrap
                                            gap-x-5 gap-y-3
                                            text-sm
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        <span
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                            "
                                        >
                                            <MapPin size={16} />
                                            {location}
                                        </span>

                                        {postedDate && (
                                            <span
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                "
                                            >
                                                <CalendarDays
                                                    size={16}
                                                />

                                                Posted {postedDate}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ACTIONS */}

                            <div
                                className="
                                    mt-8
                                    flex flex-col gap-3
                                    sm:flex-row
                                "
                            >
                                <div className="flex-1">
                                    {renderApplyButton()}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        transition
                                        hover:border-blue-500
                                        hover:text-blue-600
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                        dark:border-slate-700
                                        dark:bg-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    <Bookmark
                                        size={18}
                                        fill={
                                            isSaved
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />

                                    {isSaved
                                        ? "Saved"
                                        : "Save"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleShare}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        transition
                                        hover:border-blue-500
                                        hover:text-blue-600
                                        dark:border-slate-700
                                        dark:bg-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    <Share2 size={18} />
                                    
                                </button>
                            </div>
                        </div>

                        {/* DESCRIPTION */}

                        <div
                            className="
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                sm:p-8
                                dark:border-slate-800
                                dark:bg-slate-900
                            "
                        >
                            <h2 className="text-xl font-bold">
                                Job Description
                            </h2>

                            <div
                                className="
                                    mt-5
                                    whitespace-pre-line
                                    text-sm
                                    leading-7
                                    text-slate-600
                                    dark:text-slate-300
                                "
                            >
                                {description}
                            </div>
                        </div>

                        {/* SKILLS */}

                        {skills.length > 0 && (
                            <div
                                className="
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-6
                                    shadow-sm
                                    sm:p-8
                                    dark:border-slate-800
                                    dark:bg-slate-900
                                "
                            >
                                <h2 className="text-xl font-bold">
                                    Required Skills
                                </h2>

                                <div
                                    className="
                                        mt-5
                                        flex flex-wrap gap-2
                                    "
                                >
                                    {skills.map(
                                        (skill, index) => (
                                            <span
                                                key={`${skill}-${index}`}
                                                className="
                                                    rounded-full
                                                    border
                                                    border-slate-200
                                                    bg-slate-50
                                                    px-4 py-2
                                                    text-sm
                                                    font-medium
                                                    text-slate-600
                                                    dark:border-slate-700
                                                    dark:bg-slate-800
                                                    dark:text-slate-300
                                                "
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* =================================================
                        SIDEBAR
                    ================================================= */}

                    <aside className="space-y-6">

                        {/* APPLY CARD */}

                        <div
                            className="
                                sticky top-24
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                dark:border-slate-800
                                dark:bg-slate-900
                            "
                        >
                            <h2 className="text-lg font-bold">
                                Interested in this job?
                            </h2>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Apply now and take the next
                                step in your career.
                            </p>

                            <div className="mt-5">
                                {renderApplyButton()}
                            </div>

                            {/* APPLICATION METHODS */}

                            <div
                                className="
                                    mt-5
                                    border-t
                                    border-slate-200
                                    pt-5
                                    dark:border-slate-800
                                "
                            >
                                <div className="flex items-start gap-3">
                                    <ShieldCheck
                                        size={20}
                                        className="
                                            mt-0.5
                                            shrink-0
                                            text-emerald-500
                                        "
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold">
                                            Application Methods
                                        </p>

                                        {applicationMethods.length > 0 ? (
                                            <div className="mt-3 space-y-2">
                                                {applicationMethods.map(
                                                    (method) => {
                                                        const Icon =
                                                            method.icon;

                                                        return (
                                                            <div
                                                                key={method.key}
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                    rounded-xl
                                                                    px-2 py-1.5
                                                                "
                                                            >
                                                                <span
                                                                    className={`
                                                                        flex
                                                                        h-7
                                                                        w-7
                                                                        items-center
                                                                        justify-center
                                                                        rounded-lg
                                                                        ${method.bg}
                                                                        ${method.color}
                                                                    `}
                                                                >
                                                                    <Icon
                                                                        size={15}
                                                                    />
                                                                </span>

                                                                <span
                                                                    className="
                                                                        text-sm
                                                                        font-medium
                                                                        text-slate-700
                                                                        dark:text-slate-300
                                                                    "
                                                                >
                                                                    {method.label}
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        ) : (
                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    text-slate-500
                                                "
                                            >
                                                Apply on JoblessJob
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* JOB OVERVIEW */}

                        <div
                            className="
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                dark:border-slate-800
                                dark:bg-slate-900
                            "
                        >
                            <h2 className="text-lg font-bold">
                                Job Overview
                            </h2>

                            <div className="mt-5 space-y-5">

                                {/* Employment */}

                                <div className="flex gap-3">
                                    <BriefcaseBusiness
                                        size={19}
                                        className="mt-0.5 text-blue-600"
                                    />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Employment
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {employmentType}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}

                                <div className="flex gap-3">
                                    <MapPin
                                        size={19}
                                        className="mt-0.5 text-blue-600"
                                    />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Location
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {location}
                                        </p>
                                    </div>
                                </div>

                                {/* Salary */}

                                <div className="flex gap-3">
                                    <span
                                        className="
                                            mt-0.5
                                            flex h-[19px]
                                            w-[19px]
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-blue-50
                                            text-[10px]
                                            font-bold
                                            text-blue-600
                                            dark:bg-blue-950/40
                                        "
                                    >
                                        ₹
                                    </span>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Salary
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {salaryText}
                                        </p>
                                    </div>
                                </div>

                                {/* Posted */}

                                {postedDate && (
                                    <div className="flex gap-3">
                                        <Clock3
                                            size={19}
                                            className="mt-0.5 text-blue-600"
                                        />

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Posted
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {postedDate}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* APPLICATION */}

                                <div className="flex gap-3">
                                    <ShieldCheck
                                        size={19}
                                        className="
                                            mt-0.5
                                            text-emerald-600
                                        "
                                    />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Application
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {getApplyMethodText()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* =========================================================
                EXTERNAL APPLY POPUP
            ========================================================= */}

            {showExternalPopup && (
                <div
                    className="
                        fixed inset-0
                        z-[9999]
                        flex items-center
                        justify-center
                        bg-slate-950/70
                        px-4
                        backdrop-blur-sm
                    "
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="external-apply-title"
                >
                    <div
                        className="
                            relative
                            w-full max-w-md
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-2xl
                            dark:border-slate-700
                            dark:bg-slate-900
                        "
                    >
                        {/* CLOSE */}

                        <button
                            type="button"
                            onClick={() => {
                                setShowExternalPopup(false);
                                setSelectedApplyMethod("");
                            }}
                            aria-label="Close popup"
                            className="
                                absolute
                                right-4 top-4
                                flex h-9 w-9
                                items-center
                                justify-center
                                rounded-full
                                text-slate-400
                                transition
                                hover:bg-slate-100
                                hover:text-slate-900
                                dark:hover:bg-slate-800
                                dark:hover:text-white
                            "
                        >
                            <X size={19} />
                        </button>

                        {/* ICON */}

                        <div
                            className={`
                                flex h-12 w-12
                                items-center
                                justify-center
                                rounded-2xl
                                ${
                                    isEmailApply
                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                                        : isWhatsAppApply
                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                }
                            `}
                        >
                            {isEmailApply ? (
                                <Mail size={23} />
                            ) : isWhatsAppApply ? (
                                <MessageCircle size={23} />
                            ) : (
                                <ExternalLink size={23} />
                            )}
                        </div>

                        {/* TITLE */}

                        <h2
                            id="external-apply-title"
                            className="
                                mt-5
                                pr-8
                                text-xl
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            {getPopupTitle()}
                        </h2>

                        {/* DESCRIPTION */}

                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-slate-600
                                dark:text-slate-300
                            "
                        >
                            {getPopupDescription()}
                        </p>

                        {/* JOB INFO */}

                        <div
                            className="
                                mt-5
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-4
                                dark:border-slate-700
                                dark:bg-slate-800/60
                            "
                        >
                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                {title}
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                {companyName}
                            </p>
                        </div>

                        {/* EMAIL INFO */}

                        {isEmailApply && (
                            <div
                                className="
                                    mt-4
                                    rounded-2xl
                                    border
                                    border-blue-200
                                    bg-blue-50
                                    p-4
                                    dark:border-blue-900/40
                                    dark:bg-blue-950/20
                                "
                            >
                                <div className="flex gap-3">
                                    <Mail
                                        size={18}
                                        className="
                                            mt-0.5
                                            shrink-0
                                            text-blue-600
                                            dark:text-blue-400
                                        "
                                    />

                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-blue-900
                                                dark:text-blue-300
                                            "
                                        >
                                            Application Email
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                break-all
                                                text-sm
                                                text-blue-700
                                                dark:text-blue-400
                                            "
                                        >
                                            {applicationEmail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* WHATSAPP INFO */}

                        {isWhatsAppApply && (
                            <div
                                className="
                                    mt-4
                                    rounded-2xl
                                    border
                                    border-emerald-200
                                    bg-emerald-50
                                    p-4
                                    dark:border-emerald-900/40
                                    dark:bg-emerald-950/20
                                "
                            >
                                <div className="flex gap-3">
                                    <MessageCircle
                                        size={18}
                                        className="
                                            mt-0.5
                                            shrink-0
                                            text-emerald-600
                                            dark:text-emerald-400
                                        "
                                    />

                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-emerald-900
                                                dark:text-emerald-300
                                            "
                                        >
                                            Recruiter WhatsApp
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                text-emerald-700
                                                dark:text-emerald-400
                                            "
                                        >
                                            {whatsappNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* WEBSITE INFO */}

                        {isWebsiteApply && (
                            <div
                                className="
                                    mt-4
                                    rounded-2xl
                                    border
                                    border-violet-200
                                    bg-violet-50
                                    p-4
                                    dark:border-violet-900/40
                                    dark:bg-violet-950/20
                                "
                            >
                                <div className="flex gap-3">
                                    <ExternalLink
                                        size={18}
                                        className="
                                            mt-0.5
                                            shrink-0
                                            text-violet-600
                                            dark:text-violet-400
                                        "
                                    />

                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-violet-900
                                                dark:text-violet-300
                                            "
                                        >
                                            Application Website
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                break-all
                                                text-sm
                                                text-violet-700
                                                dark:text-violet-400
                                            "
                                        >
                                            {externalApplyUrl}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SAFETY NOTICE */}

                        <div
                            className="
                                mt-4
                                flex gap-3
                                rounded-2xl
                                border
                                border-amber-200
                                bg-amber-50
                                p-4
                                dark:border-amber-900/40
                                dark:bg-amber-950/20
                            "
                        >
                            <ShieldCheck
                                size={19}
                                className="
                                    mt-0.5
                                    shrink-0
                                    text-amber-600
                                    dark:text-amber-400
                                "
                            />

                            <p
                                className="
                                    text-xs
                                    leading-5
                                    text-amber-800
                                    dark:text-amber-300
                                "
                            >
                                JoblessJob does not process your
                                application on the external
                                platform. Please verify the
                                employer details before sharing
                                your information.
                            </p>
                        </div>

                        {/* BUTTONS */}

                        <div
                            className="
                                mt-6
                                flex
                                flex-col-reverse
                                gap-3
                                sm:flex-row
                            "
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setShowExternalPopup(false);
                                    setSelectedApplyMethod("");
                                }}
                                className="
                                    flex-1
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-5 py-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-slate-50
                                    dark:border-slate-700
                                    dark:bg-slate-800
                                    dark:text-slate-200
                                    dark:hover:bg-slate-700
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleExternalContinue
                                }
                                className={`
                                    flex-1
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-2xl
                                    px-5 py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    transition
                                    hover:-translate-y-0.5
                                    hover:shadow-lg
                                    ${
                                        isWhatsAppApply
                                            ? "bg-emerald-600 hover:bg-emerald-700"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    }
                                `}
                            >
                                {isEmailApply && (
                                    <Mail size={17} />
                                )}

                                {isWhatsAppApply && (
                                    <MessageCircle size={17} />
                                )}

                                {isWebsiteApply && (
                                    <ExternalLink size={17} />
                                )}

                                {getPopupButtonText()}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
                INTERNAL APPLICATION MODAL
            ========================================================= */}

            {isApply && isInternalApply && (
                <div
                    className="
                        fixed inset-0
                        z-[9999]
                        flex items-center
                        justify-center
                        bg-black/60
                        px-4
                        backdrop-blur-sm
                    "
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="
                            relative
                            max-h-[90vh]
                            w-full max-w-lg
                            overflow-y-auto
                            rounded-3xl
                            bg-white
                            p-6
                            shadow-2xl
                            dark:bg-slate-900
                        "
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setIsApply(false)
                            }
                            aria-label="Close application form"
                            className="
                                absolute right-5 top-5
                                rounded-full p-2
                                text-slate-400
                                transition
                                hover:bg-slate-100
                                hover:text-slate-900
                                dark:hover:bg-slate-800
                                dark:hover:text-white
                            "
                        >
                            <X size={20} />
                        </button>

                        <div className="pr-10">
                            <h2 className="text-2xl font-bold">
                                Apply for this job
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Complete your application below.
                            </p>
                        </div>

                        <div className="mt-6">
                            <ApplyJobForm
                                jobId={job._id}
                                setIsApply={setIsApply}
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default JobDetail;