import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

const Scene = () => {
    const meshRef = useRef<Mesh>(null!);

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta;
        meshRef.current.rotation.y += delta;
        meshRef.current.rotation.z += delta;
    });
    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 0, 5]} color="green" />
            <mesh ref={meshRef} position={[0, 0, 2]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshPhysicalMaterial specularIntensity={5} />
            </mesh>
        </>
    );
};

export default Scene;
