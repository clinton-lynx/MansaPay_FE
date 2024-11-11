import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Navbar } from "../components/Navbar";
import TeamSection from "../components/Teams";
import ToolsAPIs from "../components/Tools";
import UseCases from "../components/UseCases";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <ToolsAPIs />
      <TeamSection />
      <Footer />
    </>
  );
}
