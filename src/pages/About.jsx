// src/pages/About.jsx

import React from "react";
import { LampContainer } from "../components/Lamp";
import { TextGenerateEffect } from "../components/TextGenerateEffect";

const aboutMeTitle = "About Me";
// Combine the two paragraphs into one string, separated by a newline character (\n)
const aboutMeParagraph = "Hi, I’m Arnesh Pal — a developer passionate about building intelligent, user-centric applications. I craft seamless experiences with React, Next.js, and Node.js, and build robust backends with MongoDB and Supabase.\nI leverage AI and Machine Learning to design smart solutions for real-world challenges.";

function About() {
    return (
        <section id="about" className="panel w-screen h-screen">
            <LampContainer>
                <div className="flex flex-col items-center text-center max-w-4xl">
                    <TextGenerateEffect
                        words={aboutMeTitle}
                        className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent"
                    />

                    {/* Use a single component for the entire paragraph */}
                    <TextGenerateEffect
                        words={aboutMeParagraph}
                        className="text-lg md:text-xl leading-relaxed text-slate-300 mt-4"
                    />
                </div>
            </LampContainer>
        </section>
    );
}

export default About;