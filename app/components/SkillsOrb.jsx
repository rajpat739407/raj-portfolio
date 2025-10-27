"use client";
import React from "react";

const SkillsOrb = () => {
  const skills = [
    { name: "React/Next.js", level: 90, color: "#61DAFB" },
    { name: "TailwindCSS", level: 85, color: "#000000" },
    { name: "MongoDB", level: 80, color: "#3178C6" },
    { name: "Node.js", level: 75, color: "#339933" },
    { name: "React-Native", level: 70, color: "#FF6B6B" },
    { name: "Three.js", level: 65, color: "pink" },
    { name: "Data Science", level: 60, color: "#8A2BE2" },
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900 flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Skills & <span className="gradient-text">Expertise</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Technologies and tools I use to bring creative ideas to life
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Orb Placeholder */}
          <div className="h-96 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mb-4 animate-pulse shadow-2xl shadow-emerald-500/25"></div>
              <p className="text-emerald-400 font-mono">
                Interactive 3D Skills Orb
              </p>
              <p className="text-gray-400 text-sm mt-2">
                (3D visualization coming soon)
              </p>
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-item group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between mb-3">
                  <span className="text-white font-semibold text-lg">
                    {skill.name}
                  </span>
                  <span
                    className="font-bold text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(45deg, ${skill.color}, #10b981)`,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-out group-hover:scale-105"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, #10b981)`,
                      boxShadow: `0 0 20px ${skill.color}40`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "React",
              "Three.js",
              "Next.js",
              "JavaScript",
              "Tailwind",
              "Node.js",
              "Express",
              "MongoDB",
              "Data Science",
              "OOPs Concepts",
              "React-Native",
            ].map((tech) => (
              <div key={tech} className="text-center group">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-2 group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="text-gray-300 text-sm">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsOrb;
