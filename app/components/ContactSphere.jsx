"use client";
import React, { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSphere = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({ threshold: 0.1 });

  const contactMethods = [
    {
      platform: "Email",
      icon: "📧",
      address: "rajp739407@gmail.com",
      link: "mailto:rajp739407@gmail.com",
    },
    {
      platform: "LinkedIn",
      icon: "💼",
      address: "in/raj-patel-a35480259/",
      link: "https://www.linkedin.com/in/raj-patel-a35480259/",
    },
    {
      platform: "GitHub",
      icon: "⚡",
      address: "@rajpat739407",
      link: "https://github.com/rajpat739407",
    },
    {
      platform: "Twitter",
      icon: "🐦",
      address: "@rajp739407",
      link: "https://x.com/rajp739407",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || `Failed to send message. (Status: ${response.status})`,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: `Network error: ${error.message}. Please check your connection.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-20 md:py-28 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050a0a] to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-14 reveal-up ${sectionVisible ? "visible" : ""}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Ready to bring your next project to life? Let's discuss how we can
            work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Contact Information */}
          <div className={`space-y-6 reveal-left ${sectionVisible ? "visible delay-200" : ""}`}>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-400 leading-relaxed">
                I'm always interested in new opportunities, collaborations, and
                interesting projects. Whether you have a question or just want to
                say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* Contact Method Cards */}
            <div className="space-y-3">
              {contactMethods.map((method, i) => (
                <a
                  key={method.platform}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 glass-card rounded-xl group cursor-pointer reveal-left ${
                    sectionVisible ? "visible" : ""
                  }`}
                  style={{ transitionDelay: sectionVisible ? `${300 + i * 80}ms` : "0ms" }}
                  data-cursor-hover
                >
                  <div className="w-11 h-11 bg-emerald-500/15 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all duration-300">
                    <span className="text-lg">{method.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm">
                      {method.platform}
                    </div>
                    <div className="text-gray-500 group-hover:text-emerald-400 transition-colors duration-300 text-sm truncate">
                      {method.address}
                    </div>
                  </div>
                  <span className="text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 text-sm">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`glass-card p-6 sm:p-8 rounded-2xl reveal-right ${sectionVisible ? "visible delay-300" : ""}`}>
            {/* Status Message */}
            {submitStatus.message && (
              <div
                className={`p-4 rounded-xl mb-6 border text-sm ${
                  submitStatus.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <span>{submitStatus.type === "success" ? "✅" : "❌"}</span>
                  <span>{submitStatus.message}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-gray-300 font-medium text-sm mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="form-input-modern"
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-gray-300 font-medium text-sm mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input-modern"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-gray-300 font-medium text-sm mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows="5"
                  className="form-input-modern resize-none"
                  placeholder="Tell me about your project..."
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.25)",
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                </div>

                <span className="relative z-10">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSphere;