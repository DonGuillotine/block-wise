import AboutUs from "@/components/home/AboutUs";
import HeroSection from "@/components/home/HeroSection";
import OurProcess from "@/components/home/OurProcess";


export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutUs />
      <OurProcess />
    </main>
  );
}
