import { useRef } from "react";
import { Mesh } from "three";
import MyMapControls from "./MyMapControls";
import TimesTablesLines from "./TimesTablesLines";

function Scene() {
    const meshRef = useRef<Mesh>(null!);

    // useFrame((state, delta) => {
    //     const speed = 0.5;
    //     meshRef.current.rotation.x += delta * speed;
    //     meshRef.current.rotation.y += delta * speed;
    //     meshRef.current.rotation.z += delta * speed;
    // });
    return (
        <>
            <MyMapControls />

            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 0, 5]} color="white" />

            <gridHelper args={[10, 10]} />
            <axesHelper args={[5]} />

            <TimesTablesLines />

            {/* <mesh ref={meshRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry />
                <meshPhysicalMaterial
                    //
                    sheenColor={[1, 0, 0]}
                    color={"blue"}
                />
            </mesh> */}
        </>
    );
}

export default Scene;
