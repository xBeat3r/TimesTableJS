import assertNever from "assert-never";
import * as THREE from "three";
import {
    getCamera,
    getComposer,
    getControls,
    getGeometry,
    getLines,
    getRenderTarget,
    getRenderTargetSize,
} from "./main";
import type {
    CameraView,
    ColorMethod,
    Input,
    LineMaterial,
    RenderTargetTypeLabel,
    ThreeEnv,
    ToneMappingLabel,
} from "./interfaces";

export function updateColorMethod(material: LineMaterial, colorMethod: ColorMethod) {
    switch (colorMethod) {
        case "solid":
            material.uniforms.colorMethod.value = 0;
            break;
        case "faded":
            material.uniforms.colorMethod.value = 1;
            break;
        case "lengthOpacity":
            material.uniforms.colorMethod.value = 2;
            break;
        case "lengthHue":
            material.uniforms.colorMethod.value = 3;
            break;
        case "indexHue":
            material.uniforms.colorMethod.value = 4;
            break;
        case "fadedIndexHue":
            material.uniforms.colorMethod.value = 5;
            break;
        default:
            assertNever(colorMethod);
    }

    material.needsUpdate = true;
}

export function updateMultiplier(material: LineMaterial, multiplier: number) {
    material.uniforms.multiplier.value = multiplier;
    material.needsUpdate = true;
}

export function updateOpacity(material: LineMaterial, opacity: number) {
    material.uniforms.opacity.value = Math.pow(opacity, 3);
    material.needsUpdate = true;
}

export function updateToneMapping(threeEnv: ThreeEnv, toneMapping: ToneMappingLabel) {
    switch (toneMapping) {
        case "No":
            threeEnv.renderer.toneMapping = THREE.NoToneMapping;
            break;
        case "Linear":
            threeEnv.renderer.toneMapping = THREE.LinearToneMapping;
            break;
        case "Reinhard":
            threeEnv.renderer.toneMapping = THREE.ReinhardToneMapping;
            break;
        case "Cineon":
            threeEnv.renderer.toneMapping = THREE.CineonToneMapping;
            break;
        case "ACESFilmic":
            threeEnv.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            break;
        case "AgX":
            threeEnv.renderer.toneMapping = THREE.AgXToneMapping;
            break;
        case "Neutral":
            threeEnv.renderer.toneMapping = THREE.NeutralToneMapping;
            break;
        default:
            assertNever(toneMapping);
    }
}

export function updateToneMappingExposure(threeEnv: ThreeEnv, toneMappingExposure: number) {
    threeEnv.renderer.toneMappingExposure = toneMappingExposure;
}

export function updateRendererSize(threeEnv: ThreeEnv, width: number, height: number) {
    const aspectRatio = width / height;

    const camera = threeEnv.camera;

    if (camera instanceof THREE.OrthographicCamera) {
        if (aspectRatio > 1) {
            camera.left = -aspectRatio;
            camera.right = aspectRatio;
            camera.top = 1;
            camera.bottom = -1;
        } else {
            camera.left = -1;
            camera.right = 1;
            camera.top = Math.pow(aspectRatio, -1);
            camera.bottom = -Math.pow(aspectRatio, -1);
        }

        camera.updateProjectionMatrix();
    } else if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
    }
    threeEnv.renderer.setPixelRatio(window.devicePixelRatio);
    threeEnv.renderer.setSize(width, height);

    const renderTargetSize = getRenderTargetSize(threeEnv.renderer);
    threeEnv.composer.setSize(renderTargetSize.width, renderTargetSize.height);
}

export function updateTotalLines(threeEnv: ThreeEnv, totalLines: number) {
    threeEnv.scene.remove(threeEnv.lines);

    threeEnv.material.uniforms.total.value = totalLines;
    threeEnv.material.needsUpdate = true;
    threeEnv.lines = getLines(getGeometry(totalLines), threeEnv.material);

    threeEnv.scene.add(threeEnv.lines);
}

export function updateRenderTarget(
    threeEnv: Pick<ThreeEnv, "composer" | "renderer">,
    samples: number,
    renderTargetType: RenderTargetTypeLabel,
) {
    threeEnv.composer.reset(getRenderTarget(threeEnv.renderer, samples, renderTargetType));
}

export function updateCameraType(
    threeEnv: Pick<ThreeEnv, "controls" | "renderer" | "camera" | "composer" | "scene">,
    { cameraType, renderTargetType, samples }: Pick<Input, "cameraType" | "renderTargetType" | "samples">,
) {
    threeEnv.controls.dispose();
    threeEnv.composer.dispose();

    threeEnv.camera = getCamera(cameraType);
    threeEnv.controls = getControls(threeEnv);
    threeEnv.composer = getComposer(threeEnv, { renderTargetType, samples });
}

export function updateCameraView(threeEnv: ThreeEnv, cameraView: CameraView) {
    const distance = threeEnv.camera instanceof THREE.OrthographicCamera ? 10 : Math.PI;

    if (cameraView === "top") {
        threeEnv.controls.position0.set(0, distance, 0);
    } else if (cameraView === "front") {
        threeEnv.controls.position0.set(0, 0, distance);
    } else if (cameraView === "bottom") {
        threeEnv.controls.position0.set(0, -distance, 0);
    } else {
        assertNever(cameraView);
    }
    threeEnv.controls.target0.set(0, 0, 0);
    threeEnv.controls.zoom0 = 1;
    threeEnv.controls.reset();
}
