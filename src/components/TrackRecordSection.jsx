import { useRef, useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Consistent top-quartile returns across fund vintages",
  "Successful exits generating significant investor value",
  "Long-standing relationships with 60+ sponsor partners",
  "Deep sector expertise in healthcare, technology, and business services",
  "Proven ability to source proprietary deal flow",
  "Active portfolio management driving operational excellence",
];

export default function TrackRecordSection() {
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
    <section id="track-record" className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Track Record
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Results That Speak for Themselves
            </h2>
            <div className="w-16 h-1 bg-accent mb-8 rounded-full" />
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              Over two decades, LMB Capital has established a reputation for
              reliability, disciplined investing, and superior value creation.
              Our track record reflects our commitment to partnerships and
              performance.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-5">
            {highlights.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 transition-all duration-700 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="text-accent" size={22} />
                </div>
                <p className="font-body text-base md:text-lg text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}