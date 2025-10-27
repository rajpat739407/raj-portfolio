"use client";
import React, { useState } from 'react';

const ContactSphere = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const contactMethods = [
    {
      platform: 'Email',
      icon: '📧',
      address: 'rajp739407@gmail.com',
      link: 'mailto:rajp739407@gmail.com'
    },
    {
      platform: 'LinkedIn',
      icon: '💼',
      address: 'in/raj-patel-a35480259/',
      link: 'https://www.linkedin.com/in/raj-patel-a35480259/'
    },
    {
      platform: 'GitHub',
      icon: '⚡',
      address: '@rajpat739407',
      link: 'https://github.com/rajpat739407'
    },
    {
      platform: 'Twitter',
      icon: '🐦',
      address: '@rajp739407',
      link: 'https://x.com/rajp739407'
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    console.log('🔄 Form submission started:', formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      const data = await response.json();
      console.log('📡 Response data:', data);

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || `Failed to send message. (Status: ${response.status})`
        });
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setSubmitStatus({
        type: 'error',
        message: `Network error: ${error.message}. Please check your connection.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Connect</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Ready to bring your next project to life? Let's discuss how we can work together.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-300 mb-8">
                I'm always interested in new opportunities, collaborations, 
                and interesting projects. Whether you have a question or just 
                want to say hi, I'll try my best to get back to you!
              </p>
            </div>
            
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.platform}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-gray-700 hover:border-emerald-500/30"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">{method.icon}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{method.platform}</div>
                    <div className="text-gray-400 group-hover:text-emerald-400 transition-colors duration-300">
                      {method.address}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
            {/* Status Message */}
            {submitStatus.message && (
              <div className={`p-4 rounded-lg mb-6 border ${
                submitStatus.type === 'success' 
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                  : 'bg-red-500/20 border-red-500/50 text-red-400'
              }`}>
                <div className="flex items-start">
                  <span className="text-lg mr-2">
                    {submitStatus.type === 'success' ? '✅' : '❌'}
                  </span>
                  <span>{submitStatus.message}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50"
                  placeholder="Tell me about your project..."
                  disabled={isSubmitting}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Debug info */}
              <div className="text-xs text-gray-500 text-center">
                Check browser console for detailed debug information
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSphere;