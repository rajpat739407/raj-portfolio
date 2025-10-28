"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProjectShowcase = () => {
  const [imageErrors, setImageErrors] = useState({});

  const projects = [
  {
    title: "Movie Recommendation System",
    description: "A web application that suggests movies based on user preferences using machine learning algorithms.",
    tags: ["Python", "Machine Learning", "Flask", "Pandas", "Streamlit"],
    image: "/moviercmdapp.png", // Remove "files/" or move images to public folder
    link: "https://github.com/rajpat739407/movie_recommondation_system",
    featured: true,
    demoLink: "https://movierecommondationsystem-rj.streamlit.app/"
  },
  {
    title: "Full Stack Todo App",
    description: "A full stack todo application with user authentication, real-time updates, and a sleek UI built with MERN stack.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    image: "/todoapp.png", // Remove "files/" or move images to public folder
    link: "https://github.com/rajpat739407/todo-frontend",
    featured: false,
    demoLink: "https://todo-frontend-vz1h.onrender.com/todo-app"
  },
  {
    title: "VR Museum Experience",
    description: "Virtual reality museum tour with interactive exhibits and 3D artifact visualization for educational purposes.",
    tags: ["A-Frame", "WebXR", "Blender", "GSAP"],
    image: "", // Make sure this file exists in public folder
    link: "#",
    featured: false,
    demoLink: "#"
  },
];
  const handleSourceCodeClick = (link, title) => {
    if (link && link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      alert(`${title} source code is currently private.`);
    }
  };

  const handleDemoClick = (demoLink, title) => {
    if (demoLink && demoLink !== "#") {
      window.open(demoLink, "_blank", "noopener,noreferrer");
    } else {
      alert(`${title} demo is coming soon!`);
    }
  };

  const handleViewAllProjects = () => {
    window.open(
      "https://github.com/rajpat739407",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleImageError = (projectTitle) => {
    setImageErrors((prev) => ({ ...prev, [projectTitle]: true }));
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
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

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } group hover:scale-[1.02] transition-transform duration-500`}
            >
              {/* Project Image */}
              <div className="flex-1 w-full">
                <div className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500">
                  <div className="w-full aspect-video bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-blue-500/5 border border-emerald-500/20 rounded-3xl overflow-hidden relative">
                    {!imageErrors[project.title] ? (
                      <Image
                        src={project.image || "/fallback.jpg"} // ✅ Fallback in case image missing
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => handleImageError(project.title)} // ✅ safe handler
                        priority={index === 0} // ✅ Preload first image
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ proper responsive sizes
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                        <div className="text-center p-8">
                          <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-3xl mx-auto mb-6 animate-pulse shadow-2xl shadow-emerald-500/25 flex items-center justify-center">
                            <span className="text-white text-3xl">🚀</span>
                          </div>
                          <p className="text-emerald-400 font-mono text-lg font-semibold">
                            Project Preview
                          </p>
                          <p className="text-gray-400 text-sm mt-2">
                            {project.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-8">
                    <div className="flex gap-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <button
                        onClick={() =>
                          handleDemoClick(project.demoLink, project.title)
                        }
                        className="px-6 py-3 bg-white text-black font-semibold rounded-xl transform scale-95 group-hover:scale-100 transition-all duration-300 hover:bg-gray-100 shadow-2xl hover:shadow-3xl hover:-translate-y-1 border-2 border-white"
                      >
                        {project.demoLink !== "#"
                          ? "🎯 Live Demo"
                          : "⏳ Coming Soon"}
                      </button>
                      <button
                        onClick={() =>
                          handleSourceCodeClick(project.link, project.title)
                        }
                        className="px-6 py-3 bg-transparent text-white font-semibold rounded-xl border-2 border-white/50 transform scale-95 group-hover:scale-100 transition-all duration-300 hover:border-white hover:bg-white/10 backdrop-blur-sm hover:-translate-y-1"
                      >
                        {project.link !== "#" ? "📁 Source Code" : "🔒 Private"}
                      </button>
                    </div>
                  </div>

                  {/* Project Status Badge */}
                  {project.demoLink === "#" && (
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold border border-yellow-500/40 backdrop-blur-sm shadow-lg">
                        🚧 In Development
                      </span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-emerald-300 rounded-full text-sm font-semibold border border-emerald-500/40 backdrop-blur-sm shadow-lg flex items-center gap-2">
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="flex-1 text-white w-full">
                <div className="space-y-6">
                  {/* Project Title */}
                  <h3 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies Used */}
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-800/60 text-gray-200 rounded-xl text-sm font-medium border border-gray-700/50 hover:border-emerald-500/50 hover:text-emerald-300 transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons - Mobile */}
                  <div className="flex gap-4 flex-wrap lg:hidden pt-6">
                    <button
                      onClick={() =>
                        handleDemoClick(project.demoLink, project.title)
                      }
                      className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 flex-1 min-w-[140px] ${
                        project.demoLink !== "#"
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 hover:shadow-emerald-500/25"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={project.demoLink === "#"}
                    >
                      {project.demoLink !== "#"
                        ? "🚀 Live Demo"
                        : "⏳ Coming Soon"}
                    </button>

                    <button
                      onClick={() =>
                        handleSourceCodeClick(project.link, project.title)
                      }
                      className={`px-8 py-4 font-semibold rounded-xl border transition-all duration-300 hover:-translate-y-1 flex-1 min-w-[140px] ${
                        project.link !== "#"
                          ? "bg-transparent text-white border-gray-600 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-gray-800/50"
                          : "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                      }`}
                      disabled={project.link === "#"}
                    >
                      {project.link !== "#" ? "📁 Source Code" : "🔒 Private"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-20">
          <button
            onClick={handleViewAllProjects}
            className="px-12 py-5 bg-transparent text-white font-bold rounded-2xl border-2 border-emerald-500/50 hover:border-emerald-400 hover:text-emerald-300 transition-all duration-300 text-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 group"
          >
            <span className="flex items-center justify-center gap-3">
              📚 Explore More Projects
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-lg">
            Discover more projects on my GitHub profile
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background: linear-gradient(
            -45deg,
            #10b981,
            #06b6d4,
            #3b82f6,
            #8b5cf6
          );
          background-size: 400% 400%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;
