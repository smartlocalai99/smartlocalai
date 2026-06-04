import React from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import curvedArrow from "../assets/contact_Arrow.png"

function Contact() {
    return (
        <section className="bg-white text-black px-8 md:px-16 lg:px-24 py-16 relative z-10 mt-80">
            {/* Top annotation */}
            <div className="flex flex-col items-start ml-20">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-center leading-tight">
                    We'd Love To Hear
                    <br />
                    From You
                </p>

            </div>

            {/* Heading */}
            <div className="relative mb-12">
                <h1
                    className="font-black uppercase leading-none tracking-tight font-medium"
                    style={{ fontSize: "clamp(3rem, 13vw, 20rem)" }}
                >
                    GET IN TOUCH
                </h1>

                <span className="absolute right-[20%] bottom-[30%] text-xs md:text-sm font-medium bg-white">
                    Let's Connect
                </span>
                <img src={curvedArrow} alt="arrow" className="w-10 h-10 absolute top-[-10%] left-50" />
            </div>

            {/* Divider */}
            <div className="w-full h-[2px] bg-black mb-12"></div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row justify-between gap-12">

                {/* Contact Info */}
                <div className="flex flex-col gap-8 ml-50 mt-10">

                    {/* Email */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Mail className="w-7 h-7" strokeWidth={1.5} />
                        </div>

                        <span className="text-base md:text-lg font-medium">
                            Email : Example@gmail.com
                        </span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Phone className="w-7 h-7" strokeWidth={1.5} />
                        </div>

                        <span className="text-base md:text-lg font-medium">
                            Mobile No : 99999999999
                        </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 flex items-center justify-center mt-1">
                            <MapPin className="w-7 h-7" strokeWidth={1.5} />
                        </div>

                        <span className="text-base md:text-lg font-medium leading-relaxed">
                            Address : xxxxxxxxxxxxxxxxxxxx
                            <br />
                            <span className="ml-[70px]">
                                xxxxxxxxxxxxxxx
                            </span>
                        </span>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center lg:items-start gap-6">

                    <h2 className="w-[350px] text-end text-lg md:text-xl font-bold uppercase tracking-wide leading-snug">
                        Connect Through Social Media
                    </h2>

                    <div className="flex flex-col gap-5">

                        {/* Instagram */}
                        <a
                            href="#"
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 flex items-center justify-center">
                                <FaInstagram className="w-6 h-6" />
                            </div>

                            <span className="text-base md:text-lg font-medium group-hover:underline">
                                Instagram
                            </span>
                        </a>

                        {/* Facebook */}
                        <a
                            href="#"
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 flex items-center justify-center">
                                <FaFacebookF className="w-6 h-6" />
                            </div>

                            <span className="text-base md:text-lg font-medium group-hover:underline">
                                Facebook
                            </span>
                        </a>

                        {/* Twitter/X */}
                        <a
                            href="#"
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 flex items-center justify-center">
                                <FaXTwitter className="w-6 h-6" />
                            </div>

                            <span className="text-base md:text-lg font-medium group-hover:underline">
                                Twitter
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="mt-12 ml-55">
                <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300"
                >
                    Get Directions

                    <ArrowUpRight className="w-4 h-4" />
                </a>
            </div>
        </section>
    );
}

export default Contact;