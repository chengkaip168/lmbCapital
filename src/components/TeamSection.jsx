import { useRef, useState, useEffect } from "react";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Dan Sullivan",
    title: "Founder",
    bio: "Dan founded LMB Capital after 25+ years building, managing, and optimizing complex businesses at Netflix, HP, and R/GA. Across those roles, he led cross-functional teams, owned P&L for multi-million-dollar business units, and translated strategy into execution, improving margins, scaling operations, and building systems that supported sustainable growth. Today he applies that operational discipline directly to acquiring and operating small businesses and commercial real estate. He owns medical, flex, and multifamily assets in Texas and North Carolina, and is a minority owner of a marketing agency he helped scale to over $1M in annual earnings.",
    linkedin: "https://www.linkedin.com/in/dan-sullivan-423a922/",
    initials: "DS",
    photo: "https://media.base44.com/images/public/69cfd1b8d150b628a33190aa/6089130d3_IMG_1057.png",
  },
  {
    name: "Myles O'Leary",
    title: "Senior Analyst",
    bio: "Myles leads deal sourcing, market research, and investment analysis at LMB. He brings a disciplined, data-driven approach to evaluating opportunities, underwriting risk, and identifying value-creation levers across both business and real estate investments.",
    linkedin: "https://www.linkedin.com/in/myles-oleary/",
    initials: "MO",
    photo: "https://media.base44.com/images/public/69cfd1b8d150b628a33190aa/c329742c8_MylesOLearyheadshot.webp",
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
    <section id="team" className="py-24 md:py-32 bg-secondary" ref={ref}>
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
            Operators and investors who have been in the room — and stay in the room.
          </p>
        </div>

        {/* Core Team */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`group bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  {member.photo
                    ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                    : <span className="font-heading text-xl font-bold text-primary">{member.initials}</span>
                  }
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="font-body text-sm tracking-widest uppercase text-accent mt-0.5">{member.title}</p>
                </div>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {member.bio}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors text-sm font-body font-medium"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        {/* Extended Network */}
        <div
          className={`bg-primary rounded-2xl p-10 md:p-14 grid lg:grid-cols-2 gap-10 items-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          <div>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Extended Network
            </p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              University Partnerships
            </h3>
            <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
            <p className="font-body text-white/70 leading-relaxed">
              We partner with local universities to give undergraduate and MBA finance and real estate
              students the opportunity to learn the fundamentals of underwriting and deal sourcing.
              It's a win-win: we stay engaged with the local community, and they get hands-on experience
              that matters.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white/10 rounded-xl p-8 flex flex-col items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/400px-The_University_of_California_UCLA.svg.png"
                alt="UCLA"
                className="h-20 w-auto object-contain brightness-0 invert opacity-80"
              />
              <p className="font-body text-white/60 text-sm text-center">
                Partnering with top-tier universities to develop the next generation of analysts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}