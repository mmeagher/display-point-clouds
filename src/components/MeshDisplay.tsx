import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PointCloudData } from '../types';
import { useViewerStore } from '../stores/viewerStore';

interface MeshDisplayProps {
  data: PointCloudData;
}

// Simple marching cubes-like mesh generation from point cloud
function generateMeshFromPoints(data: PointCloudData): THREE.BufferGeometry {
  const { positions, count } = data;

  // Create a convex hull approximation using the points
  // For a proper implementation, you'd use a real marching cubes algorithm
  // This creates a simple mesh visualization

  // Find bounding box
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (let i = 0; i < count; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
  }

  // Create a simple box mesh as placeholder
  // In production, you'd use actual mesh data from .ply files
  const width = maxX - minX;
  const height = maxY - minY;
  const depth = maxZ - minZ;

  const box = new THREE.BoxGeometry(width, height, depth, 8, 8, 8);
  box.translate((minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2);

  return box;
}

export function MeshDisplay({ data }: MeshDisplayProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { meshMode, meshOpacity, autoRotate } = useViewerStore();

  const geometry = useMemo(() => {
    return generateMeshFromPoints(data);
  }, [data]);

  const material = useMemo(() => {
    const baseProps = {
      color: '#6366f1',
      transparent: true,
      opacity: meshOpacity,
    };

    switch (meshMode) {
      case 'wireframe':
        return new THREE.MeshBasicMaterial({
          ...baseProps,
          wireframe: true,
        });
      case 'flat':
        return new THREE.MeshLambertMaterial({
          ...baseProps,
          flatShading: true,
        });
      case 'smooth':
        return new THREE.MeshStandardMaterial({
          ...baseProps,
          roughness: 0.5,
          metalness: 0.1,
        });
      case 'transparent':
        return new THREE.MeshPhysicalMaterial({
          ...baseProps,
          opacity: meshOpacity * 0.5,
          roughness: 0.1,
          metalness: 0.2,
          transmission: 0.5,
        });
      default:
        return new THREE.MeshStandardMaterial(baseProps);
    }
  }, [meshMode, meshOpacity]);

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}
