// src/pages/MoreProjects.jsx
import React, { useState } from "react";

const moreProjectsData = [
    {
        id: "svelte-earthquake-visualizer",
        title: "Earthquake Visualizer",
        subtitle: "Real-time global earthquake visualizer",
        description: "A modern, fast and visually engaging way to explore recent earthquake data. It serves as a full-stack example of a SvelteKit application, combining a backend API route to proxy data with a dynamic, interactive frontend map.",
        imageUrl: "/ear.png",
        demoUrl: "https://svelte-earthquake-visualizer.vercel.app/",
        githubUrl: "https://github.com/Arnesh-pal/svelte-earthquake-visualizer",
    },
    // You can add more project objects here as you build them
];

function MoreProjects() {
    // If there are no projects, return a placeholder to avoid errors
    if (moreProjectsData.length === 0) {
        return (
            <section id="more-projects" className="panel w-screen h-screen bg-black text-slate-200 flex items-center justify-center">
                <p>More projects coming soon!</p>
            </section>
        );
    }

    const [selectedProject, setSelectedProject] = useState(moreProjectsData[0]);

    return (
        // OPTIMIZATION: Use h-auto on mobile to allow natural scrolling and adjust padding
        <section id="more-projects" className="panel w-screen h-auto md:h-screen bg-black text-slate-200 flex flex-col items-center justify-center p-4 pt-24 md:p-8 md:pt-28">
            <div className="w-full h-full max-w-7xl flex flex-col md:flex-row gap-8 border border-neutral-800 rounded-lg p-4 md:p-8">
                {/* Left Sidebar: Project List */}
                {/* OPTIMIZATION: Added margin-bottom on mobile for spacing */}
                <aside className="w-full md:w-1/4 flex-shrink-0 mb-8 md:mb-0">
                    <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-6">List of Projects</h3>
                    <ul className="space-y-2">
                        {moreProjectsData.map((project) => (
                            <li
                                key={project.id}
                                className={`cursor-pointer p-2 rounded-md transition-colors duration-300 ${selectedProject.id === project.id
                                    ? "bg-neutral-800 text-white"
                                    : "text-neutral-500 hover:bg-neutral-900 hover:text-white"
                                    }`}
                                onClick={() => setSelectedProject(project)}
                            >
                                {project.title}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right Side: Project Details */}
                {/* OPTIMIZATION: Changed overflow to prevent issues on mobile */}
                <main className="w-full md:w-3/4 md:overflow-y-auto">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div>
                            {/* OPTIMIZATION: Reduced font sizes for smaller screens */}
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif">{selectedProject.title}</h1>
                            <h2 className="text-lg md:text-xl text-neutral-400 mt-2">{selectedProject.subtitle}</h2>
                        </div>

                        {/* Description & Image */}
                        <div className="flex-grow flex flex-col lg:flex-row gap-8 my-8">
                            <div className="lg:w-1/2">
                                <p className="text-neutral-300 leading-relaxed mb-6">{selectedProject.description}</p>
                                <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">

                                </p>

                                <div className="project-links">
                                    <a
                                        href={selectedProject.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-button demo-button"
                                    >
                                        Live Demo
                                    </a>
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-button github-button"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-auto object-contain rounded-lg border border-neutral-800" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default MoreProjects;