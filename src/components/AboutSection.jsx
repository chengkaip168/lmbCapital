import { useRef, useState, useEffect } from "react";

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ minHeight: '520px' }}>
              <img
                src="https://images.unsplash.com/photo-1553613307-4c62a014c22f?w=1600&q=90"
                alt="Aerial view of warehouse"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              About LMB Capital
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Built Around Durable Value
            </h2>
            <div className="w-16 h-1 bg-accent mb-8 rounded-full" />
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              LMB Capital is built around acquiring and growing durable, cash-flowing businesses
              and commercial real estate in select U.S. markets.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              We partner with experienced operators and aligned investors to build long-term value
              through disciplined acquisitions, thoughtful capital structures, and hands-on execution.
            </p>
            <a
              href="#focus"
              className="inline-block font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all duration-300"
            >
              Our Focus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}