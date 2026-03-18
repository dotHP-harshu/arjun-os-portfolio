import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

const BugHunterApp = () => {
  const size = 10;
  const minesCount = 15;
  const [grid, setGrid] = useState<{ isMine: boolean, revealed: boolean, flagged: boolean, count: number }[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const initGrid = () => {
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(null).map(() => ({
      isMine: false, revealed: false, flagged: false, count: 0
    })));

    let placed = 0;
    while (placed < minesCount) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        placed++;
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < size && nc >= 0 && nc < size && newGrid[nr][nc].isMine) count++;
          }
        }
        newGrid[r][c].count = count;
      }
    }
    setGrid(newGrid);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => { initGrid(); }, []);

  const reveal = (r: number, c: number) => {
    if (gameOver || won || grid[r][c].revealed || grid[r][c].flagged) return;
    const newGrid = [...grid.map(row => [...row])];
    if (newGrid[r][c].isMine) {
      setGameOver(true);
      newGrid.forEach(row => row.forEach(cell => { if (cell.isMine) cell.revealed = true; }));
    } else {
      const flood = (row: number, col: number) => {
        if (row < 0 || row >= size || col < 0 || col >= size || newGrid[row][col].revealed || newGrid[row][col].flagged) return;
        newGrid[row][col].revealed = true;
        if (newGrid[row][col].count === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              flood(row + dr, col + dc);
            }
          }
        }
      };
      flood(r, c);
    }
    setGrid(newGrid);
    if (newGrid.every(row => row.every(cell => cell.isMine || cell.revealed))) setWon(true);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || won || grid[r][c].revealed) return;
    const newGrid = [...grid.map(row => [...row])];
    newGrid[r][c].flagged = !newGrid[r][c].flagged;
    setGrid(newGrid);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 h-full font-mono" style={{ backgroundColor: 'var(--window-bg)', color: 'var(--text)' }}>
      <div className="flex justify-between w-full text-xs uppercase font-bold">
        <span>Bugs: {minesCount}</span>
        <button onClick={initGrid} className="px-2 border-2 hover:bg-[var(--accent)]/10" style={{ borderColor: 'var(--border)' }}>Reset</button>
      </div>
      <div className="grid grid-cols-10 border-2" style={{ borderColor: 'var(--border)' }}>
        {grid.map((row, r) => row.map((cell, c) => (
          <button
            key={`${r}-${c}`}
            onClick={() => reveal(r, c)}
            onContextMenu={(e) => toggleFlag(e, r, c)}
            className={`w-6 h-6 border flex items-center justify-center text-[10px] font-bold transition-colors ${cell.revealed ? 'bg-transparent' : 'bg-[var(--accent)]/20 hover:bg-[var(--accent)]/40'}`}
            style={{ borderColor: 'var(--border)' }}
          >
            {cell.revealed ? (cell.isMine ? <ShieldAlert size={12} className="text-red-500" /> : (cell.count > 0 ? cell.count : '')) : (cell.flagged ? '!' : '')}
          </button>
        )))}
      </div>
      {gameOver && <p className="text-red-500 font-black uppercase italic">System Crashed! Bug Found.</p>}
      {won && <p className="text-green-500 font-black uppercase italic">System Patched! All Bugs Cleared.</p>}
      <p className="text-[8px] opacity-50 uppercase">Left Click: Reveal | Right Click: Flag</p>
    </div>
  );
};

export default BugHunterApp