import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProofStrip from "@/components/sections/ProofStrip";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/effects/PageLoader";
import SmoothCursor from "@/components/effects/SmoothCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";

export default function Home() {
  return (
    <>
      <PageLoader />
      <SmoothCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <ProofStrip />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
