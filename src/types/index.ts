export interface FurniturePiece {
  id: string;
  name: string;
  pointCloudPath: string;
  meshPath?: string;
  thumbnailPath: string;
  dreamExcerpt: string;
  symbol?: string;
  symbolColor?: string;
  pointCount: number;
  parameters: {
    guidance_scale: number;
    s_churn: number;
    karras_steps: number;
  };
}

export type ColorScheme = 'original' | 'monochrome' | 'height' | 'density' | 'symbol' | 'custom';

export type MeshMode = 'wireframe' | 'flat' | 'smooth' | 'transparent';

export interface ViewerState {
  selectedPieceId: string | null;
  colorScheme: ColorScheme;
  customColor: string;
  showMesh: boolean;
  showPoints: boolean;
  meshMode: MeshMode;
  meshOpacity: number;
  pointSize: number;
  pointOpacity: number;
  autoRotate: boolean;
  isLoading: boolean;
}

export interface PointCloudData {
  positions: Float32Array;
  colors: Float32Array;
  count: number;
}

export interface ViewerActions {
  setSelectedPiece: (id: string | null) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setCustomColor: (color: string) => void;
  setShowMesh: (show: boolean) => void;
  setShowPoints: (show: boolean) => void;
  setMeshMode: (mode: MeshMode) => void;
  setMeshOpacity: (opacity: number) => void;
  setPointSize: (size: number) => void;
  setPointOpacity: (opacity: number) => void;
  setAutoRotate: (rotate: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  resetView: () => void;
}
