// src/pages/About.jsx

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { LampContainer } from "../components/Lamp";
import { TextGenerateEffect } from "../components/TextGenerateEffect";

const aboutMeTitle = "About Me";
const aboutMeParagraph = "Hi, I’m Arnesh Pal — a developer passionate about building intelligent, user-focused applications. I specialize in creating seamless front-end experiences with React and Next.js, while engineering scalable backends with Node.js, MongoDB, and Supabase. \nI also leverage AI and Machine Learning to craft innovative solutions that solve real-world problems and enhance user engagement.";

function About() {
    // State to track if it's a desktop view (medium breakpoint and up)
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Function to check screen size
        const checkIsDesktop = () => {
            setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
        };

        // Set initial state
        checkIsDesktop();

        // Add event listener for window resize
        window.addEventListener("resize", checkIsDesktop);

        // Clean up event listener
        return () => window.removeEventListener("resize", checkIsDesktop);
    }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

    // Common content for both desktop and mobile
    const aboutContent = (
        <div className="flex flex-col items-center text-center max-w-4xl px-4 md:px-0"> {/* Added horizontal padding for mobile */}
            <TextGenerateEffect
                words={aboutMeTitle}
                className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent"
            />

            <TextGenerateEffect
                words={aboutMeParagraph}
                className="text-lg md:text-xl leading-relaxed text-slate-300 mt-4"
            />
        </div>
    );

    return (
        <section
            id="about"
            // Conditional styling: h-auto for mobile, h-screen for desktop
            className={`panel w-screen ${isDesktop ? 'h-screen' : 'h-auto min-h-screen pt-24 pb-8'} flex flex-col items-center justify-center bg-black`}
        >
            {isDesktop ? (
                // Desktop: Render with LampContainer
                <LampContainer>
                    {aboutContent}
                </LampContainer>
            ) : (
                // Mobile: Render content directly with added top padding for navbar clearance
                <div className="w-full"> {/* Full width container for mobile content */}
                    {aboutContent}
                </div>
            )}
        </section>
    );
}

export default About;