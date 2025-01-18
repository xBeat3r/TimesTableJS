import type { Input, RenderContainer, ThreeEnv, UpdateSource } from "./interfaces";
import {
    updateCameraType,
    updateCameraView,
    updateColorMethod,
    updateMultiplier,
    updateOpacity,
    updateRendererSize,
    updateRenderTarget,
    updateToneMapping,
    updateToneMappingExposure,
    updateTotalLines,
} from "./updateActions";

// TODO: evaluate React Three Fiber
export class RenderController {
    private frameRequested = false;
    private postRenderCallbacks: Set<() => void>;
    private isInitialRender = true;
    private controlsEventListener = () => {
        this.requestRender("controls");
    };

    private readonly updateSources: Set<UpdateSource>;
    private readonly threeEnv: ThreeEnv;
    private readonly input: Input;
    private readonly renderContainer: RenderContainer;

    constructor(threeEnv: ThreeEnv, input: Input, renderContainer: RenderContainer) {
        this.threeEnv = threeEnv;
        this.input = input;
        this.renderContainer = renderContainer;
        this.updateSources = new Set();
        this.postRenderCallbacks = new Set();

        this.threeEnv.controls.addEventListener("change", this.controlsEventListener);
    }

    public requestRender(source: UpdateSource | "init", postRenderCallback?: () => void) {
        if (source !== "init") {
            this.updateSources.add(source);
        }

        if (!this.frameRequested) {
            this.frameRequested = true;
            requestAnimationFrame(() => this.render());
        }

        if (postRenderCallback) {
            this.postRenderCallbacks.add(postRenderCallback);
        }
    }

    private render() {
        this.frameRequested = false;

        this.threeEnv.controls.update();

        this.update();

        this.threeEnv.composer.render();

        // prepare for next frame

        this.isInitialRender = false;

        this.updateSources.clear();

        // clear postRenderCallbacks before executing the previous callbacks
        // this allows renderCallbacks to requestRender with callbacks
        const oldPostRenderCallbacks = this.postRenderCallbacks;

        this.postRenderCallbacks = new Set();

        oldPostRenderCallbacks.forEach((callback) => callback());
    }

    private needsUpdate(source: UpdateSource): boolean {
        return this.updateSources.has(source) || this.isInitialRender;
    }

    private update() {
        if (this.needsUpdate("cameraType")) {
            this.threeEnv.controls.removeEventListener("change", this.controlsEventListener);
            updateCameraType(this.threeEnv, this.input);
            this.threeEnv.controls.addEventListener("change", this.controlsEventListener);
        }
        if (this.needsUpdate("cameraType") || this.needsUpdate("resize")) {
            updateRendererSize(this.threeEnv, window.innerWidth, window.innerHeight);
        }
        if (this.needsUpdate("cameraType") || this.needsUpdate("samples") || this.needsUpdate("renderTargetType")) {
            updateRenderTarget(this.threeEnv, this.input.samples, this.input.renderTargetType);
        }
        if (this.needsUpdate("cameraType") || this.needsUpdate("cameraView") || this.needsUpdate("resetCamera")) {
            updateCameraView(this.threeEnv, this.input.cameraView);
        }
        if (this.needsUpdate("totalLines")) {
            updateTotalLines(this.threeEnv, this.input.totalLines);
        }
        if (this.needsUpdate("multiplier")) {
            updateMultiplier(this.threeEnv.material, this.input.multiplier);
        }
        if (this.needsUpdate("colorMethod")) {
            updateColorMethod(this.threeEnv.material, this.input.colorMethod);
        }
        if (this.needsUpdate("opacity")) {
            updateOpacity(this.threeEnv.material, this.input.opacity);
        }
        if (this.needsUpdate("toneMapping")) {
            updateToneMapping(this.threeEnv, this.input.toneMapping);
        }
        if (this.needsUpdate("toneMappingExposure")) {
            updateToneMappingExposure(this.threeEnv, this.input.toneMappingExposure);
        }
    }
}
