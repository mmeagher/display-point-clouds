import type { PointCloudData } from '../types';

// Generate a random number with gaussian distribution
function gaussRandom(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Generate warm earth tone colors
function generateWarmColor(y: number, variation: number = 0.2): [number, number, number] {
  const baseHue = 20 + Math.random() * 30; // Orange to brown range
  const saturation = 0.4 + Math.random() * 0.3;
  const lightness = 0.3 + y * 0.2 + Math.random() * variation;

  // HSL to RGB conversion
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs((baseHue / 60) % 2 - 1));
  const m = lightness - c / 2;

  let r = 0, g = 0, b = 0;
  if (baseHue < 60) {
    r = c; g = x; b = 0;
  } else if (baseHue < 120) {
    r = x; g = c; b = 0;
  }

  return [r + m, g + m, b + m];
}

// Generate a bench shape
export function generateBench(pointCount: number = 4096): PointCloudData {
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);

  // Bench dimensions
  const seatWidth = 2.0;
  const seatDepth = 0.6;
  const seatHeight = 0.5;
  const seatThickness = 0.08;
  const legWidth = 0.1;
  const legHeight = seatHeight;

  for (let i = 0; i < pointCount; i++) {
    let x = 0, y = 0, z = 0;
    const part = Math.random();

    if (part < 0.6) {
      // Seat surface
      x = (Math.random() - 0.5) * seatWidth;
      y = seatHeight + (Math.random() - 0.5) * seatThickness;
      z = (Math.random() - 0.5) * seatDepth;
    } else if (part < 0.8) {
      // Left leg pair
      const legX = -seatWidth / 2 + legWidth / 2;
      x = legX + (Math.random() - 0.5) * legWidth;
      y = Math.random() * legHeight;
      z = (Math.random() > 0.5 ? 1 : -1) * (seatDepth / 2 - legWidth / 2) + (Math.random() - 0.5) * legWidth;
    } else {
      // Right leg pair
      const legX = seatWidth / 2 - legWidth / 2;
      x = legX + (Math.random() - 0.5) * legWidth;
      y = Math.random() * legHeight;
      z = (Math.random() > 0.5 ? 1 : -1) * (seatDepth / 2 - legWidth / 2) + (Math.random() - 0.5) * legWidth;
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const normalizedY = y / (seatHeight + seatThickness);
    const [r, g, b] = generateWarmColor(normalizedY);
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  return { positions, colors, count: pointCount };
}

// Generate an organic couch shape
export function generateCouch(pointCount: number = 4096): PointCloudData {
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);

  for (let i = 0; i < pointCount; i++) {
    let x = 0, y = 0, z = 0;
    const part = Math.random();

    if (part < 0.5) {
      // Main seat - curved surface
      const u = Math.random() * Math.PI * 2;
      const v = Math.random();
      x = Math.cos(u) * (1.2 + v * 0.3) * 0.8;
      y = 0.3 + Math.sin(u * 2) * 0.05 + v * 0.1;
      z = (v - 0.5) * 0.8;
    } else if (part < 0.75) {
      // Backrest - curved
      const u = (Math.random() - 0.5) * Math.PI * 0.8;
      const v = Math.random();
      x = Math.sin(u) * 1.0;
      y = 0.4 + v * 0.5;
      z = -0.3 - Math.cos(u) * 0.1;
    } else if (part < 0.875) {
      // Left armrest
      const u = Math.random();
      const v = Math.random();
      x = -0.9 - u * 0.15;
      y = 0.3 + v * 0.35;
      z = (Math.random() - 0.5) * 0.5;
    } else {
      // Right armrest
      const u = Math.random();
      const v = Math.random();
      x = 0.9 + u * 0.15;
      y = 0.3 + v * 0.35;
      z = (Math.random() - 0.5) * 0.5;
    }

    // Add organic noise
    x += gaussRandom() * 0.02;
    y += gaussRandom() * 0.015;
    z += gaussRandom() * 0.02;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Purple/blue tones for the couch
    const normalizedY = y / 0.9;
    const hue = 260 + Math.random() * 40;
    const saturation = 0.3 + Math.random() * 0.2;
    const lightness = 0.25 + normalizedY * 0.2 + Math.random() * 0.1;

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const hPrime = hue / 60;
    const xVal = c * (1 - Math.abs(hPrime % 2 - 1));
    const m = lightness - c / 2;

    let r = 0, g = 0, b = 0;
    if (hPrime >= 4 && hPrime < 5) {
      r = xVal; g = 0; b = c;
    } else if (hPrime >= 5 && hPrime < 6) {
      r = c; g = 0; b = xVal;
    }

    colors[i * 3] = r + m;
    colors[i * 3 + 1] = g + m;
    colors[i * 3 + 2] = b + m;
  }

  return { positions, colors, count: pointCount };
}

// Generate an abstract dreamlike form
export function generateAbstract(pointCount: number = 1024): PointCloudData {
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);

  for (let i = 0; i < pointCount; i++) {
    // Create flowing, dreamlike shapes using multiple sine waves
    const t = (i / pointCount) * Math.PI * 8;
    const spiral = i / pointCount * Math.PI * 4;

    const radius = 0.3 + Math.sin(t * 0.5) * 0.2 + Math.cos(t * 0.3) * 0.15;

    let x = Math.cos(spiral) * radius + gaussRandom() * 0.08;
    let y = (i / pointCount) * 1.2 - 0.3 + Math.sin(t) * 0.15;
    let z = Math.sin(spiral) * radius + gaussRandom() * 0.08;

    // Add some chaotic elements
    x += Math.sin(t * 3) * 0.1;
    z += Math.cos(t * 2.5) * 0.1;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Rainbow-ish ethereal colors
    const hue = (i / pointCount) * 360;
    const saturation = 0.6 + Math.random() * 0.2;
    const lightness = 0.4 + Math.random() * 0.2;

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const hPrime = hue / 60;
    const xVal = c * (1 - Math.abs(hPrime % 2 - 1));
    const m = lightness - c / 2;

    let r = 0, g = 0, b = 0;
    if (hPrime < 1) { r = c; g = xVal; b = 0; }
    else if (hPrime < 2) { r = xVal; g = c; b = 0; }
    else if (hPrime < 3) { r = 0; g = c; b = xVal; }
    else if (hPrime < 4) { r = 0; g = xVal; b = c; }
    else if (hPrime < 5) { r = xVal; g = 0; b = c; }
    else { r = c; g = 0; b = xVal; }

    colors[i * 3] = r + m;
    colors[i * 3 + 1] = g + m;
    colors[i * 3 + 2] = b + m;
  }

  return { positions, colors, count: pointCount };
}

// Cache for generated point clouds
const cache: Map<string, PointCloudData> = new Map();

export function getPlaceholderPointCloud(id: string): PointCloudData {
  if (cache.has(id)) {
    return cache.get(id)!;
  }

  let data: PointCloudData;

  switch (id) {
    case 'bench-001':
      data = generateBench(4096);
      break;
    case 'couch-001':
      data = generateCouch(4096);
      break;
    case 'abstract-001':
      data = generateAbstract(1024);
      break;
    default:
      data = generateBench(4096);
  }

  cache.set(id, data);
  return data;
}
