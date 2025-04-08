import PrayerWidget from "../components/PrayerWidget";
import Hero from "../components/Hero";
import Information from "../components/Information";
import About from "../components/About";
import Address from "../components/Address";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const StyledLandpage = styled.div`
  background-color: #f8f5e4;
`;

export default function Home() {
  return (
    <StyledLandpage>
      <>
        <Navbar />
        <PrayerWidget />
        <Hero />
        <Information />
        <About />
        <Address />
        <Footer />
      </>
    </StyledLandpage>
  );
}
