import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "$2.4B+", label: "Assets Under Management" },
  { value: "85+", label: "Portfolio Companies" },
  { value: "60+", label: "Sponsor Partners" },
  { value: "20+", label: "Years of Experience" },
];

function StatItem({ value, label }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
        {value}
      </div>
      <div className="font-body text-sm tracking-widest uppercase text-white/60">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((s) => (
          <StatItem key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}