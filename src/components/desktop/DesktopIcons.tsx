import { motion } from "motion/react";
import type { WindowState, WindowType } from "../../types/window";

interface DesktopIconsProps {
  windows: WindowState[];
  openWindow: (id: WindowType) => void;
  focusWindow: (id: WindowType) => void;
}

const ICON_MAP: Record<string, string> = {
  about: "/icons/about.png",
  projects: "/icons/projects.png",
  tech: "/icons/tech.png",
  experience: "/icons/experience.png",
  contact: "/icons/contact.png",
  resume: "/icons/resume.png",
  settings: "/icons/setting.png",
  snake: "/icons/snake.png",
  tictactoe: "/icons/tic_tac_toe.png",
  memory: "/icons/memorygame.png",
  notes: "/icons/notes.png",
  bughunter: "/icons/bughunter.png",
  sysmon: "/icons/sysmon.png",
  coderunner: "/icons/coderunner.png",
};

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
              className="w-14 h-14 border-2 flex items-center justify-center transition-colors overflow-hidden rounded-md"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "var(--border)",
                boxShadow: "2px 2px 0px 0px var(--border)",
              }}
            >
              <img 
                src={ICON_MAP[win.id]} 
                alt={win.title} 
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                  if (sibling) sibling.style.display = 'block';
                }}
              />
              <div style={{ display: 'none' }}>
                {win.icon}
              </div>
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
