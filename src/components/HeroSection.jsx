import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69cee9f6b009aca8b88e096d/61cb8858d_lmb.png"
          alt="LMB Capital building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-white/70 font-body text-sm tracking-[0.3em] uppercase mb-6">
            Private Equity & Growth Capital
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
        >
          Strategic Capital<span className="text-accent">.</span>
          <br />
          Enduring Value<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Partnering with exceptional management teams to build market-leading
          businesses in the lower middle market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#about"
            className="font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 bg-white text-primary rounded hover:bg-white/90 transition-all duration-300"
          >
            Learn More
          </a>
          <a
            href="#strategy"
            className="font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 border border-white/40 text-white rounded hover:bg-white/10 transition-all duration-300"
          >
            Our Strategy
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white/50" size={28} />
      </motion.div>
    </section>
  );
}