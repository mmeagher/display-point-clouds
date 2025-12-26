import { useViewerStore } from '../stores/viewerStore';
import type { MeshMode } from '../types';

const meshModes: { value: MeshMode; label: string }[] = [
  { value: 'wireframe', label: 'Wireframe' },
  { value: 'flat', label: 'Flat' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'transparent', label: 'Glass' },
];

export function ViewControls() {
  const {
    showPoints,
    setShowPoints,
    showMesh,
    setShowMesh,
    meshMode,
    setMeshMode,
    meshOpacity,
    setMeshOpacity,
    pointSize,
    setPointSize,
    autoRotate,
    setAutoRotate,
    resetView,
  } = useViewerStore();

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Display toggles */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showPoints}
            onChange={(e) => setShowPoints(e.target.checked)}
            className="w-4 h-4 rounded border-cosmos-600 bg-cosmos-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
          />
          <span className="text-sm">Points</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showMesh}
            onChange={(e) => setShowMesh(e.target.checked)}
            className="w-4 h-4 rounded border-cosmos-600 bg-cosmos-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
          />
          <span className="text-sm">Mesh</span>
        </label>
      </div>

      {/* Mesh mode selector */}
      {showMesh && (
        <select
          value={meshMode}
          onChange={(e) => setMeshMode(e.target.value as MeshMode)}
          className="bg-cosmos-700 border border-cosmos-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {meshModes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}

      {/* Mesh opacity */}
      {showMesh && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Opacity:</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={meshOpacity}
            onChange={(e) => setMeshOpacity(parseFloat(e.target.value))}
            className="w-20 h-1 bg-cosmos-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Point size */}
      {showPoints && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Size:</label>
          <input
            type="range"
            min="0.005"
            max="0.05"
            step="0.005"
            value={pointSize}
            onChange={(e) => setPointSize(parseFloat(e.target.value))}
            className="w-20 h-1 bg-cosmos-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Auto rotate */}
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input
          type="checkbox"
          checked={autoRotate}
          onChange={(e) => setAutoRotate(e.target.checked)}
          className="w-4 h-4 rounded border-cosmos-600 bg-cosmos-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
        />
        <span className="text-sm">Auto-rotate</span>
      </label>

      {/* Reset button */}
      <button
        onClick={resetView}
        className="px-3 py-1 text-sm bg-cosmos-700 hover:bg-cosmos-600 rounded transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
