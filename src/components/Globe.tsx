import { useEffect, useRef } from "react";
import * as THREE from "three";
import { asset } from "../utils/asset";

interface GlobeProps {
  size?: number;
  onMarkerClick?: (id: string) => void;
  // Nome exibido ao lado de cada pin, por id do marcador
  labels?: Record<string, string>;
}

// Em ordem cronológica: os arcos ligam um país ao seguinte
const MARKERS = [
  { id: "brazil", lat: -27.59, lng: -48.55 },
  { id: "portugal", lat: 38.72, lng: -9.14 },
  { id: "germany", lat: 50.78, lng: 6.08 },
];

// Quanto os continentes sobem acima da água, e onde ficam pins e arcos (em cima da terra)
const LAND_HEIGHT = 0.035;
const SURFACE = 1 + LAND_HEIGHT + 0.006;

// Convert lat/lng to 3D point on sphere; writes into `out` to avoid allocations
function latLngToVec3(lat: number, lng: number, radius: number, out: THREE.Vector3): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return out.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Brilho azul em volta do planeta (fresnel na face de trás de uma esfera maior)
const atmosphereMaterial = () =>
  new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        gl_FragColor = vec4(0.35, 0.6, 1.0, 1.0) * intensity;
      }`,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });

const Globe = ({ size = 600, onMarkerClick, labels }: GlobeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoveringPin = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Clean any leftover canvas from strict mode re-mount
    while (container.firstChild) container.removeChild(container.firstChild);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Luz de estúdio: céu claro por cima, sol de cima/esquerda para marcar o relevo
    scene.add(new THREE.HemisphereLight(0xcfe6ff, 0x1b2a44, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(-4, 3, 4);
    scene.add(sun);

    // tilt (eixo X) contém spin (eixo Y): arrastar fica natural e sem eixos estranhos
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    tilt.add(spin);
    scene.add(tilt);
    tilt.rotation.x = 0.25;
    spin.rotation.y = -1.22; // começa com a rota inteira (Brasil → Europa) de frente

    // Visual de massinha/plástico: continentes em relevo saindo da água + brilho de verniz
    const geometry = new THREE.SphereGeometry(1, 512, 256);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x2268d6,
      roughness: 0.5,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
    });
    spin.add(new THREE.Mesh(geometry, material));

    let disposed = false;
    const heightImage = new Image();
    heightImage.onload = () => {
      if (disposed) return;
      raiseContinents(geometry, heightImage, LAND_HEIGHT);
      requestRender();
    };
    heightImage.src = asset("images/globe/earth-height-hd.png");

    // Texturas HD: cor 4096 px e mapa de normais (luz fina nas bordas dos continentes)
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const loader = new THREE.TextureLoader();
    let texture: THREE.Texture | null = null;
    let normalTexture: THREE.Texture | null = null;
    loader.load(asset("images/globe/earth-clay-hd.webp"), (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso;
      texture = tex;
      material.map = tex;
      material.color.set(0xffffff);
      material.needsUpdate = true;
      requestRender();
    });
    loader.load(asset("images/globe/earth-normal-hd.webp"), (tex) => {
      tex.anisotropy = maxAniso;
      normalTexture = tex;
      material.normalMap = tex;
      material.normalScale.set(0.6, 0.6);
      material.needsUpdate = true;
      requestRender();
    });

    const atmoGeometry = new THREE.SphereGeometry(1.16, 64, 64);
    const atmoMaterial = atmosphereMaterial();
    scene.add(new THREE.Mesh(atmoGeometry, atmoMaterial));

    // Arcos da trajetória, com um ponto de luz viajando por cada um
    const arcGeometries: THREE.BufferGeometry[] = [];
    const arcMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });
    const travelerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const travelerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const travelers: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; offset: number }[] = [];
    for (let i = 0; i < MARKERS.length - 1; i++) {
      const a = latLngToVec3(MARKERS[i].lat, MARKERS[i].lng, SURFACE, new THREE.Vector3());
      const b = latLngToVec3(MARKERS[i + 1].lat, MARKERS[i + 1].lng, SURFACE, new THREE.Vector3());
      const mid = a.clone().add(b).normalize().multiplyScalar(SURFACE + a.distanceTo(b) * 0.32);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const arcGeometry = new THREE.TubeGeometry(curve, 80, 0.0045, 8);
      arcGeometries.push(arcGeometry);
      spin.add(new THREE.Mesh(arcGeometry, arcMaterial));
      const mesh = new THREE.Mesh(travelerGeometry, travelerMaterial);
      spin.add(mesh);
      travelers.push({ mesh, curve, offset: i * 0.5 });
    }

    // Arrasto com inércia; volta a girar sozinho depois de um tempo parado
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let lastInteraction = -Infinity;
    const AUTO_SPEED = 0.0012;

    const canvas = renderer.domElement;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = velY = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
      requestRender();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      velX = (e.clientX - prevX) * 0.005;
      velY = (e.clientY - prevY) * 0.005;
      prevX = e.clientX;
      prevY = e.clientY;
      spin.rotation.y += velX;
      tilt.rotation.x = THREE.MathUtils.clamp(tilt.rotation.x + velY, -0.9, 0.9);
      lastInteraction = performance.now();
      requestRender();
    };
    const onPointerUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
      lastInteraction = performance.now();
    };

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    // Posiciona os pins direto no DOM (sem re-render do React a cada quadro)
    const worldPos = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const placePins = () => {
      spin.updateMatrixWorld(true);
      MARKERS.forEach((m, i) => {
        const el = pinRefs.current[i];
        if (!el) return;
        latLngToVec3(m.lat, m.lng, SURFACE, worldPos).applyMatrix4(spin.matrixWorld);
        normal.copy(worldPos).normalize();
        toCamera.copy(camera.position).sub(worldPos).normalize();
        const facing = normal.dot(toCamera);
        worldPos.project(camera);
        const x = (worldPos.x * 0.5 + 0.5) * size;
        const y = (-worldPos.y * 0.5 + 0.5) * size;
        const visible = facing > 0.2;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.opacity = visible ? String(Math.min(1, (facing - 0.2) * 4)) : "0";
        el.style.pointerEvents = visible ? "auto" : "none";
      });
    };

    // Só anima quando o globo está na tela e a aba está visível
    let frame = 0;
    let running = false;
    let inView = false;
    let needsRender = true;
    function requestRender() {
      needsRender = true;
    }

    const tick = (now: number) => {
      const idle = !dragging && !hoveringPin.current && now - lastInteraction > 2500;
      if (!dragging && (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001)) {
        spin.rotation.y += velX;
        tilt.rotation.x = THREE.MathUtils.clamp(tilt.rotation.x + velY, -0.9, 0.9);
        velX *= 0.94;
        velY *= 0.94;
        needsRender = true;
      } else if (idle && !reduceMotion) {
        spin.rotation.y += AUTO_SPEED;
        needsRender = true;
      }
      if (!reduceMotion) {
        const t = now * 0.00018;
        travelers.forEach(({ mesh, curve, offset }) => {
          mesh.position.copy(curve.getPoint((t + offset) % 1));
        });
        needsRender = true;
      }
      if (needsRender) {
        renderer.render(scene, camera);
        placePins();
        needsRender = false;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(container);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Primeiro quadro imediato, para os pins já nascerem no lugar
    renderer.render(scene, camera);
    placePins();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      disposed = true;
      [geometry, atmoGeometry, travelerGeometry, ...arcGeometries].forEach((g) => g.dispose());
      [material, atmoMaterial, arcMaterial, travelerMaterial].forEach((m) => m.dispose());
      texture?.dispose();
      normalTexture?.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [size]);

  return (
    <div className="globe" style={{ width: size, height: size }}>
      <div ref={mountRef} />
      {MARKERS.map((m, i) => (
        <button
          key={m.id}
          ref={(el) => { pinRefs.current[i] = el; }}
          className="globe-pin"
          style={{ opacity: 0 }}
          onClick={() => onMarkerClick?.(m.id)}
          onPointerEnter={() => { hoveringPin.current = true; }}
          onPointerLeave={() => { hoveringPin.current = false; }}
          aria-label={labels?.[m.id] ?? m.id}
        >
          <span className="globe-pin__dot" />
          {labels?.[m.id] && <span className="globe-pin__label">{labels[m.id]}</span>}
        </button>
      ))}
    </div>
  );
};

// Empurra cada vértice para fora conforme o mapa de altura (terra alta, mar baixo)
function raiseContinents(geometry: THREE.SphereGeometry, image: HTMLImageElement, amount: number) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(image, 0, 0);
  const { data, width, height } = ctx.getImageData(0, 0, image.width, image.height);
  const sample = (x: number, y: number) => data[(y * width + x) * 4] / 255;

  const pos = geometry.attributes.position as THREE.BufferAttribute;
  const uv = geometry.attributes.uv as THREE.BufferAttribute;
  const dir = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    // Leitura bilinear para o relevo ficar liso
    const fx = uv.getX(i) * (width - 1);
    const fy = (1 - uv.getY(i)) * (height - 1);
    const x0 = Math.floor(fx), y0 = Math.floor(fy);
    const x1 = Math.min(x0 + 1, width - 1), y1 = Math.min(y0 + 1, height - 1);
    const tx = fx - x0, ty = fy - y0;
    const h =
      (sample(x0, y0) * (1 - tx) + sample(x1, y0) * tx) * (1 - ty) +
      (sample(x0, y1) * (1 - tx) + sample(x1, y1) * tx) * ty;
    dir.fromBufferAttribute(pos, i).normalize().multiplyScalar(1 + h * amount);
    pos.setXYZ(i, dir.x, dir.y, dir.z);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();

  // A esfera tem vértices duplicados na costura: unifica as normais para não aparecer uma linha
  const normals = geometry.attributes.normal as THREE.BufferAttribute;
  const groups = new Map<string, number[]>();
  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(4)},${pos.getY(i).toFixed(4)},${pos.getZ(i).toFixed(4)}`;
    const list = groups.get(key);
    if (list) list.push(i);
    else groups.set(key, [i]);
  }
  const n = new THREE.Vector3();
  groups.forEach((ids) => {
    if (ids.length < 2) return;
    n.set(0, 0, 0);
    ids.forEach((i) => n.add(dir.fromBufferAttribute(normals, i)));
    n.normalize();
    ids.forEach((i) => normals.setXYZ(i, n.x, n.y, n.z));
  });
  normals.needsUpdate = true;
  geometry.computeBoundingSphere();
}

export default Globe;
