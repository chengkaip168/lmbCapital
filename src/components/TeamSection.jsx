import { useRef, useState, useEffect } from "react";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Dan Sullivan",
    title: "Managing Partner",
    bio: "20+ years in private equity with deep expertise in lower middle-market investing and value creation.",
  },
  {
    name: "Myles O'Leary",
    title: "Partner",
    bio: "Experienced investor and operator with a strong track record across growth equity and buyout transactions.",
  },
];

export default function TeamSection() {
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
    <section id="team" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Our Team
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Experienced Leadership
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our seasoned team brings decades of combined investment and
            operational experience across diverse industries and market cycles.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`group text-center transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Avatar placeholder */}
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                <span className="font-heading text-3xl font-bold text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="font-body text-sm tracking-widest uppercase text-accent mb-3">
                {member.title}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {member.bio}
              </p>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Linkedin className="text-accent mx-auto" size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}