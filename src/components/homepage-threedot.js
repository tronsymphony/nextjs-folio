'use client'
import { useRef, useState } from 'react'
import { Canvas,useFrame, useThree } from '@react-three/fiber'
// import { Physics, RigidBody } from '@react-three/rapier'


// import { useGLTF, OrbitControls, Gltf, Environment, Fisheye, KeyboardControls } from '@react-three/drei'
// import Controller from 'ecctrl'
// import { useControls } from "leva";

export default function HomeDot() {
    const ref = useRef()

    // const keyboardMap = [
    //     { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    //     { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    //     { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    //     { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    //     { name: 'jump', keys: ['Space'] },
    //     { name: 'run', keys: ['Shift'] },
    // ]

    // const { physics, disableFollowCam } = useControls("World Settings", {
    //     physics: false,
    //     disableFollowCam: false,
    //   });

    return (
        <>
            <div ref={ref} className="dotcontainer">
                <div className="dottext">dev nitya nanda hoyos laravel wordpress shopify apps ecommerce php javascript react dev nitya nanda hoyos laravel wordpress shopify apps ecommerce php javascript react  </div>
                <Canvas
                    shadows
                    frameloop="demand"
                    camera={{ position: [0, 0, 4], fov: 105 }}
                    // camera={{ position: [-10, 0,22], fov: 45 }}
                    // camera={{ position: [5, 5, 5], fov: 75, up: [0, 0, 2]}}
                    style={{ pointerEvents: 'none' }}
                    eventSource={ref}
                    eventPrefix="offset">
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow shadow-mapSize={[2024, 2024]} />
                    <pointLight position={[10, 0, 0]} />
                    <Box position={[1, 2.5, .5]} frequency={1.5}  />
                    <Box position={[1, 1.5, .5]}  frequency={2} />
                    <Box position={[-0.5, 1.8, .5]} frequency={.5} />
                    <Box position={[-1.5, 2.8, 0]} frequency={3} />
                    {/* <Model position={[-.4, 1, 0]} scale={[0.5, 0.5, 0.5]} /> */}


                    <Shadows position={[0, 0, 0]} />

                    {/* <Physics timeStep="vary">
                        <KeyboardControls map={keyboardMap}>
                            <Controller 
                            disableFollowCam={disableFollowCam}
                            position={[0,10,0]}>
                                <Gltf castShadow receiveShadow scale={0.315} position={[0, 2, 0]} src="/model/race-future.glb" />
                            </Controller>
                        </KeyboardControls>
                        <RigidBody type="fixed" colliders="trimesh">
                             <Gltf castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={0.11} src="/fantasy_game_inn2-transformed.glb" /> 
                        </RigidBody>
                    </Physics> */}

                </Canvas>
            </div>
        </>
    );
}




function Box({ frequency, ...props }) {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [scaleX, setScaleX] = useState(0.1) // Start with a small height

    useFrame((state, delta) => {
        if (!hovered) {
        setScaleX(1 + Math.sin( frequency) * 1) // Oscillate between 1 and 3
        }
    })

    return (
        <mesh 
            {...props} 
            castShadow 
            ref={ref} 
            onPointerOver={() => hover(true)} 
            onPointerOut={() => hover(false)} 
            scale={[1, 1, scaleX]}
            >
            <boxGeometry args={[.3, .5, 1]} />
            <meshStandardMaterial color={hovered ? 'yellow' : '#b4e300'} />
        </mesh>
    )
}

function Shadows(props) {
    const { viewport } = useThree()
    return (
        <mesh receiveShadow scale={[viewport.width, viewport.height, 1]} {...props}>
            <planeGeometry args={[10, 10]}  />
            <shadowMaterial transparent opacity={0.5} />
        </mesh>
    )
}


function Model(props) {
    const { scene } = useGLTF('/model/race-future.glb'); // Replace with the path to your model
    scene.rotation.set(0, Math.PI / 2, Math.PI / 2);
    return <primitive object={scene} {...props} />;
}
