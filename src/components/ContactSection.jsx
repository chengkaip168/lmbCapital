import { useRef, useState, useEffect } from "react";
import { Mail, Linkedin } from "lucide-react";

export default function ContactSection() {
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
    <section id="contact" className="py-24 md:py-32 bg-primary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Get In Touch
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Let's Connect
            </h2>
            <div className="w-16 h-1 bg-accent mb-8 rounded-full" />
            <p className="font-body text-base md:text-lg text-white/70 leading-relaxed mb-12">
              If you're an owner, operator, or investor interested in partnering — or simply want to
              compare notes — reach out directly.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:dan@lmbcap.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Mail className="text-accent" size={22} />
                </div>
                <div>
                  <p className="font-body text-sm text-white/50 uppercase tracking-widest mb-1">Email</p>
                  <p className="font-body text-white group-hover:text-accent transition-colors">dan@lmbcap.com</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/dan-sullivan-423a922"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Linkedin className="text-accent" size={22} />
                </div>
                <div>
                  <p className="font-body text-sm text-white/50 uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="font-body text-white group-hover:text-accent transition-colors">Dan Sullivan</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right — quote */}
          <div className={`flex items-center justify-center transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-14 w-full max-w-md">
              <div className="font-heading text-6xl text-accent/40 leading-none mb-4">"</div>
              <p className="font-heading text-xl md:text-2xl text-white leading-relaxed italic mb-8">
                We believe the best investments are built on trust, transparency, and a shared vision for long-term success.
              </p>
              <div className="w-12 h-0.5 bg-accent mb-4" />
              <p className="font-body text-sm text-white font-semibold">Dan Sullivan</p>
              <p className="font-body text-xs text-white/50 uppercase tracking-widest">Founder, LMB Capital</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
