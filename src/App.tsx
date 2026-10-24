import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Header from './components/Header';
import Hero from './sections/Hero';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Achievements from './sections/Achievements';
import InternationalExperience from './sections/InternationalExperience';
import Footer from './components/Footer';
import SnowBackground from './components/SnowBackground';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,
      effects: true,
    });
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      targets.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => {
      ctx.revert();
      smoother.kill();
    };
  }, []);

  return (
    <>
      <SnowBackground />
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="w-full flex flex-col items-center relative overflow-x-hidden" style={{ zIndex: 1 }}>
            <Hero />
            <div className="h-20 md:h-32" />
            <Projects />
            <div className="h-20 md:h-32" />
            <Experience />
            <div className="h-20 md:h-32" />
            <InternationalExperience />
            <div className="h-20 md:h-32" />
            <TechStack />
            <div className="h-20 md:h-32" />
            <Achievements />
            <div className="h-20 md:h-32" />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
