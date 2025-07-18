'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

// NEW: A component to load and display your .glb model
function Model() {
  // The useGLTF hook from Drei makes loading models simple
  const { scene } = useGLTF('/spectre.glb')
  const modelRef = useRef(null)

  useFrame((state, delta) => {
    if (modelRef.current) {
      // @ts-expect-error
      modelRef.current.rotation.y += delta * 0.2
    }
  })

  // We use <primitive> to render the entire loaded scene from the .glb file
  // We can't easily apply the edge-glow shader to a complex model,
  // so we'll make it glow using an emissive material and the Bloom effect.
  return <primitive ref={modelRef} object={scene} scale={1.5} />
}

// The main Scene component that sets up the canvas
export default function Scene() {
  return (
    <main className='h-screen w-screen bg-black'>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <color attach="background" args={['black']} />
        
        {/* We add some lights to make the model visible */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Model />
        
        <EffectComposer>
          <Bloom 
            intensity={0.5} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.2} 
          />
        </EffectComposer>
      </Canvas>
    </main>
  )
}