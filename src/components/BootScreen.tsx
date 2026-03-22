import React from "react";
import userData from "../data/data.json";

type BootLine = { text: string; delayMs?: number };

const LINES: BootLine[] = userData.system.boot.lines;

function useBootTyping(
  onDone: () => void,
  minDurationMs = 1800,
  endHoldMs = 2000,
) {
  const [rendered, setRendered] = React.useState<string[]>([]);
  const [cursorOn, setCursorOn] = React.useState(true);

  React.useEffect(() => {
    const start = Date.now();
    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;
    let timeoutId: number | undefined;

    const step = () => {
      if (cancelled) return;

      const line = LINES[lineIdx]?.text ?? "";
      const next = line.slice(0, charIdx + 1);

      setRendered((prev) => {
        const copy = prev.slice();
        if (copy.length <= lineIdx) {
          while (copy.length < lineIdx) copy.push("");
          copy.push(next);
        } else {
          copy[lineIdx] = next;
        }
        return copy;
      });

      if (charIdx < line.length) {
        charIdx += 1;
        timeoutId = window.setTimeout(step, 12);
        return;
      }

      // finished line, move to next
      lineIdx += 1;
      charIdx = 0;

      if (lineIdx >= LINES.length) {
        const elapsed = Date.now() - start;
        const wait = Math.max(endHoldMs, Math.max(0, minDurationMs - elapsed));
        timeoutId = window.setTimeout(() => {
          if (!cancelled) onDone();
        }, wait);
        return;
      }

      const pause = LINES[lineIdx - 1]?.delayMs ?? 60;
      timeoutId = window.setTimeout(step, pause);
    };

    timeoutId = window.setTimeout(step, 120);
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [minDurationMs, endHoldMs, onDone]);

  React.useEffect(() => {
    const t = window.setInterval(() => setCursorOn((v) => !v), 450);
    return () => window.clearInterval(t);
  }, []);

  return { rendered, cursorOn };
}

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const { rendered, cursorOn } = useBootTyping(onComplete, 1800, 2000);

  return (
    <div
      className="h-screen w-full flex items-center justify-center p-6"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div
        className="w-full max-w-3xl border-2"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--window-bg)",
          boxShadow: "6px 6px 0px 0px var(--border)",
        }}
      >
        <div
          className="px-4 py-2 border-b-2 text-xs font-black uppercase tracking-widest"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--title-bar)",
            color: "var(--text)",
          }}
        >
          {userData.system.boot.title}
        </div>
        <pre
          className="p-4 text-xs leading-relaxed font-mono min-h-[320px] whitespace-pre-wrap"
          style={{ color: "var(--text)" }}
        >
          {rendered.join("\n")}
          <span style={{ color: "var(--accent)" }}>{cursorOn ? "█" : " "}</span>
        </pre>
        <div
          className="px-4 py-2 border-t-2 text-[10px] font-mono opacity-70"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--taskbar)",
            color: "var(--text)",
          }}
        >
          {userData.system.boot.status}
        </div>
      </div>
    </div>
  );
}
