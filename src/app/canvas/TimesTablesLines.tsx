import { Html, shaderMaterial } from "@react-three/drei";
import { extend, useFrame, type MaterialNode, type Object3DNode } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
    AddEquation,
    CustomBlending,
    LineSegments,
    MathUtils,
    OneFactor,
    SrcAlphaFactor,
    type BufferGeometry,
    type ShaderMaterial,
} from "three";
import fragmentShader from "./glsl/timesTablesLines.frag";
import vertexShader from "./glsl/timesTablesLines.vert";

export type LineMaterialUniforms = {
    multiplier: number;
    total: number;
    opacity: number;
    colorMethod: number;
};

const LineShaderMaterial = shaderMaterial(
    {
        multiplier: 2,
        total: 10,
        opacity: 1,
        colorMethod: 4,
    } satisfies LineMaterialUniforms,
    vertexShader,
    fragmentShader,
    (material) => {
        if (!material) throw new Error("Material is undefined");
        material.depthTest = false;
        material.transparent = true;
        material.blending = CustomBlending;
        material.blendEquation = AddEquation;
        material.blendSrc = SrcAlphaFactor;
        material.blendDst = OneFactor;
    },
);

extend({ LineShaderMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        lineShaderMaterial: MaterialNode<ShaderMaterial, typeof LineShaderMaterial> | LineMaterialUniforms;
    }
}

function TimesTablesLines() {
    const [totalLines, setTotalLines] = useState(100);

    const lineSegmentsRef = useRef<LineSegments<BufferGeometry, ShaderMaterial & LineMaterialUniforms>>(null!);

    useFrame((state, delta) => {
        lineSegmentsRef.current.material.multiplier = Math.sin(state.clock.elapsedTime / 5) * 2 + 0;
    });

    useEffect(() => {
        console.log({ totalLines });
        const vertices = totalLines * 2;

        // Performance optimization: we don't need to set the position attribute,
        // since the vertex shader makes use of `gl_VertexID` to determine the line position.
        // Previously, we needed to allocate a buffer whenever the total number of lines changed.
        // Setting the draw range is enough to trigger the required `gl.drawArrays` call.
        // References:
        //  https://webgl2fundamentals.org/webgl/lessons/webgl-drawing-without-data.html
        //  https://github.com/mrdoob/three.js/blob/f30af844f4fe3300e1ddc75dcbad25988705c1c2/src/renderers/webgl/WebGLBufferRenderer.js#L13
        //  https://github.com/mrdoob/three.js/blob/f30af844f4fe3300e1ddc75dcbad25988705c1c2/src/renderers/WebGLRenderer.js#L912
        //  https://github.com/mrdoob/three.js/blob/f30af844f4fe3300e1ddc75dcbad25988705c1c2/src/renderers/WebGLRenderer.js#L777
        lineSegmentsRef.current.geometry.setDrawRange(0, vertices);

        // LineSegmentsRef.current.material.total = totalLines;
        // LineSegmentsRef.current.material.needsUpdate = true;
    }, [totalLines]);

    return (
        <>
            <lineSegments ref={lineSegmentsRef} frustumCulled={false}>
                <bufferGeometry />
                <lineShaderMaterial key={LineShaderMaterial.key} total={totalLines} />
            </lineSegments>
        </>
    );
}

export default TimesTablesLines;
