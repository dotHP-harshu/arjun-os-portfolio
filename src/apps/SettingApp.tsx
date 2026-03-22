import { ImageIcon, Palette, Volume2 } from "lucide-react";
import type { BackgroundType } from "../components/Backgrounds";
import { themes, type ThemeType } from "../config/themes";
import { useSound } from "../contexts/useSound";
import userData from "../data/data.json";

const SettingApp = ({
  currentTheme,
  onThemeChange,
  currentBackground,
  onBackgroundChange,
}: {
  currentTheme: ThemeType;
  onThemeChange: (t: ThemeType) => void;
  currentBackground: BackgroundType;
  onBackgroundChange: (b: BackgroundType) => void;
}) => {
  const { enabled, setEnabled, volume, setVolume, playThemeSwitch } = useSound();

  const handleThemeChange = (t: ThemeType) => {
    playThemeSwitch();
    onThemeChange(t);
  };

  return (
    <div className="space-y-6">
      {/* System Sound */}
      <div className="border-b-2 border-[var(--border)] pb-4">
        <h3 className="text-xs font-bold uppercase mb-4 flex items-center gap-2">
          <Volume2 size={14} /> System Sound
        </h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 accent-[var(--accent)]"
            />
            <span className="text-xs font-medium uppercase">System Sound</span>
          </label>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase opacity-70 w-12">Volume</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="flex-1 h-2 accent-[var(--accent)]"
              style={{ background: "var(--border)" }}
            />
            <span className="text-[10px] font-mono w-8">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase mb-4 flex items-center gap-2">
          <Palette size={14} /> Themes
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(themes) as ThemeType[]).map((t) => (
            <button
              key={t}
              onClick={() => handleThemeChange(t)}
              className={`p-2 border-2 flex flex-col gap-2 transition-all ${currentTheme === t ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] hover:bg-[var(--accent)]/5"}`}
            >
              <div
                className="w-full h-8 border border-black/10"
                style={{ backgroundColor: themes[t].bg }}
              >
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: themes[t].titleBar }}
                ></div>
              </div>
              <span className="text-[10px] font-bold uppercase">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-[var(--border)] pt-4">
        <h3 className="text-xs font-bold uppercase mb-4 flex items-center gap-2">
          <ImageIcon size={14} /> Backgrounds
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {(["grid", "doodles", "blobs", "waves", "dots", "particles"] as BackgroundType[]).map(
            (b) => (
              <button
                key={b}
                onClick={() => onBackgroundChange(b)}
                className={`p-2 border-2 flex flex-col gap-2 transition-all ${currentBackground === b ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] hover:bg-[var(--accent)]/5"}`}
              >
                <div className="w-full h-8 border border-black/10 flex items-center justify-center overflow-hidden bg-white/5">
                  {b === "grid" && (
                    <div
                      className="w-full h-full opacity-20"
                      style={{
                        backgroundImage:
                          "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "8px 8px",
                      }}
                    />
                  )}
                  {b === "doodles" && (
                    <div className="text-[8px] opacity-40">✎ ◯ □</div>
                  )}
                  {b === "blobs" && (
                    <div className="w-4 h-4 rounded-full bg-current opacity-20 blur-sm" />
                  )}
                  {b === "waves" && (
                    <div className="w-full h-full flex flex-col justify-end">
                      <div
                        className="h-1/2 w-full bg-current opacity-20"
                        style={{ clipPath: "ellipse(100% 100% at 50% 100%)" }}
                      />
                    </div>
                  )}
                  {b === "dots" && (
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 opacity-30">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-current rounded-full"
                            style={{
                              left: `${20 + (i % 3) * 30}%`,
                              top: `${20 + Math.floor(i / 3) * 30}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {b === "particles" && (
                    <div className="w-full h-full relative">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-current rounded-full opacity-40"
                          style={{
                            left: `${25 + (i % 2) * 50}%`,
                            top: `${25 + Math.floor(i / 2) * 50}%`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase">{b}</span>
              </button>
            ),
          )}
        </div>
      </div>

      <div className="border-t-2 border-[var(--border)] pt-4">
        <h3 className="text-xs font-bold uppercase mb-2">System Info</h3>
        <div className="space-y-1 text-[10px] font-mono opacity-70">
          <p>OS: {userData.system.osName} {userData.system.osVersion}</p>
          <p>Kernel: {userData.system.kernel}</p>
          <p>Shell: {userData.system.shell}</p>
          <p>Uptime: {Math.floor(performance.now() / 1000)}s</p>
        </div>
      </div>
    </div>
  );
};
export default SettingApp;
