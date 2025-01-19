import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import MyMapControls from "./MyMapControls";
import TimesTablesLines from "./TimesTablesLines";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

function Scene() {
    const meshRef = useRef<Mesh>(null!);
    const [ortho, setOrtho] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "o") {
                setOrtho((prevOrtho) => !prevOrtho);
            }
        };

        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, []);

    return (
        <>
            {/* TODO: port camera settings + views */}
            {ortho ? <OrthographicCamera makeDefault position={[0, 0, 0]} zoom={1} /> : <PerspectiveCamera />}
            <MyMapControls />

            {/* <ambientLight intensity={0.1} /> */}
            {/* <directionalLight position={[0, 0, 5]} color="white" /> */}

            <gridHelper args={[10, 10]} />
            {/* <axesHelper args={[5]} /> */}

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
