import { TrendingUp, Shield, Users, Target } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const strategies = [
  {
    icon: Target,
    title: "Targeted Investments",
    description:
      "We focus on companies with $5M–$25M EBITDA in resilient, non-cyclical industries with strong growth fundamentals.",
  },
  {
    icon: Users,
    title: "Partnership Approach",
    description:
      "We work alongside management teams as collaborative partners, providing strategic guidance and operational resources to accelerate growth.",
  },
  {
    icon: TrendingUp,
    title: "Value Creation",
    description:
      "Our disciplined approach combines organic growth initiatives, strategic acquisitions, and operational improvements to build lasting value.",
  },
  {
    icon: Shield,
    title: "Capital Preservation",
    description:
      "Rigorous underwriting, diversified portfolios, and active portfolio management ensure consistent risk-adjusted returns through all market conditions.",
  },
];

export default function StrategySection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="strategy" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/section-background.png"
          alt="Strategy background pattern"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Investment Strategy
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            A Proven Approach to Growth
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {strategies.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-10 hover:bg-white/10 transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                  <Icon className="text-accent" size={28} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-4">
                  {s.title}
                </h3>
                <p className="font-body text-white/70 leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}