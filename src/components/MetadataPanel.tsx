import { useViewerStore } from '../stores/viewerStore';
import catalog from '../data/furniture-catalog.json';
import type { FurniturePiece } from '../types';

const pieces = catalog.pieces as FurniturePiece[];

const symbolEmojis: Record<string, string> = {
  bear: '🐻',
  eagle: '🦅',
  turtle: '🐢',
  wolf: '🐺',
  buffalo: '🦬',
};

export function MetadataPanel() {
  const { selectedPieceId } = useViewerStore();

  const piece = pieces.find(p => p.id === selectedPieceId);

  if (!piece) {
    return (
      <div className="text-gray-500 text-sm italic">
        Select a piece to view details
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-4">
        {/* Dream excerpt */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-300 italic line-clamp-2">
            "{piece.dreamExcerpt}"
          </p>
        </div>

        {/* Symbol and stats */}
        <div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
          {piece.symbol && (
            <span
              className="flex items-center gap-1"
              style={{ color: piece.symbolColor }}
            >
              {symbolEmojis[piece.symbol] || '◆'} {piece.symbol}
            </span>
          )}
          <span>{piece.pointCount.toLocaleString()} pts</span>
        </div>
      </div>

      {/* Generation parameters */}
      <div className="flex gap-4 text-xs text-gray-500">
        <span>guidance: {piece.parameters.guidance_scale}</span>
        <span>churn: {piece.parameters.s_churn}</span>
        <span>steps: {piece.parameters.karras_steps}</span>
      </div>
    </div>
  );
}
