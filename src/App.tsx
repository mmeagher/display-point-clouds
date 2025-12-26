import { useEffect } from 'react';
import { Viewer3D } from './components/Viewer3D';
import { FurnitureSelector } from './components/FurnitureSelector';
import { ColorSchemePanel } from './components/ColorSchemePanel';
import { ViewControls } from './components/ViewControls';
import { MetadataPanel } from './components/MetadataPanel';
import { useViewerStore } from './stores/viewerStore';

function App() {
  const { setSelectedPiece, selectedPieceId } = useViewerStore();

  // Select first piece on mount if none selected
  useEffect(() => {
    if (!selectedPieceId) {
      setSelectedPiece('bench-001');
    }
  }, [selectedPieceId, setSelectedPiece]);

  return (
    <div className="h-screen flex flex-col bg-cosmos-900 text-gray-100">
      {/* Header */}
      <header className="shrink-0 px-4 py-3 border-b border-cosmos-700 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          Cosmologyscape Viewer
        </h1>
        <div className="flex items-center gap-2">
          <ColorSchemePanel />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 border-r border-cosmos-700 p-3 overflow-hidden">
          <FurnitureSelector />
        </aside>

        {/* Viewer area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* 3D Viewport */}
          <div className="flex-1 min-h-0">
            <Viewer3D />
          </div>

          {/* Bottom controls */}
          <div className="shrink-0 border-t border-cosmos-700 p-3 space-y-2">
            <ViewControls />
            <MetadataPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
