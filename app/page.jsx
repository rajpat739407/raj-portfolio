"use client";
import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components for better performance
const Hero3D = lazy(() => import('./components/Hero3D'));
const Navigation3D = lazy(() => import('./components/Navigation3D'));
const SkillsOrb = lazy(() => import('./components/SkillsOrb'));
const ProjectShowcase = lazy(() => import('./components/ProjectShowcase'));
const ContactSphere = lazy(() => import('./components/ContactSphere'));

export default function Home() {

  const socialPlatforms = [
    {
      id: 1,
      platform: 'Email',
      link: 'mailto:rajp739407gmail.com'
    },
    {
      id: 2,
      platform: 'LinkedIn',
      link: 'https://www.linkedin.com/in/raj-patel-a35480259/'
    },
    {
      id: 3,
      platform: 'GitHub',
      link: 'https://github.com/rajpat739407'
    },
    {
      id: 4,
      platform: 'Twitter',
      link: 'https://x.com/rajp739407'
    },
  ];
  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <Suspense fallback={<div className="h-16 bg-black/80 backdrop-blur-sm" />}>
        <Navigation3D />
      </Suspense>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <Hero3D />
          </Suspense>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <SkillsOrb />
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectShowcase />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <ContactSphere />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold gradient-text">Raj Patel</h3>
              <p className="text-gray-400 text-sm">Creating digital experiences</p>
            </div>
            
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialPlatforms.map((v,i) => (
                <a
                  key={i}
                  href={v.link}
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                  aria-label={`Follow on ${v.platform}`}
                >
                  {v.platform}
                </a>
              ))}
            </div>
            
            <div className="text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Raj Patel. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}