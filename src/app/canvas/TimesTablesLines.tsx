import fragmentShader from "./glsl/timesTablesLines.frag";
import vertexShader from "./glsl/timesTablesLines.vert";
import { AddEquation, CustomBlending, LineSegments, OneFactor, SrcAlphaFactor } from "three";
import type { LineMaterialUniforms } from "../../legacy/interfaces";

import { useEffect, useRef } from "react";

function TimesTablesLines() {
    const totalLines = 200;

    const LineSegmentsRef = useRef<LineSegments>(null!);

    useEffect(() => {
        console.log(LineSegmentsRef.current);

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
        LineSegmentsRef.current.geometry.setDrawRange(0, vertices);
    }, []);

    return (
        <>
            <lineSegments ref={LineSegmentsRef}>
                <bufferGeometry />
                <shaderMaterial
                    uniforms={
                        {
                            multiplier: { value: 2 },
                            total: { value: totalLines },
                            opacity: { value: 1 },
                            colorMethod: { value: 3 },
                        } satisfies LineMaterialUniforms
                    }
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    depthTest={false}
                    transparent={true}
                    blending={CustomBlending}
                    blendEquation={AddEquation}
                    blendSrc={SrcAlphaFactor}
                    blendDst={OneFactor}
                />
            </lineSegments>
        </>
    );
}

export default TimesTablesLines;
