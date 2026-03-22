import React from 'react';
import { Monitor, X, CheckCircle } from 'lucide-react';
import userData from '../data/data.json';

interface MobileMessageProps {
  onClose: () => void;
}

const MobileMessage: React.FC<MobileMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 md:hidden 
                    flex items-center justify-center p-6
                    bg-[var(--window-bg)]/80 backdrop-blur-md">

      {/* Glass Modal */}
      <div className="w-full max-w-sm rounded-xl
                      bg-[var(--window-bg)]/60 backdrop-blur-xl
                      border border-[var(--border)]
                      shadow-2xl overflow-hidden">

        {/* Terminal Header */}
        <div className="px-4 py-2 flex items-center 
                        border-b border-[var(--border)]/40
                        bg-[var(--window-bg)]/80">

          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[var(--border)]/60"></div>
            <div className="w-2 h-2 rounded-full bg-[var(--border)]/60"></div>
            <div className="w-2 h-2 rounded-full bg-[var(--border)]/60"></div>
          </div>

          <span className="ml-auto text-[9px] tracking-[0.2em] uppercase text-[var(--text)]/60">
            PROMPT.SYS
          </span>

          <button
            onClick={onClose}
            className="ml-3 text-[var(--text)]/60 hover:text-[var(--text)] transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-full
                          bg-[var(--accent)]/20
                          flex items-center justify-center mb-6">
            <Monitor size={36} className="text-[var(--accent)]" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight 
                         text-[var(--text)] mb-3">
            {userData.system.mobileMessage.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--text)]/80 
                        leading-relaxed mb-8">
            {userData.system.mobileMessage.description}
          </p>

          {/* Points */}
          <div className="w-full space-y-3 mb-10">
            {userData.system.mobileMessage.points.map((point, i) => (
              <div key={i} className="flex items-center gap-3 text-left">
                <CheckCircle size={14} className="text-[var(--accent)]" />
                <span className="text-[11px] tracking-wider uppercase text-[var(--text)]/80">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-md
                       text-xs font-bold tracking-[0.2em] uppercase
                       bg-[var(--accent)]
                       text-[var(--window-bg)]
                       hover:opacity-90
                       active:scale-95
                       transition-all">
            {userData.system.mobileMessage.button}
          </button>

        </div>
      </div>
    </div>
  );
};

export default MobileMessage;