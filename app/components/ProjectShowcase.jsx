
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectShowcase = () => {
  const [imageErrors, setImageErrors] = useState({});

  const projects = [
    {
      title: "Movie Recommendation System",
      description:
        "A web application that suggests movies based on user preferences using machine learning algorithms.",
      tags: ["Python", "Machine Learning", "Flask", "Pandas", "Streamlit"],
      image: "/moviercmdapp.png",
      source:
        "https://github.com/rajpat739407/movie_recommondation_system",
      demo:
        "https://movierecommondationsystem-rj.streamlit.app/",
      featured: true,
    },
    {
      title: "Full Stack Todo App",
      description:
        "A full stack todo application with user authentication and a clean MERN stack UI.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      image: "/todoapp.png",
      source: "https://github.com/rajpat739407/todo-frontend",
      demo: "https://todo-frontend-vz1h.onrender.com/todo-app",
      featured: false,
    },
    {
      title: "VR Museum Experience",
      description:
        "A virtual reality museum with interactive 3D exhibits built using WebXR.",
      tags: ["A-Frame", "WebXR", "Blender"],
      image: "/fallback.jpg",
      source: null,
      demo: null,
      featured: false,
    },
  ];

  const handleImageError = (title) => {
    setImageErrors((prev) => ({
      ...prev,
      [title]: true,
    }));
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-pink-500 via-white to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Real-world projects built with modern technologies.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 aspect-video rounded-3xl overflow-hidden border border-white/10">
                {!imageErrors[project.title] ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(project.title)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
                    Preview Not Available
                  </div>
                )}

                {project.featured && (
                  <span className="absolute top-4 left-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-4xl font-bold mb-4">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-6 text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-800 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-emerald-500 rounded-lg font-semibold hover:opacity-90"
                    >
                      Live Demo
                    </Link>
                  )}

                  {project.source && (
                    <Link
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800"
                    >
                      Source Code
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Button */}
        <div className="text-center mt-20">
          <Link
            href="https://github.com/rajpat739407"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 border-2 border-emerald-500 rounded-xl text-lg hover:text-emerald-400 transition"
          >
            📚 Explore More Projects →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
