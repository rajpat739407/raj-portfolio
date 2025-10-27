// hooks/useDeviceType.js
export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile };
};

// Adaptive 3D component
const Adaptive3DScene = () => {
  const { isMobile } = useDeviceType();
  
  return (
    <Canvas
      camera={{
        position: isMobile ? [0, 1, 5] : [0, 1, 3],
        fov: isMobile ? 75 : 60
      }}
    >
      {/* Scene content */}
    </Canvas>
  );
};