import { useRef, useState, useEffect } from "react";
import { Layers, Cog, TrendingUp, Search } from "lucide-react";

const pillars = [
  {
    number: "01",
    icon: Layers,
    title: "Flexible Structures",
    body: "Partial exits, recapitalizations, seller notes, and long-term joint ventures — structured around what works for you, not a template.",
  },
  {
    number: "02",
    icon: Cog,
    title: "Operational Support",
    body: "Capital is the easy part. We bring strategic focus, hands-on execution, and respect for the systems already in place.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Aligned Long-Term",
    body: "Our goal is shared upside. We protect culture, protect downside, and grow value over years — not quarters.",
  },
];

export default function ApproachSection() {
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
    <section id="approach" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Owner Partnership */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Our Approach
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Owners Deserve More Than a Clean Exit
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-8 rounded-full" />
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            Many SMB owners care deeply about their employees, their customers, and what they've built.
            They want liquidity, but not a financial buyer who walks in, walks out, and leaves the business
            unrecognizable. We're built for the owners in between.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className={`border border-border rounded-lg p-8 hover:shadow-lg transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-heading text-4xl font-bold text-accent/20">{p.number}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="text-primary" size={20} />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{p.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>

        {/* Deal Sourcing */}
        <div
          className={`bg-secondary rounded-2xl p-10 md:p-14 grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                <Search className="text-accent" size={20} />
              </div>
              <p className="font-body text-sm tracking-[0.2em] uppercase text-accent">Deal Sourcing</p>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              We Work With People Who Find Great Deals
            </h3>
            <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              We actively work with college students, interns, brokers, operators, and independent
              deal-finders who have access to high-quality opportunities. If you source a deal that
              meets our criteria and closes, we offer success fees and, in select cases, ongoing equity participation.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              We value curiosity, hustle, and local market knowledge. Whether you're early in your
              career or simply well-connected in a niche market, we're open to building long-term
              sourcing relationships — not just one-off transactions.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              "Access to high-quality deal flow",
              "Success fees paid at close",
              "Equity participation in select cases",
              "Long-term sourcing relationships",
              "Open to students, brokers, and operators",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-accent font-bold mt-0.5">—</span>
                <p className="font-body text-foreground">{item}</p>
              </div>
            ))}
            <a
              href="#contact"
              className="mt-4 inline-block font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all duration-300 text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}