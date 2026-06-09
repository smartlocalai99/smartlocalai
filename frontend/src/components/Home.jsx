import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero_img from "../assets/hero_img.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  return (
    <section className="scroll-section bg-white min-h-screen w-full flex flex-col items-center justify-between pt-16 pb-4 overflow-hidden">

      {/* HEADING */}
      <div className="text-center z-20">
        <h1 className="text-5xl md:text-6xl lg:text-[68px] font-medium leading-tight text-black tracking-tight">
          Transform Your Business <span className="mr-8"></span> With<br />
          AI-Powered Solutions
        </h1>
      </div>
      {/* LAPTOP GRAPHIC USING YOUR IMAGE */}
      <div className="laptop-container relative w-screen flex justify-center">
        <div className="relative w-full h-full flex justify-center items-center">

          {/* The physical laptop image */}
          <img src={hero_img} alt="laptop mockup" className="w-full h-auto object-cover relative z-10" />

          {/* The screen overlay with GSAP animation */}
          {/* IMPORTANT: You will likely need to adjust these top, left, width, and height percentages 
                to make the screen perfectly fit inside the bezel of your specific hero_img.jpeg */}
          <div className="screen absolute z-20 overflow-hidden bg-[#0B192C]"
            style={{
              top: "15%",
              left: "19.7%",
              width: "61%",
              height: "65.5%",
              borderRadius: "4px"
            }}>
            <div className="docs w-full h-full will-change-transform">
              {/* DOC 1 */}
              <div className="doc w-full h-full bg-gradient-to-b from-[#4A88FF] to-white">
                <img src="https://picsum.photos/1200/800?random=3" alt="doc2" className="w-full h-full object-cover" />
              </div>
              {/* DOC 2 */}
              <div className="doc w-full h-full will-change-transform">
                <img src="https://picsum.photos/1200/800?random=4" alt="doc2" className="w-full h-full object-cover" />
              </div>
              {/* DOC 3 */}
              <div className="doc w-full h-full will-change-transform">
                <img src="https://picsum.photos/1200/800?random=2" alt="doc3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row justify-between items-center gap-8 mt-10">
        <p className="text-gray-500 font-medium text-[13px] max-w-[320px] leading-snug">
          Custom software, AI ERP systems, automation, SEO,
          <br />
          and digital growth solutions for modern businesses.
        </p>

        <button className="bg-[#E7FF00] hover:bg-black hover:text-white text-black px-8 py-3.5 rounded-full font-bold shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-all hover:-translate-y-1 text-[15px]">
          Book Free Consultation
        </button>
      </div>

    </section>
  );
};

export default Home;