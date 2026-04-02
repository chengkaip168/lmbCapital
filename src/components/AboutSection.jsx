import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/__generating__/img_9f00673869ef.png"
                alt="Modern boardroom with city view"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
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
              Building Value Through Partnership
            </h2>
            <div className="w-16 h-1 bg-accent mb-8 rounded-full" />
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              LMB Capital is a private equity firm focused on the lower middle
              market. We partner with talented management teams to build
              exceptional businesses through a combination of strategic capital,
              operational expertise, and long-term commitment.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              With decades of combined investment experience, our team brings a
              disciplined approach to value creation that has delivered consistent
              returns across market cycles. We pride ourselves on being
              responsive, reliable, and deeply aligned with our partners.
            </p>
            <a
              href="#strategy"
              className="inline-block font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all duration-300"
            >
              Our Approach
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}