export interface WheelSlice {
  id: string;
  label: string;
  color: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
}

export interface WheelSettings {
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  pointerColor: string;
  pointerShape: 'triangle' | 'arrow' | 'circle';
  spinButtonColor: string;
  spinButtonText: string;
  soundEnabled: boolean;
  tickSoundEnabled: boolean;
}

export interface WheelState {
  slices: WheelSlice[];
  settings: WheelSettings;
  isSpinning: boolean;
  selectedSlice: WheelSlice | null;
  rotation: number;
  theme: 'light' | 'dark';
}

export interface HistoryState {
  past: WheelState[];
  present: WheelState;
  future: WheelState[];
}

export interface SpinResult {
  winningSlice: WheelSlice;
  finalRotation: number;
  duration: number;
}
