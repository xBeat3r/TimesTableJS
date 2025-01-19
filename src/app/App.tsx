import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import "./style/index.css";
import { useEffect, useState } from "react";

export function App() {
    return (
        <div id="canvas-container">
            <Canvas
                // camera={{ position: [0, 0, 0] }}
                // orthographic={ortho}
                frameloop="always"
                // TODO:
                //  frameloop="demand"
            >
                <Scene />
            </Canvas>
        </div>
    );
}
