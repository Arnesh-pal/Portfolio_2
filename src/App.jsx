// src/App.jsx

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Import your page components
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const mainContainerRef = useRef(null);
  const panels = useRef([]);
  const st = useRef(null);

  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);

  // 1. Add state to manage the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
      // Close mobile menu on resize to desktop
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      if (st.current) st.current.kill(); // Kill GSAP scroll trigger on mobile
      return;
    };

    const ctx = gsap.context(() => {
      st.current = gsap.to(panels.current, {
        xPercent: -100 * (panels.current.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: mainContainerRef.current,
          pin: true,
          scrub: 1.2,
          snap: 1 / (panels.current.length - 1),
          end: () => `+=${mainContainerRef.current.offsetWidth - window.innerWidth}`,
          onUpdate: (self) => {
            const newIndex = Math.round(self.progress * (panels.current.length - 1));
            if (newIndex !== activeIndexRef.current) {
              setActiveIndex(newIndex);
            }
          },
        },
      }).scrollTrigger;
    }, mainContainerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  const addToRefs = (el) => {
    if (el && !panels.current.includes(el)) {
      panels.current.push(el);
    }
  };

  const handleNavLinkClick = (index) => {
    setActiveIndex(index);
    setIsMenuOpen(false); // Close mobile menu on click

    if (isDesktop) {
      const scrollTriggerInstance = st.current;
      if (scrollTriggerInstance) {
        const targetScroll =
          scrollTriggerInstance.start +
          (scrollTriggerInstance.end - scrollTriggerInstance.start) *
          (index / (panels.current.length - 1));

        gsap.to(window, {
          scrollTo: { y: targetScroll, autoKill: false },
          duration: 1.5,
          ease: "power3.inOut",
        });
      }
    } else {
      if (panels.current[index]) {
        panels.current[index].scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="relative min-h-screen bg-black text-slate-200"
      style={{ overscrollBehavior: "none" }}
    >
      <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-black/50 backdrop-blur-sm">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div
            className="text-3xl font-bold text-white font-mono hover:text-sky-400 transition-colors duration-300 cursor-pointer"
            onClick={() => handleNavLinkClick(0)}
          >
            AP
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a className={`nav-link ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleNavLinkClick(0)}>Home</a>
            <a className={`nav-link ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleNavLinkClick(1)}>About</a>
            <a className={`nav-link ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleNavLinkClick(2)}>Projects</a>
            <a className={`nav-link ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleNavLinkClick(3)}>Contact</a>
          </div>
          <a className="hire-me-btn hidden md:block" onClick={() => handleNavLinkClick(3)}>Hire Me</a>

          {/* 2. Hamburger Button */}
          <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* 3. Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-8 text-2xl">
            <a className="nav-link" onClick={() => handleNavLinkClick(0)}>Home</a>
            <a className="nav-link" onClick={() => handleNavLinkClick(1)}>About</a>
            <a className="nav-link" onClick={() => handleNavLinkClick(2)}>Projects</a>
            <a className="nav-link" onClick={() => handleNavLinkClick(3)}>Contact</a>
            <a className="hire-me-btn mt-4" onClick={() => handleNavLinkClick(3)}>Hire Me</a>
          </div>
        )}
      </header>

      <main
        ref={mainContainerRef}
        className={isDesktop ? "w-[400vw] h-screen flex flex-nowrap relative z-10" : "w-full flex flex-col"}
      >
        <div ref={addToRefs}><Home isActive={activeIndex === 0} /></div>
        <div ref={addToRefs}><About isActive={activeIndex === 1} /></div>
        <div ref={addToRefs}><Projects isActive={activeIndex === 2} /></div>
        <div ref={addToRefs}><Contact isActive={activeIndex === 3} /></div>
      </main>
    </div>
  );
}

export default App;