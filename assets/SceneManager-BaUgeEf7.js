import{A as e,C as t,D as n,E as r,F as i,I as a,L as o,M as s,N as c,O as l,P as u,S as d,T as f,_ as p,a as m,b as h,c as ee,d as g,f as te,g as _,h as v,i as ne,j as y,k as b,l as re,m as x,n as S,o as ie,p as C,r as ae,s as oe,t as se,u as ce,v as le,w,x as T,y as ue}from"./three-BsuqX2ys.js";import{t as de}from"./index-BQ6EvE0F.js";var E=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r)),fe=class{camera;state={az:0,el:0,dist:3,target:new a,fov:30};goal={az:0,el:0,dist:3,target:new a,fov:30};initialized=!1;lambda=3.2;constructor(e){this.camera=new f(30,e,.05,40)}setGoal(e){this.goal.az=e.az,this.goal.el=e.el,this.goal.dist=e.dist,this.goal.target.copy(e.target),this.goal.fov=e.fov,this.initialized||=(this.snap(),!0)}snap(){this.state.az=this.goal.az,this.state.el=this.goal.el,this.state.dist=this.goal.dist,this.state.target.copy(this.goal.target),this.state.fov=this.goal.fov,this.apply()}update(e){let t=this.state,n=this.lambda;t.az=E(t.az,this.goal.az,n,e),t.el=E(t.el,this.goal.el,n,e),t.dist=E(t.dist,this.goal.dist,n,e),t.fov=E(t.fov,this.goal.fov,n,e),t.target.x=E(t.target.x,this.goal.target.x,n,e),t.target.y=E(t.target.y,this.goal.target.y,n,e),t.target.z=E(t.target.z,this.goal.target.z,n,e),this.apply()}setAspect(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}fitDistance(e,t){let n=2*Math.atan(Math.tan(T.degToRad(t)/2)*this.camera.aspect);return e/2/Math.tan(n/2)}apply(){let e=this.state,t=this.camera,n=Math.cos(e.el);t.position.set(e.target.x+Math.sin(e.az)*n*e.dist,e.target.y+Math.sin(e.el)*e.dist,e.target.z+Math.cos(e.az)*n*e.dist),Math.abs(t.fov-e.fov)>.001&&(t.fov=e.fov,t.updateProjectionMatrix()),t.lookAt(e.target)}},pe=class{group=new _;key;rim;fill;constructor(e){this.key=new x(`#ffe1bd`,3.2),this.key.position.set(-3.2,4.6,2.6),this.key.castShadow=e,this.key.shadow.mapSize.set(1024,1024),this.key.shadow.camera.left=-2.4,this.key.shadow.camera.right=2.4,this.key.shadow.camera.top=2.6,this.key.shadow.camera.bottom=-2.6,this.key.shadow.camera.near=1,this.key.shadow.camera.far=14,this.key.shadow.radius=5,this.key.shadow.bias=-6e-4,this.key.shadow.normalBias=.02,this.fill=new x(`#c9b6a8`,.35),this.fill.position.set(3.5,1,3),this.rim=new u(`#ffb35c`,22,14,.55,.7,1.4),this.rim.position.set(2.4,2.2,-3.6),this.group.add(this.key,this.fill,this.rim,this.key.target,this.rim.target)}set(e,t){this.key.intensity=3.2*e,this.rim.intensity=22*t}},me=`varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,he=`// Pase final: corrección de color cálida, viñeta y grano de película
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uVignette;
uniform float uGrain;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec4 c = texture2D(tDiffuse, vUv);
  vec3 col = c.rgb;
  // Curva suave: negros profundos y altas cálidas
  col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
  col *= vec3(1.03, 1.0, 0.96);
  float d = distance(vUv, vec2(0.5, 0.52));
  col *= mix(1.0, smoothstep(0.95, 0.25, d), uVignette);
  col += (hash(vUv * 1000.0 + uTime) - 0.5) * uGrain;
  gl_FragColor = vec4(col, c.a);
}
`,ge=class{composer;bloom;grade;constructor(e,t,n,r,a,s=.22){let c=new o(r,a,{type:p,samples:4});this.composer=new oe(e,c),this.composer.addPass(new ie(t,n)),this.bloom=new m(new i(r,a),s,.5,.93),this.composer.addPass(this.bloom),this.composer.addPass(new ne),this.grade=new ee({uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:.85},uGrain:{value:.035}},vertexShader:me,fragmentShader:he}),this.composer.addPass(this.grade)}setSize(e,t,n){this.composer.setPixelRatio(n),this.composer.setSize(e,t)}render(e){this.grade.uniforms.uTime.value=e%100,this.composer.render()}dispose(){this.bloom.dispose(),this.grade.dispose(),this.composer.dispose()}};function _e(e){let t=new ce({antialias:!e,alpha:!1,powerPreference:`high-performance`,stencil:!1});t.outputColorSpace=b,t.toneMapping=4,t.toneMappingExposure=1.08,t.shadowMap.enabled=e,t.shadowMap.type=1,t.setClearColor(`#160d0a`,1);let n=t.domElement;return n.style.display=`block`,n.style.width=`100%`,n.style.height=`100%`,n.setAttribute(`aria-hidden`,`true`),t}var ve=`varying vec2 vUv;
void main() {
  vUv = uv;
  // Quad a pantalla completa en el plano lejano
  gl_Position = vec4(position.xy, 0.99999, 1.0);
}
`,ye=`// Fondo cinematográfico: espresso casi negro, un resplandor dorado arriba a la
// izquierda (como en la fotografía de producto) y humo con domain warping.
uniform float uTime;
uniform float uAspect;
uniform float uWarmth;
uniform vec2 uGlow;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}

void main() {
  vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5);
  vec3 espresso = vec3(0.0075, 0.0042, 0.003);
  vec3 cacao = vec3(0.045, 0.022, 0.013);
  // Domain warping: el humo se pliega sobre sí mismo muy despacio
  vec2 q = vec2(fbm(p * 1.6 + uTime * 0.012), fbm(p * 1.6 + vec2(5.2, 1.3) - uTime * 0.01));
  float smoke = fbm(p * 1.8 + q * 1.6);
  // Resplandor cálido (posición controlada por la escena)
  vec2 g = vec2(uGlow.x * uAspect, uGlow.y);
  float glow = exp(-dot(p - g, p - g) * 3.2);
  // Halo tenue detrás de la pieza
  float halo = exp(-dot(p, p) * 4.0);
  vec3 col = mix(espresso, cacao, halo * 0.55 + smoke * 0.35);
  col += vec3(0.34, 0.2, 0.08) * glow * (0.45 + 0.55 * smoke) * uWarmth;
  // Viñeta de profundidad
  col *= smoothstep(1.25, 0.2, length(p * vec2(0.85, 1.1)));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`,be=class{backdrop;envTarget;constructor(e,n){let a=new re(e),o=new ae;this.envTarget=a.fromScene(o,.035),o.dispose(),a.dispose(),n.environment=this.envTarget.texture,n.environmentIntensity=.38,n.environmentRotation.set(.25,-.8,0),this.backdrop=new t(new r(2,2),new y({vertexShader:ve,fragmentShader:ye,uniforms:{uTime:{value:0},uAspect:{value:1},uWarmth:{value:1},uGlow:{value:new i(-.38,.36)}},depthWrite:!1,depthTest:!1})),this.backdrop.frustumCulled=!1,this.backdrop.renderOrder=-10,n.add(this.backdrop)}update(e,t,n,r){let i=this.backdrop.material.uniforms;i.uTime.value=e,i.uAspect.value=t,i.uWarmth.value=n,i.uGlow.value.x=r}dispose(){this.backdrop.geometry.dispose(),this.backdrop.material.dispose(),this.envTarget.dispose(),this.backdrop.removeFromParent()}},xe=`// Polvo de cacao: deriva orgánica y profundidad de campo simulada.
// Cuanto más lejos del plano de enfoque, más grande y más tenue (bokeh).
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uFocus;
varying float vAlpha;
varying float vSoft;
void main() {
  vec3 p = position;
  float t = uTime * (0.08 + aSeed * 0.06);
  p.x += sin(t + aSeed * 31.0) * 0.25 + uTime * 0.01;
  p.y += sin(t * 0.7 + aSeed * 17.0) * 0.18 - mod(uTime * 0.015 * (0.4 + aSeed), 3.0);
  p.y = mod(p.y + 1.6, 3.2) - 1.6;
  p.z += cos(t * 0.8 + aSeed * 13.0) * 0.2;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float blur = clamp(abs(-mv.z - uFocus) * 0.55, 0.0, 3.0);
  gl_PointSize = uSize * uPixelRatio * (0.35 + aSeed * 0.9) * (1.0 + blur * 2.2) / -mv.z;
  vSoft = blur;
  vAlpha = (0.55 + 0.45 * sin(uTime * (0.5 + aSeed) + aSeed * 40.0)) / (1.0 + blur * 2.5);
}
`,Se=`uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
varying float vSoft;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float edge = mix(0.12, 0.5, clamp(vSoft, 0.0, 1.0));
  float a = smoothstep(0.5, 0.5 - edge, d);
  if (a <= 0.001) discard;
  gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
}
`;function D(e){let t=e>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}var Ce=(e,t,n)=>{let r=Math.sin(e*127.1+t*311.7+n*74.7)*43758.5453;return r-Math.floor(r)},O=e=>e*e*(3-2*e);function we(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=Math.floor(n),o=O(e-r),s=O(t-i),c=O(n-a),l=(e,t,n)=>e+(t-e)*n,u=(e,t,n)=>Ce(r+e,i+t,a+n);return l(l(l(u(0,0,0),u(1,0,0),o),l(u(0,1,0),u(1,1,0),o),s),l(l(u(0,0,1),u(1,0,1),o),l(u(0,1,1),u(1,1,1),o),s),c)}function k(e,t,n){let r=0,i=.5,a=1;for(let o=0;o<3;o++)r+=i*(we(e*a,t*a,n*a)-.5),a*=2.07,i*=.5;return r*1.6}var Te=class{points;constructor(e,t){let r=D(5),i=new Float32Array(e*3),a=new Float32Array(e);for(let t=0;t<e;t++)i[t*3]=(r()-.5)*7,i[t*3+1]=(r()-.5)*3.2,i[t*3+2]=(r()-.5)*5,a[t]=r();let o=new te;o.setAttribute(`position`,new g(i,3)),o.setAttribute(`aSeed`,new g(a,1)),this.points=new n(o,new y({vertexShader:xe,fragmentShader:Se,uniforms:{uTime:{value:0},uPixelRatio:{value:t},uSize:{value:15},uFocus:{value:6},uColor:{value:new C(`#b9875a`)},uOpacity:{value:.5}},transparent:!0,depthWrite:!1,blending:2})),this.points.frustumCulled=!1}update(e,t,n){let r=this.points.material.uniforms;r.uTime.value=e,r.uFocus.value=t,r.uOpacity.value=n*.5}setPixelRatio(e){this.points.material.uniforms.uPixelRatio.value=e}dispose(){this.points.geometry.dispose(),this.points.material.dispose(),this.points.removeFromParent()}},A={high:160,low:84};function j(e,t){return new c(e.map(([e,t])=>new i(e,t))).getSpacedPoints(t).map(e=>new i(Math.max(e.x,0),e.y))}function M(e,t,n){let r=new h(e,t);r.deleteAttribute(`uv`),r.deleteAttribute(`normal`),r=S(r,1e-5);let i=r.attributes.position;for(let e=0;e<i.count;e++){let t=i.getX(e),r=i.getY(e),a=i.getZ(e),o=Math.hypot(t,a);if(o<1e-5)continue;let s=Math.atan2(a,t),c=1+k(Math.cos(s)*n.freq+n.seed,Math.sin(s)*n.freq,r*1.5)*n.radial,l=n.relief?n.relief(o,s,r):0;i.setXYZ(e,t*c,r+l,a*c)}return r.computeVertexNormals(),r}var N=(e,t,n,r,i,a)=>Array.from({length:a+1},(o,s)=>{let c=r+(i-r)*s/a;return[e+Math.cos(c)*n,t+Math.sin(c)*n]});function Ee(e){return M(j([[0,-.39],[.5,-.39],[.76,-.386],...N(.8,-.215,.175,-Math.PI/2+.25,0,7).slice(1),[.99,-.02],[.997,.16],...N(.965,.2,.035,0,Math.PI,6).slice(1),[.93,.12],[.93,-.25],...N(.87,-.26,.06,0,-Math.PI/2,4).slice(1),[.5,-.322],[0,-.32]],90),A[e],{radial:.014,freq:1.6,seed:3.1})}function De(e){return M(j([[0,.47],[.3,.462],[.55,.44],[.75,.405],[.9,.355],[.982,.298],[1.012,.25],[1.006,.222],[.97,.212],[.925,.222],[.9,.265],[.8,.31],[.5,.338],[0,.345]],110),A[e],{radial:.012,freq:1.4,seed:8.7,relief:(e,t,n)=>{if(n<.33)return 0;let r=T.smoothstep(n,.33,.4);return(Math.sin(t*3+e*9.5)*.0055+Math.sin(t*7-e*15)*.002)*r*T.smoothstep(e,.05,.4)}})}function Oe(e){let t=e=>-.035+.022*(1-e/.9)**2+.06*Math.exp(-((e/.16)**2)),n=[];for(let e=0;e<=16;e++){let r=e/16*.84;n.push([r,t(r)])}return n.push(...N(.84,-.09,.055,Math.PI/2-.3,-Math.PI/2,6).slice(1)),n.push([.5,-.2],[0,-.2]),M(j(n,70),A[e],{radial:.012,freq:2.2,seed:1.9,relief:(e,t,n)=>n>-.06?k(Math.cos(t)*e*6,Math.sin(t)*e*6,2.3)*.006:0})}function ke(e){let t=M(j([[0,.082],[.5,.08],[.82,.074],[.9,.05],[.905,.01],[.87,-.02],[.5,-.025],[0,-.025]],60),A[e],{radial:.02,freq:2.6,seed:5.5,relief:(e,t,n)=>n>.06?k(Math.cos(t)*e*3.2+4,Math.sin(t)*e*3.2,.7)*.016:0}),n=D(42),r=[t],i=e===`high`?14:8;for(let e=0;e<i;e++){let t=.05+n()*.1,a=.028+n()*.02,o=j([[0,.02],[a,0],[a*.75,-t*.55],[a*.9,-t*.85],[a*.6,-t],[0,-t-a*.4]],18),s=new h(o,16);s.deleteAttribute(`uv`),s=S(s,1e-5),s.computeVertexNormals();let c=e/i*Math.PI*2+n()*.35,l=new d().makeTranslation(Math.cos(c)*.885,0,Math.sin(c)*.885);s.applyMatrix4(l),r.push(s)}return se(r,!1)??t}function Ae(e){return M(j([[0,-.195],[.6,-.2],[.86,-.21],[.9,-.24],[.89,-.3],[.85,-.318],[0,-.318]],50),A[e],{radial:.03,freq:5,seed:2.2,relief:(e,t,n)=>n>-.23?k(Math.cos(t)*e*14,Math.sin(t)*e*14,9.1)*.022:0})}function P(e,t){let n=new s(1,e,t);return n.deleteAttribute(`uv`),n.deleteAttribute(`normal`),n=S(n,1e-5),n}function F(e,t){let n=e.attributes.position,r=new a;for(let e=0;e<n.count;e++)r.fromBufferAttribute(n,e),t(r),n.setXYZ(e,r.x,r.y,r.z);return e.computeVertexNormals(),e}function I(){return F(P(28,18),e=>{let{x:t,z:n}=e,{y:r}=e;r<0&&(r*=.18);let i=1-.12*Math.max(t,0),a=-.12*(1-t*t),o=r<.05&&t>.6?-.05*Math.exp(-((t-.85)**2)*40)*Math.exp(-n*n*20):0,s=k(t*3+1,r*3,n*3)*.07;e.set(t*.105*(1+s),(r+o)*.074*(1+s),(n+a)*.064*i*(1+s))})}function je(){let e=new le(1,1);return e.deleteAttribute(`uv`),e.deleteAttribute(`normal`),e=S(e,1e-5),e=F(e,e=>{let t=.7+k(e.x*1.7+3,e.y*1.7,e.z*1.7)*.9;e.multiplyScalar(t),e.y*=.7}),e.toNonIndexed()}function Me(){return F(P(24,12),e=>{let t=1-.35*Math.max(e.x,0)**2;e.set(e.x*.11,e.y*.016*(1-e.x*e.x*.3),e.z*.062*t)})}function L(){return F(P(24,16),e=>{let t=e.y>0?1+.18*e.y*e.y:1,n=e.y<-.6?.85:1,r=k(e.x*2.5,e.y*2.5,e.z*2.5)*.06;e.set(e.x*.07*(1+r),e.y*.068*t*n,e.z*.07*(1+r))})}var Ne=`// Ruido simplex 3D — Ian McEwan, Ashima Arts (licencia MIT)
// https://github.com/ashima/webgl-noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`,Pe=`// Utilidades de superficie compartidas por chocolate, caramelo, praliné y maní.
// Requiere noise.glsl (snoise). Todo se evalúa en espacio de objeto, así el
// patrón viaja con cada capa cuando el bombón se despieza.

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = p * 2.02 + vec3(17.3, 9.1, 4.7);
    a *= 0.5;
  }
  return v;
}

// Domain warping (Quílez): ondulaciones orgánicas para el caramelo y el humo
float warped(vec3 p, float t) {
  vec3 q = vec3(fbm(p + vec3(0.0, t, 0.0)), fbm(p + vec3(5.2, 1.3 - t * 0.7, 2.8)), 0.0);
  return fbm(p + 1.7 * q);
}

// Relieve sin mapas: perturba la normal con las derivadas de una altura
// procedural (mismo método que perturbNormalArb de three.js)
vec3 bumpNormal(vec3 n, vec3 viewPos, float h) {
  vec3 dpdx = dFdx(-viewPos);
  vec3 dpdy = dFdy(-viewPos);
  float dhdx = dFdx(h);
  float dhdy = dFdy(h);
  vec3 r1 = cross(dpdy, n);
  vec3 r2 = cross(n, dpdx);
  float det = dot(dpdx, r1);
  vec3 grad = sign(det) * (dhdx * r1 + dhdy * r2);
  return normalize(abs(det) * n - grad);
}
`,R={uTime:{value:0}};function z(e,t,n,r){return e.userData.uniforms=n,e.onBeforeCompile=e=>{Object.assign(e.uniforms,n,R),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vObjPos;
uniform float uTime;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>\nvObjPos = position;\n${r.vertex??``}`);let t=Object.keys(n).map(e=>{let t=n[e].value;return`uniform ${t instanceof C||t instanceof a?`vec3`:`float`} ${e};`}).join(`
`);e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nvarying vec3 vObjPos;\nuniform float uTime;\n${t}\n${Ne}\n${Pe}`).replace(`void main() {`,`void main() {\n${r.mainStart??``}`).replace(`#include <color_fragment>`,`#include <color_fragment>\n${r.color??``}`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>\n${r.roughness??``}`).replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>\n${r.metalness??``}`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>\n${r.normal??``}`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>\n${r.emissive??``}`)},e.customProgramCacheKey=()=>t,e}function B(e){return z(new w({color:e.color,roughness:.24,metalness:0,clearcoat:.85,clearcoatRoughness:.1,sheen:.12,sheenRoughness:.5,sheenColor:new C(`#6b3a24`),side:2}),`chocolate-${e.gold>0}-${e.detail}`,{uGold:{value:e.gold}},{mainStart:`float gold = 0.0;`,color:`
      float tone = fbm(vObjPos * 2.2);
      diffuseColor.rgb *= 0.94 + 0.1 * tone;
      // Bloom de grasa del cacao: veladura clara muy tenue en zonas sueltas
      float bloom = smoothstep(0.55, 0.85, fbm(vObjPos * 5.0 + 3.1));
      diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.35 + 0.012, bloom * 0.18);
      // Polvo de oro: motas solo sobre la cara superior de la cobertura
      float top = smoothstep(0.38, 0.45, vObjPos.y);
      float speck = smoothstep(0.55, 0.62, snoise(vObjPos * vec3(22.0, 40.0, 22.0))) * smoothstep(0.25, 0.45, fbm(vObjPos * 2.2 + 7.0));
      gold = uGold * top * speck;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.78, 0.55, 0.22), gold);
    `,roughness:`
      roughnessFactor *= mix(0.8, 1.25, fbm(vObjPos * 4.0 + 1.0) * 0.5 + 0.5);
      roughnessFactor = mix(roughnessFactor, 0.28, gold);
    `,metalness:`metalnessFactor = mix(metalnessFactor, 1.0, gold);`,normal:e.detail?`
      float h = fbm(vObjPos * 9.0) * 0.0018 + fbm(vObjPos * 24.0) * 0.0004;
      normal = bumpNormal(normal, vViewPosition, h);
    `:``})}function Fe(e){return z(new w({color:`#c08a52`,roughness:.66,sheen:.6,sheenRoughness:.6,sheenColor:new C(`#f1d3a4`),side:2}),`praline-${e}`,{},{color:`
      float t = fbm(vObjPos * 3.0);
      diffuseColor.rgb *= 0.92 + 0.14 * t;
      float bits = smoothstep(0.55, 0.7, snoise(vObjPos * 34.0));
      float sugar = smoothstep(0.72, 0.8, snoise(vObjPos * 55.0 + 4.0));
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.5, 0.29, 0.13), bits * 0.55);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.93, 0.82, 0.63), sugar * 0.5);
    `,roughness:`roughnessFactor *= 0.85 + 0.3 * (fbm(vObjPos * 9.0) * 0.5 + 0.5);`,normal:e?`normal = bumpNormal(normal, vViewPosition, snoise(vObjPos * 34.0) * 0.0012 + fbm(vObjPos * 12.0) * 0.002);`:``})}function Ie(e){return z(new w({color:`#9c6a3a`,roughness:.88,side:2}),`crunch-${e}`,{},{color:`
      float g = snoise(vObjPos * 40.0) * 0.5 + 0.5;
      diffuseColor.rgb *= 0.7 + 0.5 * g;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.24, 0.12, 0.06), smoothstep(0.7, 0.85, snoise(vObjPos * 22.0 + 2.0)) * 0.6);
    `,normal:e?`normal = bumpNormal(normal, vViewPosition, snoise(vObjPos * 40.0) * 0.004);`:``})}function V(e){return z(new w({color:`#c98d4c`,roughness:.6,sheen:.35,sheenRoughness:.4,sheenColor:new C(`#ffe2b0`)}),`peanut-${e}`,{},{color:`
      // Manchas de tueste en el lomo, cara plana más clara
      float roast = smoothstep(0.1, 0.7, fbm(vObjPos * 18.0 + 3.0)) * smoothstep(-0.01, 0.03, vObjPos.y);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.2, 0.07), roast * 0.7);
      diffuseColor.rgb *= 0.92 + 0.12 * snoise(vObjPos * 60.0);
    `,roughness:`roughnessFactor *= 0.8 + 0.4 * (snoise(vObjPos * 30.0) * 0.5 + 0.5);`,normal:e?`normal = bumpNormal(normal, vViewPosition, fbm(vObjPos * 50.0) * 0.0012);`:``})}function Le(e){return z(new w({color:`#c58b45`,roughness:.14,clearcoat:1,clearcoatRoughness:.06,ior:1.48,specularIntensity:1,side:2}),`caramel-${e}`,{uFlow:{value:0}},{vertex:`
        float topMask = smoothstep(0.05, 0.075, position.y);
        float wave = sin(position.x * 7.0 + uTime * 0.9) * cos(position.z * 6.0 - uTime * 0.7);
        transformed.y += wave * 0.004 * topMask;
      `,mainStart:`float flowT = uTime * (0.05 + uFlow * 0.07);`,color:`
        float w = warped(vObjPos * 1.25, flowT);
        vec3 deep = vec3(0.14, 0.04, 0.006);
        vec3 amber = vec3(0.4, 0.15, 0.025);
        vec3 light = vec3(0.72, 0.36, 0.08);
        vec3 c = mix(deep, amber, smoothstep(-0.7, 0.05, w));
        c = mix(c, light, smoothstep(0.35, 0.85, w) * 0.3);
        diffuseColor.rgb = c;
      `,roughness:`roughnessFactor *= 0.8 + 0.5 * smoothstep(-0.2, 0.6, fbm(vObjPos * 6.0));`,normal:e?`
        float hh = warped(vObjPos * 5.0, flowT * 1.6) * 0.0022;
        normal = bumpNormal(normal, vViewPosition, hh);
      `:``,emissive:`
        float rim = pow(1.0 - abs(dot(normalize(vViewPosition), normal)), 2.0);
        totalEmissiveRadiance += vec3(0.55, 0.24, 0.05) * (0.02 + 0.12 * rim) * (0.7 + 0.3 * uFlow);
      `})}var H={shell:`#2b1610`,gold:1,topping:`none`};function U(e,n){let r=new t(e,n);return r.castShadow=!0,r.receiveShadow=!0,r}function W(e,t,n,r){let a=D(r),o=[],s=0;for(;o.length<e&&s<e*400;){s++;let e=a()*Math.PI*2,r=Math.sqrt(a())*t,c=new i(Math.cos(e)*r,Math.sin(e)*r);o.every(e=>e.distanceTo(c)>=n)&&o.push(c)}return o}function G(e,t,n){let r=new ue(e,t,n.length);r.castShadow=!0,r.receiveShadow=!0;let i=[];return n.forEach((e,t)=>{let n=new d().compose(e.pos,new l().setFromEuler(e.rot),e.scale);i.push(n),r.setMatrixAt(t,n),r.setColorAt(t,e.tint)}),r.instanceMatrix.needsUpdate=!0,{mesh:r,base:i,dirs:n.map(e=>e.dir),spins:n.map(e=>e.spin)}}var K=e=>new C().setHSL(.085,.25,.78+e()*.22);function Re(e,t=H){let n=e===`high`,r=[];{let i=De(e),o=B({color:t.shell,gold:t.gold,detail:n}),s=new _;s.add(U(i,o));let c={id:`shell`,group:s,materials:[o],geometries:[i]};if(t.topping!==`none`){let e=t.topping===`almond`?Me():L(),r=V(n),i=D(t.topping===`almond`?77:99),o=t.topping===`almond`?W(14,.55,.15,5):W(7,.42,.2,8),u=e=>.47-.115*e*e,d=G(e,r,o.map(e=>({pos:new a(e.x,u(e.length())+(t.topping===`almond`?.01+i()*.012:.07),e.y),rot:new v((i()-.5)*.5,i()*Math.PI*2,(i()-.5)*.5),scale:new a().setScalar(t.topping===`almond`?1:1.35),tint:K(i),dir:new a,spin:new l})));s.add(d.mesh),c.materials.push(r),c.geometries.push(e)}r.push(c)}{let t=I(),i=V(n),o=D(11),s=G(t,i,W(e===`high`?30:22,.76,.165,3).map((e,t)=>{let n=t%7==3,r=new a(e.x,0,e.y).normalize().multiplyScalar(.28+o()*.34);r.y=(o()-.35)*.32;let i=new l().setFromEuler(new v((o()-.5)*1.6,(o()-.5)*1.2,(o()-.5)*1.6));return{pos:new a(e.x,.093+(n?.04:0),e.y),rot:new v((o()-.5)*(n?.7:.22),o()*Math.PI*2,(o()-.5)*(n?.7:.22)),scale:new a().setScalar(.9+o()*.22),tint:K(o),dir:r,spin:i}})),c=new _;c.add(s.mesh),r.push({id:`peanuts`,group:c,materials:[i],geometries:[t],fragments:s})}{let t=ke(e),i=Le(n),a=new _;a.add(U(t,i)),r.push({id:`caramel`,group:a,materials:[i],geometries:[t]})}{let t=Oe(e),i=Fe(n),a=new _;a.add(U(t,i)),r.push({id:`praline`,group:a,materials:[i],geometries:[t]})}{let t=Ae(e),i=Ie(n),o=je(),s=V(!1),c=D(23),u=G(o,s,W(e===`high`?150:70,.84,.045,13).map(e=>{let t=.014+c()*.024;return{pos:new a(e.x,-.198+t*.3,e.y),rot:new v(c()*3,c()*3,c()*3),scale:new a(t,t,t),tint:new C().setHSL(.08,.35,.45+c()*.35),dir:new a,spin:new l}})),d=I(),f=D(31),p=G(d,s,W(7,.7,.3,21).map(e=>({pos:new a(e.x,-.19,e.y),rot:new v((f()-.5)*.5,f()*6,(f()-.5)*.5),scale:new a().setScalar(.75),tint:K(f),dir:new a,spin:new l}))),m=new _;m.add(U(t,i),u.mesh,p.mesh),r.push({id:`crunch`,group:m,materials:[i,s],geometries:[t,o,d]})}{let i=Ee(e),a=B({color:t.shell,gold:0,detail:n}),o=new _;o.add(U(i,a)),r.push({id:`base`,group:o,materials:[a],geometries:[i]})}return r}var ze=class{root=new _;layers;tmpQ=new l;tmpM=new d;tmpP=new a;tmpS=new a;tmpR=new l;constructor(e,t=H){this.layers=new Map(Re(e,t).map(e=>[e.id,e]));for(let e of this.layers.values())this.root.add(e.group)}apply(e,t,n){for(let[t,n]of this.layers){let r=e.layers[t];n.group.position.y=r.lift,n.group.rotation.set(r.tilt,r.rotY,0),n.group.scale.setScalar(r.scale);let i=n.fragments;i&&this.spreadFragments(i,r.spread)}let r=n?e.float:0;this.root.position.y=Math.sin(t*.8)*.045*r,this.root.rotation.z=Math.sin(t*.5)*.025*r,this.root.rotation.x=Math.cos(t*.43)*.02*r}spreadFragments(e,t){let{mesh:n,base:r,dirs:i,spins:a}=e;for(let e=0;e<r.length;e++)r[e].decompose(this.tmpP,this.tmpR,this.tmpS),this.tmpP.addScaledVector(i[e],t),this.tmpQ.identity().slerp(a[e],t),this.tmpR.premultiply(this.tmpQ),this.tmpM.compose(this.tmpP,this.tmpR,this.tmpS),n.setMatrixAt(e,this.tmpM);n.instanceMatrix.needsUpdate=!0}dispose(){for(let e of this.layers.values())e.geometries.forEach(e=>e.dispose()),e.materials.forEach(e=>e.dispose()),e.fragments?.mesh.dispose();this.root.removeFromParent()}},q=e=>Math.min(Math.max(e,0),1),J=e=>e*e*e*(e*(e*6-15)+10),Y=(e,t,n)=>J(q((e-t)/(n-t))),X=(e,t,n)=>e+(t-e)*n,Z={shell:[.14,.25,.77,.85],peanuts:[.28,.38,.75,.83],caramel:[.42,.52,.73,.81],praline:[.56,.64,.71,.79],crunch:[.57,.65,.7,.78],base:[.58,.66,.69,.77]},Be={shell:1.15,peanuts:.78,caramel:.46,praline:.02,crunch:-.34,base:-.74},Ve={shell:.55,peanuts:-.35,caramel:.3,praline:-.2,crunch:.25,base:-.3},He={shell:.16,peanuts:.05,caramel:.08,praline:.06,crunch:.05,base:.04},Q=[{p:0,cam:{az:.55,el:.3,dist:7,target:[-1.45,.02,0],fov:30}},{p:.1,cam:{az:.62,el:.34,dist:6.3,target:[-.95,.05,0],fov:30}},{p:.2,cam:{az:.78,el:.42,dist:6.6,target:[-.78,.62,0],fov:30}},{p:.34,cam:{az:.98,el:.36,dist:6.9,target:[-.7,.72,0],fov:30}},{p:.48,cam:{az:.6,el:.28,dist:6.4,target:[-.6,.62,0],fov:30}},{p:.62,cam:{az:.38,el:.16,dist:7,target:[-.66,.3,0],fov:30}},{p:.69,cam:{az:.36,el:.2,dist:7,target:[-.6,.2,0],fov:30}},{p:.86,cam:{az:.36,el:.3,dist:6.6,target:[-.3,0,0],fov:30}},{p:1,cam:{az:.42,el:.36,dist:7.4,target:[0,-.78,0],fov:30}}];function Ue(e){let t=0;for(;t<Q.length-2&&e>Q[t+1].p;)t++;let n=Q[t],r=Q[t+1],i=J(q((e-n.p)/(r.p-n.p)));return{az:X(n.cam.az,r.cam.az,i),el:X(n.cam.el,r.cam.el,i),dist:X(n.cam.dist,r.cam.dist,i),target:[X(n.cam.target[0],r.cam.target[0],i),X(n.cam.target[1],r.cam.target[1],i),X(n.cam.target[2],r.cam.target[2],i)],fov:X(n.cam.fov,r.cam.fov,i)}}function $(e){let t=q(e),n=Object.keys(Z),r={},i=0;for(let e of n){let[n,a,o,s]=Z[e],c=Y(t,n,a)*(1-Y(t,o,s));i=Math.max(i,c);let l=e===`shell`?.2*Y(t,.28,.38)*(1-Y(t,.75,.83)):0;r[e]={lift:Be[e]*c+l,rotY:Ve[e]*c,tilt:He[e]*c,scale:1,spread:e===`peanuts`?Y(t,.31,.41)*(1-Y(t,.74,.8)):0}}let a=Ue(t);a.az+=Math.PI*2*Y(t,.69,.86);let o=Y(t,.4,.47)*(1-Y(t,.57,.63));return{chapter:de(t).id,layers:r,camera:a,key:1+.15*Y(t,.86,.95),rim:1+.6*o+.3*Y(t,.86,.95),focusDepth:a.dist,caramelFlow:o,dust:.85-.35*i,float:1-i,exploded:i,heroWeight:1-Y(t,.005,.06),desireWeight:Y(t,.85,.93)}}var We=class{host;options;callbacks;renderer;scene=new e;rig;lighting;env;particles;model;composer=null;resizeObserver;state=$(0);chapter=null;time=0;pointer=new i;pointerSmooth=new i;width=1;height=1;dpr;maxDpr;frameTimes=[];lost=!1;target=new a;constructor(e,t,n={}){this.host=e,this.options=t,this.callbacks=n;let r=t.quality===`high`;this.maxDpr=Math.min(window.devicePixelRatio||1,r?2:1.5),this.dpr=this.maxDpr,this.renderer=_e(r),this.renderer.setPixelRatio(this.dpr),e.appendChild(this.renderer.domElement),this.rig=new fe(1),this.lighting=new pe(r),this.scene.add(this.lighting.group),this.env=new be(this.renderer,this.scene),t.studio&&(this.env.backdrop.visible=!1),this.particles=t.studio?null:new Te(r?520:160,this.dpr),this.particles&&this.scene.add(this.particles.points),this.model=new ze(t.quality,t.variant),this.scene.add(this.model.root),this.resize(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),window.addEventListener(`pointermove`,this.onPointer,{passive:!0});let i=this.renderer.domElement;i.addEventListener(`webglcontextlost`,this.onLost),i.addEventListener(`webglcontextrestored`,this.onRestored),this.setProgress(0),this.rig.snap(),this.renderFrame()}setProgress(e){this.state=$(e),this.state.chapter!==this.chapter&&(this.chapter=this.state.chapter,this.callbacks.onChapter?.(this.chapter))}get canvas(){return this.renderer.domElement}tick(e){if(this.lost)return;let t=Math.min(e,1/20);this.options.reducedMotion||(this.time+=t),R.uTime.value=this.time,this.applyState(t),this.renderFrame(),this.adaptResolution(e)}applyState(e){let t=this.state,n=!this.options.reducedMotion;this.model.apply(t,this.time,n),this.lighting.set(t.key,t.rim),this.setCaramelFlow(t.caramelFlow);let r=this.width/this.height,i=t.camera,a=T.clamp((r-.95)/.6,0,1);this.target.set(i.target[0]*a,i.target[1],i.target[2]);let o=i.dist;if(r<1){o*=T.clamp(.78/r,1,1.85);let e=Math.max(t.heroWeight,t.desireWeight);this.target.y+=-.42*e+.5*(1-e)}let s=1-Math.exp(-e*3);this.pointerSmooth.lerp(this.pointer,n?s:1),this.rig.setGoal({az:i.az+this.pointerSmooth.x*.07,el:i.el+this.pointerSmooth.y*.045,dist:o,target:this.target,fov:i.fov}),n?this.rig.update(e):this.rig.snap(),this.env.update(this.time,r,.85+.25*t.rim,r<1?-.1:-.38),this.particles?.update(this.time,t.focusDepth,t.dust)}setCaramelFlow(e){let t=this.model.layers.get(`caramel`)?.materials[0]?.userData;t?.uniforms?.uFlow&&(t.uniforms.uFlow.value=e)}renderFrame(){this.composer?this.composer.render(this.time):this.renderer.render(this.scene,this.rig.camera)}adaptResolution(e){if(this.frameTimes.push(e),this.frameTimes.length<90)return;let t=this.frameTimes.reduce((e,t)=>e+t,0)/this.frameTimes.length;this.frameTimes=[];let n=this.options.quality===`high`?1:.75;t>1/45&&this.dpr>n?this.setDpr(Math.max(n,this.dpr-.25)):t<1/58&&this.dpr<this.maxDpr&&this.setDpr(Math.min(this.maxDpr,this.dpr+.25))}setDpr(e){this.dpr=e,this.renderer.setPixelRatio(e),this.particles?.setPixelRatio(e),this.resize()}resize(){let e=Math.max(this.host.clientWidth,1),t=Math.max(this.host.clientHeight,1);this.width=e,this.height=t,this.renderer.setSize(e,t,!1),this.rig.setAspect(e/t),this.options.quality===`high`&&(this.composer||=new ge(this.renderer,this.scene,this.rig.camera,e,t,.18),this.composer.setSize(e,t,this.dpr))}onPointer=e=>{e.pointerType===`mouse`&&this.pointer.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight*2-1))};onLost=e=>{e.preventDefault(),this.lost=!0,this.callbacks.onLost?.()};onRestored=()=>{this.lost=!1,this.callbacks.onRestored?.()};setStudioOrbit(e,t,n,r=0){this.rig.setGoal({az:e,el:t,dist:n,target:new a(0,r,0),fov:30}),this.rig.snap()}renderStudio(){R.uTime.value=this.time,this.model.apply(this.state,0,!1),this.renderFrame()}dispose(){this.resizeObserver.disconnect(),window.removeEventListener(`pointermove`,this.onPointer);let e=this.renderer.domElement;e.removeEventListener(`webglcontextlost`,this.onLost),e.removeEventListener(`webglcontextrestored`,this.onRestored),this.model.dispose(),this.particles?.dispose(),this.env.dispose(),this.composer?.dispose(),this.scene.environment=null,this.renderer.dispose(),this.renderer.forceContextLoss(),e.remove()}};export{We as SceneManager};