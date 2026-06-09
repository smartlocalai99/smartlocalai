import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Contact = () => {
    const titleRef = useRef(null);
    const cardRef = useRef(null);
    const formRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from(titleRef.current, {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
            });

            gsap.from(cardRef.current, {
                x: -80,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
            });

            gsap.from(formRef.current, {
                x: 80,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power3.out",
            });

            gsap.from(bottomRef.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-[#d8d2c5] overflow-hidden px-5 sm:px-8 md:px-16 py-16">

            {/* Heading */}
            <div className="flex justify-center md:justify-end">
                <h1
                    ref={titleRef}
                    className="
                    text-[4rem]
                    sm:text-[6rem]
                    md:text-[9rem]
                    lg:text-[12rem]
                    font-medium
                    leading-none
                    text-[#0d1406]
                    text-center
                    "
                >
                    Contact
                </h1>
            </div>

            {/* Top Section */}
            <div
                className="
                flex
                flex-col
                lg:flex-row
                items-center
                justify-center
                gap-14
                lg:gap-48
                mt-25
                "
            >

                {/* Left Card */}
                <div
                    ref={cardRef}
                    className="
                    bg-white
                    rounded-2xl
                    w-full
                    shadow-sm
                    p-3
                    max-w-[450px]
                    "
                >

                    {/* Top Box */}
                    <div className="bg-black rounded-xl px-5 py-8 relative mb-6">

                        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#E7FF00]"></div>
                        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#E7FF00]"></div>
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#E7FF00]"></div>
                        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#E7FF00]"></div>

                        <p className="text-white/80 font-semibold text-center ">
                            Connect with us !
                        </p>
                    </div>

                    {/* Contact Items */}
                    <div className="space-y-5">

                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-lime-400 text-sm">
                                ✉
                            </div>

                            <p className="text-md break-all text-[#111] font-medium">
                                support@smartlocal.in
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-lime-400 text-sm">
                                ☎
                            </div>

                            <p className="text-md text-black/60 font-medium">
                                +91 9090909090
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-lime-400 text-sm">
                                ◎
                            </div>

                            <p className="text-md text-black/60 font-medium">
                                smartlocal_ai
                            </p>
                        </div>

                        <div className="flex items-center gap-4 ">
                            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-lime-400 text-sm font-bold">
                                in
                            </div>

                            <p className="text-md text-[#111] font-medium">
                                smartlocal_ai
                            </p>
                        </div>

                    </div>
                </div>

                {/* Form */}
                <div
                    ref={formRef}
                    className="w-full max-w-[500px] mt-10"
                >

                    <form className="flex flex-col space-y-8">

                        <input
                            type="text"
                            placeholder="Enter your full name here..."
                            className="
                            w-full
                            bg-transparent
                            border-b
                            border-black/40
                            pb-2
                            text-black
                            placeholder:text-black/40
                            focus:outline-none
                            focus:border-black
                            transition-all
                            duration-300
                            "
                        />

                        <input
                            type="email"
                            placeholder="Enter your mail here..."
                            className="
                            w-full
                            bg-transparent
                            border-b
                            border-black/40
                            pb-2
                            text-black
                            placeholder:text-black/40
                            focus:outline-none
                            focus:border-black
                            transition-all
                            duration-300
                            "
                        />

                        <textarea
                            rows="4"
                            placeholder="Enter your message here..."
                            className="
                            w-full
                            resize-none
                            bg-transparent
                            border-b
                            border-black/40
                            pb-10
                            text-black
                            placeholder:text-black/40
                            focus:outline-none
                            focus:border-black
                            transition-all
                            duration-300
                            "
                        ></textarea>

                        <button
                            type="submit"
                            className="
                            bg-[#111]
                            text-[#E7FF00]
                            px-10
                            py-3
                            mx-auto
                            rounded-full
                            text-base
                            font-semibold
                            w-fit
                            hover:scale-105
                            hover:bg-lime-300
                            hover:text-black
                            transition-all
                            duration-300
                            "
                        >
                            Submit
                        </button>

                    </form>
                </div>

            </div>

            {/* Bottom CTA */}
            <div
                ref={bottomRef}
                className="
                flex
                flex-col
                md:flex-row
                items-center
                justify-center
                md:justify-between
                gap-8
                mt-50
                text-center
                md:text-left
                pl-40
                pr-30
                "
            >

                <button
                    className="
                    bg-[#111]
                    text-[#E7FF00]
                    px-20
                    py-5
                    rounded-full
                    text-lg
                    md:text-[36px]
                    font-semibold
                    hover:scale-105
                    transition-all
                    duration-300
                    "
                >
                    Let’s Talk 
                </button>

                <p
                    className="
                    text-[#111]
                    text-2xl
                    md:text-[36px]
                    font-semibold
                    max-w-[550px]
                    leading-snug
                    "
                >
                    You are Just away from one click
                    to connect with us directly
                </p>

            </div>

        </section>
    );
};

export default Contact;