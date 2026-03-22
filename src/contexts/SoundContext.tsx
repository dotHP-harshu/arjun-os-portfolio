import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createSoundService,
  type SoundId,
  type SoundServiceAPI,
} from "../lib/soundService";
import { SoundContext, type SoundContextValue } from "./sound";

const STORAGE_SOUND_ENABLED = "arjunos.sound.enabled";
const STORAGE_SOUND_VOLUME = "arjunos.sound.volume";

function getStoredEnabled(): boolean {
  if (typeof sessionStorage === "undefined") return true;
  const v = sessionStorage.getItem(STORAGE_SOUND_ENABLED);
  if (v === "0" || v === "false") return false;
  if (v === "1" || v === "true") return true;
  // Never force audio: default off when user prefers reduced motion
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  return true;
}

function getStoredVolume(): number {
  if (typeof sessionStorage === "undefined") return 0.6;
  const v = sessionStorage.getItem(STORAGE_SOUND_VOLUME);
  const n = Number(v);
  if (Number.isFinite(n) && n >= 0 && n <= 1) return n;
  return 0.6;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(getStoredEnabled);
  const [volume, setVolumeState] = useState(getStoredVolume);
  const serviceRef = useRef<SoundServiceAPI | null>(null);

  const getService = useCallback((): SoundServiceAPI | null => {
    if (!serviceRef.current) {
      serviceRef.current = createSoundService();
    }
    return serviceRef.current;
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_SOUND_ENABLED, enabled ? "1" : "0");
    const s = getService();
    if (s) s.setEnabled(enabled);
  }, [enabled, getService]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_SOUND_VOLUME, String(volume));
    const s = getService();
    if (s) s.setMasterVolume(volume);
  }, [volume, getService]);

  useEffect(() => {
    getService()?.load();
  }, [getService]);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const play = useCallback(
    (id: SoundId) => {
      getService()?.play(id);
    },
    [getService]
  );

  const value = useMemo<SoundContextValue>(
    () => ({
      enabled,
      setEnabled,
      volume,
      setVolume,
      playBoot: () => play("boot"),
      playAccessGranted: () => play("access-granted"),
      playClick: () => play("click"),
      playKeypress: () => play("keypress"),
      playSuccess: () => play("success"),
      playError: () => play("error"),
      playThemeSwitch: () => play("theme-switch"),
    }),
    [enabled, setEnabled, volume, setVolume, play]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
