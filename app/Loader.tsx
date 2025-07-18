'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Scene, disabling Server-Side Rendering (ssr)
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
})

export default function Loader() {
  return <Scene />
}