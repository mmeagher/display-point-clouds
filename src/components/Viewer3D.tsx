import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { PointCloud } from './PointCloud';
import { MeshDisplay } from './MeshDisplay';
import { useViewerStore } from '../stores/viewerStore';
import { getPlaceholderPointCloud } from '../utils/generatePlaceholders';
import catalog from '../data/furniture-catalog.json';

function LoadingIndicator() {
  return (
    <mesh>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

function Scene() {
  const { selectedPieceId, showPoints, showMesh } = useViewerStore();

  const selectedPiece = catalog.pieces.find(p => p.id === selectedPieceId);
  const pointCloudData = selectedPieceId ? getPlaceholderPointCloud(selectedPieceId) : null;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Ground grid */}
      <Grid
        position={[0, -0.01, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1a1a24"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#24242f"
        fadeDistance={10}
        fadeStrength={1}
        infiniteGrid
      />

      {/* Point cloud display */}
      {pointCloudData && showPoints && (
        <PointCloud
          data={pointCloudData}
          symbolColor={selectedPiece?.symbolColor}
        />
      )}

      {/* Mesh display */}
      {pointCloudData && showMesh && (
        <MeshDisplay data={pointCloudData} />
      )}
    </>
  );
}

interface Viewer3DProps {
  onControlsReady?: (controls: OrbitControlsImpl) => void;
}

export function Viewer3D({ onControlsReady }: Viewer3DProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [2, 1.5, 2],
          fov: 50,
          near: 0.01,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
        style={{ background: '#0a0a0f' }}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <Scene />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={0.5}
          maxDistance={10}
          target={[0, 0.3, 0]}
          onEnd={() => {
            if (controlsRef.current && onControlsReady) {
              onControlsReady(controlsRef.current);
            }
          }}
        />
      </Canvas>
    </div>
  );
}
