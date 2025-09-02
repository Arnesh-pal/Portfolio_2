// src/pages/Home.jsx

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { LinkPreview } from "../components/LinkPreview";

function Home() {
    const [typedText, setTypedText] = useState("");
    const typewriterText = " Building immersive digital experiences where technology meets creativity.";

    const headingRef = useRef(null);

    useEffect(() => {
        const introTl = gsap.timeline();

        // Animate the characters into view by targeting the .char class
        introTl.to(headingRef.current.querySelectorAll('.char'), {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.04,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });

        // Typewriter effect logic
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < typewriterText.length) {
                setTypedText(typewriterText.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        // The hover effect logic has been removed.

        // Cleanup function
        return () => {
            clearInterval(typingInterval);
            introTl.kill();
        };
    }, []);

    const renderChars = (text) =>
        text.split('').map((char, index) =>
            <span key={index} className="char inline-block opacity-0">{char === ' ' ? '\u00A0' : char}</span>
        );

    return (
        <section
            id="home"
            className="panel w-screen h-screen flex justify-center items-center relative z-20"
        >
            <div className="max-w-4xl text-left px-8">
                <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-4">
                    <span className="block">
                        <LinkPreview url="https://github.com/Arnesh-pal" className="hover:underline">
                            Creative
                        </LinkPreview>
                        {renderChars(" Full Stack")}
                    </span>
                    {/* The wrapper div and pop-up card have been removed. */}
                    <span className="block text-sky-400">
                        {renderChars("Developer")}
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8 font-mono">
                    <span className="text-sky-400">&gt;</span>
                    <span id="typewriter-text">{typedText}</span>
                    <span className="opacity-0 animate-ping">|</span>
                </p>
            </div>
        </section>
    );
}

export default Home;