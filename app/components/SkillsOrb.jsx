"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SkillsOrb = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({ threshold: 0.1 });
  const [countersStarted, setCountersStarted] = useState(false);

  const skills = [
    { name: "React / Next.js", level: 90, color: "#61DAFB", icon: "⚛" },
    { name: "TailwindCSS", level: 85, color: "#38BDF8", icon: "🎨" },
    { name: "MongoDB", level: 80, color: "#47A248", icon: "🍃" },
    { name: "Node.js", level: 75, color: "#339933", icon: "🟢" },
    { name: "React Native", level: 70, color: "#61DAFB", icon: "📱" },
    { name: "Three.js", level: 65, color: "#F0DB4F", icon: "🌐" },
    { name: "Data Science", level: 60, color: "#9333EA", icon: "📊" },
  ];

  const techStack = [
    { name: "React", icon: "⚛" },
    { name: "Three.js", icon: "🌐" },
    { name: "Next.js", icon: "▲" },
    { name: "JavaScript", icon: "JS" },
    { name: "Tailwind", icon: "🎨" },
    { name: "Node.js", icon: "🟢" },
    { name: "Express", icon: "⚡" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Data Science", icon: "📊" },
    { name: "OOPs", icon: "🧩" },
    { name: "React Native", icon: "📱" },
  ];

  useEffect(() => {
    if (sectionVisible && !countersStarted) {
      setCountersStarted(true);
    }
  }, [sectionVisible, countersStarted]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden flex items-center"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080c08] to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Header */}
        <div className={`text-center mb-16 reveal-up ${sectionVisible ? "visible" : ""}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Technologies and tools I use to bring creative ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Orbiting Skills Visual */}
          <div className={`flex justify-center reveal-scale ${sectionVisible ? "visible delay-200" : ""}`}>
            <div className="orbit-container relative">
              {/* Center core */}
              <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center z-10 animate-glow-pulse">
                <span className="text-2xl">💻</span>
              </div>

              {/* Orbit ring visuals */}
              <div className="absolute inset-0 m-auto w-[65%] h-[65%] rounded-full border border-emerald-500/10 animate-spin-slow" />
              <div className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full border border-cyan-500/8 animate-spin-reverse" />

              {/* Orbiting items */}
              {skills.slice(0, 6).map((skill, i) => {
                const angle = (i / 6) * 360;
                const radius = 42;
                return (
                  <div
                    key={skill.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `orbit ${14 + i * 2}s linear infinite`,
                      animationDelay: `${-i * (14 / 6)}s`,
                      "--orbit-radius": `${radius}%`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-lg cursor-default hover:scale-125 transition-transform duration-300"
                      title={skill.name}
                      style={{
                        boxShadow: `0 0 15px ${skill.color}20`,
                      }}
                    >
                      {skill.icon}
                    </div>
                  </div>
                );
              })}

              {/* Ambient glow */}
              <div className="absolute inset-0 m-auto w-1/2 h-1/2 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Skills Progress Bars */}
          <div className="space-y-5">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={index}
                animate={countersStarted}
                visible={sectionVisible}
              />
            ))}
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className={`mt-20 reveal-up ${sectionVisible ? "visible delay-400" : ""}`}>
          <h3 className="text-2xl font-bold text-center text-white mb-10">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {techStack.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} visible={sectionVisible} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Skill Bar Sub-component ---- */
const SkillBar = ({ skill, index, animate, visible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const end = skill.level;
    const duration = 1200;
    const stepTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [animate, skill.level]);

  return (
    <div
      className={`group reveal-left ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${200 + index * 80}ms` }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium text-sm sm:text-base">
          {skill.name}
        </span>
        <span
          className="font-bold text-sm tabular-nums"
          style={{ color: skill.color }}
        >
          {count}%
        </span>
      </div>
      <div className="w-full bg-gray-800/60 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1200ms] ease-out"
          style={{
            width: animate ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}, #10b981)`,
            boxShadow: `0 0 16px ${skill.color}30`,
            transitionDelay: `${index * 80}ms`,
          }}
        />
      </div>
    </div>
  );
};

/* ---- Tech Card Sub-component ---- */
const TechCard = ({ tech, index, visible }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`text-center group tilt-card reveal-scale ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${500 + index * 60}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-16 h-16 sm:w-18 sm:h-18 glass-card rounded-xl flex items-center justify-center mb-2 cursor-default">
        <span className="text-xl sm:text-2xl">{tech.icon}</span>
      </div>
      <span className="text-gray-400 text-xs sm:text-sm group-hover:text-emerald-400 transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
};

export default SkillsOrb;
