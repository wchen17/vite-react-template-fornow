'use client'

import dynamic from 'next/dynamic'

// This dynamically imports your Scene component and disables Server-Side Rendering for it.
const Scene = dynamic(() => import('@/app/Scene'), {
  ssr: false,
  // You can add a loading component here if you want
  loading: () => <p style={{ color: 'white' }}>Loading 3D Experience...</p>, 
})

export default function Home() {
  return (
    // Now, your Scene will only render on the client, fixing the error.
    <Scene />
  )
}