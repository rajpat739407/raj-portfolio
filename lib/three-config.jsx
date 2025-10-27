// lib/three-config.js
export const optimizedLoader = (url) => {
  const loader = new GLTFLoader();
  
  // Add caching
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }
  
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
};

// Lazy loading components
const LazyHero3D = lazy(() => import('./components/Hero3D'));
const LazySkillsOrb = lazy(() => import('./components/SkillsOrb'));

// Preload critical models
export const preloadModels = () => {
  const models = ['/models/avatar.gltf', '/models/skills-orb.gltf'];
  models.forEach(model => optimizedLoader(model));
};