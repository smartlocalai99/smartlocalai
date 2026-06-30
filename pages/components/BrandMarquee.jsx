"use client";

import Marquee from "react-fast-marquee";

export default function BrandMarquee() {
  const brands = [
    {
      name: "logo ipsum",
      logo: "/icon.png",
    },
    {
      name: "logo ipsum",
      logo: "/icon.png",
    },
    {
      name: "logo ipsum",
      logo: "/icon.png",
    },
    {
      name: "logo ipsum",
      logo: "/icon.png",
    },
  ];

  return (
    <section className="w-full bg-[#F3734A] py-5 overflow-hidden">
      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            className="mx-20 flex items-center justify-center"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-10 w-auto object-contain"
            />
          </div>
        ))}

        {brands.map((brand, index) => (
          <div
            key={`duplicate-${index}`}
            className="mx-20 flex items-center justify-center"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-10 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}