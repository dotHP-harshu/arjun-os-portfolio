/**
 * ArjunOS Sound Service — Web Audio API
 * - Preloaded buffers, single AudioContext
 * - Spatial depth: boot=medium, click/keypress=very low, error=slightly higher
 * - Never force audio; respect prefers-reduced-motion and mobile
 */

export type SoundId =
  | "boot"
  | "access-granted"
  | "click"
  | "keypress"
  | "success"
  | "error"
  | "theme-switch";

/** Relative gain per sound (0–1). Master volume is applied on top. */
const SOUND_GAINS: Record<SoundId, number> = {
  boot: 0.5,
  "access-granted": 0.45,
  click: 0.12,
  keypress: 0.08,
  success: 0.3,
  error: 0.45,
  "theme-switch": 0.25,
};

const SOUND_PATHS: Record<SoundId, string> = {
  boot: "/sounds/boot.mp3",
  "access-granted": "/sounds/access-granted.wav",
  click: "/sounds/click.wav",
  keypress: "/sounds/keypress.wav",
  success: "/sounds/success.wav",
  error: "/sounds/error.wav",
  "theme-switch": "/sounds/theme-switch.wav",
};

function isReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileLike(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/** Short programmatic beep when no file is available (low latency, no network). */
function playFallbackBeep(
  ctx: AudioContext,
  masterGain: GainNode,
  gain: number,
  freq = 800,
  duration = 0.04
): void {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g);
  g.connect(masterGain);
  osc.frequency.value = freq;
  osc.type = "sine";
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export interface SoundServiceConfig {
  enabled: boolean;
  masterVolume: number; // 0–1
  reducedMotion?: boolean;
  mobile?: boolean;
}

export interface SoundServiceAPI {
  play(id: SoundId): void;
  setMasterVolume(volume: number): void;
  setEnabled(enabled: boolean): void;
  load(): Promise<void>;
}

export function createSoundService(): SoundServiceAPI {
  let audioContext: AudioContext | null = null;
  let masterGainNode: GainNode | null = null;
  const buffers: Partial<Record<SoundId, AudioBuffer>> = {};
  const config: SoundServiceConfig = {
    enabled: true,
    masterVolume: 0.6,
    reducedMotion: isReducedMotion(),
    mobile: isMobileLike(),
  };

  function getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      masterGainNode = audioContext.createGain();
      masterGainNode.connect(audioContext.destination);
      masterGainNode.gain.value = config.masterVolume * (config.enabled ? 1 : 0);
    }
    return audioContext;
  }

  function shouldPlay(): boolean {
    if (!config.enabled || config.masterVolume <= 0) return false;
    if (config.reducedMotion) return false;
    return true;
  }

  function play(id: SoundId): void {
    if (!shouldPlay()) return;
    const ctx = getContext();
    if (!ctx || !masterGainNode) return;

    // Resume context on first gesture (browser policy)
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const gain = SOUND_GAINS[id] ?? 0.3;
    const effectiveGain = gain * config.masterVolume;

    const buffer = buffers[id];
    if (buffer) {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const g = ctx.createGain();
      g.gain.value = effectiveGain;
      src.connect(g);
      g.connect(masterGainNode);
      src.start(0);
      src.stop(ctx.currentTime + buffer.duration);
      return;
    }

    // Fallback beep for click so UI feedback works without assets
    if (id === "click" || id === "keypress") {
      playFallbackBeep(ctx, masterGainNode, effectiveGain, 900, 0.03);
      return;
    }
    if (id === "error") {
      playFallbackBeep(ctx, masterGainNode, effectiveGain, 200, 0.08);
      return;
    }
    if (id === "boot" || id === "access-granted") {
      playFallbackBeep(ctx, masterGainNode, effectiveGain, 523, 0.12);
      return;
    }
    if (id === "theme-switch") {
      playFallbackBeep(ctx, masterGainNode, effectiveGain, 700, 0.04);
    }
  }

  function setMasterVolume(volume: number): void {
    config.masterVolume = Math.max(0, Math.min(1, volume));
    if (masterGainNode) {
      masterGainNode.gain.value = config.enabled ? config.masterVolume : 0;
    }
  }

  function setEnabled(enabled: boolean): void {
    config.enabled = enabled;
    if (masterGainNode) {
      masterGainNode.gain.value = config.enabled ? config.masterVolume : 0;
    }
  }

  async function load(): Promise<void> {
    const ctx = getContext();
    if (!ctx) return;

    const loadOne = async (id: SoundId): Promise<void> => {
      try {
        const res = await fetch(SOUND_PATHS[id]);
        if (!res.ok) return;
        const arrayBuffer = await res.arrayBuffer();
        const buffer = await ctx.decodeAudioData(arrayBuffer);
        buffers[id] = buffer;
      } catch {
        // No file or decode error — use fallback in play() or silent
      }
    };

    await Promise.all(
      (Object.keys(SOUND_PATHS) as SoundId[]).map((id) => loadOne(id))
    );
  }

  return { play, setMasterVolume, setEnabled, load };
}
