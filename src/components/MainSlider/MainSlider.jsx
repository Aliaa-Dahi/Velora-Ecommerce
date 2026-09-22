import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faShieldHalved,
  faRotateLeft,
  faHeadset,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/* ── Static slide data ────────────────────────────────────────────────────── */
const SLIDES = [
  {
    tag:     "New Arrivals",
    title:   "Discover the\nLatest Trends",
    desc:    "Fresh products added daily — explore what's new across every category.",
    cta:     "Shop Now",
    ctaLink: "/product",
  },
  {
    tag:     "Top Brands",
    title:   "Trusted Names,\nUnbeatable Prices",
    desc:    "Hundreds of brands. One seamless shopping experience, delivered fast.",
    cta:     "Browse Brands",
    ctaLink: "/brands",
  },
  {
    tag:     "Best Sellers",
    title:   "What Everyone\nis Buying",
    desc:    "Our most-loved products, rated and reviewed by real customers like you.",
    cta:     "See Products",
    ctaLink: "/product",
  },
];

const PERKS = [
  { icon: faShippingFast, title: "Free Shipping",  desc: "On orders over 500 EGP"    },
  { icon: faShieldHalved, title: "Secure Payment", desc: "100% protected checkout"    },
  { icon: faRotateLeft,   title: "Easy Returns",   desc: "30-day hassle-free returns" },
  { icon: faHeadset,      title: "24/7 Support",   desc: "Always here to help"        },
];

/* Small floating particles — positions and delays are fixed so they don't
   move around on re-render */
const PARTICLES = [
  { size: 6,  top: "15%", left: "72%", delay: "0s",    dur: "4.2s"  },
  { size: 10, top: "60%", left: "80%", delay: "0.8s",  dur: "5.5s"  },
  { size: 4,  top: "78%", left: "60%", delay: "1.4s",  dur: "3.8s"  },
  { size: 8,  top: "25%", left: "88%", delay: "2.1s",  dur: "6s"    },
  { size: 5,  top: "45%", left: "68%", delay: "0.3s",  dur: "4.8s"  },
  { size: 7,  top: "85%", left: "75%", delay: "1.7s",  dur: "5.2s"  },
];

const INTERVAL = 4500;

/* ── Component ────────────────────────────────────────────────────────────── */
const MainSlider = () => {
  const [active, setActive]   = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused]   = useState(false);

  const goTo = useCallback((i) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  }, []);

  const next = useCallback(
    () => goTo((active + 1) % SLIDES.length),
    [active, goTo]
  );
  const prev = useCallback(
    () => goTo((active - 1 + SLIDES.length) % SLIDES.length),
    [active, goTo]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  const slide = SLIDES[active];

  return (
    <div className="mb-8 space-y-4">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-base overflow-hidden shadow-card"
        style={{ background: "linear-gradient(135deg, #088a08 0%, #0aad0a 55%, #4dc94d 100%)", minHeight: "300px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Animated blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Pulsing rings (top-right corner) */}
        <span className="pulse-ring" style={{ width: 160, height: 160, top: -40, right: -40 }} />
        <span className="pulse-ring" style={{ width: 100, height: 100, top: -10, right: -10, animationDelay: "1s" }} />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              width:  p.size,
              height: p.size,
              top:    p.top,
              left:   p.left,
              animation: `particle-float ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        {/* Slide content */}
        <div
          key={animKey}
          className="hero-text-enter relative z-10 flex flex-col items-start px-8 sm:px-14 py-12 sm:py-16 max-w-2xl"
        >
          {/* Tag pill */}
          <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5 border border-white/30">
            {slide.tag}
          </span>

          {/* Headline */}
          <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight mb-4 whitespace-pre-line drop-shadow-sm">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            {slide.desc}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              to={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-base shadow-card hover:bg-neutral-bg-soft transition-colors"
            >
              {slide.cta}
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 border border-white/50 text-white font-medium text-sm px-6 py-3 rounded-base hover:bg-white/15 transition-colors backdrop-blur-sm"
            >
              View Cart
            </Link>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-7 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide counter */}
        <span className="absolute bottom-4 right-5 text-white/50 text-xs font-medium z-10 select-none">
          {active + 1} / {SLIDES.length}
        </span>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/35 border border-white/20 text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/35 border border-white/20 text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </button>
      </div>

      {/* ── Perks strip ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PERKS.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3 bg-neutral-white border border-neutral-border rounded-base px-4 py-3 shadow-card"
          >
            <div className="w-9 h-9 rounded-full bg-primary-soft flex items-center justify-center text-primary shrink-0">
              <FontAwesomeIcon icon={icon} className="text-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-text-heading text-xs font-semibold leading-tight">{title}</p>
              <p className="text-text-muted text-xs leading-tight truncate">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
