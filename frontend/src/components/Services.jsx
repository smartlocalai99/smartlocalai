import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
            "AEO (AI / Voice Search Optimization)",
        ],
    },
    {
        number: "03",
        title: "Digital Presence & Marketing Services",
        services: [
            "Website Development",
            "SEO (Search Engine Optimization)",
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
    const container = useRef(null); // FIX 1: moved to component top level (was inside gsap.context)
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
            // Stop exactly when the last character ('e' in Provide) reaches the right edge
            const maxScroll = Math.max(textWidth - viewportWidth, 0);

            gsap.ticker.lagSmoothing(1000, 16);

            ScrollTrigger.create({
                trigger: textWrapperRef.current,
                start: "top top",
                end: () => `+=${maxScroll}`,
                scrub: 1,
                pin: true,
                pinSpacing: true,  // inserts spacer = maxScroll px, so cards section is only reachable AFTER this animation ends
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
            // FIX 2: removed illegal useGSAP() hook call; inlined its callback
            // directly here inside gsap.context (same scoping effect)
            const cards = gsap.utils.toArray(".card");

            gsap.set(".number, .title", {
                y: 50,
                autoAlpha: 0,
            });

            gsap.set(".service", {
                y: 20,
                autoAlpha: 0,
            });

            cards.forEach((card, i) => {
                const number = card.querySelector(".number");
                const title = card.querySelector(".title");
                const services = card.querySelectorAll(".service");

                gsap.to(card, {
                    scale: 0.8 + 0.2 * (i / (cards.length - 1)),
                    scrollTrigger: {
                        trigger: card,
                        start: `top ${15 + 30 * i}px`,
                        end: "bottom bottom",
                        endTrigger: ".container",
                        scrub: 2,
                        pin: true,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    },
                });

                ScrollTrigger.create({
                    trigger: card,
                    start: "top center",
                    once: true,

                    onEnter: () => {
                        const tl = gsap.timeline();

                        tl.to([number, title], {
                            y: 0,
                            autoAlpha: 1,
                            stagger: 0.1,
                            duration: 0.6,
                        });

                        tl.to(
                            services,
                            {
                                y: 0,
                                autoAlpha: 1,
                                stagger: 0.1,
                                duration: 0.5,
                            },
                            "-=0.2"
                        );
                    },
                });
            });

        });

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
            <div className="container" ref={container}>
                <div className="stacked-cards">
                    {categories.map((category, index) => (
                        <div className="card" key={index}>
                            <div className="card-content">
                                <div className="number">{category.number}</div>

                                <h2 className="title">
                                    {category.title}
                                </h2>
                            </div>

                            <div className="services-list">
                                {category.services.map((service, serviceIndex) => (
                                    <div className="service" key={serviceIndex}>
                                        {service}
                                        <span className="text-white text-2xl font-bold mr-3"><ArrowRight /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};
export default Services;