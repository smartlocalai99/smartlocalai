import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { PRODUCT_BALLS } from "../../lib/productCatalog";

const integrations = PRODUCT_BALLS;
const orbitDuration = 24;

const stagger = {
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AiWorkforceHero() {
  return (
    <section className="aws">
      {/* ── NAV ── */}
      <header className="aws-nav">
        <a href="#" className="brand-lockup" aria-label="SmartLocal AI home">
          <span className="sl-logo">SL</span>
          <span className="brand-name">SmartLocal AI</span>
        </a>

        <nav className="aws-links" aria-label="Main">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#services">Services</a>
          <a href="#research">Research</a>
        </nav>

        <div className="aws-nav-right">
          <a className="news-badge" href="#ecosystem">
            <span className="news-pill">Explore</span>
            The SmartLocal ecosystem
            <HiOutlineArrowRight className="news-arrow" />
          </a>
        </div>
      </header>

      {/* ── HERO BODY ── */}
      <div className="hero-body">

        {/* LEFT-ALIGNED COPY */}
        <motion.div
          className="aws-copy"
          variants={stagger}
          initial={false}
          animate="show"
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            The AI-powered digital ecosystem
          </motion.p>

          <motion.h1 variants={fadeUp}>
            <strong>One Ecosystem.</strong>
            <span>Infinite Intelligence.</span>
          </motion.h1>

          <motion.p className="hero-desc" variants={fadeUp}>
            Intelligent software, ERP platforms, automation, digital services,
            robotics, and enterprise technology—built under one trusted brand.
          </motion.p>

          <motion.a href="#ecosystem" className="cta-btn" variants={fadeUp}>
            Explore ecosystem
          </motion.a>

          <motion.div className="product-family" variants={fadeUp}>
            <span className="product-family-label">Our product family</span>
            <div className="product-family-list">
              {integrations.map((product) => (
                <span className="product-chip" key={product.name}>
                  <span className="product-chip-logo" style={{ background: product.ball }}>
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="28px"
                      className="product-chip-image"
                      style={{
                        filter: product.logoFilter,
                        mixBlendMode: product.blend ? "multiply" : undefined,
                      }}
                    />
                  </span>
                  {product.name.replace("Smart", "")}
                </span>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* ORBIT — decorative right side */}
        <motion.div
          className="orbit-stage"
          aria-hidden="true"
          variants={fadeIn}
          initial={false}
          animate="show"
        >
          <div className="orbit-ring" />
          {integrations.map((item, i) => {
            return (
              <div
                key={item.id}
                className="o-item"
                style={{ animationDelay: `${-1 - (i * orbitDuration) / integrations.length}s` }}
              >
                <span className="o-tail" />
                <span
                  className="o-pill"
                  style={{
                    background: item.ball,
                    animationDelay: `${-1 - (i * orbitDuration) / integrations.length}s`,
                  }}
                >
                  <span
                    className="o-logo-layer"
                    style={{ inset: `${item.inset}px`, background: item.ball }}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="78px"
                      className="o-logo-image"
                      style={{
                        filter: item.logoFilter,
                        mixBlendMode: item.blend ? "multiply" : undefined,
                      }}
                    />
                  </span>
                </span>
              </div>
            );
          })}
        </motion.div>

        <motion.div className="hero-stats" variants={fadeIn} initial={false} animate="show">
          <div><strong>10+</strong><span>AI products</span></div>
          <div><strong>360°</strong><span>Digital services</span></div>
          <div><strong>1</strong><span>Connected ecosystem</span></div>
        </motion.div>
      </div>

  

      <style jsx global>{`
        /* ─── SHELL ─────────────────────────────────────────── */
        .aws {
          background: #f5f4f0;
          color: #0a0a0a;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        /* ─── LOGO ──────────────────────────────────────────── */
        .sl-logo {
          display: grid;
          place-items: center;
          height: 46px;
          width: 46px;
          border-radius: 50%;
          background: #1e2d4a;
          color: #fff;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.08em;
          text-decoration: none;
          flex-shrink: 0;
        }
        .brand-lockup {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #0a0a0a;
          text-decoration: none;
        }
        .brand-name {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.025em;
          white-space: nowrap;
        }

        /* ─── NAV ───────────────────────────────────────────── */
        .aws-nav {
          position: relative;
          z-index: 20;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          width: min(calc(100% - 64px), 1800px);
          margin: 0 auto;
          padding-top: 36px;
          padding-bottom: 0;
          flex-shrink: 0;
        }
        .aws-links {
          display: flex;
          justify-content: center;
          gap: 36px;
          margin: 0 32px;
        }
        .aws-links a,
        .aws-nav-right a {
          color: #0a0a0a;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .aws-nav-right {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .news-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          font-size: 11px;
          font-weight: 700;
          color: #0a0a0a;
          text-decoration: none;
        }
        .news-pill {
          color: #e96443;
          background: #fff3ee;
          padding: 6px 10px;
          border-radius: 3px;
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .news-arrow {
          font-size: 13px;
          opacity: 0.6;
        }
        /* ─── HERO BODY ─────────────────────────────────────── */
        .hero-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
          padding-left: clamp(48px, 6vw, 120px);
        }

        /* ─── LEFT-ALIGNED COPY ─────────────────────────────── */
        .aws-copy {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          width: 670px;
          max-width: 52vw;
          padding: 0;
        }
        .eyebrow {
          display: inline-flex;
          padding: 8px 14px;
          border-radius: 4px;
          background: #faeee9;
          color: #df684b;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .aws-copy h1 {
          margin: 22px 0 0;
          font-size: clamp(44px, 4.6vw, 72px);
          line-height: 1.04;
          letter-spacing: -0.05em;
        }
        .aws-copy h1 strong {
          display: block;
          font-weight: 900;
          color: #000000;
        }
        .aws-copy h1 span {
          display: block;
          font-weight: 420;
          color: #111111;
        }
        .hero-desc {
          max-width: 530px;
          margin-top: 20px;
          font-size: 15px;
          font-weight: 450;
          line-height: 1.72;
          color: #444444;
        }
        .cta-btn {
          display: inline-flex;
          margin-top: 28px;
          padding: 16px 30px;
          border-radius: 5px;
          background: #ea5935;
          color: #fff;
          box-shadow: 0 10px 24px rgba(234, 89, 53, 0.28);
          font-size: 11px;
          font-weight: 850;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .cta-btn:hover {
          box-shadow: 0 18px 40px rgba(234, 89, 53, 0.38);
          transform: translateY(-2px);
        }
        .product-family {
          display: grid;
          gap: 11px;
          margin-top: 34px;
        }
        .product-family-label {
          color: #8a8984;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .product-family-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 620px;
        }
        .product-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 11px 6px 7px;
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.62);
          color: #343434;
          box-shadow: 0 5px 16px rgba(15,23,42,0.045);
          font-size: 10px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .product-chip-logo {
          position: relative;
          width: 26px;
          height: 26px;
          overflow: hidden;
          border-radius: 50%;
          background: #fff;
        }
        .product-chip-image {
          object-fit: cover;
        }

        /* ─── RIGHT-SIDE STATS ──────────────────────────────── */
        .hero-stats {
          position: absolute;
          z-index: 8;
          right: clamp(48px, 6vw, 120px);
          top: 50%;
          display: grid;
          gap: 40px;
          transform: translateY(-50%);
        }
        .hero-stats div {
          display: grid;
          gap: 6px;
        }
        .hero-stats strong {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #000;
        }
        .hero-stats span {
          font-size: 11px;
          font-weight: 600;
          color: #898989;
        }

        /* ─── ORBIT ─────────────────────────────────────────── */
        .orbit-stage {
          position: absolute;
          width: 700px;
          height: 700px;
          right: -220px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          pointer-events: none;
        }
        .orbit-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            conic-gradient(
              from 218deg,
              #8f9398 0deg,
              #d9dbdc 52deg,
              #a3a6aa 112deg,
              #ececeb 174deg,
              #a5a8ac 238deg,
              #d8d9d8 302deg,
              #8f9398 360deg
            );
          -webkit-mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 91px),
            #000 calc(100% - 90px)
          );
          mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 91px),
            #000 calc(100% - 90px)
          );
          filter: drop-shadow(0 12px 15px rgba(30, 38, 48, 0.1));
          transform: rotate(-10deg);
        }
        .o-item {
          position: absolute;
          z-index: 4;
          left: 50%;
          top: 50%;
          width: 78px;
          height: 78px;
          margin: -39px;
          animation: orbit 24s linear infinite;
        }

        .o-pill {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          box-shadow:
            11px 12px 22px rgba(18, 28, 52, 0.15),
            0 3px 8px rgba(18, 28, 52, 0.11),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.22);
          animation: counter-orbit 24s linear infinite;
        }
        .o-logo-image {
          object-fit: fill;
        }
        .o-logo-layer {
          position: absolute;
          z-index: 1;
          overflow: hidden;
          border-radius: 50%;
        }
        .o-pill::before {
          content: "";
          position: absolute;
          z-index: 2;
          top: 7px;
          left: 12px;
          width: 42px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0));
          filter: blur(2px);
          transform: rotate(-18deg);
          pointer-events: none;
        }
        .o-pill::after {
          content: "";
          position: absolute;
          z-index: 2;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset -10px -12px 18px rgba(10,18,35,0.22), inset 5px 5px 10px rgba(255,255,255,0.22);
          pointer-events: none;
        }

        .o-tail {
          position: absolute;
          z-index: 1;
          left: -90px;
          top: 7px;
          width: 160px;
          height: 60px;
          border-radius: 50%;
          background: #1a2840;
          filter: blur(17px);
          opacity: 0.18;
        }

        /* ─── BOTTOM STRIP ──────────────────────────────────── */
        .hero-bottom {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: flex-end;
          padding: 0 clamp(48px, 6vw, 120px) 28px;
          flex-shrink: 0;
          pointer-events: none;
        }
        .team-wrap {
          pointer-events: all;
        }
        .team-label {
          margin-bottom: 12px;
          color: #bbb;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }
        .team-card {
          width: 260px;
          padding: 20px 20px 18px;
          border-radius: 10px;
          background: #fff;
          border: 1.5px solid #f0f0f0;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.07),
            0 1px 4px rgba(0, 0, 0, 0.04);
        }
        .team-card h2 {
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #000;
        }
        .team-card > p {
          margin-top: 12px;
          font-size: 11px;
          font-weight: 450;
          line-height: 1.65;
          color: #666;
        }
        .tag-row {
          display: flex;
          gap: 5px;
          margin-top: 14px;
        }
        .tag-row span {
          padding: 4px 8px;
          border-radius: 3px;
          background: #f4f4f4;
          color: #555;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        /* ─── KEYFRAMES ─────────────────────────────────────── */
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(305px) rotate(90deg); }
          to   { transform: rotate(360deg) translateX(305px) rotate(90deg); }
        }
        @keyframes counter-orbit {
          from { transform: rotate(-90deg); }
          to   { transform: rotate(-450deg); }
        }
        /* ─── RESPONSIVE ─────────────────────────────────────── */
        @media (max-width: 1100px) {
          .aws-links { display: none; }
          .aws-nav { grid-template-columns: 1fr auto; }
          .orbit-stage { right: -360px; }
          .hero-stats { right: 3vw; }
        }
        @media (max-width: 760px) {
          .aws { height: 100svh; }
          .aws-nav {
            display: flex;
            justify-content: space-between;
            width: calc(100% - 36px);
            padding-top: 20px;
          }
          .aws-nav-right { position: static; margin-left: auto; }
          .news-badge { display: none !important; }
          .hero-body { padding-left: 22px; padding-right: 22px; }
          .aws-copy { width: 100%; max-width: 100%; padding: 0; }
          .aws-copy h1 { font-size: 38px; }
          .hero-desc { max-width: 320px; font-size: 14px; }
          .product-family { margin-top: 24px; }
          .product-family { width: calc(100vw - 22px); overflow: hidden; }
          .product-family-list {
            max-width: none;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-right: 22px;
            scrollbar-width: none;
          }
          .product-family-list::-webkit-scrollbar { display: none; }
          .product-chip { font-size: 9px; }
          .hero-stats { display: none; }
          .orbit-stage { width: 560px; height: 560px; right: -360px; }
          .orbit-ring { border-width: 76px; }
          .o-item { display: none; }
          .hero-bottom { padding-bottom: 20px; }
          .team-card { width: 220px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .o-item, .o-pill { animation-play-state: paused; }
        }
      `}</style>
    </section>
  );
}
