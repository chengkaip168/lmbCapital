import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-bold text-white">
              LMB<span className="font-light ml-1">Capital</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#about" className="font-body text-xs tracking-widest uppercase text-white/50 hover:text-white/80 transition-colors">
              About
            </a>
            <a href="#strategy" className="font-body text-xs tracking-widest uppercase text-white/50 hover:text-white/80 transition-colors">
              Strategy
            </a>
            <a href="#team" className="font-body text-xs tracking-widest uppercase text-white/50 hover:text-white/80 transition-colors">
              Team
            </a>
            <a href="#contact" className="font-body text-xs tracking-widest uppercase text-white/50 hover:text-white/80 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/lmb-capital-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Linkedin className="text-white/60" size={16} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} LMB Capital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-white/40 hover:text-white/60 transition-colors">
              Disclosures
            </a>
            <a href="#" className="font-body text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}