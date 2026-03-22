import { createContext } from "react";

export interface SoundContextValue {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  volume: number;
  setVolume: (v: number) => void;
  playBoot: () => void;
  playAccessGranted: () => void;
  playClick: () => void;
  playKeypress: () => void;
  playSuccess: () => void;
  playError: () => void;
  playThemeSwitch: () => void;
}

export const SoundContext = createContext<SoundContextValue | null>(null);
