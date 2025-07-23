import { create } from 'zustand';

export interface WatermarkConfig {
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  rotation: number;
  x: number;
  y: number;
  fontFamily: string;
}

export interface WatermarkState {
  image: string | null;
  watermark: WatermarkConfig;
  isLoading: boolean;
  setImage: (image: string | null) => void;
  updateWatermark: (config: Partial<WatermarkConfig>) => void;
  setLoading: (loading: boolean) => void;
  resetWatermark: () => void;
}

const defaultWatermark: WatermarkConfig = {
  text: '示例水印',
  fontSize: 24,
  color: '#000000',
  opacity: 0.5,
  rotation: 0,
  x: 50,
  y: 50,
  fontFamily: 'Arial'
};

export const useWatermarkStore = create<WatermarkState>((set) => ({
  image: null,
  watermark: defaultWatermark,
  isLoading: false,
  setImage: (image) => set({ image }),
  updateWatermark: (config) => 
    set((state) => ({
      watermark: { ...state.watermark, ...config }
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  resetWatermark: () => set({ watermark: defaultWatermark })
}));