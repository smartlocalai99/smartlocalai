import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Footer = () => {
    const cardRef = useRef(null);
    const bigTextRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Card Animation
            gsap.from(cardRef.current, {
                y: 120,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
            });

            // Big Text Reveal
            gsap.from(bigTextRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power4.out",
            });

            // Floating Motion
            gsap.to(bigTextRef.current, {
                y: -10,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

        });

        return () => ctx.revert();
    }, []);

return (
    <footer className="bg-transparent px-6 pb-10 relative z-20 mt-50 md:-mt-20 overflow-hidden">

        {/* Glass Card */}
        <div
            ref={cardRef}
            className="
                relative
                rounded-[40px]
                border
                border-white/40
                bg-white/20
                backdrop-blur-sm
                p-10
                overflow-hidden
                shadow-[0_8px_32px_0_rgba(0,0,0,0.03)]
            "
            style={{
                boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.2)'
            }}
        >
            {/* Top Content */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 mt-30">

                {/* Company */}
                <div>
                    <h4 className="text-black/40 uppercase text-xs tracking-[3px] mb-5">
                        Company
                    </h4>
                    <ul className="space-y-3 text-black/80 font-medium">
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Home</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">About Us</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Services</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Team</li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-black/40 uppercase text-xs tracking-[3px] mb-5">
                        Resources
                    </h4>
                    <ul className="space-y-3 text-black/80 font-medium">
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Blog</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Contact Us</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Tutorials</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Support</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-black/40 uppercase text-xs tracking-[3px] mb-5">
                        Social Media
                    </h4>
                    <ul className="space-y-3 text-black/80 font-medium">
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Instagram</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Facebook</li>
                        <li className="hover:translate-x-1 transition duration-300 cursor-pointer hover:text-black">Twitter</li>
                    </ul>
                </div>

                {/* Email */}
                <div>
                    <h4 className="text-black/40 uppercase text-xs tracking-[3px] mb-5">
                        WE'D LOVE TO HEAR FROM YOU
                    </h4>
                    <p className="text-black font-semibold text-lg">
                        companyname@gmail.com
                    </p>
                </div>
            </div>

            {/* Big Typography */}
            <div
                ref={bigTextRef}
                className="relative z-10 text-center leading-[0.82] mt-10 select-none"
            >
                <h1 className="text-center text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black tracking-[-10px] text-black drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    SMART
                </h1>
                <h1 className="text-center text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] xl:text-[17rem] font-black tracking-[-8px] text-black drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    LOCAL AI
                </h1>
            </div>

            {/* Bottom */}
            <div className="relative z-10 mt-16 flex flex-col md:flex-row justify-between items-center text-sm text-black/50 gap-4">
                <p>© 2026 All Rights Reserved</p>
                <p className="cursor-pointer hover:text-black transition">Terms & Conditions</p>
                <p className="cursor-pointer hover:text-black transition">Privacy Policy</p>
            </div>
        </div>
    </footer>
);
};

export default Footer;