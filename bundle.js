!function(e){function t(t){for(var r,a,s=t[0],u=t[1],d=t[2],c=0,h=[];c<s.length;c++)a=s[c],o[a]&&h.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(l&&l(t);h.length;)h.shift()();return i.push.apply(i,d||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==o[u]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={2:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var l=u;i.push([13,1,0]),n()}([,function(e,t,n){"use strict";t.__esModule=!0;var r=n(0);t.updateColorMethod=function(e,t){switch(t){case"solid":e.uniforms.colorMethod.value=0;break;case"faded":e.uniforms.colorMethod.value=1;break;case"lengthOpacity":e.uniforms.colorMethod.value=2;break;case"lengthHue":e.uniforms.colorMethod.value=3}e.needsUpdate=!0},t.updateMultiplier=function(e,t){e.uniforms.multiplier.value=t,e.needsUpdate=!0},t.updateOpacity=function(e,t){e.uniforms.opacity.value=t,e.needsUpdate=!0},t.updateNoiseStrength=function(e,t){e.uniforms.noiseStrength.value=t,e.needsUpdate=!0},t.updateCameraPosition=function(e,t,n){e.position.setX(t),e.position.setY(n)},t.updateCameraZoom=function(e,t){e.zoom=Math.pow(Math.E,t-1),e.updateProjectionMatrix()},t.updateRendererSize=function(e,t,n){var r=n/t,o=e.camera;r>1?(o.left=-r,o.right=r,o.top=1,o.bottom=-1):(o.left=-1,o.right=1,o.top=Math.pow(r,-1),o.bottom=-Math.pow(r,-1)),e.camera.updateProjectionMatrix(),e.renderer.setSize(n,t)},t.updateTotalLines=function(e,t){var n=new Float32Array(6*t);e.positionsAttribute.setArray(n);var r=new Float32Array(6*t);e.colorsAttribute.setArray(r);var o=new Float32Array(2*t);e.numbersAttribute.setArray(o);for(var i=0;i<2*t;i++)o[i]=i;e.numbersAttribute.needsUpdate=!0,e.material.uniforms.total.value=t,e.material.needsUpdate=!0,e.positionsAttribute.needsUpdate=!0},t.updateRenderer=function(e,t,n){var o=new r.WebGLRenderer({antialias:n});if(o.setPixelRatio(window.devicePixelRatio),o.setSize(window.innerWidth,window.innerHeight),!t.firstChild)throw new Error("No Render Container");t.replaceChild(o.domElement,t.firstChild),e.renderer=o}},function(e,t,n){"use strict";t.__esModule=!0;var r=n(1),o=function(){function e(e,t,n,r){this.frameRequested=!1,this.stats=e,this.threeEnv=t,this.input=n,this.renderContainer=r,this.updateSources=new Set,this.postRenderCallbacks=new Set}return e.prototype.requestRender=function(e,t){var n=this;this.updateSources.add(e),this.frameRequested||(this.frameRequested=!0,requestAnimationFrame(function(){return n.render()})),t&&this.postRenderCallbacks.add(t)},e.prototype.render=function(){this.stats.begin(),this.frameRequested=!1,this.update(),this.threeEnv.renderer.render(this.threeEnv.scene,this.threeEnv.camera),this.prepareNextRender(),this.stats.end()},e.prototype.update=function(){this.updateSources.has("init")&&(r.updateRenderer(this.threeEnv,this.renderContainer,this.input.antialias),r.updateRendererSize(this.threeEnv,window.innerHeight,window.innerWidth),r.updateTotalLines(this.threeEnv,this.input.totalLines),r.updateMultiplier(this.threeEnv.material,this.input.multiplier),r.updateColorMethod(this.threeEnv.material,this.input.colorMethod),r.updateOpacity(this.threeEnv.material,this.input.opacity),r.updateCameraPosition(this.threeEnv.camera,this.input.camPosX,this.input.camPosY),r.updateCameraZoom(this.threeEnv.camera,this.input.camZoom)),this.updateSources.has("antialias")&&r.updateRenderer(this.threeEnv,this.renderContainer,this.input.antialias),this.updateSources.has("totalLines")&&r.updateTotalLines(this.threeEnv,this.input.totalLines),this.updateSources.has("multiplier")&&r.updateMultiplier(this.threeEnv.material,this.input.multiplier),this.updateSources.has("colorMethod")&&r.updateColorMethod(this.threeEnv.material,this.input.colorMethod),this.updateSources.has("noiseStrength")&&r.updateNoiseStrength(this.threeEnv.material,this.input.noiseStrength),(this.updateSources.has("camPosX")||this.updateSources.has("camPosY"))&&r.updateCameraPosition(this.threeEnv.camera,this.input.camPosX,this.input.camPosY),this.updateSources.has("camZoom")&&r.updateCameraZoom(this.threeEnv.camera,this.input.camZoom),this.updateSources.has("opacity")&&r.updateOpacity(this.threeEnv.material,this.input.opacity),this.updateSources.has("resize")&&r.updateRendererSize(this.threeEnv,window.innerHeight,window.innerWidth)},e.prototype.prepareNextRender=function(){this.updateSources.clear();var e=this.postRenderCallbacks;this.postRenderCallbacks=new Set,e.forEach(function(e){return e()})},e}();t.RenderController=o},,function(e,t,n){"use strict";t.__esModule=!0;var r=n(3);t.initGUI=function(e,t,n){var o=new r.GUI,i=o.addFolder("Maths");i.add(e,"totalLines").min(0).step(1).onChange(function(){return t.requestRender("totalLines")});var a=i.add(e,"multiplier").step(1e-6);function s(){e.animate&&a.setValue(e.multiplier+Math.pow(e.multiplierIncrement,3))}a.onChange(function(){return t.requestRender("multiplier",s)}),i.open();var u=o.addFolder("Animation");u.add(e,"animate").onChange(function(){return t.requestRender("animate",s)}),u.add(e,"multiplierIncrement").min(-1).max(1).step(.001).onChange(function(){return t.requestRender("multiplierIncrement")}),u.open();var d=o.addFolder("Color");d.add(e,"opacity",0,1).step(.001).onChange(function(){return t.requestRender("opacity")}),d.add(e,"colorMethod",["solid","faded","lengthOpacity","lengthHue"]).onChange(function(){return t.requestRender("colorMethod")}),d.open();var l=o.addFolder("Render");l.add(e,"noiseStrength",0,255).step(.5).onChange(function(){return t.requestRender("noiseStrength")}),l.add(e,"antialias").onChange(function(){return t.requestRender("antialias")}),l.open();var c=o.addFolder("Camera"),h=c.add(e,"camPosX",-1,1).step(1e-6);h.onChange(function(){return t.requestRender("camPosX")});var p=c.add(e,"camPosY",-1,1).step(1e-6);p.onChange(function(){return t.requestRender("camPosY")});var m=c.add(e,"camZoom",1).step(.01);m.onChange(function(){return t.requestRender("camZoom")}),c.add(e,"resetCamera").onChange(function(){h.setValue(0),p.setValue(0),m.setValue(1)}),c.open(),n.addEventListener("wheel",function(t){t.shiftKey&&m.setValue(e.camZoom-t.deltaY/1e3)}),n.addEventListener("mousemove",function(t){if(1===t.buttons&&t.shiftKey){var r=Math.min(n.clientHeight,n.clientWidth),o=Math.pow(Math.E,e.camZoom-1)*r/2;h.setValue(e.camPosX-t.movementX/o),p.setValue(e.camPosY+t.movementY/o)}})}},,function(e,t){e.exports="uniform float multiplier;\nuniform float total;\nuniform int colorMethod;\n\nattribute float number;\nattribute vec3 color;\n\nvarying vec3 vColor;\nvarying float vLinePosition;\n\n#define PI 3.1415926535897932384626433832795\n\nbool isStartCord(float number);\nvec2 getCircleCord(float number, float total);\nvec3 hsv2rgb(vec3 c);\n\n\nvoid main() {\n  vec3 newPosition = position;\n\n  bool startCord = isStartCord(number);\n\n  if (startCord) {\n    newPosition.xy =  getCircleCord(number / 2.0, total);\n    vLinePosition = 1.0;\n  } else {\n    newPosition.xy =  getCircleCord( floor(number / 2.0) * multiplier, total);\n    vLinePosition = 0.0;\n  }\n\n  float theta = 2.0 * PI * floor(number / 2.0) * (multiplier - 1.0) / total;\n  float distance = abs(sin(theta / 2.0));\n\n  gl_Position = projectionMatrix *\n                modelViewMatrix *\n                vec4(newPosition,1.0);\n\n  // colorMethod switch\n  if (colorMethod == 0) {\n    // solid\n    vColor.xyz = vec3(1.0);\n  } else if (colorMethod == 1) {\n    // faded\n    if (startCord) {\n      vColor.xyz = vec3(1.0);\n    } else {\n      vColor.xyz = vec3(0.0);\n    }\n  } else if (colorMethod == 2) {\n    // lengthOpacity\n    vColor.xyz = vec3(1.0 - distance);\n  } else if (colorMethod == 3) {\n    // lengthHue\n    vColor.xyz = vec3(hsv2rgb(vec3(distance, 1.0, 1.0)));\n  } else {\n    // fallback error red\n    vColor.xyz = vec3(1.0, 0.0, 0.0);\n  }\n}\n\nbool isStartCord(float number) {\n  return mod(number, 2.0) < 0.01;\n}\n\nvec2 getCircleCord(float number, float total) {\n    float normalized = 2.0 * PI * number / total;\n    return vec2(cos(normalized), sin(normalized));\n}\n\n// source: http://gamedev.stackexchange.com/a/59808\nvec3 hsv2rgb(vec3 c)\n{\n    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}"},function(e,t){e.exports="uniform float opacity;\nuniform sampler2D noise;\nuniform float noiseStrength;\n\nvarying vec3 vColor;\nvarying float vLinePosition;\n\nvoid main() {\n  gl_FragColor = vec4(vColor, opacity);\n\n  float noise = vec4(texture2D(noise, vec2(vLinePosition * 1024.0, 0.5))).r;\n\n  gl_FragColor.rgb += mix(-noiseStrength/255.0, noiseStrength/255.0, noise);\n}"},,,,function(e,t,n){(e.exports=n(10)(!1)).push([e.i,"canvas {\n    display: block;\n}\nbody {\n    margin: 0;\n}\n\n#render-container {\n  user-select: none;\n  cursor: default;\n}",""])},function(e,t,n){var r=n(11);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(9)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};t.__esModule=!0,n(12);var o=n(7),i=n(6),a=n(0),s=n(5),u=n(4),d=n(2);window.onload=function(){var e=new s;e.showPanel(1),document.body.appendChild(e.dom);var t,n=(r({},t={totalLines:200,multiplier:2,animate:!1,multiplierIncrement:.2,opacity:1,colorMethod:"lengthHue",noiseStrength:.5,antialias:!1,camPosX:0,camPosY:0,camZoom:1,resetCamera:function(){}},{totalLines:25e4,multiplier:1e5,multiplierIncrement:1,opacity:.005,colorMethod:"faded"}),r({},t,{totalLines:10,multiplier:2,multiplierIncrement:.005,colorMethod:"faded"}),r({},t,{totalLines:1e4,opacity:.05}),t),l=function(){var e=new a.WebGLRenderer({antialias:!0});e.setPixelRatio(window.devicePixelRatio),e.setSize(window.innerWidth,window.innerHeight);var t=new a.Scene,n=new a.OrthographicCamera(-1,1,1,-1);n.position.setZ(1),n.lookAt(new a.Vector3(0,0,0));var r=new a.BufferGeometry,s=new a.ShaderMaterial({uniforms:{multiplier:{value:2},total:{value:10},opacity:{value:1},colorMethod:{value:0},noise:{value:function(){for(var e=new Uint8Array(4096),t=0;t<4096;t++)e[t]=255*Math.random()|0;var n=new a.DataTexture(e,1024,1,a.RGBAFormat,a.UnsignedByteType,a.UVMapping,a.RepeatWrapping,a.RepeatWrapping,a.LinearFilter,a.LinearFilter);return n.needsUpdate=!0,n}()},noiseStrength:{value:1}},vertexShader:i,fragmentShader:o,blending:a.AdditiveBlending,depthTest:!1,transparent:!0});s.blending=a.CustomBlending,s.blendEquation=a.AddEquation,s.blendSrc=a.SrcAlphaFactor,s.blendDst=a.OneFactor;var u=new Float32Array(0),d=new a.BufferAttribute(u,3);r.addAttribute("position",d);var l=new Float32Array(0),c=new a.BufferAttribute(l,3);r.addAttribute("color",c);var h=new Float32Array(0),p=new a.BufferAttribute(h,1);r.addAttribute("number",p);var m=new a.LineSegments(r,s);return m.frustumCulled=!1,t.add(m),{renderer:e,scene:t,camera:n,geometry:r,material:s,positionsAttribute:d,colorsAttribute:c,numbersAttribute:p}}(),c=function(e){var t=document.createElement("div");return t.id="render-container",document.body.appendChild(t),t.appendChild(e.domElement),t}(l.renderer),h=new d.RenderController(e,l,n,c);window.addEventListener("resize",function(){return h.requestRender("resize")}),u.initGUI(n,h,c),h.requestRender("init")}}]);