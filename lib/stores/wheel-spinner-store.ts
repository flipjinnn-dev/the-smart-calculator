import { create } from 'zustand';
import { WheelSlice, WheelSettings, WheelState } from '@/types/wheel-spinner';

const DEFAULT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'
];

const DEFAULT_SLICES: WheelSlice[] = [
  { id: '1', label: 'Option 1', color: DEFAULT_COLORS[0], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
  { id: '2', label: 'Option 2', color: DEFAULT_COLORS[1], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
  { id: '3', label: 'Option 3', color: DEFAULT_COLORS[2], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
  { id: '4', label: 'Option 4', color: DEFAULT_COLORS[3], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
  { id: '5', label: 'Option 5', color: DEFAULT_COLORS[4], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
  { id: '6', label: 'Option 6', color: DEFAULT_COLORS[5], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
];

const DEFAULT_SETTINGS: WheelSettings = {
  borderWidth: 4,
  borderColor: '#333333',
  backgroundColor: '#FFFFFF',
  pointerColor: '#FF0000',
  pointerShape: 'triangle',
  spinButtonColor: '#4CAF50',
  spinButtonText: 'SPIN',
  soundEnabled: true,
  tickSoundEnabled: true,
};

interface WheelSpinnerStore extends WheelState {
  history: {
    past: WheelState[];
    future: WheelState[];
  };
  addSlice: () => void;
  removeSlice: (id: string) => void;
  updateSlice: (id: string, updates: Partial<WheelSlice>) => void;
  duplicateSlice: (id: string) => void;
  reorderSlices: (slices: WheelSlice[]) => void;
  clearAllSlices: () => void;
  updateSettings: (settings: Partial<WheelSettings>) => void;
  setIsSpinning: (isSpinning: boolean) => void;
  setSelectedSlice: (slice: WheelSlice | null) => void;
  setRotation: (rotation: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  importSlices: (slices: WheelSlice[]) => void;
  bulkAddSlices: (labels: string[]) => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const getRandomColor = () => DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];

const saveState = (state: WheelSpinnerStore): WheelState => ({
  slices: state.slices,
  settings: state.settings,
  isSpinning: state.isSpinning,
  selectedSlice: state.selectedSlice,
  rotation: state.rotation,
  theme: state.theme,
});

export const useWheelSpinnerStore = create<WheelSpinnerStore>((set, get) => ({
  slices: DEFAULT_SLICES,
  settings: DEFAULT_SETTINGS,
  isSpinning: false,
  selectedSlice: null,
  rotation: 0,
  theme: 'dark',
  history: {
    past: [],
    future: [],
  },

  addSlice: () => {
    const state = get();
    const newSlice: WheelSlice = {
      id: Date.now().toString(),
      label: `Option ${state.slices.length + 1}`,
      color: getRandomColor(),
      textColor: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fontStyle: 'normal',
    };
    
    set((state) => ({
      slices: [...state.slices, newSlice],
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  removeSlice: (id: string) => {
    const state = get();
    if (state.slices.length <= 2) return;
    
    set((state) => ({
      slices: state.slices.filter((slice) => slice.id !== id),
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  updateSlice: (id: string, updates: Partial<WheelSlice>) => {
    set((state) => ({
      slices: state.slices.map((slice) =>
        slice.id === id ? { ...slice, ...updates } : slice
      ),
    }));
    get().saveToLocalStorage();
  },

  duplicateSlice: (id: string) => {
    const state = get();
    const sliceToDuplicate = state.slices.find((slice) => slice.id === id);
    if (!sliceToDuplicate) return;

    const newSlice: WheelSlice = {
      ...sliceToDuplicate,
      id: Date.now().toString(),
      label: `${sliceToDuplicate.label} (Copy)`,
    };

    set((state) => ({
      slices: [...state.slices, newSlice],
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  reorderSlices: (slices: WheelSlice[]) => {
    set((state) => ({
      slices,
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  clearAllSlices: () => {
    set((state) => ({
      slices: [
        { id: '1', label: 'Option 1', color: DEFAULT_COLORS[0], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
        { id: '2', label: 'Option 2', color: DEFAULT_COLORS[1], textColor: '#FFFFFF', fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', fontStyle: 'normal' },
      ],
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  updateSettings: (settings: Partial<WheelSettings>) => {
    set((state) => ({
      settings: { ...state.settings, ...settings },
    }));
    get().saveToLocalStorage();
  },

  setIsSpinning: (isSpinning: boolean) => {
    set({ isSpinning });
  },

  setSelectedSlice: (slice: WheelSlice | null) => {
    set({ selectedSlice: slice });
  },

  setRotation: (rotation: number) => {
    set({ rotation });
  },

  setTheme: (theme: 'light' | 'dark') => {
    set({ theme });
    get().saveToLocalStorage();
  },

  importSlices: (slices: WheelSlice[]) => {
    if (slices.length < 2) return;
    
    set((state) => ({
      slices,
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  bulkAddSlices: (labels: string[]) => {
    const state = get();
    const newSlices: WheelSlice[] = labels.map((label, index) => ({
      id: `${Date.now()}-${index}`,
      label: label.trim(),
      color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      textColor: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fontStyle: 'normal',
    }));

    set((state) => ({
      slices: [...state.slices, ...newSlices],
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  reset: () => {
    set((state) => ({
      slices: DEFAULT_SLICES,
      settings: DEFAULT_SETTINGS,
      rotation: 0,
      selectedSlice: null,
      history: {
        past: [...state.history.past, saveState(state)],
        future: [],
      },
    }));
    get().saveToLocalStorage();
  },

  undo: () => {
    const state = get();
    if (state.history.past.length === 0) return;

    const previous = state.history.past[state.history.past.length - 1];
    const newPast = state.history.past.slice(0, state.history.past.length - 1);

    set({
      ...previous,
      history: {
        past: newPast,
        future: [saveState(state), ...state.history.future],
      },
    });
    get().saveToLocalStorage();
  },

  redo: () => {
    const state = get();
    if (state.history.future.length === 0) return;

    const next = state.history.future[0];
    const newFuture = state.history.future.slice(1);

    set({
      ...next,
      history: {
        past: [...state.history.past, saveState(state)],
        future: newFuture,
      },
    });
    get().saveToLocalStorage();
  },

  saveToLocalStorage: () => {
    const state = get();
    const dataToSave = {
      slices: state.slices,
      settings: state.settings,
      theme: state.theme,
    };
    localStorage.setItem('wheel-spinner-state', JSON.stringify(dataToSave));
  },

  loadFromLocalStorage: () => {
    try {
      const saved = localStorage.getItem('wheel-spinner-state');
      if (saved) {
        const data = JSON.parse(saved);
        set({
          slices: data.slices || DEFAULT_SLICES,
          settings: data.settings || DEFAULT_SETTINGS,
          theme: data.theme || 'dark',
        });
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  },
}));
