"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Hero3D = () => {
  const modelContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle CV Download
  const handleDownload = () => {
    const cvUrl = "/files/myresume.pdf";
    
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Raj_Resume.pdf";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("CV download initiated");
  };

  useEffect(() => {
    if (!modelContainerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    // Get container dimensions
    const container = modelContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(3, 2, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Texture loader for local image
    const textureLoader = new THREE.TextureLoader();

    // Load local image onto Box Geometry
    textureLoader.load(
      "/models/textures/rajimg.jpg",
      (texture) => {
        console.log("✅ Local image loaded successfully!");
        
        // Configure texture
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.flipY = false;

        // Create Box Geometry with size 3,3,3
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        
        // Create material with image texture
        const material = new THREE.MeshStandardMaterial({ 
          map: texture,
          metalness: 0.2,
          roughness: 0.6,
          side: THREE.DoubleSide
        });
        
        // Create mesh
        const box = new THREE.Mesh(geometry, material);
        box.position.set(0, 0, 0);
        scene.add(box);
        
        setLoading(false);
        setError(null);

        // Animation loop for rotation
        const animateRotation = () => {
          box.rotation.y += 0.01;
          box.rotation.x += 0.005;
        };

        // Main animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          animateRotation();
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

      },
      // Progress callback
      (progress) => {
        const percentLoaded = (progress.loaded / progress.total * 100).toFixed(1);
        console.log(`🔄 Loading image: ${percentLoaded}%`);
      },
      // Error callback
      (error) => {
        console.error("❌ Error loading image:", error);
        setError("Failed to load image. Please check the file path.");
        setLoading(false);
        
        // Fallback: Create a colored box with pattern
        createFallbackBox(scene, renderer, camera, controls);
      }
    );

    // Fallback function
    const createFallbackBox = (scene, renderer, camera, controls) => {
      // Create Box Geometry with size 3,3,3
      const geometry = new THREE.BoxGeometry(3, 3, 3);
      
      // Create a more interesting fallback material
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xff6b6b }), // Right - Red
        new THREE.MeshStandardMaterial({ color: 0x4ecdc4 }), // Left - Teal
        new THREE.MeshStandardMaterial({ color: 0x45b7d1 }), // Top - Blue
        new THREE.MeshStandardMaterial({ color: 0x96ceb4 }), // Bottom - Green
        new THREE.MeshStandardMaterial({ color: 0xffeaa7 }), // Front - Yellow
        new THREE.MeshStandardMaterial({ color: 0xdda0dd }), // Back - Purple
      ];
      
      const box = new THREE.Mesh(geometry, materials);
      box.position.set(0, 0, 0);
      scene.add(box);
      
      // Animate the fallback box
      const animate = () => {
        requestAnimationFrame(animate);
        box.rotation.y += 0.01;
        box.rotation.x += 0.005;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    // Handle resize
    const handleResize = () => {
      if (!modelContainerRef.current) return;
      
      const container = modelContainerRef.current;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (modelContainerRef.current && renderer.domElement) {
        modelContainerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 bg-gradient-to-br from-black via-gray-900 to-emerald-900/20 pt-15 md:pt-0">
      
      {/* Text Content Div - Left Side on desktop */}
      <div className="w-full md:flex-1 z-10 text-white max-w-2xl mx-auto md:mx-0 text-center md:text-left my-8 md:my-0 order-last md:order-first md:pr-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
          Hi, I'm <span className="gradient-text">Raj Patel</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-300">
          Creative Developer &<br />
          3D Enthusiast
        </p>
        <p className="text-base md:text-lg mb-8 md:mb-12 text-gray-400 max-w-lg">
          Crafting immersive digital experiences with cutting-edge technologies.
          Specializing in React, Three.js, and interactive 3D web applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="btn-primary">View My Work</button>
          <button 
            className="btn-secondary"
            onClick={handleDownload}
          >
            Download CV
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
            <p className="text-red-300 text-xs mt-2">
              Please check if the image exists at: public/models/textures/rajimg.jpg
            </p>
          </div>
        )}
      </div>

      {/* 3D Model Container Div - Right Side on desktop */}
      <div 
        ref={modelContainerRef} 
        className="w-full h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] md:flex-1 relative overflow-hidden order-first md:order-last mt-15 md:mt-0"
      >
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-emerald-400 font-mono">Loading 3D Model...</p>
              <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
            </div>
          </div>
        )}

        {/* Instructions Overlay */}
        {!loading && !error && (
          <div className="absolute bottom-4 left-4 z-10">
            <p className="text-emerald-400 text-sm font-mono bg-black/50 px-3 py-1 rounded-lg">
              🖱️ Drag to rotate
            </p>
          </div>
        )}
      </div>

      {/* Scroll Indicator - Mobile Only */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;