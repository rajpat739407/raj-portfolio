"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";

const Hero3D = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  const fullText = "Creative Developer & 3D Enthusiast";

  // Typing effect
  useEffect(() => {
    setLoaded(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        // Keep cursor blinking after typing is done
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // Handle CV Download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/myresume.pdf";
    link.download = "Raj_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Generate floating particles positions (memoized to avoid re-render)
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 37 + 13) % 100}%`,
      top: `${(i * 23 + 7) % 100}%`,
      size: 2 + (i % 3),
      duration: 6 + (i % 8),
      delay: (i * 0.5) % 4,
      opacity: 0.15 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0f0a] to-[#050d10]" />

      {/* Radial glow accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-20 lg:pt-0">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-gray-300 text-sm font-medium">
                Available for work
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 transition-all duration-700 delay-200 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Hi, I'm{" "}
              <span className="gradient-text">Raj Patel</span>
            </h1>

            {/* Typing subtitle */}
            <div
              className={`text-lg sm:text-xl md:text-2xl mb-6 text-gray-400 font-light transition-all duration-700 delay-300 min-h-[2rem] ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span>{typedText}</span>
              {showCursor && <span className="typing-cursor" />}
            </div>

            {/* Description */}
            <p
              className={`text-base md:text-lg mb-10 text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-[400ms] ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Crafting immersive digital experiences with cutting-edge
              technologies. Specializing in React, Three.js, and interactive web
              applications.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-500 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <button className="btn-primary" onClick={scrollToProjects}>
                View My Work
              </button>
              <button className="btn-secondary" onClick={handleDownload}>
                Download CV
              </button>
            </div>
          </div>

          {/* Animated Geometric Visual */}
          <div
            className={`flex-1 flex items-center justify-center transition-all duration-1000 delay-300 ${
              loaded
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
          >
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] hero-rings-container">
              {/* Ring 1 — innermost, fast */}
              <div
                className="absolute inset-0 m-auto rounded-full hero-ring-1"
                style={{ width: "60%", height: "60%" }}
              />
              {/* Ring 2 — middle, reverse */}
              <div
                className="absolute inset-0 m-auto rounded-full hero-ring-2 border-2"
                style={{ width: "78%", height: "78%" }}
              />
              {/* Ring 3 — outer, slow */}
              <div
                className="absolute inset-0 m-auto rounded-full hero-ring-3 border-2"
                style={{ width: "95%", height: "95%" }}
              />

              {/* Center Photo/Avatar */}
              <div className="absolute inset-0 m-auto w-[45%] h-[45%] rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/20 z-10">
                <img
                  src="/models/textures/rajimg.jpg"
                  alt="Raj Patel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient avatar
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add(
                      "bg-gradient-to-br",
                      "from-emerald-500",
                      "to-cyan-500"
                    );
                    e.target.parentElement.innerHTML =
                      '<span class="text-4xl md:text-5xl font-bold text-white flex items-center justify-center w-full h-full">RP</span>';
                  }}
                />
              </div>

              {/* Orbiting dots */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    animation: `orbit ${10 + i * 3}s linear infinite`,
                    "--orbit-radius": `${45 + i * 12}%`,
                    animationDelay: `${i * -1.5}s`,
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: `${6 - i * 0.5}px`,
                      height: `${6 - i * 0.5}px`,
                      background:
                        i % 2 === 0
                          ? "rgba(16,185,129,0.7)"
                          : "rgba(6,182,212,0.7)",
                      boxShadow:
                        i % 2 === 0
                          ? "0 0 10px rgba(16,185,129,0.5)"
                          : "0 0 10px rgba(6,182,212,0.5)",
                    }}
                  />
                </div>
              ))}

              {/* Ambient glow behind the rings */}
              <div className="absolute inset-0 m-auto w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-2xl animate-glow-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => {
            const el = document.getElementById("skills");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className={`flex flex-col items-center space-y-2 text-gray-500 hover:text-emerald-400 transition-all duration-500 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce-subtle" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero3D;