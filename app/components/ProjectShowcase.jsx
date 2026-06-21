"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/useScrollReveal";

const ProjectShowcase = () => {
  const [imageErrors, setImageErrors] = useState({});
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const openInNewTab = (url, title) => {
    if (!url || url === "#") {
      alert(`${title} link is not available yet.`);
      return;
    }
    if (!url.startsWith("http")) url = "https://" + url;
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
      image: "",
      link: "#",
      demoLink: "#",
      featured: false,
    },
  ];

  const { setRef, isVisible } = useScrollRevealMultiple(projects.length, { threshold: 0.15 });

  const handleImageError = (title) => {
    setImageErrors((prev) => ({ ...prev, [title]: true }));
  };

  const handleViewAllProjects = () => {
    window.open("https://github.com/rajpat739407", "_blank");
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-20 md:py-28 relative overflow-hidden"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#08050a] to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-24 reveal-up ${headerVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Building innovative solutions with modern technologies
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              ref={setRef(index)}
              isVisible={isVisible(index)}
              imageError={imageErrors[project.title]}
              onImageError={handleImageError}
              openInNewTab={openInNewTab}
            />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16 md:mt-24">
          <button
            onClick={handleViewAllProjects}
            className="group inline-flex items-center space-x-3 px-10 py-4 border border-emerald-500/30 text-white rounded-2xl text-lg hover:border-emerald-400/60 hover:bg-emerald-500/5 transition-all duration-400"
          >
            <span>Explore More Projects</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

/* ---- Project Card Sub-component ---- */
const ProjectCard = React.forwardRef(
  ({ project, index, isVisible, imageError, onImageError, openInNewTab }, ref) => {
    const cardRef = useRef(null);
    const isEven = index % 2 === 0;
    const revealClass = isEven ? "reveal-left" : "reveal-right";

    const handleMouseMove = useCallback((e) => {
      const card = cardRef.current;
      if (!card || window.innerWidth < 1024) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 6;
      const rotateY = (x / rect.width) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
      const card = cardRef.current;
      if (card) {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      }
    }, []);

    return (
      <div
        ref={ref}
        className={`${revealClass} ${isVisible ? "visible" : ""}`}
      >
        <div
          ref={cardRef}
          className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-14 tilt-card ${
            !isEven ? "lg:flex-row-reverse" : ""
          }`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image */}
          <div className="flex-1 w-full">
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden glow-border" data-cursor-hover>
              <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl relative overflow-hidden border border-white/5">
                {!imageError && project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => onImageError(project.title)}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
                    <span className="text-4xl mb-2">🖼</span>
                    <span className="text-gray-500 text-sm">Preview Coming Soon</span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openInNewTab(project.demoLink, project.title)}
                      className="px-5 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:scale-105 transition-transform duration-200"
                    >
                      {project.demoLink !== "#" ? "Live Demo ↗" : "Coming Soon"}
                    </button>
                    <button
                      onClick={() => openInNewTab(project.link, project.title)}
                      className="px-5 py-2.5 border border-white/50 text-white rounded-xl text-sm font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-200"
                    >
                      {project.link !== "#" ? "Source ↗" : "Private"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Badges */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium border border-emerald-500/30 backdrop-blur-sm">
                    ⭐ Featured
                  </span>
                </div>
              )}
              {project.demoLink === "#" && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1.5 bg-yellow-500/15 text-yellow-300 rounded-full text-xs font-medium border border-yellow-500/30 backdrop-blur-sm">
                    🚧 In Development
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 w-full">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              {project.title}
            </h3>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 glass-card text-gray-300 rounded-lg text-xs sm:text-sm font-medium"
                  style={{
                    transitionDelay: isVisible ? `${i * 50}ms` : "0ms",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Mobile Buttons */}
            <div className="flex gap-3 lg:hidden">
              <button
                onClick={() => openInNewTab(project.demoLink, project.title)}
                className={`flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  project.demoLink !== "#"
                    ? "btn-primary"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                {project.demoLink !== "#" ? "Live Demo ↗" : "Coming Soon"}
              </button>
              <button
                onClick={() => openInNewTab(project.link, project.title)}
                className={`flex-1 px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                  project.link !== "#"
                    ? "border-gray-600 text-white hover:bg-white/5"
                    : "border-gray-800 text-gray-600"
                }`}
              >
                {project.link !== "#" ? "Source ↗" : "Private"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectShowcase;
