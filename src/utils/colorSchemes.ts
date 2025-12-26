import type { ColorScheme, PointCloudData } from '../types';
import * as THREE from 'three';

export interface ColorSchemeOptions {
  symbolColor?: string;
  customColor?: string;
}

// Apply color scheme to point cloud data
export function applyColorScheme(
  data: PointCloudData,
  scheme: ColorScheme,
  options: ColorSchemeOptions = {}
): Float32Array {
  const { positions, colors, count } = data;

  switch (scheme) {
    case 'original':
      return colors.slice();

    case 'monochrome':
      return applyMonochrome(positions, count);

    case 'height':
      return applyHeightGradient(positions, count);

    case 'density':
      return applyDensity(positions, count);

    case 'symbol':
      return applySymbolColor(count, options.symbolColor || '#8B4513');

    case 'custom':
      return applyCustomColor(count, options.customColor || '#ffffff');

    default:
      return colors.slice();
  }
}

function applyMonochrome(positions: Float32Array, count: number): Float32Array {
  const colors = new Float32Array(count * 3);

  // Find depth range (Z axis)
  let minZ = Infinity, maxZ = -Infinity;
  for (let i = 0; i < count; i++) {
    const z = positions[i * 3 + 2];
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
  }
  const rangeZ = maxZ - minZ || 1;

  for (let i = 0; i < count; i++) {
    const z = positions[i * 3 + 2];
    const depth = (z - minZ) / rangeZ;
    const value = 0.3 + depth * 0.5;

    colors[i * 3] = value;
    colors[i * 3 + 1] = value;
    colors[i * 3 + 2] = value;
  }

  return colors;
}

function applyHeightGradient(positions: Float32Array, count: number): Float32Array {
  const colors = new Float32Array(count * 3);

  // Find height range (Y axis)
  let minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < count; i++) {
    const y = positions[i * 3 + 1];
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const rangeY = maxY - minY || 1;

  // Color gradient: blue (low) -> green -> yellow -> red (high)
  for (let i = 0; i < count; i++) {
    const y = positions[i * 3 + 1];
    const t = (y - minY) / rangeY;

    let r: number, g: number, b: number;

    if (t < 0.25) {
      // Blue to cyan
      const s = t / 0.25;
      r = 0;
      g = s;
      b = 1;
    } else if (t < 0.5) {
      // Cyan to green
      const s = (t - 0.25) / 0.25;
      r = 0;
      g = 1;
      b = 1 - s;
    } else if (t < 0.75) {
      // Green to yellow
      const s = (t - 0.5) / 0.25;
      r = s;
      g = 1;
      b = 0;
    } else {
      // Yellow to red
      const s = (t - 0.75) / 0.25;
      r = 1;
      g = 1 - s;
      b = 0;
    }

    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  return colors;
}

function applyDensity(positions: Float32Array, count: number): Float32Array {
  const colors = new Float32Array(count * 3);

  // Simple density estimation using grid-based counting
  const gridSize = 0.1;
  const densityMap = new Map<string, number>();

  // Count points in each grid cell
  for (let i = 0; i < count; i++) {
    const x = Math.floor(positions[i * 3] / gridSize);
    const y = Math.floor(positions[i * 3 + 1] / gridSize);
    const z = Math.floor(positions[i * 3 + 2] / gridSize);
    const key = `${x},${y},${z}`;
    densityMap.set(key, (densityMap.get(key) || 0) + 1);
  }

  // Find max density
  let maxDensity = 1;
  densityMap.forEach((d) => {
    maxDensity = Math.max(maxDensity, d);
  });

  // Apply colors based on density
  for (let i = 0; i < count; i++) {
    const x = Math.floor(positions[i * 3] / gridSize);
    const y = Math.floor(positions[i * 3 + 1] / gridSize);
    const z = Math.floor(positions[i * 3 + 2] / gridSize);
    const key = `${x},${y},${z}`;
    const density = densityMap.get(key) || 1;
    const t = density / maxDensity;

    // Purple (low) to orange (high)
    colors[i * 3] = 0.4 + t * 0.6;
    colors[i * 3 + 1] = 0.2 + t * 0.3;
    colors[i * 3 + 2] = 0.8 - t * 0.6;
  }

  return colors;
}

function applySymbolColor(count: number, hexColor: string): Float32Array {
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color(hexColor);

  for (let i = 0; i < count; i++) {
    // Add slight variation
    const variation = 0.9 + Math.random() * 0.2;
    colors[i * 3] = color.r * variation;
    colors[i * 3 + 1] = color.g * variation;
    colors[i * 3 + 2] = color.b * variation;
  }

  return colors;
}

function applyCustomColor(count: number, hexColor: string): Float32Array {
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color(hexColor);

  for (let i = 0; i < count; i++) {
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return colors;
}

export const colorSchemeLabels: Record<ColorScheme, string> = {
  original: 'Original',
  monochrome: 'Monochrome',
  height: 'Height Gradient',
  density: 'Density',
  symbol: 'Symbol Colors',
  custom: 'Custom',
};
