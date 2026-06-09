import React from "react";
import footer_img from "../assets/footer_img.png";

const Footer = () => {
    return (
        <footer className="relative bg-[#11170B] text-white overflow-hidden">

            {/* Illustration */}
            <div className="w-full h-[300px] sm:h-[450px] md:h-[650px] lg:h-[800px]">
                <img
                    src={footer_img}
                    alt="footer illustration"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Footer Content */}
            <div className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-20 pb-10">

                {/* Huge Background Text */}
                <div
                    className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    pointer-events-none
                    select-none
                    mt-10
                    "
                >
                    <h1
                        className="
                        text-[4rem]
                        sm:text-[7rem]
                        md:text-[10rem]
                        lg:text-[20rem]
                        font-black
                        leading-none
                        text-white/[0.03]
                        text-center
                        "
                    >
                        SMART
                        <br />
                        LOCAL AI
                    </h1>
                </div>

                {/* Footer Links */}
                <div
                    className="
                    relative
                    z-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    gap-14
                    justify-items-center
                    mx-auto
                    "
                >

                    {/* Company */}
                    <div>
                        <h3 className="text-[#E7FF00] text-lg font-semibold mb-6">
                            Company
                        </h3>

                        <ul className="space-y-4 text-sm text-white/70">

                            <li className="hover:text-lime-400 transition-all duration-300 cursor-pointer">
                                Home
                            </li>

                            <li className="hover:text-lime-400 transition-all duration-300 cursor-pointer">
                                About Us
                            </li>

                            <li className="hover:text-lime-400 transition-all duration-300 cursor-pointer">
                                Team
                            </li>

                            <li className="hover:text-lime-400 transition-all duration-300 cursor-pointer">
                                Services
                            </li>

                        </ul>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-[#E7FF00] text-lg font-semibold mb-6">
                            Product
                        </h3>

                        <ul className="space-y-4 text-sm text-white/70">

                            <li className="hover:text-[#E7FF00] transition-all duration-300 cursor-pointer">
                                Features
                            </li>

                            <li className="hover:text-[#E7FF00] transition-all duration-300 cursor-pointer">
                                Careers
                            </li>

                            <li className="hover:text-[#E7FF00] transition-all duration-300 cursor-pointer">
                                How It Works
                            </li>

                            <li className="hover:text-[#E7FF00] transition-all duration-300 cursor-pointer">
                                Contact
                            </li>

                        </ul>
                    </div>

                    {/* Laws */}
                    <div>
                        <h3 className="text-[#E7FF00] text-lg font-semibold mb-6">
                            Laws
                        </h3>

                        <ul className="space-y-4 text-sm text-white/70">

                            <li className="hover:text-[#E7FF00] transition-all duration-300 cursor-pointer">
                                Cookie Policy
                            </li>

                            <li className="hover:text-[#E7FF00] transition-all duration-300 cursor-pointer">
                                Privacy Policy
                            </li>

                            <li className="hover:text-[#E7FF00] transition-all duration-300 cursor-pointer">
                                Terms & Conditions
                            </li>

                        </ul>
                    </div>

                </div>

                {/* Newsletter */}
                <div
                    className="
                    relative
                    z-10
                    flex
                    flex-col
                    lg:flex-row
                    items-start
                    lg:items-center
                    justify-center
                    gap-8
                    mt-24
                    "
                >

                    <p className="text-lg text-white/90 font-semibold">
                        Subscribe on our newsletter :
                    </p>

                    <form
                        className="
                        flex
                        items-center
                        bg-white
                        rounded-full
                        overflow-hidden
                        w-full
                        max-w-[550px]
                        relative
                        "
                    >

                        <input
                            type="email"
                            placeholder="Enter Your Mail Here....."
                            className="
                            flex-1
                            px-6
                            py-4
                            text-sm
                            text-black
                            bg-transparent
                            placeholder:text-black/70
                            focus:outline-none
                            "
                        />

                        <button
                            type="submit"
                            className="
                            bg-[#E7FF00]
                            text-black
                            absolute
                            right-0
                            px-8
                            py-2
                            text-md
                            font-semibold
                            hover:bg-lime-300
                            transition-all
                            duration-300
                            mr-2
                            rounded-full
                            "
                        >
                            Submit
                        </button>

                    </form>

                </div>

                {/* Bottom */}
                <div
                    className="
                    relative
                    z-10
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-between
                    gap-4
                    mt-20
                    pt-6
                    border-t
                    border-white/10
                    text-xs
                    text-white/100
                    "
                >

                    <p>
                        © 2026 All Rights Reserved
                    </p>

                    <p className="cursor-pointer hover:text-lime-400 transition-all duration-300">
                        Terms & Conditions
                    </p>

                    <p className="cursor-pointer hover:text-lime-400 transition-all duration-300">
                        Privacy Policy
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;