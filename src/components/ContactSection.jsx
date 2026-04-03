import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Get In Touch
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Let's Build Something Together
            </h2>
            <div className="w-16 h-1 bg-accent mb-8 rounded-full" />
            <p className="font-body text-base md:text-lg text-white/70 leading-relaxed mb-12">
              Whether you're a management team seeking a strategic partner or a
              sponsor looking for flexible capital solutions, we'd like to hear
              from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-accent" size={22} />
                </div>
                <div>
                  <p className="font-body text-sm text-white/50 uppercase tracking-widest mb-1">
                    Office
                  </p>
                  <p className="font-body text-white">
                    200 Park Avenue, Suite 1800
                    <br />
                    New York, NY 10166
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-accent" size={22} />
                </div>
                <div>
                  <p className="font-body text-sm text-white/50 uppercase tracking-widest mb-1">
                    Phone
                  </p>
                  <p className="font-body text-white">(212) 555-0180</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-accent" size={22} />
                </div>
                <div>
                  <p className="font-body text-sm text-white/50 uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <p className="font-body text-white">info@lmbcapital.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — decorative quote */}
          <div className="flex items-center justify-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-10 md:p-14 max-w-md">
              <div className="font-heading text-6xl text-accent/40 leading-none mb-4">
                "
              </div>
              <p className="font-heading text-xl md:text-2xl text-white leading-relaxed italic mb-8">
                We believe the best investments are built on trust,
                transparency, and a shared vision for long-term success.
              </p>
              <div className="w-12 h-0.5 bg-accent mb-4" />
              <p className="font-body text-sm text-white font-semibold">
                Dan Sullivan
              </p>
              <p className="font-body text-xs text-white/50 uppercase tracking-widest">
                Managing Partner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}