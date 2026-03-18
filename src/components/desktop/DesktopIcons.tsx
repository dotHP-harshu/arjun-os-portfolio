import { motion } from "motion/react";
import type { WindowState, WindowType } from "../../types/window";

interface DesktopIconsProps {
  windows: WindowState[];
  openWindow: (id: WindowType) => void;
  focusWindow: (id: WindowType) => void;
}

export default function DesktopIcons({
  windows,
  openWindow,
  focusWindow,
}: DesktopIconsProps) {
  return (
    <div className="grid grid-flow-col grid-rows-4 gap-8 w-fit">
      {windows.map((win) => (
        <motion.div
          key={win.id}
          drag
          dragMomentum={false}
          dragTransition={{
            modifyTarget: (target) => Math.round(target / 100) * 100,
            power: 0,
            timeConstant: 50,
          }}
          className="flex flex-col items-center gap-2 group w-20 p-2 rounded cursor-pointer"
        >
          <button
            onClick={() => focusWindow(win.id)}
            onDoubleClick={() => openWindow(win.id)}
            className={`flex flex-col items-center gap-2 w-full ${
              win.isOpen && !win.isMinimized ? "bg-[var(--accent)]/20" : ""
            }`}
          >
            <div
              className="w-14 h-14 border-2 flex items-center justify-center transition-colors"
              style={{
                backgroundColor: "var(--window-bg)",
                borderColor: "var(--border)",
                boxShadow: "2px 2px 0px 0px var(--border)",
              }}
            >
              {win.icon}
              {/* {React.cloneElement(
                win.icon as React.ReactElement,
                { size: 32 }
              )} */}
            </div>

            <span
              className="text-[10px] font-bold uppercase px-1 border text-center break-all"
              style={{
                backgroundColor: "var(--window-bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
                boxShadow: "1px 1px 0px 0px var(--border)",
              }}
            >
              {win.title}
            </span>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
