// src/pages/Projects.jsx

import React from "react";

// Use \n in the title string to create a line break
const projects = [
    {
        id: "04",
        title: "Interactive\nDashboard",
        description: "A full-stack dynamic dashboard with React, Node.js and PostgreSQL. Features Google OAuth, dynamic charts, full CRUD operations and real-time server health monitoring.",
        imageUrl: "/four.png", // Placeholder image
        demoUrl: "https://uboard.netlify.app/login",
        githubUrl: "https://github.com/Arnesh-pal/Dashboard",
    },
    {
        id: "05",
        title: "Retro\nPokedex",
        description: "A retro-styled Pokédex built with vanilla JavaScript and Node.js. Features live search, browsing by generation, detailed Pokémon stats and a fast backend using the PokeAPI.",
        imageUrl: "/five.png", // Placeholder image
        demoUrl: "https://pokedex03.netlify.app",
        githubUrl: "https://github.com/Arnesh-pal/Retro_Pokedex-",
    },
    {
        id: "06",
        title: "Real-Time\nLeaderboard",
        description: "A dynamic, full-stack user leaderboard built with MERN stack and Socket.IO, showcasing real-time data synchronization for an instantly updated ranking experience.",
        imageUrl: "/six.png", // Placeholder image
        demoUrl: "https://random-ranking-front.vercel.app/",
        githubUrl: "https://github.com/Arnesh-pal/random-ranking-front",
    },
];

function Projects() {
    return (
        <section
            id="projects"
            className="panel w-screen h-screen flex flex-nowrap items-stretch relative z-20"
        >
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="project-column"
                    style={{ "--bg-image": `url(${project.imageUrl})` }}
                >
                    <h2 className="project-title">
                        {project.title.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </h2>

                    <div className="project-footer-area">
                        <p className="project-number">{project.id}</p>
                        <p className="project-description">{project.description}</p>
                        <div className="project-links">
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-button demo-button"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Live Demo
                            </a>
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-button github-button"
                                onClick={(e) => e.stopPropagation()}
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Projects;