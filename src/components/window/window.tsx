import { Minus, Square, X } from "lucide-react";
import type { WindowState } from "../../types/window";
import { motion, useDragControls, type Variants } from "motion/react";
import { agentLog } from "../../debug/agentLog";

interface WindowProps {
  key?: React.Key;
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const  Window = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize,
  onFocus, 
  onPositionChange,
  onSizeChange,
  children 
}: WindowProps & { 
  onPositionChange: (pos: { x: number, y: number }) => void,
  onSizeChange: (size: { width: number, height: number }) => void 
}) => {
  const dragControls = useDragControls();
  
  const windowVariants = {
    normal: { 
      width: window.size.width, 
      height: window.size.height, 
      x: window.position.x,
      y: window.position.y,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    maximized: { 
      width: '100%', 
      height: '100%', 
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    }
  } satisfies Variants;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, x: window.position.x, y: window.position.y }}
      animate={window.isMaximized ? "maximized" : "normal"}
      variants={windowVariants}
      exit={{ scale: 0.9, opacity: 0 }}
      drag={!window.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        agentLog({
          runId: "pre-fix",
          hypothesisId: "H3",
          location: "src/components/window/window.tsx:onDragEnd",
          message: "window.dragEnd",
          data: {
            id: window.id,
            before: window.position,
            offset: info.offset,
            computedNext: {
              x: window.position.x + info.offset.x,
              y: window.position.y + info.offset.y,
            },
          },
        });
        onPositionChange({ 
          x: window.position.x + info.offset.x, 
          y: window.position.y + info.offset.y 
        });
      }}
      onMouseDown={onFocus}
      className={`absolute border-2 overflow-hidden flex flex-col ${window.isMaximized ? "" : "min-w-[320px] min-h-[200px]"}`}
      style={{ 
        zIndex: window.isMaximized ? 5000 : window.zIndex,
        backgroundColor: 'var(--window-bg)',
        borderColor: 'var(--border)',
        color: 'var(--text)',
        boxShadow: window.isMaximized ? 'none' : '4px 4px 0px 0px var(--border)',
        left: 0,
        top: 0,
      }}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="border-b-2 px-3 py-1.5 flex items-center justify-between cursor-move select-none shrink-0"
        style={{ 
          backgroundColor: 'var(--title-bar)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="flex items-center gap-2">
          <div style={{ color: 'var(--text)' }}>{window.icon}</div>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text)' }}>{window.title}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-6 h-6 border-2 flex items-center justify-center hover:opacity-80 active:translate-y-0.5"
            style={{ backgroundColor: 'var(--window-bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-6 h-6 border-2 flex items-center justify-center hover:opacity-80 active:translate-y-0.5"
            style={{ backgroundColor: 'var(--window-bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <Square size={10} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-6 h-6 border-2 flex items-center justify-center hover:opacity-80 active:translate-y-0.5"
            style={{ backgroundColor: '#f28b82', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar" style={{ backgroundColor: 'var(--window-bg)' }}>
        {children}
      </div>

      {/* Status Bar */}
      <div className="border-t px-3 py-1 flex justify-between items-center text-[10px] font-bold opacity-50 uppercase shrink-0"
           style={{ backgroundColor: 'var(--taskbar)', borderColor: 'var(--border)' }}>
        <span>Ready</span>
        <span>ArjunOS v2.5</span>
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-[100] flex items-end justify-end p-0.5"
          onMouseDown={(e) => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = window.size.width;
            const startHeight = window.size.height;

            const onMouseMove = (moveEvent: MouseEvent) => {
              onSizeChange({
                width: Math.max(320, startWidth + (moveEvent.clientX - startX)),
                height: Math.max(200, startHeight + (moveEvent.clientY - startY))
              });
            };

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        >
          <div className="w-2 h-2 border-r-2 border-b-2" style={{ borderColor: 'var(--border)' }} />
        </div>
      )}
    </motion.div>
  );
};

export default Window