import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PointCloudData } from '../types';
import { applyColorScheme } from '../utils/colorSchemes';
import { useViewerStore } from '../stores/viewerStore';

interface PointCloudProps {
  data: PointCloudData;
  symbolColor?: string;
}

export function PointCloud({ data, symbolColor }: PointCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { colorScheme, customColor, pointSize, pointOpacity, autoRotate } = useViewerStore();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));

    const colors = applyColorScheme(data, colorScheme, {
      symbolColor,
      customColor,
    });
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    geo.computeBoundingSphere();
    return geo;
  }, [data, colorScheme, symbolColor, customColor]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: pointSize,
      vertexColors: true,
      transparent: true,
      opacity: pointOpacity,
      sizeAttenuation: true,
    });
  }, [pointSize, pointOpacity]);

  useFrame((_, delta) => {
    if (autoRotate && pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.3;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
