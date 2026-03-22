import { AnimatePresence } from "motion/react";
import type { WindowState, WindowType } from "../../types/window";
import { appRegistry, type AppRenderContext } from "../../config/appRegistry";
import Window from "./window";

interface WindowManagerProps {
  windows: WindowState[];
  appContext: AppRenderContext;

  closeWindow: (id: WindowType) => void;
  minimizeWindow: (id: WindowType) => void;
  maximizeWindow: (id: WindowType) => void;
  focusWindow: (id: WindowType) => void;

  updateWindowPosition: (
    id: WindowType,
    position: { x: number; y: number }
  ) => void;

  updateWindowSize: (
    id: WindowType,
    size: { width: number; height: number }
  ) => void;
}

export default function WindowManager({
  windows,
  appContext,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  focusWindow,
  updateWindowPosition,
  updateWindowSize,
}: WindowManagerProps) {
  return (
    <AnimatePresence>
      {windows.map((win) => {
        if (!win.isOpen || win.isMinimized) return null;

        const renderApp = appRegistry[win.id];

        if (!renderApp) return null;

        return (
          <Window
            key={win.id}
            window={win}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
            onSizeChange={(size) =>
              updateWindowSize(win.id, size)
            }
          >
            {renderApp(appContext)}
          </Window>
        );
      })}
    </AnimatePresence>
  );
}
