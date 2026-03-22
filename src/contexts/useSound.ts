import { useContext } from "react";
import { SoundContext, type SoundContextValue } from "./sound";

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return {
      enabled: false,
      setEnabled: () => {},
      volume: 0.6,
      setVolume: () => {},
      playBoot: () => {},
      playAccessGranted: () => {},
      playClick: () => {},
      playKeypress: () => {},
      playSuccess: () => {},
      playError: () => {},
      playThemeSwitch: () => {},
    };
  }
  return ctx;
}
