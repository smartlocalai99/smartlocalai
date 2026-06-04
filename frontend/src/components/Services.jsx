import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        number: "01",
        title: "Custom Software & Application Development",
        services: [
            "Custom Web Applications",
            "Custom Mobile Applications",
            "End-to-end SaaS Solutions",
            "Startup MVP Development",
        ],
    },
    {
        number: "02",
        title: "Learning, Automation & AI-Based Solutions",
        services: [
            "AI-powered Accounting Automation",
            "AI-based Manufacturing Insights (Inside ERP)",
            "Voice/AI Search Optimization",
            "Smart Reporting Systems (AI dashboards)",
        ],
    },
    {
        number: "03",
        title: "Digital Presence & Marketing Services",
        services: [
            "Website Development",
            "SEO (Search Engine Optimization)",
            "AEO (AI / Voice Search Optimization)",
            "Digital Marketing (Social Media Campaigns)",
            "Google My Business Setup",
            "WhatsApp Bulk Messaging",
            "Design Services (Branding, Posters, Creatives)",
        ],
    },
    {
        number: "04",
        title: "Business Management Software (ERP Systems)",
        services: [
            "Manufacturing ERP (AI-based)",
            "Supermarket / Grocery Management Software",
            "Accounting Software (AI-powered)",
            "School ERP",
            "Hospital / Clinic ERP",
            "Law Firm ERP",
            "Beauty Clinic / Salon Management Software",
            "Travel Agency Management Software",
            "POS Systems for Restaurants",
        ],
    },
];

// Scroll distance (px) allocated to animate the card box in
const CARD_ENTER_PX = 200;
// Scroll distance (px) per service row reveal
const PX_PER_SERVICE = 130;

const Services = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const textWrapperRef = useRef(null);
    // One ref per pinned wrapper (outer div, full-viewport height)
    const cardWrappers = useRef([]);
    // One ref per inner card box (the animated element)
    const cardInners = useRef([]);

    useEffect(() => {
        if (!textRef.current || !sectionRef.current || !textWrapperRef.current) return;

        const ctx = gsap.context(() => {

            /* ══════════════════════════════════════════════════════
               PHASE 1 — Horizontal text scroll (your existing logic,
               untouched)
            ══════════════════════════════════════════════════════ */
            const textWidth = textRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxScroll = Math.max(textWidth - viewportWidth + 50, 0);

            gsap.ticker.lagSmoothing(1000, 16);

            ScrollTrigger.create({
                trigger: textWrapperRef.current,
                start: "top top",
                end: () => `+=${maxScroll}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: true,
                onUpdate: (self) => {
                    gsap.set(textRef.current, { x: -self.progress * maxScroll });
                },

            });

            /* ══════════════════════════════════════════════════════
               PHASE 2 — Per-card pinned scroll sections
      
               Architecture:
               • Each card has its OWN ScrollTrigger with pin:true
                 and pinSpacing:true.
               • pinSpacing:true inserts real spacer height EQUAL to
                 the scroll distance — so the next card's trigger
                 only starts after the current one fully finishes.
               • A scrubbed GSAP timeline drives:
                   1. Card box entrance (opacity + y)
                   2. Service rows appearing one by one
               • No card ever fights another — they're serial.
            ══════════════════════════════════════════════════════ */
            categories.forEach((cat, index) => {
                const wrapper = cardWrappers.current[index];
                const inner = cardInners.current[index];
                if (!wrapper || !inner) return;

                const serviceItems = Array.from(wrapper.querySelectorAll(".service-item"));
                const totalPx = CARD_ENTER_PX + serviceItems.length * PX_PER_SERVICE;

                // Set all hidden initially
                gsap.set(inner, { opacity: 0, y: 56, scale: 0.97 });
                gsap.set(serviceItems, { opacity: 0, y: 24 });

                // Build a normalised (0→1) timeline for the card's lifecycle
                const tl = gsap.timeline({ paused: true });

                // Card box enters (takes CARD_ENTER_PX worth of the scroll)
                tl.to(inner, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "power3.out",
                    duration: CARD_ENTER_PX / totalPx,
                }, 0);

                // Service rows appear sequentially, each gets PX_PER_SERVICE px
                serviceItems.forEach((item, i) => {
                    const startNorm = (CARD_ENTER_PX + i * PX_PER_SERVICE) / totalPx;
                    const durNorm = PX_PER_SERVICE / totalPx;
                    tl.to(item, {
                        opacity: 1,
                        y: 0,
                        ease: "expo.out",
                        duration: durNorm,
                    }, startNorm);
                });

                // ScrollTrigger scrubs the timeline
                ScrollTrigger.create({
                    trigger: wrapper,
                    start: "top top",
                    end: () => `+=${totalPx}`,
                    scrub: 1.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    animation: tl,
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative mt-20">
            <style>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {/* ══════════════════════════════════════════════
          PHASE 1 — Horizontal scrolling heading
      ══════════════════════════════════════════════ */}
            <div
                ref={textWrapperRef}
                className="h-[50vh] flex items-center overflow-hidden bg-black"
            >
                <h1
                    ref={textRef}
                    className="text-white font-black uppercase whitespace-nowrap select-none"
                    style={{
                        fontSize: "50vh",
                        letterSpacing: "-0.03em",
                        lineHeight: 0.9,
                        willChange: "transform",
                        transform: "translate3d(0,0,0)",
                        backfaceVisibility: "hidden",
                        perspective: 1000
                    }}
                >
                    Services We Provide
                </h1>
            </div>

            {/* ══════════════════════════════════════════════
          PHASE 2 — One full-viewport wrapper per card.
          Each wrapper is pinned independently by GSAP.
          The inner card box is what animates.
      ══════════════════════════════════════════════ */}
            {categories.map((cat, index) => (
                <div
                    key={index}
                    ref={(el) => (cardWrappers.current[index] = el)}
                    style={{
                        minHeight: "120vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#fff",
                        padding: "40px 24px",
                        boxSizing: "border-box",
                        marginTop: "20px"
                    }}
                >
                    {/* Inner card — animated by GSAP */}
                    <div
                        ref={(el) => (cardInners.current[index] = el)}
                        style={{
                            width: "100%",
                            maxWidth: "820px",
                            background: "#0d0d0d",
                            border: "1px solid #1e1e1e",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 12px 56px rgba(0,0,0,0.75)",
                            willChange: "transform, opacity",
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden"
                        }}
                    >
                        {/* ── Header row ── */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                padding: "28px 40px",
                                borderBottom: "1px solid #181818",
                            }}
                        >
                            {/* Outlined number */}
                            <span
                                style={{
                                    fontFamily: "'Arial Black', 'Arial', sans-serif",
                                    fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                                    fontWeight: 900,
                                    color: "transparent",
                                    WebkitTextStroke: "2px #2e2e2e",
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    letterSpacing: "-0.03em",
                                    userSelect: "none",
                                    minWidth: "80px",
                                    color: "white"
                                }}
                            >
                                {cat.number}
                            </span>

                            {/* Divider */}
                            <span
                                style={{
                                    width: "1px",
                                    height: "44px",
                                    background: "#252525",
                                    flexShrink: 0,
                                }}
                            />

                            {/* Title */}
                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "clamp(0.78rem, 4vw, 3vw)",
                                    fontWeight: 600,
                                    lineHeight: 1.35,
                                    fontFamily: "'Arial', sans-serif",
                                    flex: 1,
                                    textAlign: "center"
                                }}
                            >
                                {cat.title}
                            </span>
                        </div>

                        {/* ── Service rows ── */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "7px",
                                padding: "14px 20px 20px",
                            }}
                        >
                            {cat.services.map((svc, si) => (
                                <div
                                    className="service-item"
                                    key={si}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "16px 20px",
                                        background: "#1a1a1a",
                                        borderRadius: "9px",
                                        cursor: "pointer",
                                        transition: "background 0.2s ease",
                                        willChange: "transform, opacity",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.background = "#252525")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.background = "#1a1a1a")
                                    }
                                >
                                    <span
                                        style={{
                                            color: "#ffffffff",
                                            fontSize: "clamp(0.78rem, 3vw, 1.7vw)",
                                            fontWeight: 500,
                                            fontFamily: "'Arial', sans-serif",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {svc}
                                    </span>
                                    <span
                                        style={{
                                            color: "#fff",
                                            fontSize: "35px",
                                            flexShrink: 0,
                                            marginLeft: "12px",
                                        }}
                                    >
                                        →
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

        </section>
    );
};

export default Services;