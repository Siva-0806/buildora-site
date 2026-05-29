import WorldCanvas from "./components/WorldCanvas";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import HeroScroll from "./components/HeroScroll";
import About from "./components/About";
import Founder from "./components/Founder";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Values from "./components/Values";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Single unified 3D world — fixed behind everything */}
      <WorldCanvas />

      <Loader />
      <Cursor />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroScroll />
        <About />
        <Founder />
        <Services />
        <Portfolio />
        <Values />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
