import SmoothScroll from './components/Layout/SmoothScroll';
import CustomCursor from './components/Layout/CustomCursor';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Hero/Hero';
import Work from './components/Work/Work';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      {/* Background Ambience */}
      <div className="grain" />
      <div className="neon-glow-bg">
        <div className="neon-orb-1" />
        <div className="neon-orb-2" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default App;
