import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FocusSection from "../components/FocusSection";
import ApproachSection from "../components/ApproachSection";
import TeamSection from "../components/TeamSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FocusSection />
      <ApproachSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}