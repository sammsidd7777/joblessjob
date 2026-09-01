import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    Mail,
    BriefcaseBusiness,
    Heart,
    PhoneCall,
    MapPin,
    Pencil,
    ArrowRight,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import { useGetSavedJobsQuery } from "../../RTK/savedJobsApi";
import Seo from "../../components/common/Seo";

const Profile = () => {

    const user = useSelector(
        (state) => state.auth?.user
    );

    const {
        data: savedData,
        isLoading: savedLoading,
    } = useGetSavedJobsQuery();


    // =====================================================
    // SAVED JOBS
    // =====================================================

    const savedJobs = useMemo(() => {

        if (Array.isArray(savedData)) {
            return savedData;
        }

        if (Array.isArray(savedData?.savedJobs)) {
            return savedData.savedJobs;
        }

        if (Array.isArray(savedData?.data)) {
            return savedData.data;
        }

        return [];

    }, [savedData]);


    // =====================================================
    // USER DATA
    // =====================================================

    const userName =
        user?.name ||
        user?.fullName ||
        "Job Seeker";

    const email =
        user?.email ||
        "No email available";

    const location =
        user?.location ||
        user?.city ||
        "Location not added";

    const initials = userName
        .split(" ")
        .filter(Boolean)
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();


    return (
        <main className="min-h-[calc(100vh-1px)] text-white">

            <Seo
                title="My Career"
                description="Manage your JoblessJob profile, saved jobs and recruiter contacts."
                path="/candidate/profile"
            />


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="mx-auto w-full max-w-[1180px]">

                <div className="mb-7">

                    <div className="flex items-center gap-2">

                        <span
                            className="
                                flex h-7 w-7
                                items-center justify-center
                                rounded-lg
                                bg-fuchsia-500/10
                                text-fuchsia-400
                            "
                        >
                            <Sparkles size={14} />
                        </span>

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-fuchsia-400
                            "
                        >
                            My Career
                        </p>

                    </div>


                    <h1
                        className="
                            mt-3
                            text-3xl
                            font-black
                            tracking-tight
                            text-white

                            sm:text-4xl
                        "
                    >
                        Your career, your next move.
                    </h1>


                    <p
                        className="
                            mt-2
                            max-w-2xl
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >
                        Keep your profile ready, save the opportunities
                        you like, and stay ready when the right recruiter
                        reaches out.
                    </p>

                </div>


                {/* =================================================
                    PROFILE CARD
                ================================================= */}

                <section
                    className="
                        relative
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-white/[0.08]
                        bg-[#101829]
                        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                    "
                >

                    {/* TOP GRADIENT */}

                    <div
                        className="
                            h-1
                            bg-gradient-to-r
                            from-blue-500
                            via-indigo-500
                            to-fuchsia-500
                        "
                    />


                    <div className="p-5 sm:p-7">

                        {/* PROFILE TOP */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-5

                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            "
                        >

                            {/* USER */}

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                                        flex h-[68px] w-[68px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-blue-500
                                        via-indigo-500
                                        to-purple-600
                                        text-lg
                                        font-black
                                        text-white
                                        shadow-xl
                                        shadow-blue-600/20
                                    "
                                >
                                    {initials}
                                </div>


                                <div className="min-w-0">

                                    <h2
                                        className="
                                            text-xl
                                            font-bold
                                            tracking-tight
                                            text-white
                                            sm:text-2xl
                                        "
                                    >
                                        {userName}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Job Seeker
                                    </p>


                                    <div
                                        className="
                                            mt-2
                                            flex
                                            items-center
                                            gap-1.5
                                            text-xs
                                            text-slate-500
                                        "
                                    >
                                        <MapPin size={13} />
                                        <span>
                                            {location}
                                        </span>
                                    </div>

                                </div>

                            </div>


                            {/* RIGHT SIDE */}

                            <div className="flex items-center gap-3">

                                {/* STATUS */}

                                <div
                                    className="
                                        hidden
                                        rounded-xl
                                        border
                                        border-emerald-500/20
                                        bg-emerald-500/[0.07]
                                        px-4
                                        py-2.5

                                        sm:block
                                    "
                                >

                                    <div className="flex items-center gap-2">

                                        <span
                                            className="
                                                h-2
                                                w-2
                                                rounded-full
                                                bg-emerald-400
                                                shadow-[0_0_10px_rgba(52,211,153,0.7)]
                                            "
                                        />

                                        <span
                                            className="
                                                text-xs
                                                font-bold
                                                text-emerald-400
                                            "
                                        >
                                            Profile Active
                                        </span>

                                    </div>

                                    <p className="mt-0.5 text-[9px] text-emerald-500/70">
                                        Ready for opportunities
                                    </p>

                                </div>


                                {/* EDIT */}

                                <button
                                    type="button"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-white/[0.1]
                                        bg-white/[0.02]
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-slate-200
                                        transition

                                        hover:border-blue-500/50
                                        hover:bg-blue-500/[0.05]
                                        hover:text-white
                                    "
                                >
                                    <Pencil size={15} />
                                    Edit Profile
                                </button>

                            </div>

                        </div>


                        {/* INFO */}

                        <div
                            className="
                                mt-6
                                grid
                                gap-3

                                lg:grid-cols-2
                            "
                        >

                            {/* EMAIL */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-white/[0.04]
                                    bg-[#182338]
                                    px-4
                                    py-3.5
                                "
                            >

                                <div
                                    className="
                                        flex h-10 w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-slate-700/70
                                        text-slate-300
                                    "
                                >
                                    <Mail size={17} />
                                </div>

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.1em]
                                            text-slate-500
                                        "
                                    >
                                        Email
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            truncate
                                            text-sm
                                            font-semibold
                                            text-slate-200
                                        "
                                    >
                                        {email}
                                    </p>

                                </div>

                            </div>


                            {/* LOCATION */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-white/[0.04]
                                    bg-[#182338]
                                    px-4
                                    py-3.5
                                "
                            >

                                <div
                                    className="
                                        flex h-10 w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-slate-700/70
                                        text-slate-300
                                    "
                                >
                                    <MapPin size={17} />
                                </div>

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.1em]
                                            text-slate-500
                                        "
                                    >
                                        Location
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            truncate
                                            text-sm
                                            font-semibold
                                            text-slate-200
                                        "
                                    >
                                        {location}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    CAREER SNAPSHOT
                ================================================= */}

                <div className="mt-6">

                    <div className="mb-3">

                        <p
                            className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-slate-600
                            "
                        >
                            Career Snapshot
                        </p>

                        <h2
                            className="
                                mt-1
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            Where you stand
                        </h2>

                    </div>


                    <div
                        className="
                            grid
                            gap-3

                            md:grid-cols-3
                        "
                    >

                        {/* =================================================
                            SAVED JOBS
                        ================================================= */}

                        <Link
                            to="/candidate/saved-jobs"
                            className="
                                group
                                rounded-2xl
                                border
                                border-white/[0.07]
                                bg-[#101829]
                                p-5
                                transition

                                hover:-translate-y-0.5
                                hover:border-blue-500/30
                                hover:bg-[#121d31]
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div
                                    className="
                                        flex h-10 w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-red-500/10
                                        text-red-400
                                    "
                                >
                                    <Heart size={19} />
                                </div>

                                <ArrowRight
                                    size={17}
                                    className="
                                        text-slate-600
                                        transition
                                        group-hover:translate-x-1
                                        group-hover:text-blue-400
                                    "
                                />

                            </div>


                            <p
                                className="
                                    mt-5
                                    text-2xl
                                    font-black
                                    text-white
                                "
                            >
                                {savedLoading
                                    ? "—"
                                    : savedJobs.length}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Saved Jobs
                            </p>

                        </Link>


                        {/* =================================================
                            CONTACTS
                        ================================================= */}

                        <Link
                            to="/candidate/applications"
                            className="
                                group
                                rounded-2xl
                                border
                                border-white/[0.07]
                                bg-[#101829]
                                p-5
                                transition

                                hover:-translate-y-0.5
                                hover:border-blue-500/30
                                hover:bg-[#121d31]
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div
                                    className="
                                        flex h-10 w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-blue-500/10
                                        text-blue-400
                                    "
                                >
                                    <PhoneCall size={19} />
                                </div>

                                <ArrowRight
                                    size={17}
                                    className="
                                        text-slate-600
                                        transition
                                        group-hover:translate-x-1
                                        group-hover:text-blue-400
                                    "
                                />

                            </div>


                            <p
                                className="
                                    mt-5
                                    text-2xl
                                    font-black
                                    text-white
                                "
                            >
                                —
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Recruiter Contacts
                            </p>

                        </Link>


                        {/* =================================================
                            PROFILE STATUS
                        ================================================= */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-white/[0.07]
                                bg-[#101829]
                                p-5
                            "
                        >

                            <div
                                className="
                                    flex h-10 w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-emerald-500/10
                                    text-emerald-400
                                "
                            >
                                <ShieldCheck size={19} />
                            </div>


                            <p
                                className="
                                    mt-5
                                    text-sm
                                    font-bold
                                    text-white
                                "
                            >
                                Looking for work
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-slate-500
                                "
                            >
                                Your profile is ready for new opportunities.
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    NEXT MOVE
                ================================================= */}

                <section
                    className="
                        relative
                        mt-5
                        overflow-hidden
                        rounded-2xl
                        border
                        border-blue-500/10
                        bg-gradient-to-r
                        from-[#101a2e]
                        via-[#101829]
                        to-[#1b102b]
                        p-5

                        sm:p-6
                    "
                >

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-24
                            h-56
                            w-56
                            rounded-full
                            bg-fuchsia-500/10
                            blur-3xl
                        "
                    />


                    <div
                        className="
                            relative
                            flex
                            flex-col
                            gap-5

                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <div className="flex items-center gap-2">

                                <BriefcaseBusiness
                                    size={15}
                                    className="text-blue-400"
                                />

                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.12em]
                                        text-blue-400
                                    "
                                >
                                    Your Next Move
                                </p>

                            </div>


                            <h2
                                className="
                                    mt-2
                                    text-xl
                                    font-black
                                    tracking-tight
                                    text-white
                                "
                            >
                                Find something worth saying yes to.
                            </h2>

                            <p
                                className="
                                    mt-1
                                    max-w-xl
                                    text-xs
                                    leading-5
                                    text-slate-500
                                "
                            >
                                Explore fresh opportunities that match
                                what you're looking for.
                            </p>

                        </div>


                        <Link
                            to="/find-job"
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-white
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-slate-950
                                transition

                                hover:bg-blue-50
                                hover:shadow-lg
                            "
                        >
                            Find Jobs
                            <ArrowRight size={16} />
                        </Link>

                    </div>

                </section>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <p
                    className="
                        py-6
                        text-center
                        text-[10px]
                        text-slate-700
                    "
                >
                    From jobless to hired 🚀
                </p>

            </section>

        </main>
    );
};

export default Profile;