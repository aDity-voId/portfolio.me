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
      <div className="grain" />
      <Navbar />
      <main>
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
