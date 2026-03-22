import { useState, useCallback } from "react";
import type { WindowState, WindowType } from "../types/window";
import { initialWindows } from "../config/window.config";
// import { agentLog } from "../debug/agentLog";

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [maxZIndex, setMaxZIndex] = useState<number>(10);

  /* ------------------------------ OPEN ------------------------------ */
  const openWindow = useCallback(
    (id: WindowType) => {
      setWindows((prev) => {
        const nextZ = maxZIndex + 1;
        setMaxZIndex(nextZ);

        // const before = prev.find((w) => w.id === id);
        // agentLog({
        //   runId: "pre-fix",
        //   hypothesisId: "H1",
        //   location: "src/hooks/useWindowManager.ts:openWindow",
        //   message: "window.open",
        //   data: {
        //     id,
        //     maxZIndex,
        //     nextZ,
        //     before: before
        //       ? {
        //           isOpen: before.isOpen,
        //           isMinimized: before.isMinimized,
        //           isMaximized: before.isMaximized,
        //           zIndex: before.zIndex,
        //         }
        //       : null,
        //   },
        // });

        return prev.map((win) =>
          win.id === id
            ? { ...win, isOpen: true, isMinimized: false, zIndex: nextZ }
            : win,
        );
      });
    },
    [maxZIndex],
  );

  /* ------------------------------ CLOSE ------------------------------ */
  const closeWindow = useCallback((id: WindowType) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, isOpen: false, isMaximized: false } : win,
      ),
    );
  }, []);

  /* ----------------------------- MINIMIZE ---------------------------- */
  const minimizeWindow = useCallback((id: WindowType) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win)),
    );
  }, []);

  /* ----------------------------- MAXIMIZE ---------------------------- */
  const maximizeWindow = useCallback(
    (id: WindowType) => {
      setWindows((prev) => {
        const nextZ = maxZIndex + 1;
        setMaxZIndex(nextZ);

        return prev.map((win) =>
          win.id === id
            ? {
                ...win,
                isMaximized: !win.isMaximized,
                isMinimized: false,
                zIndex: nextZ,
              }
            : win,
        );
      });
    },
    [maxZIndex],
  );

  /* ------------------------------- FOCUS ----------------------------- */
  const focusWindow = useCallback(
    (id: WindowType) => {
      setWindows((prev) => {
        const before = prev.find((w) => w.id === id);
        if (!before || !before.isOpen) {
          // agentLog({
          //   runId: "pre-fix",
          //   hypothesisId: "H1",
          //   location: "src/hooks/useWindowManager.ts:focusWindow",
          //   message: "window.focus.ignored",
          //   data: {
          //     id,
          //     reason: !before ? "missing" : "not-open",
          //     maxZIndex,
          //     before: before
          //       ? {
          //           isOpen: before.isOpen,
          //           isMinimized: before.isMinimized,
          //           isMaximized: before.isMaximized,
          //           zIndex: before.zIndex,
          //         }
          //       : null,
          //   },
          // });
          return prev;
        }

        const nextZ = maxZIndex + 1;
        setMaxZIndex(nextZ);
        // agentLog({
        //   runId: "pre-fix",
        //   hypothesisId: "H1",
        //   location: "src/hooks/useWindowManager.ts:focusWindow",
        //   message: "window.focus",
        //   data: {
        //     id,
        //     maxZIndex,
        //     nextZ,
        //     before: before
        //       ? {
        //           isOpen: before.isOpen,
        //           isMinimized: before.isMinimized,
        //           isMaximized: before.isMaximized,
        //           zIndex: before.zIndex,
        //         }
        //       : null,
        //   },
        // });

        return prev.map((win) =>
          win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win,
        );
      });
    },
    [maxZIndex],
  );

  /* -------------------------- UPDATE POSITION ------------------------ */
  const updateWindowPosition = useCallback(
    (id: WindowType, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((win) => (win.id === id ? { ...win, position } : win)),
      );
    },
    [],
  );

  /* ---------------------------- UPDATE SIZE -------------------------- */
  const updateWindowSize = useCallback(
    (id: WindowType, size: { width: number; height: number }) => {
      setWindows((prev) =>
        prev.map((win) => (win.id === id ? { ...win, size } : win)),
      );
    },
    [],
  );

  /* --------------------------- TASKBAR TOGGLE ------------------------ */
  const toggleTaskbarItem = useCallback(
    (id: WindowType) => {
      const target = windows.find((w) => w.id === id);
      if (!target) return;

      // agentLog({
      //   runId: "pre-fix",
      //   hypothesisId: "H2",
      //   location: "src/hooks/useWindowManager.ts:toggleTaskbarItem",
      //   message: "taskbar.toggle",
      //   data: {
      //     id,
      //     maxZIndex,
      //     target: {
      //       isOpen: target.isOpen,
      //       isMinimized: target.isMinimized,
      //       isMaximized: target.isMaximized,
      //       zIndex: target.zIndex,
      //     },
      //     branch: target.isMinimized
      //       ? "restore-focus"
      //       : target.zIndex === maxZIndex
      //         ? "minimize"
      //         : "focus",
      //   },
      // });

      if (target.isMinimized) {
        focusWindow(id);
      } else if (target.zIndex === maxZIndex) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [windows, maxZIndex, focusWindow, minimizeWindow],
  );

  /* ------------------------------ SHOW DESKTOP ----------------------- */
  const showDesktop = useCallback(() => {
    setWindows((prev) => prev.map((win) => ({ ...win, isMinimized: true })));
  }, []);

  return {
    windows,

    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,

    updateWindowPosition,
    updateWindowSize,

    toggleTaskbarItem,
    showDesktop,
  };
}
