import { useViewerStore } from '../stores/viewerStore';
import { colorSchemeLabels } from '../utils/colorSchemes';
import type { ColorScheme } from '../types';

const colorSchemes: ColorScheme[] = [
  'original',
  'monochrome',
  'height',
  'density',
  'symbol',
  'custom',
];

export function ColorSchemePanel() {
  const { colorScheme, setColorScheme, customColor, setCustomColor } = useViewerStore();

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-400">Color:</label>
      <select
        value={colorScheme}
        onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
        className="bg-cosmos-700 border border-cosmos-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {colorSchemes.map((scheme) => (
          <option key={scheme} value={scheme}>
            {colorSchemeLabels[scheme]}
          </option>
        ))}
      </select>

      {colorScheme === 'custom' && (
        <input
          type="color"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
        />
      )}
    </div>
  );
}
