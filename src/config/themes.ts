export type ThemeType =
  | "classic"
  | "dark"
  | "cyberpunk"
  | "matrix"
  | "nord"
  | "dracula"
  | "solarized"
  | "vaporwave"
  | "obsidian"
  | "deepSpace"
  | "monochrome"
  | "serverRoom"
  | "graphite"
  | "midnightBlue";

export interface Theme {
  bg: string;
  taskbar: string;
  windowBg: string;
  titleBar: string;
  text: string;
  border: string;
  accent: string;
  grid: string;
}

export const themes: Record<ThemeType, Theme> = {
  /* ===== Refined Existing Themes ===== */

  classic: {
    bg: "#e6e8eb",
    taskbar: "#d9dee3",
    windowBg: "#f8f9fa",
    titleBar: "#7aa2b8",
    text: "#1f2a33",
    border: "#9aa5b1",
    accent: "#3b82f6",
    grid: "#c7d0d9",
  },

  dark: {
    bg: "#0f1115",
    taskbar: "#171923",
    windowBg: "#1f2330",
    titleBar: "#2a3142",
    text: "#e6edf3",
    border: "#0b0d12",
    accent: "#8b5cf6",
    grid: "#222838",
  },

  cyberpunk: {
    bg: "#0b0f1a",
    taskbar: "#11182a",
    windowBg: "#141d33",
    titleBar: "#ff006e",
    text: "#00f5ff",
    border: "#ff006e",
    accent: "#ffbe0b",
    grid: "#1f2a44",
  },

  matrix: {
    bg: "#000000",
    taskbar: "#001a00",
    windowBg: "#000f00",
    titleBar: "#003b00",
    text: "#00ff7f",
    border: "#00ff00",
    accent: "#00ff00",
    grid: "#002200",
  },

  nord: {
    bg: "#2e3440",
    taskbar: "#3b4252",
    windowBg: "#434c5e",
    titleBar: "#5e81ac",
    text: "#eceff4",
    border: "#4c566a",
    accent: "#88c0d0",
    grid: "#4c566a",
  },

  dracula: {
    bg: "#1e1f29",
    taskbar: "#282a36",
    windowBg: "#2f3142",
    titleBar: "#6272a4",
    text: "#f8f8f2",
    border: "#44475a",
    accent: "#bd93f9",
    grid: "#3a3c4e",
  },

  solarized: {
    bg: "#fdf6e3",
    taskbar: "#eee8d5",
    windowBg: "#f5efdc",
    titleBar: "#93a1a1",
    text: "#586e75",
    border: "#93a1a1",
    accent: "#268bd2",
    grid: "#e2dcc8",
  },

  vaporwave: {
    bg: "#2d1e3f",
    taskbar: "#3e2a56",
    windowBg: "#4b3170",
    titleBar: "#ff71ce",
    text: "#ffffff",
    border: "#b967ff",
    accent: "#01cdfe",
    grid: "#5a3d80",
  },

  /* ===== New Premium System Themes ===== */

  obsidian: {
    bg: "#0b0c10",
    taskbar: "#111217",
    windowBg: "#161821",
    titleBar: "#1f2230",
    text: "#e5e7eb",
    border: "#0f1115",
    accent: "#6366f1",
    grid: "#1b1e27",
  },

  deepSpace: {
    bg: "#050816",
    taskbar: "#0c1022",
    windowBg: "#11162c",
    titleBar: "#1c2340",
    text: "#dbeafe",
    border: "#0a0f1f",
    accent: "#38bdf8",
    grid: "#141a30",
  },

  monochrome: {
    bg: "#111111",
    taskbar: "#1a1a1a",
    windowBg: "#222222",
    titleBar: "#2c2c2c",
    text: "#f5f5f5",
    border: "#000000",
    accent: "#ffffff",
    grid: "#2a2a2a",
  },

  serverRoom: {
    bg: "#0a0f14",
    taskbar: "#101820",
    windowBg: "#14212b",
    titleBar: "#1e2f3f",
    text: "#cbd5e1",
    border: "#0f172a",
    accent: "#22d3ee",
    grid: "#1c2733",
  },

  graphite: {
    bg: "#1c1c1c",
    taskbar: "#242424",
    windowBg: "#2e2e2e",
    titleBar: "#3a3a3a",
    text: "#e2e2e2",
    border: "#151515",
    accent: "#f59e0b",
    grid: "#2b2b2b",
  },

  midnightBlue: {
    bg: "#0f172a",
    taskbar: "#1e293b",
    windowBg: "#1e293b",
    titleBar: "#334155",
    text: "#f1f5f9",
    border: "#0b1120",
    accent: "#3b82f6",
    grid: "#273449",
  },
};