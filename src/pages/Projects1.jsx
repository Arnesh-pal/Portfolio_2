// src/pages/Projects.jsx

import React from "react";

// Use \n in the title string to create a line break
const projects = [
    {
        id: "01",
        title: "To Do\nManager",
        description: "Lets users manage tasks, track history, and boost productivity with Pomodoro timers, sticky notes and daywise summaries.",
        imageUrl: "/sevv.png",
        demoUrl: "https://to-do-woodoo-supabase.vercel.app/",
        githubUrl: "https://github.com/Arnesh-pal/ToDoWoodoo_Supabase",
    },
    {
        id: "02",
        title: "Eye Disease\nClassification",
        description: "Classifies eye conditions such as Diabetic Retinopathy, Glaucoma, Myopia, and Normal Fundus using medical image data.",
        imageUrl: "/two.png",
        demoUrl: "https://huggingface.co/spaces/arneshpal/eye-disease-classifier",
        githubUrl: "https://github.com/Arnesh-pal/EyeVision",
    },
    {
        id: "03",
        title: "URL\nShortener",
        description: "Converts long URLs into compact, shareable links with seamless redirection and real-time visit tracking.",
        imageUrl: "/sss.png",
        demoUrl: "https://cyberpunk-url-shortener-1.onrender.com/",
        githubUrl: "https://github.com/Arnesh-pal/cyberpunk-url-shortener",
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
                    {/* Simplified structure to match HTML example */}
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