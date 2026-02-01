"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProjectShowcase = () => {
  const [imageErrors, setImageErrors] = useState({});

  // OPEN LINKS SAFELY
  const openInNewTab = (url, title) => {
    if (!url || url === "#") {
      alert(`${title} link is not available yet.`);
      return;
    }

    // Auto add https:// if missing
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };
  const projects = [
    {
      title: "Movie Recommendation System",
      description:
        "A web application that suggests movies based on user preferences using machine learning algorithms.",
      tags: ["Python", "Machine Learning", "Flask", "Pandas", "Streamlit"],
      image: "/moviercmdapp.png",
      link: "https://github.com/rajpat739407/movie_recommondation_system",
      demoLink: "https://movierecommondationsystem-rj.streamlit.app/",
      featured: true,
    },
    {
      title: "Full Stack Todo App",
      description:
        "A full stack todo application with user authentication, real-time updates, and a sleek UI built with MERN stack.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      image: "/todoapp.png",
      link: "https://github.com/rajpat739407/todo-frontend",
      demoLink: "https://todo-frontend-vz1h.onrender.com/todo-app",
      featured: false,
    },
    {
      title: "VR Museum Experience",
      description:
        "Virtual reality museum tour with interactive exhibits and 3D artifact visualization for educational purposes.",
      tags: ["A-Frame", "WebXR", "Blender", "GSAP"],
      image: "", // fallback will be used
      link: "#",
      demoLink: "#",
      featured: false,
    },
  ];

  const handleImageError = (title) => {
    setImageErrors((prev) => ({ ...prev, [title]: true }));
  };

  const handleViewAllProjects = () => {
    window.open("https://github.com/rajpat739407", "_blank");
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-white to-blue-400">
              Projects
            </span>
          </h2>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Building innovative solutions with modern technologies and
            cutting-edge frameworks
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } group hover:scale-[1.02] transition-transform duration-500`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500">
                  <div className="w-full aspect-video bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-blue-500/5 border border-emerald-500/20 rounded-3xl relative overflow-hidden">
                    {!imageErrors[project.title] ? (
                      <Image
                        src={project.image || "/fallback.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => handleImageError(project.title)}
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                        <span className="text-emerald-400 font-semibold text-lg">
                          Preview Not Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover Buttons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6">
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          openInNewTab(project.demoLink, project.title)
                        }
                        className="px-6 py-3 bg-white text-black rounded-xl font-semibold shadow-lg hover:scale-105"
                      >
                        {project.demoLink !== "#" ? "🎯 Live Demo" : "⏳ Coming Soon"}
                      </button>

                      <button
                        onClick={() =>
                          openInNewTab(project.link, project.title)
                        }
                        className="px-6 py-3 border border-white/60 text-white rounded-xl font-semibold hover:bg-white/10 hover:scale-105"
                      >
                        {project.link !== "#" ? "📁 Source Code" : "🔒 Private"}
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  {project.featured && (
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-emerald-500/30 text-emerald-300 rounded-full shadow-lg border border-emerald-500/40">
                        ⭐ Featured
                      </span>
                    </div>
                  )}

                  {project.demoLink === "#" && (
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/40">
                        🚧 In Development
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-white w-full">
                <h3 className="text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-lg lg:text-xl mt-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-800/60 border border-gray-700/50 text-gray-200 rounded-xl text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile Buttons */}
                <div className="flex gap-4 flex-wrap lg:hidden mt-6">
                  <button
                    onClick={() =>
                      openInNewTab(project.demoLink, project.title)
                    }
                    className={`px-8 py-4 rounded-xl flex-1 font-semibold ${
                      project.demoLink !== "#"
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {project.demoLink !== "#" ? "🚀 Live Demo" : "⏳ Coming Soon"}
                  </button>

                  <button
                    onClick={() => openInNewTab(project.link, project.title)}
                    className={`px-8 py-4 rounded-xl border flex-1 font-semibold ${
                      project.link !== "#"
                        ? "text-white border-gray-600"
                        : "text-gray-500 border-gray-700"
                    }`}
                  >
                    {project.link !== "#" ? "📁 Source Code" : "🔒 Private"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-20">
          <button
            onClick={handleViewAllProjects}
            className="px-12 py-5 border-2 border-emerald-500/60 text-white rounded-2xl text-xl hover:border-emerald-400 hover:text-emerald-300 transition"
          >
            📚 Explore More Projects →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
