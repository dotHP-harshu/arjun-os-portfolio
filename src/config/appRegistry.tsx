import { lazy, Suspense } from "react";
import type { BackgroundType } from "../components/Backgrounds";
import type { ThemeType } from "./themes";
import type { WindowType } from "../types/window";

// Lazy load apps to improve initial bundle size
const AboutApp = lazy(() => import("../apps/AboutApp"));
const BugHunterApp = lazy(() => import("../apps/BugHunterApp"));
const CodeRunnerApp = lazy(() => import("../apps/CodeRunnerApp"));
const ContactApp = lazy(() => import("../apps/ContactApp"));
const ExperienceApp = lazy(() => import("../apps/ExperienceApp"));
const MemoryMatchApp = lazy(() => import("../apps/MemoryMatchApp"));
const NotesApp = lazy(() => import("../apps/NotesApp"));
const ProjectApp = lazy(() => import("../apps/ProjectApp"));
const ResumeApp = lazy(() => import("../apps/ResumeApp"));
const SettingApp = lazy(() => import("../apps/SettingApp"));
const SnakeGameApp = lazy(() => import("../apps/SnakeGameApp"));
const SysMonApp = lazy(() => import("../apps/SysMonApp"));
const TechApp = lazy(() => import("../apps/TechApp"));
const TicTacToeApp = lazy(() => import("../apps/TicTacToeApp"));

export type AppRenderContext = {
  currentTheme: ThemeType;
  setCurrentTheme: (t: ThemeType) => void;
  currentBackground: BackgroundType;
  setBackgroundType: (b: BackgroundType) => void;
};

const LoadingApp = () => (
  <div className="h-full w-full flex items-center justify-center font-mono text-xs opacity-50">
    &gt; Loading module...
  </div>
);

export const appRegistry: Record<
  WindowType,
  (ctx: AppRenderContext) => import('react').ReactNode
> = {
  about: () => <Suspense fallback={<LoadingApp />}><AboutApp /></Suspense>,
  projects: () => <Suspense fallback={<LoadingApp />}><ProjectApp /></Suspense>,
  tech: () => <Suspense fallback={<LoadingApp />}><TechApp /></Suspense>,
  experience: () => <Suspense fallback={<LoadingApp />}><ExperienceApp /></Suspense>,
  contact: () => <Suspense fallback={<LoadingApp />}><ContactApp /></Suspense>,
  resume: () => <Suspense fallback={<LoadingApp />}><ResumeApp /></Suspense>,
  settings: (ctx) => (
    <Suspense fallback={<LoadingApp />}>
      <SettingApp
        currentTheme={ctx.currentTheme}
        onThemeChange={ctx.setCurrentTheme}
        currentBackground={ctx.currentBackground}
        onBackgroundChange={ctx.setBackgroundType}
      />
    </Suspense>
  ),
  snake: () => <Suspense fallback={<LoadingApp />}><SnakeGameApp /></Suspense>,
  tictactoe: () => <Suspense fallback={<LoadingApp />}><TicTacToeApp /></Suspense>,
  memory: () => <Suspense fallback={<LoadingApp />}><MemoryMatchApp /></Suspense>,
  notes: () => <Suspense fallback={<LoadingApp />}><NotesApp /></Suspense>,
  bughunter: () => <Suspense fallback={<LoadingApp />}><BugHunterApp /></Suspense>,
  sysmon: () => <Suspense fallback={<LoadingApp />}><SysMonApp /></Suspense>,
  coderunner: () => <Suspense fallback={<LoadingApp />}><CodeRunnerApp /></Suspense>,
};
