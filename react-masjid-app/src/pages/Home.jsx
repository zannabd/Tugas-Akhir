import PrayerWidget from "../components/PrayerWidget";
import Hero from "../components/Hero";
import Information from "../components/Information";
import About from "../components/About";
import Address from "../components/Address";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <PrayerWidget />
      <Hero />
      <Information />
      <About />
      <Address />
      <Footer />
    </>
  );
}
