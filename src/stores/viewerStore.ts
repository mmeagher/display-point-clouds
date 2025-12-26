import { create } from 'zustand';
import type { ViewerState, ViewerActions, ColorScheme, MeshMode } from '../types';

const initialState: ViewerState = {
  selectedPieceId: null,
  colorScheme: 'original',
  customColor: '#8B4513',
  showMesh: false,
  showPoints: true,
  meshMode: 'smooth',
  meshOpacity: 0.7,
  pointSize: 0.02,
  pointOpacity: 1.0,
  autoRotate: false,
  isLoading: false,
};

export const useViewerStore = create<ViewerState & ViewerActions>((set) => ({
  ...initialState,

  setSelectedPiece: (id: string | null) => set({ selectedPieceId: id }),
  setColorScheme: (scheme: ColorScheme) => set({ colorScheme: scheme }),
  setCustomColor: (color: string) => set({ customColor: color }),
  setShowMesh: (show: boolean) => set({ showMesh: show }),
  setShowPoints: (show: boolean) => set({ showPoints: show }),
  setMeshMode: (mode: MeshMode) => set({ meshMode: mode }),
  setMeshOpacity: (opacity: number) => set({ meshOpacity: opacity }),
  setPointSize: (size: number) => set({ pointSize: size }),
  setPointOpacity: (opacity: number) => set({ pointOpacity: opacity }),
  setAutoRotate: (rotate: boolean) => set({ autoRotate: rotate }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  resetView: () => set(initialState),
}));
