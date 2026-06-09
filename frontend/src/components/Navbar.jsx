import React from "react";
import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white px-8 py-4 flex items-center justify-between ">
      {/* LOGO */}
      <div className="text-2xl font-medium tracking-wide text-black ml-4">
        logo
      </div>

      {/* CENTER NAV - Black Pill */}
      <div className="hidden md:flex items-center gap-12 bg-black rounded-full px-10 py-3.5">
        <a href="#" className="text-[13px] text-gray-300 hover:text-white transition-colors">Home</a>
        <a href="#" className="text-[13px] text-gray-300 hover:text-white transition-colors">Services</a>
        <a href="#" className="text-[13px] text-gray-300 hover:text-white transition-colors">About US</a>
        <a href="#" className="text-[13px] text-gray-300 hover:text-white transition-colors">Contact Us</a>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 mr-4">
        <button className="bg-[#E7FF00] hover:bg-black hover:text-white text-black px-8 py-2.5 rounded-full font-medium transition-colors text-sm flex items-center gap-1">
          Contact <span className=""><ArrowUpRight size={20} /></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;