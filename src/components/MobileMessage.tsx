import React from 'react';
import { Monitor, X } from 'lucide-react';
import userData from '../data/data.json';

interface MobileMessageProps {
  onClose: () => void;
}

const MobileMessage: React.FC<MobileMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:hidden">
      <div className="bg-[var(--window-bg)] border-2 border-[var(--border)] rounded-lg p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded hover:bg-[var(--accent)]/20 transition-colors"
        >
          <X size={16} className="text-[var(--text)]" />
        </button>
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 rounded-full bg-[var(--accent)]/20">
            <Monitor size={32} className="text-[var(--accent)]" />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-[var(--text)] mb-2">
              {userData.system.mobileMessage.title}
            </h3>
            <p className="text-sm text-[var(--text)] opacity-80">
              {userData.system.mobileMessage.description}
            </p>
          </div>
          
          <div className="text-xs text-[var(--text)] opacity-60 space-y-1">
            {userData.system.mobileMessage.points.map((point, i) => (
              <p key={i}>• {point}</p>
            ))}
          </div>
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--accent)] text-white text-sm rounded hover:bg-[var(--accent)]/90 transition-colors"
          >
            {userData.system.mobileMessage.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMessage;
