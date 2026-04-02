import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import AboutSection from "../components/AboutSection";
import StrategySection from "../components/StrategySection";
import TrackRecordSection from "../components/TrackRecordSection";
import TeamSection from "../components/TeamSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <StrategySection />
      <TrackRecordSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}