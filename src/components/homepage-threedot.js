'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

export default function HomeDot() {
  const containerRef = useRef()
  const [scrollScale, setScrollScale] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / maxScroll, 1)
      setScrollScale(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const boxConfigs = useMemo(() => [
    { position: [1, 2.5, 0.5], frequency: 1.5 },
    { position: [1, 1.5, 0.5], frequency: 2 },
    { position: [-0.5, 1.8, 0.5], frequency: 0.5 },
    { position: [-1.5, 2.8, 0], frequency: 3 }
  ], [])

  return (
    <div ref={containerRef} className="dotcontainer">
      <div className="dottext">
        dev nitya nanda hoyos laravel wordpress shopify apps ecommerce php javascript react dev nitya nanda hoyos laravel wordpress shopify apps ecommerce php javascript react
      </div>

      <Canvas
        shadows
        frameloop="always"
        camera={{ position: [0, 0, 4], fov: 105 }}
        style={{ pointerEvents: 'none' }}
        eventSource={containerRef}
        eventPrefix="offset"
      >
        <ambientLight intensity={1} />
        <directionalLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[10, 0, 0]} />

        {boxConfigs.map((config, i) => (
          <Box key={i} {...config} scrollScale={scrollScale} />
        ))}

        <Shadows />
      </Canvas>
    </div>
  )
}

function Box({ frequency, position, scrollScale }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    const scaleZ = hovered
      ? 2
      : 0.2 + scrollScale * 2 + Math.sin(frequency * Date.now() * 0.001) * 0.3

    if (ref.current) {
      ref.current.scale.set(1, 1, scaleZ)
    }
  })

  return (
    <mesh
      ref={ref}
      position={position}
      castShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.3, 0.5, 1]} />
      <meshStandardMaterial color={hovered ? 'yellow' : '#b4e300'} />
    </mesh>
  )
}

function Shadows() {
  const { viewport } = useThree()
  return (
    <mesh receiveShadow scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <shadowMaterial transparent opacity={0.5} />
    </mesh>
  )
}
