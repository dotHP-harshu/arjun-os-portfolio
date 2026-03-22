import React from "react";
import type { WindowState, WindowType } from "../types/window";
import { motion } from "motion/react";
import { Monitor, LayoutGrid, ChevronRight, X } from "lucide-react";
import { useSound } from "../contexts/useSound";
import userData from "../data/data.json";

interface TaskbarProps {
  windows: WindowState[];
  toggleTaskbarItem: (id: WindowType) => void;
  openWindow: (id: WindowType) => void;
  closeWindow: (id: WindowType) => void;
  showDesktop: () => void;
}

export default function Taskbar({
  windows,
  toggleTaskbarItem,
  openWindow,
  closeWindow,
  showDesktop,
}: TaskbarProps) {
  const { playClick } = useSound();
  const openWindows = windows.filter((w) => w.isOpen);
  const startMenuApps = windows
    .filter((w) => w.id !== "about")
    .map((w) => ({
      id: w.id,
      title: w.title,
      icon: w.icon,
      isOpen: w.isOpen,
    }));

  const [isStartOpen, setIsStartOpen] = React.useState(false);
  const startMenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isStartOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (target && startMenuRef.current && startMenuRef.current.contains(target)) return;
      setIsStartOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [isStartOpen]);

  return (
    <footer
      className="h-14 w-full border-t-4 flex items-center px-4 gap-4 shrink-0"
      style={{
        backgroundColor: "var(--taskbar)",
        borderColor: "var(--border)",
      }}
    >
      {/* ---------------- START BUTTON ---------------- */}
      <div className="relative" ref={startMenuRef}>
        <button
          onClick={() => {
            playClick();
            setIsStartOpen((v) => !v);
          }}
          className="h-9 px-4 border-2 font-bold uppercase text-xs flex items-center gap-2 transition-all active:translate-y-[2px]"
          style={{
            backgroundColor: isStartOpen ? "var(--accent)" : "var(--window-bg)",
            borderColor: "var(--border)",
            color: isStartOpen ? "#000" : "var(--text)",
            boxShadow: "2px 2px 0px 0px var(--border)",
          }}
        >
          <LayoutGrid size={14} />
          Start
        </button>

        {isStartOpen && (
          <div
            className="absolute bottom-[calc(100%+10px)] left-0 w-64 border-2 overflow-hidden"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--border)",
              boxShadow: "4px 4px 0px 0px var(--border)",
            }}
          >
            <div
              className="px-3 py-2 border-b-2 text-xs font-black uppercase tracking-wider"
              style={{
                backgroundColor: "var(--title-bar)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              Programs
            </div>

            <div className="max-h-72 overflow-auto">
              {startMenuApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    playClick();
                    openWindow(app.id);
                    setIsStartOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 border-b text-xs font-bold uppercase hover:opacity-80"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: app.isOpen ? "var(--accent)" : "transparent",
                    color: app.isOpen ? "#000" : "var(--text)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    {app.icon}
                    {app.title}
                  </span>
                  <ChevronRight size={14} />
                </button>
              ))}
              <button
                onClick={() => {
                  playClick();
                  openWindow("about");
                  setIsStartOpen(false);
                }}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 text-xs font-bold uppercase hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "transparent",
                  color: "var(--text)",
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-4 h-4">
                    {/* Keep visual spacing consistent */}
                    <LayoutGrid size={14} />
                  </span>
                  {userData.system.windows.about}
                </span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---------------- OPEN WINDOWS ---------------- */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {openWindows.map((win) => {
          const isActive = !win.isMinimized;

          return (
            <motion.div
              key={win.id}
              layout
              className="relative group"
            >
              <button
                onClick={() => {
                  playClick();
                  toggleTaskbarItem(win.id);
                }}
                className="h-9 px-4 pr-8 border-2 text-xs font-bold uppercase flex items-center gap-2 whitespace-nowrap transition-all"
                style={{
                  backgroundColor: isActive
                    ? "var(--accent)"
                    : "var(--window-bg)",
                  borderColor: "var(--border)",
                  color: isActive ? "#000" : "var(--text)",
                  boxShadow: "2px 2px 0px 0px var(--border)",
                }}
              >
                {win.icon}
                {win.title}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  closeWindow(win.id);
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center border-2 hover:bg-red-500 hover:text-white transition-colors"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--window-bg)",
                  color: "var(--text)",
                }}
                title="Close Window"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* ---------------- SYSTEM AREA ---------------- */}
      <div className="flex items-center gap-3">
        {/* Show Desktop */}
        <button
          onClick={() => {
            playClick();
            showDesktop();
          }}
          className="h-9 w-9 border-2 flex items-center justify-center transition-all active:translate-y-[2px]"
          style={{
            backgroundColor: "var(--window-bg)",
            borderColor: "var(--border)",
            boxShadow: "2px 2px 0px 0px var(--border)",
          }}
        >
          <Monitor size={14} />
        </button>

        {/* Clock */}
        <Clock />
      </div>
    </footer>
  );
}

/* ---------------- CLOCK COMPONENT ---------------- */

function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="h-9 px-3 border-2 text-xs font-bold flex items-center"
      style={{
        backgroundColor: "var(--window-bg)",
        borderColor: "var(--border)",
        boxShadow: "2px 2px 0px 0px var(--border)",
      }}
    >
      {time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </div>
  );
}
