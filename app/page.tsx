import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Technology from "./components/Technology";
import Agent from "./components/Agent";
import Team from "./components/Team";
import IAO from "./components/IAO";
import Roadmap from "./components/Roadmap";
import FAQ from "./components/FAQ";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Technology />
        <Agent />
        <Team />
        <IAO />
        <Roadmap />
        <FAQ />
        <Community />
      </main>
      <Footer />
    </>
  );
}
