import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Contact = () => {
    const titleRef = useRef(null);
    const topRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from(topRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(titleRef.current, {
                y: 120,
                opacity: 0,
                duration: 1.5,
                delay: 0.2,
                ease: "power4.out",
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-[#f3f3f3] px-6 pt-10 overflow-hidden relative">

            {/* Top */}
            <div
                ref={topRef}
                className="flex justify-between items-start mb-15"
            >
                <p className="text-black text-lg font-medium ml-20">
                    Built to turn ideas into reality.
                </p>

                <button className="border-b border-black text-black text-md hover:opacity-60 transition absolute right-20 top-40">
                    Contact ↗
                </button>
            </div>

            {/* Huge Heading */}
            {/* Huge Heading */}
            <div className="overflow-hidden relative z-10 pointer-events-none select-none">
                <h1
                    ref={titleRef}
                    className="text-[6rem] md:text-[15rem] leading-none font-normal tracking-[-7px] text-black/100"
                >
                    Let’s Talk
                </h1>
            </div>
        </section>
    );
};

export default Contact;