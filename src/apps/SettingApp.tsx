import { ImageIcon, Palette } from "lucide-react";
import type { BackgroundType } from "../components/Backgrounds";
import { themes, type ThemeType } from "../config/themes";
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
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold uppercase mb-4 flex items-center gap-2">
          <Palette size={14} /> Themes
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(themes) as ThemeType[]).map((t) => (
            <button
              key={t}
              onClick={() => onThemeChange(t)}
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
          {(["grid", "doodles", "blobs", "waves"] as BackgroundType[]).map(
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
          <p>OS: ArjunOS v2.5.0-stable</p>
          <p>Kernel: React 19.0.0</p>
          <p>Shell: Tailwind 4.0</p>
          <p>Uptime: {Math.floor(performance.now() / 1000)}s</p>
        </div>
      </div>
    </div>
  );
};
export default SettingApp;
