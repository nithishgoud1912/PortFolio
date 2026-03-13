import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, RoundedBox, Box } from '@react-three/drei'
import * as THREE from 'three'

// A procedural, realistic room environment
const Room = () => (
  <group>
    {/* Floor: Dark Wood/Tile Look */}
    <mesh position={[0, -3, 0]} receiveShadow>
      <boxGeometry args={[40, 0.5, 40]} />
      <meshStandardMaterial color="#0a0806" roughness={0.9} />
    </mesh>
    
    {/* Back Wall */}
    <mesh position={[0, 5, -10]} receiveShadow>
      <boxGeometry args={[40, 20, 1]} />
      <meshStandardMaterial color="#111316" roughness={1} />
    </mesh>

    {/* Left Wall */}
    <mesh position={[-15, 5, 0]} receiveShadow rotation={[0, Math.PI / 2, 0]}>
      <boxGeometry args={[40, 20, 1]} />
      <meshStandardMaterial color="#0c0e12" roughness={1} />
    </mesh>
    
    {/* Right Wall */}
    <mesh position={[15, 5, 0]} receiveShadow rotation={[0, Math.PI / 2, 0]}>
      <boxGeometry args={[40, 20, 1]} />
      <meshStandardMaterial color="#0c0e12" roughness={1} />
    </mesh>
  </group>
)

const DeskAndProps = () => (
  <group position={[0, 0, 0]}>
    {/* Desk Top */}
    <RoundedBox args={[14, 0.4, 7]} radius={0.05} position={[0, 0, 0]} receiveShadow castShadow>
      <meshStandardMaterial color="#1a110a" roughness={0.6} metalness={0.1} />
    </RoundedBox>
    
    {/* Desk Legs */}
    <Box args={[0.3, 5.8, 0.3]} position={[-6.5, -3.1, -2.5]} castShadow>
      <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
    </Box>
    <Box args={[0.3, 5.8, 0.3]} position={[6.5, -3.1, -2.5]} castShadow>
      <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
    </Box>
    <Box args={[0.3, 5.8, 0.3]} position={[-6.5, -3.1, 2.5]} castShadow>
      <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
    </Box>
    <Box args={[0.3, 5.8, 0.3]} position={[6.5, -3.1, 2.5]} castShadow>
      <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
    </Box>

    {/* A generic chair sitting in front of the desk */}
    <group position={[0, -1.5, 5]}>
      {/* Seat */}
      <RoundedBox args={[3, 0.3, 3]} radius={0.1} position={[0, 0, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
      </RoundedBox>
      {/* Backrest */}
      <RoundedBox args={[3, 4, 0.3]} radius={0.1} position={[0, 2, 1.35]} castShadow receiveShadow>
         <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
      </RoundedBox>
      {/* Chair Base/Leg */}
      <cylinderGeometry args={[0.2, 0.2, 3]} />
      <mesh position={[0, -1.5, 0]} castShadow>
         <cylinderGeometry args={[0.2, 0.2, 3]} />
         <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>

    {/* Props on Desk */}
    <RoundedBox args={[2, 0.15, 2.5]} radius={0.02} position={[3.5, 0.28, -0.5]} rotation={[0, -0.15, 0]} castShadow>
      <meshStandardMaterial color="#111" roughness={0.9} />
    </RoundedBox>
    <RoundedBox args={[0.6, 0.05, 1.2]} radius={0.05} position={[-3.5, 0.23, 1]} rotation={[0, 0.25, 0]} castShadow>
      <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
    </RoundedBox>
  </group>
)

const LaptopScene = ({ animState }) => {
  const lidRef = useRef()
  const screenMaterialRef = useRef()

  useFrame((state) => {
    // 1. First-Person Camera Movement
    state.camera.position.set(animState.camX, animState.camY, animState.camZ)
    state.camera.lookAt(0, animState.lookY, animState.lookZ)
    
    // 2. Hardware Animation
    if (lidRef.current) {
      lidRef.current.rotation.x = animState.lidAngle
    }
    
    // 3. Screen Glow pulsing
    if (screenMaterialRef.current) {
      // Add a slight flicker sequence as it turns on
      const flicker = animState.screenGlow > 0.8 && animState.screenGlow < 1.0 ? Math.random() * 0.2 : 0
      const pulse = animState.screenGlow > 0.99 ? Math.sin(state.clock.elapsedTime * 10) * 0.05 : 0
      
      const targetIntensity = (animState.screenGlow + pulse - flicker) * 4
      screenMaterialRef.current.emissiveIntensity = Math.max(0, targetIntensity)
      screenMaterialRef.current.opacity = Math.max(0.05, animState.screenGlow)
    }
  })

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.08} color="#ffffff" />
      
      {/* Dramatic Cinematic Lighting */}
      {/* Overhead spot hitting the desk/laptop */}
      <spotLight
        position={[0, 10, -2]}
        angle={0.6}
        penumbra={0.8}
        intensity={3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#fff5eb"
      />
      {/* Blueish rim light from window/hallway to the side */}
      <pointLight position={[-10, 5, 8]} intensity={0.8} color="#3b82f6" distance={20} />
      
      <Room />
      <DeskAndProps />
      
      {/* Main Laptop Group */}
      <group position={[0, 0.2, 0.5]}>
        <ContactShadows position={[0, 0, 0]} opacity={0.9} scale={8} blur={2} far={1} />

        {/* Laptop Base */}
        <RoundedBox args={[3.4, 0.12, 2.4]} radius={0.04} smoothness={4} position={[0, 0.06, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} />
        </RoundedBox>
        
        {/* Keyboard area indentation */}
        <mesh position={[0, 0.125, -0.1]}>
          <boxGeometry args={[3.0, 0.01, 1.3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
        
        {/* Trackpad */}
        <mesh position={[0, 0.125, 0.9]}>
          <boxGeometry args={[1.2, 0.01, 0.6]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.5} metalness={0.4} />
        </mesh>

        {/* Laptop Lid (Hinge located at back of base: Z = -1.2) */}
        <group position={[0, 0.12, -1.2]} ref={lidRef}>
          {/* Lid outer shell */}
          <RoundedBox args={[3.4, 0.08, 2.4]} radius={0.04} smoothness={4} position={[0, 0.04, 1.2]} castShadow>
            <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} />
          </RoundedBox>
          
          {/* Bezel */}
          <mesh position={[0, -0.001, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
             <planeGeometry args={[3.32, 2.32]} />
             <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.9} />
          </mesh>
          
          {/* Actual Glowing Screen Canvas */}
          <mesh position={[0, -0.002, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.15, 1.9]} />
            <meshStandardMaterial 
              ref={screenMaterialRef}
              color="#000000" 
              emissive="#00f0ff"
              emissiveIntensity={0}
              toneMapped={false}
              transparent
            />
          </mesh>
        </group>
      </group>
    </>
  )
}

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const preloaderRef = useRef(null)
  const overlayRef = useRef(null)

  // Mutable animation state driven by GSAP
  // Start: Far left of the room, entering sideways
  const animState = useRef({
    camX: -14, camY: 6, camZ: 8,       
    lookY: 1, lookZ: 0,                
    lidAngle: 0,                       // Lid closed
    screenGlow: 0,                     // Screen off
  }).current

  useEffect(() => {
    // 1. Progress counter (HTML UI)
    const duration = 3000 // Extended slightly for the longer walk sequence
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
      setCount(Math.floor(eased * 100))
      if (progress >= 1) clearInterval(interval)
    }, 16)

    // 2. Cinematic First-Person Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => onComplete()
        })
      }
    })

    // Phase A: "Walk" into the room from the side, approaching the desk
    tl.to(animState, {
      camX: -2,
      camY: 5.5,
      camZ: 7,
      lookY: 0.5,
      lookZ: 0.5,
      duration: 1.8,
      ease: 'power1.inOut',
    })
    // Phase B: "Sit down" in the chair, squaring up to the laptop
    .to(animState, {
      camX: 0,
      camY: 2.2, // Sitting eye level
      camZ: 4.8, // Distance from chair to screen
      lookY: 0.5, // Look at laptop center
      lookZ: 0.5,
      duration: 1.2,
      ease: 'power2.inOut',
    }, "-=0.2")
    // Hide HTML loader text right as we sit down
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.5
    }, "-=0.6")
    // Phase C: Open Lid realistically
    .to(animState, {
      lidAngle: -1.85, // Open slightly past 90 degrees
      duration: 1.4,
      ease: 'power3.inOut'
    }, "-=0.2")
    // Phase D: Screen powers on (with flicker handled in useFrame)
    .to(animState, {
      screenGlow: 1,
      duration: 0.4,
    }, "-=0.4")
    // Add a tiny pause for dramatic effect to notice the glow
    .to({}, { duration: 0.3 }) 
    // Phase E: Dramatic dive straight into the glowing screen
    .to(animState, {
      camX: 0,
      camY: 1.15, // Exact center height of the open screen
      camZ: -1.5, // Blast entirely through the screen geometry 
      lookY: 1.15,
      lookZ: -4.0,
      duration: 1.2,
      ease: 'power4.in',
    })

    return () => { clearInterval(interval); tl.kill() }
  }, [onComplete])

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[100] bg-[#000000] pointer-events-none">
      <div className="absolute inset-0 block h-full w-full">
        <Canvas gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} camera={{ fov: 45 }} shadows>
          <LaptopScene animState={animState} />
        </Canvas>
      </div>

      <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-[2px]">
          <div className="h-full bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] transition-all duration-100" style={{ width: `${count}%` }} />
        </div>
        <div className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-8 text-white/40 font-bold text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Constructing Reality</div>
        <div className="relative flex items-start justify-center">
          <span className="text-[4rem] sm:text-[6rem] md:text-[10rem] font-bold gradient-text leading-none drop-shadow-2xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{String(count).padStart(3, '0')}</span>
          <span className="text-[#00f0ff] text-xl sm:text-2xl md:text-3xl font-light mt-1 sm:mt-2 md:mt-4 ml-1 md:ml-2">%</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader