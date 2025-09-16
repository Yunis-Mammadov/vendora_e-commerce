import NewSectionWoman from "./components/HomeSections/NewSectionWoman";
import HeroSection from "./components/HomeSections/HeroSection";
import AboutSection from "./components/HomeSections/AboutSection";
import NewSectionMan from "./components/HomeSections/NewSectionMan";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewSectionWoman />
      <AboutSection />
      <NewSectionMan />
    </>
  );
}
