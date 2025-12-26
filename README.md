# Cosmologyscape Point Cloud Viewer

A React application for visualizing and interacting with point cloud data representing dream-derived furniture forms from the Cosmologyscape research project.

## Features

- **Point Cloud Display**: WebGL-based 3D viewer with configurable point size and opacity
- **Furniture Selection**: Sidebar to browse and select between multiple furniture prototypes
- **Interactive Controls**: Orbit, zoom, pan, and auto-rotate functionality
- **Color Schemes**: Original, Monochrome, Height Gradient, Density, Symbol Colors, Custom
- **Mesh Display**: Toggle mesh overlay with wireframe, flat, smooth, and transparent modes
- **Metadata Display**: Dream excerpts, generation parameters, and symbol information

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development and building
- **Three.js** via **React Three Fiber** for 3D rendering
- **@react-three/drei** for controls and helpers
- **Tailwind CSS** for styling
- **Zustand** for state management

## Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom hooks
├── stores/          # Zustand state management
├── utils/           # Utility functions
├── data/            # Furniture catalog
└── types/           # TypeScript interfaces
```

## Adding Real Point Cloud Data

Replace the placeholder data in `src/utils/generatePlaceholders.ts` with actual PLY file loading using the `usePLYLoader` hook pattern. Update `src/data/furniture-catalog.json` with your actual furniture pieces.
