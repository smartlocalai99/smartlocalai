import Image from "next/image";
import {
  MdCampaign,
  MdFactory,
  MdLanguage,
  MdLocationOn,
  MdPalette,
  MdPrecisionManufacturing,
  MdSearch,
} from "react-icons/md";
import { HiOutlineArrowRight } from "react-icons/hi";
import { PRODUCT_BALLS } from "../../lib/productCatalog";
import { cardTexture, waveTexture } from "../../lib/cardTextures";

const products = [
  ...PRODUCT_BALLS.map((product) => ({
    ...product,
    name: `${product.name} AI`,
  })),
  {
    name: "SmartIndustry AI",
    description: "Manufacturing ERP from production floor to executive reporting.",
    features: ["Production & quality", "Warehouse & purchase", "CRM, HRM & payroll", "AI production analytics"],
    Icon: MdFactory,
    color: "#ea580c",
    soft: "#fff0e8",
    texture: "grid",
    textureSize: 34,
  },
];

const services = [
  {
    title: "Web Development",
    text: "Premium business, corporate, education, healthcare, real-estate, restaurant, and ecommerce experiences.",
    Icon: MdLanguage,
  },
  {
    title: "SEO + AEO",
    text: "Technical and local SEO with visibility across Google, ChatGPT, Gemini, Perplexity, Claude, and voice search.",
    Icon: MdSearch,
  },
  {
    title: "Digital Marketing",
    text: "Performance campaigns, lead generation, and social growth across Google, Meta, YouTube, and LinkedIn.",
    Icon: MdCampaign,
  },
  {
    title: "Google Business",
    text: "Profile management, review systems, Maps optimization, and stronger local ranking.",
    Icon: MdLocationOn,
  },
  {
    title: "Branding",
    text: "Identity, brochures, catalogues, packaging, corporate profiles, video, and motion graphics.",
    Icon: MdPalette,
  },
];

export default function SmartLocalEcosystem() {
  return (
    <main id="about" className="overflow-hidden bg-[#f6f5f1] text-[#0c1714]">
      <section id="products" className="px-6 py-24 md:px-12 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ef5a38]">
                The product ecosystem
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-6xl">
                Built as a parent ecosystem.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end">
              SmartLocal AI brings specialized software products together under one
              trusted company—giving schools, hospitals, businesses, legal teams,
              restaurants, and industries technology designed for how they work.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map(({ name, description, features, Icon, image, color, soft, ball, inset = 0, blend, logoFilter, texture, textureSize }, index) => {
              const stageStyle =
                texture === "waves"
                  ? { background: soft, backgroundImage: waveTexture(color), backgroundPosition: "right -6px bottom -2px", backgroundRepeat: "no-repeat" }
                  : { background: soft, ...cardTexture(texture, color, textureSize) };
              return (
                <article
                  key={name}
                  className="group overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.1)]"
                >
                  <div className="relative h-28 overflow-hidden" style={stageStyle}>
                    {Icon && (
                      <Icon
                        aria-hidden
                        className="pointer-events-none absolute -bottom-5 -right-3 text-[104px] opacity-[0.16] transition duration-500 group-hover:scale-110 group-hover:opacity-[0.22]"
                        style={{ color }}
                      />
                    )}
                    <span
                      className="absolute right-5 top-5 text-[10px] font-black tracking-[0.18em]"
                      style={{ color, opacity: 0.55 }}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div className="px-7 pb-7">
                    <span
                      className="relative -mt-9 grid h-[72px] w-[72px] place-items-center overflow-hidden rounded-full border-[3px] border-white text-2xl shadow-[8px_10px_22px_rgba(15,23,42,0.18),inset_-6px_-8px_12px_rgba(15,23,42,0.16),inset_4px_4px_8px_rgba(255,255,255,0.42)]"
                      style={{ background: ball || soft, color }}
                    >
                      {image ? (
                        <>
                          <span
                            className="absolute z-[1] overflow-hidden rounded-full"
                            style={{ inset: `${inset}px`, background: ball }}
                          >
                            <Image
                              src={image}
                              alt=""
                              fill
                              sizes="72px"
                              className="object-fill"
                              style={{
                                filter: logoFilter,
                                mixBlendMode: blend ? "multiply" : undefined,
                              }}
                            />
                          </span>
                          <span className="pointer-events-none absolute left-3 top-2 z-[2] h-4 w-9 -rotate-[18deg] rounded-full bg-gradient-to-b from-white/65 to-transparent blur-[2px]" />
                        </>
                      ) : (
                        <Icon />
                      )}
                    </span>
                    <h3 className="mt-6 text-2xl font-black tracking-[-0.035em]">{name}</h3>
                    <p className="mt-3 min-h-14 text-sm leading-6 text-slate-500">{description}</p>
                    <div className="mt-7 grid grid-cols-2 gap-2">
                      {features.map((feature) => (
                        <span key={feature} className="rounded-xl bg-[#f6f7f7] px-3 py-2 text-[10px] font-bold text-slate-600">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#0d1916] px-6 py-24 text-white md:px-12 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ff7655]">Digital services</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.055em] md:text-6xl">
                Strategy, technology, and growth in one team.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/55">
              From the first website to AI-search visibility and performance marketing,
              every service works as part of the same connected growth system.
            </p>
          </div>

          <div className="mt-16 grid border-y border-white/10 md:grid-cols-2 xl:grid-cols-5">
            {services.map(({ title, text, Icon }) => (
              <article key={title} className="border-b border-white/10 p-7 md:border-r xl:border-b-0 last:border-r-0">
                <Icon className="text-3xl text-[#ff7655]" />
                <h3 className="mt-10 text-lg font-black">{title}</h3>
                <p className="mt-4 text-xs leading-6 text-white/50">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="px-6 py-24 md:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1600px] overflow-hidden rounded-[36px] bg-gradient-to-br from-[#e8e5ff] via-white to-[#e4f8f3] lg:grid-cols-2">
          <div className="p-9 md:p-14 lg:p-20">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#5b4bb7]">SmartLift AI · R&amp;D</p>
            <h2 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.055em] md:text-6xl">
              Building what comes next.
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-600">
              Our research and development division explores robotics, industrial
              automation, IoT, machine vision, computer vision, and future smart machines.
            </p>
            <a href="#contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#101b18] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-white">
              Explore SmartLift <HiOutlineArrowRight />
            </a>
          </div>
          <div className="relative min-h-[380px] overflow-hidden bg-[#111c19] p-10 text-white md:p-14">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[52px] border-white/[0.06]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <MdPrecisionManufacturing className="text-6xl text-[#8c80ec]" />
              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-white/65">
                {["Robotics", "Industrial automation", "AI research", "IoT systems", "Machine vision", "Innovation lab"].map((item) => (
                  <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24 md:px-12 lg:pb-32">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-8 rounded-[30px] bg-[#ef5a38] p-9 text-white md:p-14 lg:flex-row lg:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/65">Start with SmartLocal AI</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">One conversation. Every digital possibility.</h2>
          </div>
          <a href="#" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-[10px] font-black uppercase tracking-[0.12em] text-[#17211e]">
            Talk to our team <HiOutlineArrowRight />
          </a>
        </div>
      </section>
    </main>
  );
}
