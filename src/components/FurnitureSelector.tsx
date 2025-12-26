import { useViewerStore } from '../stores/viewerStore';
import catalog from '../data/furniture-catalog.json';
import type { FurniturePiece } from '../types';

const pieces = catalog.pieces as FurniturePiece[];

function ThumbnailPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full aspect-square bg-cosmos-700 rounded flex items-center justify-center">
      <span className="text-2xl opacity-50">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

interface FurnitureCardProps {
  piece: FurniturePiece;
  isSelected: boolean;
  onSelect: () => void;
}

function FurnitureCard({ piece, isSelected, onSelect }: FurnitureCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-2 rounded-lg text-left transition-all duration-200
        ${isSelected
          ? 'bg-cosmos-600 ring-2 ring-indigo-500'
          : 'bg-cosmos-800 hover:bg-cosmos-700'
        }
      `}
    >
      <ThumbnailPlaceholder name={piece.name} />
      <div className="mt-2">
        <h3 className="font-medium text-sm truncate">{piece.name}</h3>
        <p className="text-xs text-gray-400 mt-1">
          {piece.pointCount.toLocaleString()} points
        </p>
      </div>
    </button>
  );
}

export function FurnitureSelector() {
  const { selectedPieceId, setSelectedPiece } = useViewerStore();

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Furniture Pieces
      </h2>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {pieces.map((piece) => (
          <FurnitureCard
            key={piece.id}
            piece={piece}
            isSelected={selectedPieceId === piece.id}
            onSelect={() => setSelectedPiece(piece.id)}
          />
        ))}
      </div>
    </div>
  );
}
