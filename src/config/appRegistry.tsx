import AboutApp from "../apps/AboutApp";
import BugHunterApp from "../apps/BugHunterApp";
import CodeRunnerApp from "../apps/CodeRunnerApp";
import ContactApp from "../apps/ContactApp";
import ExperienceApp from "../apps/ExperienceApp";
import MemoryMatchApp from "../apps/MemoryMatchApp";
import NotesApp from "../apps/NotesApp";
import ProjectApp from "../apps/ProjectApp";
import SettingApp from "../apps/SettingApp";
import SnakeGameApp from "../apps/SnakeGameApp";
import SysMonApp from "../apps/SysMonApp";
import TechApp from "../apps/TechApp";
import TicTacToeApp from "../apps/TicTacToeApp";
import type { BackgroundType } from "../components/Backgrounds";
import type { ThemeType } from "./themes";
import type { WindowType } from "../types/window";

export type AppRenderContext = {
  currentTheme: ThemeType;
  setCurrentTheme: (t: ThemeType) => void;
  currentBackground: BackgroundType;
  setBackgroundType: (b: BackgroundType) => void;
};

export const appRegistry: Record<
  WindowType,
  (ctx: AppRenderContext) => React.ReactNode
> = {
  about: () => <AboutApp />,
  projects: () => <ProjectApp />,
  tech: () => <TechApp />,
  experience: () => <ExperienceApp />,
  contact: () => <ContactApp />,
  // terminal: () => <TerminalApp />,
  settings: (ctx) => (
    <SettingApp
      currentTheme={ctx.currentTheme}
      onThemeChange={ctx.setCurrentTheme}
      currentBackground={ctx.currentBackground}
      onBackgroundChange={ctx.setBackgroundType}
    />
  ),
  snake: () => <SnakeGameApp />,
  tictactoe: () => <TicTacToeApp />,
  memory: () => <MemoryMatchApp />,
  notes: () => <NotesApp />,
  bughunter: () => <BugHunterApp />,
  sysmon: () => <SysMonApp />,
  coderunner: () => <CodeRunnerApp />,
};