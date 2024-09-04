import AboutUs from "@/components/home/AboutUs";
import HeroSection from "@/components/home/HeroSection";
import OurOffer from "@/components/home/OurOffer";
import OurProcess from "@/components/home/OurProcess";


export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutUs />
      <OurProcess />
      <OurOffer />
    </main>
  );
}
