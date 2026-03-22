import { useState, useCallback } from "react";
import type { WindowState, WindowType } from "../types/window";
import { initialWindows } from "../config/window.config";
import userData from "../data/data.json";

interface WindowManagerState {
  windows: WindowState[];
  maxZIndex: number;
}

export function useWindowManager() {
  const [state, setState] = useState<WindowManagerState>(() => {
    const disabledApps = (userData.system.disabledApps || []) as string[];
    const filteredWindows = initialWindows.filter((win) => !disabledApps.includes(win.id));
    return {
      windows: filteredWindows,
      maxZIndex: 10,
    };
  });

  /* ------------------------------ OPEN ------------------------------ */
  const openWindow = useCallback((id: WindowType) => {
    setState((prev) => {
      const nextZ = prev.maxZIndex + 1;
      return {
        maxZIndex: nextZ,
        windows: prev.windows.map((win) =>
          win.id === id
            ? { ...win, isOpen: true, isMinimized: false, zIndex: nextZ }
            : win
        ),
      };
    });
  }, []);

  /* ------------------------------ CLOSE ------------------------------ */
  const closeWindow = useCallback((id: WindowType) => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((win) =>
        win.id === id ? { ...win, isOpen: false, isMaximized: false } : win
      ),
    }));
  }, []);

  /* ----------------------------- MINIMIZE ---------------------------- */
  const minimizeWindow = useCallback((id: WindowType) => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((win) =>
        win.id === id ? { ...win, isMinimized: true } : win
      ),
    }));
  }, []);

  /* ----------------------------- MAXIMIZE ---------------------------- */
  const maximizeWindow = useCallback((id: WindowType) => {
    setState((prev) => {
      const nextZ = prev.maxZIndex + 1;
      return {
        maxZIndex: nextZ,
        windows: prev.windows.map((win) =>
          win.id === id
            ? {
                ...win,
                isMaximized: !win.isMaximized,
                isMinimized: false,
                zIndex: nextZ,
              }
            : win
        ),
      };
    });
  }, []);

  /* ------------------------------- FOCUS ----------------------------- */
  const focusWindow = useCallback((id: WindowType) => {
    setState((prev) => {
      const target = prev.windows.find((w) => w.id === id);
      if (!target || !target.isOpen) return prev;

      const nextZ = prev.maxZIndex + 1;
      return {
        maxZIndex: nextZ,
        windows: prev.windows.map((win) =>
          win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win
        ),
      };
    });
  }, []);

  /* -------------------------- UPDATE POSITION ------------------------ */
  const updateWindowPosition = useCallback((id: WindowType, position: { x: number; y: number }) => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((win) => (win.id === id ? { ...win, position } : win)),
    }));
  }, []);

  /* ---------------------------- UPDATE SIZE -------------------------- */
  const updateWindowSize = useCallback((id: WindowType, size: { width: number; height: number }) => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((win) => (win.id === id ? { ...win, size } : win)),
    }));
  }, []);

  /* --------------------------- TASKBAR TOGGLE ------------------------ */
  const toggleTaskbarItem = useCallback((id: WindowType) => {
    setState((prev) => {
      const target = prev.windows.find((w) => w.id === id);
      if (!target) return prev;

      if (target.isMinimized) {
        // focus logic
        const nextZ = prev.maxZIndex + 1;
        return {
          maxZIndex: nextZ,
          windows: prev.windows.map((win) =>
            win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win
          ),
        };
      } else if (target.zIndex === prev.maxZIndex) {
        // minimize logic
        return {
          ...prev,
          windows: prev.windows.map((win) =>
            win.id === id ? { ...win, isMinimized: true } : win
          ),
        };
      } else {
        // focus logic
        const nextZ = prev.maxZIndex + 1;
        return {
          maxZIndex: nextZ,
          windows: prev.windows.map((win) =>
            win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win
          ),
        };
      }
    });
  }, []);

  /* ------------------------------ SHOW DESKTOP ----------------------- */
  const showDesktop = useCallback(() => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((win) => ({ ...win, isMinimized: true })),
    }));
  }, []);

  return {
    windows: state.windows,
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

