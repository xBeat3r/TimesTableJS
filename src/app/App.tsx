import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import "./style/index.css";

export function App() {
    return (
        <div id="canvas-container">
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    );
}
