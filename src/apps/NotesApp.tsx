import { useEffect, useState } from "react";

import userData from "../data/data.json"

const NotesApp = () => {
  const [notes, setNotes] = useState<string>(() => localStorage.getItem('arjun-os-notes') || userData.initialNotes);

  useEffect(() => {
    localStorage.setItem('arjun-os-notes', notes);
  }, [notes]);

  return (
    <textarea 
      className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed custom-scrollbar"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      spellCheck={false}
    />
  );
};

export default NotesApp