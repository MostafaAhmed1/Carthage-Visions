import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Preload, useGLTF } from '@react-three/drei'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * DISPLAY ONLY. The camera model is supplied at /models/hero-camera.glb.
 * Nothing here generates geometry: we load, centre, light and rotate it.
 */

function StudioEnvironment() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.045)
    scene.environment = env.texture
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
      room.dispose?.()
    }
  }, [gl, scene])

  return null
}

function CameraModel({ src, reduced, animate }) {
  const { scene } = useGLTF(src)
  const outer = useRef()
  const inner = useRef()

  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 1.15
          child.material.needsUpdate = true
        }
      }
    })
    return clone
  }, [scene])

  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const max = Math.max(size.x, size.y, size.z) || 1
    return { scale: 2.7 / max, center }
  }, [model])

  useFrame((state, delta) => {
    if (!outer.current) return
    const d = Math.min(delta, 0.05)

    if (animate && !reduced) {
      outer.current.rotation.y += d * 0.2
    }

    // Very gentle parallax — pointer only, never scroll.
    const targetX = state.pointer.y * 0.1
    const targetZ = state.pointer.x * 0.06
    outer.current.rotation.x = THREE.MathUtils.lerp(outer.current.rotation.x, targetX, 0.045)
    outer.current.rotation.z = THREE.MathUtils.lerp(outer.current.rotation.z, targetZ, 0.045)
    outer.current.position.y = THREE.MathUtils.lerp(
      outer.current.position.y,
      animate && !reduced ? Math.sin(state.clock.elapsedTime * 0.5) * 0.045 : 0,
      0.04,
    )
  })

  return (
    <group ref={outer}>
      <group ref={inner}>
        <primitive
          object={model}
          scale={fit.scale}
          position={[
            -fit.center.x * fit.scale,
            -fit.center.y * fit.scale,
            -fit.center.z * fit.scale,
          ]}
        />
      </group>
    </group>
  )
}

export default function HeroScene({ src, reduced = false }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, 5.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
      frameloop={reduced ? 'demand' : 'always'}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <StudioEnvironment />

        <ambientLight intensity={0.5} />
        <directionalLight position={[3.5, 4.5, 4]} intensity={2.1} color="#fff3e2" />
        <directionalLight position={[-4, 1.5, 2]} intensity={0.55} color="#cfd6dd" />
        <spotLight position={[-1.5, 2.4, -4]} intensity={1.1} angle={0.6} penumbra={1} color="#c9a86a" />

        <CameraModel src={src} reduced={reduced} animate />

        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.36}
          scale={7}
          blur={2.8}
          far={3.2}
          resolution={256}
          color="#120f0c"
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
