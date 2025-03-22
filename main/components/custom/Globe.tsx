import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      className="aspect-square w-full max-w-[800px]"
    >
      <fog attach="fog" args={["transparent", 2, 5]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1} />

      <Ball />
    </Canvas>
  );
}

function Ball() {
  const ballRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!ballRef.current) return;
    ballRef.current.rotation.y -= 0.3 * dt;
  });

  return (
    <group rotation={[0, 0, -0.2]}>
      <group ref={ballRef} scale={1.3}>
        <GridLines />
        {/* <SkillsBanner /> */}
      </group>
    </group>
  );
}

function GridLines() {
  const lines = [];
  const segments = 20;

  for (let i = 0; i < segments; i++) {
    const phi = (i / segments) * Math.PI;
    const segmentRotation = 360 / segments;

    if (i > 0 && i < segments) {
      lines.push(
        <mesh
          key={`lat-${i}`}
          position={[0, Math.cos(phi), 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[Math.sin(phi), 0.002, 64]} />
          <meshStandardMaterial color="black" transparent opacity={0.8} />
        </mesh>
      );

      lines.push(
        <mesh
          key={`lon-${i}`}
          rotation={[0, THREE.MathUtils.degToRad(segmentRotation * i), 0]}
        >
          <torusGeometry args={[1, 0.002, 4, 64]} />
          <meshStandardMaterial color="black" transparent opacity={0.8} />
        </mesh>
      );
    }
  }

  return <>{lines}</>;
}
