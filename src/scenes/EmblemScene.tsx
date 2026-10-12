import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Float } from "@react-three/drei";
import { Shape, ExtrudeGeometry, MathUtils, type Group } from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";
const polygons = [
  [
    [-1.65, 0.48],
    [-0.66, 0.48],
    [-0.66, 0.22],
    [-1.01, 0.22],
    [-1.01, -0.48],
    [-1.3, -0.48],
    [-1.3, 0.22],
    [-1.65, 0.22],
  ],
  [
    [-0.5, 0.48],
    [0.34, 0.48],
    [0.34, 0.22],
    [-0.2, 0.22],
    [-0.2, -0.22],
    [0.34, -0.22],
    [0.34, -0.48],
    [-0.5, -0.48],
  ],
  [
    [0.5, -0.48],
    [0.5, 0.48],
    [0.78, 0.48],
    [1.19, -0.05],
    [1.19, 0.48],
    [1.48, 0.48],
    [1.48, -0.48],
    [1.2, -0.48],
    [0.79, 0.06],
    [0.79, -0.48],
  ],
];
function Letter({ points }: { points: number[][] }) {
  const [geometry] = useState(() => {
    const shape = new Shape();
    points.forEach(([x, y], index) =>
      index ? shape.lineTo(x, y) : shape.moveTo(x, y),
    );
    shape.closePath();
    return new ExtrudeGeometry(shape, {
      depth: 0.13,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 2,
      steps: 1,
    });
  });
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#c0c7d4" metalness={0.85} roughness={0.27} />
    </mesh>
  );
}
function ContextLifecycle() {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => event.preventDefault();
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl]);
  return null;
}
function Emblem({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.18 - 0.1,
      3,
      delta,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.12,
      3,
      delta,
    );
    group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.05;
  });
  return (
    <Float
      enabled={!reduced}
      speed={0.8}
      rotationIntensity={0.08}
      floatIntensity={0.2}
    >
      <group ref={group} rotation={[0.04, -0.1, -0.07]}>
        <mesh>
          <torusGeometry args={[2, 0.1, 12, 100]} />
          <meshStandardMaterial
            color="#8d9db5"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, -0.12]}>
          <torusGeometry args={[1.79, 0.018, 8, 100]} />
          <meshStandardMaterial
            color="#526582"
            metalness={0.7}
            roughness={0.5}
          />
        </mesh>
        <mesh rotation={[0, 0, 0.2]}>
          <torusGeometry args={[2.09, 0.022, 8, 80, Math.PI * 0.85]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={3}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI + 0.2]}>
          <torusGeometry args={[2.09, 0.022, 8, 80, Math.PI * 0.85]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={2}
          />
        </mesh>
        <Center>
          {polygons.map((points, i) => (
            <Letter key={i} points={points} />
          ))}
        </Center>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 6) * 1.9,
              Math.sin((i * Math.PI) / 6) * 1.9,
              0,
            ]}
            rotation={[0, 0, (i * Math.PI) / 6]}
          >
            <boxGeometry args={[0.07, 0.025, 0.08]} />
            <meshStandardMaterial
              color="#9aaac4"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
export default function EmblemScene() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} className="canvas-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.4], fov: 44 }}
        frameloop={active && !reduced ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ContextLifecycle />
        <ambientLight intensity={0.8} />
        <directionalLight position={[1, 4, 4]} intensity={3} color="#dce8ff" />
        <pointLight position={[-3, 0, 2]} intensity={20} color="#2563eb" />
        <pointLight position={[3, -1, 2]} intensity={15} color="#ef4444" />
        <Emblem reduced={reduced} />
      </Canvas>
    </div>
  );
}
