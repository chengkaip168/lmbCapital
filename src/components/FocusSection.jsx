import { useRef, useState, useEffect } from "react";
import { Wrench, Building2 } from "lucide-react";

const tracks = [
  {
    icon: Wrench,
    label: "Track 01",
    title: "Trades-Based Contractor Platform",
    body: "We're growing a trades-based contractor platform anchored in operational discipline, selective project mix, and consistent execution. Our focus is on the fundamentals that drive durable margins: pricing discipline, workforce reliability, and deep customer relationships. Built on this foundation, the platform is positioned to support measured expansion into new territories and broader service offerings as the right opportunities emerge.",
    criteria: [
      "$1M–$3M EBITDA (or $500k+ SDE for owner-operator businesses)",
      "Strong management in place",
      "Consistent revenue growth",
      "Needs-based services with recurring demand",
      "Preference for Electrical, HVAC, and Plumbing",
      "Dallas and Raleigh markets",
    ],
  },
  {
    icon: Building2,
    label: "Track 02",
    title: "Commercial Real Estate Portfolio",
    body: "We're building a focused commercial real estate portfolio across medical office, flex/industrial, retail, and multifamily assets. Our current holdings in Texas and North Carolina include medical, flex, and multifamily properties, each acquired on disciplined underwriting and held with a long-term operational mindset. We're actively pursuing additional opportunities in markets where local relationships and on-the-ground knowledge create lasting value.",
    criteria: [
      "$1M–$10M purchase price",
      "Under 50,000 SF",
      "Value-add: lease-up, re-tenanting, light repositioning",
      "Focus on industrial/flex, medical, and retail",
      "Dallas and Raleigh area markets",
    ],
  },
];

export default function FocusSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="focus" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69cee9f6b009aca8b88e096d/04d92373d_generated_d9b00140.png"
          alt="Focus background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Our Focus
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Two Complementary Tracks
          </h2>
          <p className="font-body text-white/60 max-w-2xl mx-auto text-base md:text-lg">
            LMB operates along two complementary tracks: a trades-based contractor platform and a focused commercial real estate portfolio.
          </p>
          <div className="w-16 h-1 bg-accent mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {tracks.map((track, i) => {
            const Icon = track.icon;
            return (
              <div
                key={track.title}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-10 hover:bg-white/10 transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors flex-shrink-0">
                    <Icon className="text-accent" size={28} />
                  </div>
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-accent/70">{track.label}</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-4">
                  {track.title}
                </h3>
                <p className="font-body text-white/70 leading-relaxed mb-6">
                  {track.body}
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">Criteria</p>
                  <ul className="space-y-2">
                    {track.criteria.map((c) => (
                      <li key={c} className="flex items-start gap-2 font-body text-sm text-white/60">
                        <span className="text-accent mt-1">&#x2022;</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}