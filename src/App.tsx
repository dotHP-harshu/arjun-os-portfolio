import React, { useState } from "react";
import { themes, type ThemeType } from "./config/themes";
import { Background, type BackgroundType } from "./components/Backgrounds";
import { useWindowManager } from "./hooks/useWindowManager";
import WindowManager from "./components/window/WindowManger";
import DesktopIcons from "./components/desktop/DesktopIcons";
import Taskbar from "./apps/Taskbar";
import MobileMessage from "./components/MobileMessage";
// import { agentLog } from "./debug/agentLog";
import BootScreen from "./components/BootScreen";
import userData from "./data/data.json";

const STORAGE_THEME_KEY = `${userData.system.osName.toLowerCase()}.theme`;
const STORAGE_BG_KEY = `${userData.system.osName.toLowerCase()}.background`;

function isThemeType(value: unknown): value is ThemeType {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(themes, value)
  );
}

const BACKGROUNDS: BackgroundType[] = ["grid", "doodles", "blobs", "waves", "dots", "particles"];

function isBackgroundType(value: unknown): value is BackgroundType {
  return typeof value === "string" && (BACKGROUNDS as string[]).includes(value);
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  const {
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
  } = useWindowManager();

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const stored = sessionStorage.getItem(STORAGE_THEME_KEY);
    return isThemeType(stored) ? stored : "classic";
  });

  const [backgroundType, setBackgroundType] = useState<BackgroundType>(() => {
    const stored = sessionStorage.getItem(STORAGE_BG_KEY);
    return isBackgroundType(stored) ? stored : "grid";
  });

  const theme = themes[currentTheme];

  React.useEffect(() => {
    sessionStorage.setItem(STORAGE_THEME_KEY, currentTheme);
  }, [currentTheme]);

  React.useEffect(() => {
    sessionStorage.setItem(STORAGE_BG_KEY, backgroundType);
  }, [backgroundType]);

  // Check if mobile and show message on first load
  React.useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      const hasSeenMessage = sessionStorage.getItem('mobile-message-seen');
      if (isMobile && !hasSeenMessage) {
        setShowMobileMessage(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileMessageClose = () => {
    setShowMobileMessage(false);
    sessionStorage.setItem('mobile-message-seen', 'true');
  };

  // React.useEffect(() => {
  //   agentLog({
  //     runId: "pre-fix",
  //     hypothesisId: "H4",
  //     location: "src/App.tsx:theme-change",
  //     message: "theme.changed",
  //     data: { currentTheme, theme },
  //   });
  // }, [currentTheme, theme]);

  // React.useEffect(() => {
  //   agentLog({
  //     runId: "pre-fix",
  //     hypothesisId: "H4",
  //     location: "src/App.tsx:background-change",
  //     message: "background.changed",
  //     data: { backgroundType },
  //   });
  // }, [backgroundType]);

  return (
    <div
      className="h-screen w-full font-sans overflow-hidden flex flex-col select-none transition-colors duration-500"
      style={
        {
          "--bg": theme.bg,
          "--taskbar": theme.taskbar,
          "--window-bg": theme.windowBg,
          "--title-bar": theme.titleBar,
          "--text": theme.text,
          "--border": theme.border,
          "--accent": theme.accent,
          "--grid": theme.grid,
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        } as React.CSSProperties
      }
    >
      {/* Mobile Message */}
      {showMobileMessage && (
        <MobileMessage onClose={handleMobileMessageClose} />
      )}

      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} />
      ) : (
        <>
          <main className="flex-1 relative p-4 md:p-8 overflow-hidden">
            <Background type={backgroundType} />

            {/* Responsive Desktop Icons */}
            <div className="hidden md:block">
              <DesktopIcons
                windows={windows}
                openWindow={openWindow}
                focusWindow={focusWindow}
              />
            </div>

            {/* Mobile/Tablet Icons - Simplified Layout */}
            <div className="md:hidden grid grid-cols-3 gap-4 p-4">
              {windows.map((win) => (
                <button
                  key={win.id}
                  onClick={() => openWindow(win.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--window-bg)]/80 border border-[var(--border)]"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    {win.icon}
                  </div>
                  <span className="text-xs text-[var(--text)] truncate max-w-full">
                    {win.title}
                  </span>
                </button>
              ))}
            </div>

            <WindowManager
              windows={windows}
              appContext={{
                currentTheme,
                setCurrentTheme,
                currentBackground: backgroundType,
                setBackgroundType,
              }}
              closeWindow={closeWindow}
              minimizeWindow={minimizeWindow}
              maximizeWindow={maximizeWindow}
              focusWindow={focusWindow}
              updateWindowPosition={updateWindowPosition}
              updateWindowSize={updateWindowSize}
            />
          </main>

          <Taskbar
            windows={windows}
            toggleTaskbarItem={toggleTaskbarItem}
            openWindow={openWindow}
            closeWindow={closeWindow}
            showDesktop={showDesktop}
          />
        </>
      )}
    </div>
  );
}
