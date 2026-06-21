"use client";
import { Suspense, lazy, useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CursorGlow from "./components/CursorGlow";

// Lazy load components for better performance
const Hero3D = lazy(() => import("./components/Hero3D"));
const Navigation3D = lazy(() => import("./components/Navigation3D"));
const SkillsOrb = lazy(() => import("./components/SkillsOrb"));
const ProjectShowcase = lazy(() => import("./components/ProjectShowcase"));
const ContactSphere = lazy(() => import("./components/ContactSphere"));

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialPlatforms = [
    {
      id: 1,
      platform: "Email",
      link: "mailto:rajp739407@gmail.com",
      icon: "📧",
    },
    {
      id: 2,
      platform: "LinkedIn",
      link: "https://www.linkedin.com/in/raj-patel-a35480259/",
      icon: "💼",
    },
    {
      id: 3,
      platform: "GitHub",
      link: "https://github.com/rajpat739407",
      icon: "⚡",
    },
    {
      id: 4,
      platform: "Twitter",
      link: "https://x.com/rajp739407",
      icon: "🐦",
    },
  ];

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <CursorGlow />

      {/* Navigation */}
      <Suspense
        fallback={<div className="h-16 bg-transparent" />}
      >
        <Navigation3D />
      </Suspense>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <Suspense fallback={<LoadingSpinner />}>
            <Hero3D />
          </Suspense>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Suspense fallback={<LoadingSpinner />}>
            <SkillsOrb />
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectShowcase />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Suspense fallback={<LoadingSpinner />}>
            <ContactSphere />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-[#050505]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold gradient-text mb-1">
                Raj Patel
              </h3>
              <p className="text-gray-600 text-sm">
                Creating digital experiences
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialPlatforms.map((v) => (
                <a
                  key={v.id}
                  href={v.link}
                  target={v.platform !== "Email" ? "_blank" : undefined}
                  rel={
                    v.platform !== "Email"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 group"
                  aria-label={`Follow on ${v.platform}`}
                  data-cursor-hover
                >
                  <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                    {v.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              <p>
                &copy; {new Date().getFullYear()} Raj Patel. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        aria-label="Back to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}