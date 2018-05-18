import {ColorMethod, ThreeEnv, RenderContainer} from "./interfaces";
import * as THREE from "three";

export function updateColorMethod(material: THREE.ShaderMaterial, colorMethod: ColorMethod) {
  switch (colorMethod) {
    case 'solid':
      material.uniforms.colorMethod.value = 0;
      break;
    case 'faded':
      material.uniforms.colorMethod.value = 1;
      break;
    case 'lengthOpacity':
      material.uniforms.colorMethod.value = 2;
      break;
    case 'lengthHue':
      material.uniforms.colorMethod.value = 3;
      break;
  }

  material.needsUpdate = true;
}

export function updateMultiplier(material: THREE.ShaderMaterial, multiplier: number) {
  material.uniforms.multiplier.value = multiplier;
  material.needsUpdate = true;
}

export function updateOpacity(material: THREE.ShaderMaterial, opacity: number) {
  material.uniforms.opacity.value = opacity;
  material.needsUpdate = true;
}

export function updateNoiseStrength(material: THREE.ShaderMaterial, noiseStrength: number) {
  material.uniforms.noiseStrength.value = noiseStrength;
  material.needsUpdate = true;
}

export function updateCameraPosition(camera: THREE.OrthographicCamera, camPosX: number, camPosY: number) {
  camera.position.setX(camPosX);
  camera.position.setY(camPosY);
}

export function updateCameraZoom(camera: THREE.OrthographicCamera, zoom: number) {
  camera.zoom = Math.pow(Math.E, zoom - 1);
  camera.updateProjectionMatrix();
}

export function updateRendererSize(threeEnv: ThreeEnv, height: number, width: number) {
  const aspectRatio = width / height;

  const camera = threeEnv.camera;

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

  threeEnv.camera.updateProjectionMatrix();

  threeEnv.renderer.setSize(width, height);
}

export function updateTotalLines(threeEnv: ThreeEnv, totalLines: number) {
  const positions = new Float32Array(totalLines * 6);
  threeEnv.positionsAttribute.setArray(positions);

  const colors = new Float32Array(totalLines * 6);
  threeEnv.colorsAttribute.setArray(colors);

  const numbers = new Float32Array(totalLines * 2);
  threeEnv.numbersAttribute.setArray(numbers);
  for (let i = 0; i < totalLines * 2; i++) {
    numbers[i] = i;
  }
  threeEnv.numbersAttribute.needsUpdate = true;

  threeEnv.material.uniforms.total.value = totalLines;
  threeEnv.material.needsUpdate = true;

  threeEnv.positionsAttribute.needsUpdate = true;
}

export function updateRenderer(threeEnv: ThreeEnv, renderContainer: RenderContainer, antialias: boolean) {
  const newRenderer = new THREE.WebGLRenderer({antialias});
  newRenderer.setPixelRatio(window.devicePixelRatio);
  newRenderer.setSize(window.innerWidth, window.innerHeight);

  if (renderContainer.firstChild) {
    renderContainer.replaceChild(newRenderer.domElement, renderContainer.firstChild);
  } else {
    throw new Error("No Render Container");
  }

  threeEnv.renderer = newRenderer;
}