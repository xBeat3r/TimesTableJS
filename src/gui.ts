import GUI from "lil-gui";
import type {
    CameraType,
    CameraView,
    ColorMethod,
    Input,
    RenderTargetTypeLabel,
    ThreeEnv,
    ToneMappingLabel,
    UpdateSource,
} from "./interfaces";
import { RenderController } from "./render";

const DEBUG = false;

export function initGUI(input: Input, renderController: RenderController, threeEnv: ThreeEnv) {
    const gui = new GUI();

    const totalLines = "totalLines" satisfies UpdateSource;
    const multiplier = "multiplier" satisfies UpdateSource;
    const animate = "animate" satisfies UpdateSource;
    const multiplierIncrement = "multiplierIncrement" satisfies UpdateSource;
    const opacity = "opacity" satisfies UpdateSource;
    const colorMethod = "colorMethod" satisfies UpdateSource;
    const toneMapping = "toneMapping" satisfies UpdateSource;
    const toneMappingExposure = "toneMappingExposure" satisfies UpdateSource;
    const renderTargetType = "renderTargetType" satisfies UpdateSource;
    const samples = "samples" satisfies UpdateSource;
    const cameraType = "cameraType" satisfies UpdateSource;
    const cameraView = "cameraView" satisfies UpdateSource;
    const resetCamera = "resetCamera" satisfies UpdateSource;

    // TODO: rename "Geometry"
    const mathsFolder = gui.addFolder("Maths");
    mathsFolder
        .add(input, totalLines)
        .min(0)
        .step(1)
        .onChange(() => renderController.requestRender(totalLines));

    const multiplierController = mathsFolder.add(input, multiplier).step(1e-6);

    function postRenderCallback() {
        if (input.animate) {
            multiplierController.setValue(input.multiplier + Math.pow(input.multiplierIncrement, 3));
        }
    }

    multiplierController.onChange(() => renderController.requestRender(multiplier, postRenderCallback));

    const animationFolder = gui.addFolder("Animation");
    animationFolder.add(input, animate).onChange(() => renderController.requestRender(animate, postRenderCallback));
    animationFolder
        .add(input, multiplierIncrement)
        .min(-1)
        .max(1)
        .step(0.001)
        .onChange(() => renderController.requestRender(multiplierIncrement, postRenderCallback));

    const colorFolder = gui.addFolder("Color");
    colorFolder
        .add(input, opacity, 0, 1)
        .step(0.001)
        .onChange(() => renderController.requestRender(opacity));
    const colorMethods: ColorMethod[] = ["solid", "faded", "lengthOpacity", "lengthHue", "indexHue", "fadedIndexHue"];
    colorFolder.add(input, colorMethod, colorMethods).onChange(() => renderController.requestRender(colorMethod));

    const renderFolder = gui.addFolder("Render");
    !DEBUG && renderFolder.close();
    renderFolder
        .add(input, samples, 0, threeEnv.renderer.capabilities.maxSamples)
        .step(1)
        .onChange(() => renderController.requestRender(samples));
    renderFolder
        .add(input, toneMapping, [
            "No",
            "Linear",
            "Reinhard",
            "Cineon",
            "ACESFilmic",
            "AgX",
            "Neutral",
        ] satisfies ToneMappingLabel[])
        .onChange(() => renderController.requestRender(toneMapping));
    renderFolder
        .add(input, toneMappingExposure, 0, 2)
        .onChange(() => renderController.requestRender(toneMappingExposure));
    renderFolder
        .add(input, renderTargetType, ["UnsignedByte", "HalfFloat", "Float"] satisfies RenderTargetTypeLabel[])
        .onChange(() => renderController.requestRender(renderTargetType));

    const cameraFolder = gui.addFolder("Camera");
    !DEBUG && cameraFolder.close();
    cameraFolder
        .add(input, cameraType, ["Orthographic", "Perspective"] satisfies CameraType[])
        .onChange(() => renderController.requestRender(cameraType));
    cameraFolder
        .add(input, cameraView, ["top", "front", "bottom"] satisfies CameraView[])
        .onChange(() => renderController.requestRender(cameraView));

    cameraFolder.add(input, resetCamera).onChange(() => {
        renderController.requestRender(resetCamera);
    });

    window.addEventListener("resize", () => renderController.requestRender("resize"));
}
