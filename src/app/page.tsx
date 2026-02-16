import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProofStrip from "@/components/sections/ProofStrip";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/effects/PageLoader";
import SmoothCursor from "@/components/effects/SmoothCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";
import ChatWidget from "@/components/ChatWidget";

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
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
