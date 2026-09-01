import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Reusable AdSlot
 *
 * Priority:
 * 1. Google AdSense
 * 2. If Google ad is not available → JoblessJob promotion
 */

const AdSlot = ({
    slot,
    format = "auto",
    layout,
    className = "",
    label = "Advertisement",

    // =========================
    // JOBLESSJOB FALLBACK AD
    // =========================

    fallbackTitle = "Get latest job updates",

    fallbackDescription =
        "Join JoblessJob and get the latest job opportunities directly.",

    fallbackButton = "Join now",

    fallbackUrl = "#",
}) => {
    const insRef = useRef(null);

    const [showFallback, setShowFallback] = useState(false);

    const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

    const isConfigured =
        Boolean(clientId) &&
        Boolean(slot) &&
        !slot.startsWith("YOUR_");

    // ==========================================
    // ADSENSE
    // ==========================================

    useEffect(() => {
        if (!isConfigured) {
            setShowFallback(true);
            return;
        }

        let fallbackTimer;

        try {
            window.adsbygoogle = window.adsbygoogle || [];

            window.adsbygoogle.push({});

            fallbackTimer = setTimeout(() => {
                const adElement = insRef.current;

                if (!adElement) {
                    setShowFallback(true);
                    return;
                }

                const height = adElement.offsetHeight;

                const hasAd =
                    adElement.getAttribute("data-ad-status") ===
                    "filled";

                if (!hasAd && height < 50) {
                    setShowFallback(true);
                }
            }, 3000);
        } catch (error) {
            console.warn("AdSense failed:", error);
            setShowFallback(true);
        }

        return () => {
            if (fallbackTimer) {
                clearTimeout(fallbackTimer);
            }
        };
    }, [isConfigured]);

    // ==========================================
    // FALLBACK PROMOTION
    // ==========================================

    if (!isConfigured || showFallback) {
        return (
            <div className={`w-full ${className}`}>
                <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${fallbackTitle} - ${fallbackButton}`}
                    className="
                        group
                        relative
                        block
                        w-full
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-800/80
                        bg-slate-900/50
                        px-5
                        py-4
                        text-white
                        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:border-slate-700
                        hover:bg-slate-900/70
                        hover:shadow-[0_12px_35px_rgba(0,0,0,0.2)]
                        sm:px-6
                    "
                >
                    {/* Background glow */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -left-16
                            -top-20
                            h-48
                            w-48
                            rounded-full
                            bg-blue-600/10
                            blur-3xl
                            transition-opacity
                            duration-300
                            group-hover:opacity-80
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -bottom-20
                            -right-10
                            h-48
                            w-48
                            rounded-full
                            bg-purple-600/10
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        {/* =====================
                            CONTENT
                        ===================== */}

                        <div className="flex min-w-0 items-center gap-3.5">
                            {/* WhatsApp Icon */}
                            <div
                                aria-hidden="true"
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-emerald-500
                                    shadow-lg
                                    shadow-emerald-500/20
                                "
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                >
                                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.18 3.03 14.69 2 12.04 2Zm5.83 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.91-1.26-4.81-4.18-4.96-4.38-.14-.2-1.19-1.58-1.19-3.02s.75-2.14 1.02-2.43c.26-.29.58-.36.77-.36h.55c.18 0 .42-.02.65.5.24.55.82 1.9.89 2.04.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.04 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.61.76 1.89.9.27.14.46.2.52.32.07.12.07.65-.17 1.33Z" />
                                </svg>
                            </div>

                            <div className="min-w-0">
                                {/* Meta */}
                                <div className="mb-0.5 flex items-center gap-2">
                                    <span
                                        className="
                                            text-[11px]
                                            font-semibold
                                            text-slate-400
                                        "
                                    >
                                        JoblessJob
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className="h-1 w-1 rounded-full bg-slate-600"
                                    />

                                    <span
                                        className="
                                            text-[11px]
                                            font-medium
                                            text-slate-500
                                        "
                                    >
                                        Sponsored
                                    </span>
                                </div>

                                {/* Title */}
                                <h3
                                    className="
                                        text-base
                                        font-bold
                                        leading-6
                                        text-white
                                        sm:text-lg
                                    "
                                >
                                    {fallbackTitle}
                                </h3>

                                {/* Description */}
                                <p
                                    className="
                                        mt-0.5
                                        max-w-2xl
                                        text-sm
                                        leading-5
                                        text-slate-400
                                    "
                                >
                                    {fallbackDescription}
                                </p>
                            </div>
                        </div>

                        {/* =====================
                            BUTTON
                        ===================== */}

                        <span
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                self-start
                                rounded-xl
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-950
                                shadow-sm
                                transition-all
                                duration-300
                                group-hover:bg-blue-50
                                group-hover:shadow-md
                                sm:self-auto
                            "
                        >
                            {fallbackButton}

                            <ArrowRight
                                size={16}
                                aria-hidden="true"
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </span>
                    </div>
                </a>
            </div>
        );
    }

    // ==========================================
    // GOOGLE ADSENSE
    // ==========================================

    return (
        <div className={`w-full ${className}`}>
            <span
                className="
                    mb-1.5
                    block
                    text-center
                    text-xs
                    font-medium
                    text-slate-500
                "
            >
                {label}
            </span>

            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{
                    display: "block",
                    width: "100%",
                }}
                data-ad-client={clientId}
                data-ad-slot={slot}
                data-ad-format={format}
                data-ad-layout={layout}
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdSlot;