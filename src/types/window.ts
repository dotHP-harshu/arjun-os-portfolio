export type WindowType =
  | 'about'
  | 'projects'
  | 'tech'
  | 'experience'
  | 'contact'
  // | 'terminal'
  | 'settings'
  | 'snake'
  | 'tictactoe'
  | 'memory'
  | 'notes'
  | 'bughunter'
  | 'sysmon'
  | 'coderunner'

export interface WindowState {
  id: WindowType;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}