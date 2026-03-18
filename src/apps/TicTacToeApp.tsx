import React from "react";

type Cell = "X" | "O" | null;

function winnerOf(b: Cell[]) {
  const lines: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, c, d] of lines) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
}

const TicTacToeApp = () => {
  const [board, setBoard] = React.useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = React.useState<"X" | "O">("X");
  const [score, setScore] = React.useState({ X: 0, O: 0, draw: 0 });

  const win = winnerOf(board);
  const isDraw = !win && board.every(Boolean);

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  React.useEffect(() => {
    if (win) setScore((s) => ({ ...s, [win]: s[win] + 1 }));
    else if (isDraw) setScore((s) => ({ ...s, draw: s.draw + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win, isDraw]);

  const play = (idx: number) => {
    if (board[idx] || win || isDraw) return;
    setBoard((b) => {
      const next = b.slice();
      next[idx] = turn;
      return next;
    });
    setTurn((t) => (t === "X" ? "O" : "X"));
  };

  return (
    <div className="h-full flex flex-col gap-4 p-4 font-mono">
      <div className="flex items-center justify-between text-[10px] uppercase opacity-70">
        <span>Player: {turn}</span>
        <span>
          X {score.X} · O {score.O} · Draw {score.draw}
        </span>
      </div>

      <div
        className="grid grid-cols-3 gap-2 border-2 p-2"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--window-bg)" }}
      >
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className="h-16 border-2 flex items-center justify-center text-2xl font-black uppercase transition-all active:translate-y-[2px]"
            style={{
              borderColor: "var(--border)",
              backgroundColor: cell ? "var(--accent)" : "transparent",
              color: cell ? "#000" : "var(--text)",
              boxShadow: "2px 2px 0px 0px var(--border)",
            }}
          >
            {cell ?? ""}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-bold uppercase">
          {win ? `Winner: ${win}` : isDraw ? "Draw" : "In progress"}
        </div>
        <button
          onClick={resetRound}
          className="px-3 py-2 border-2 text-xs font-bold uppercase transition-all active:translate-y-[2px]"
          style={{
            backgroundColor: "var(--window-bg)",
            borderColor: "var(--border)",
            boxShadow: "2px 2px 0px 0px var(--border)",
          }}
        >
          New Round
        </button>
      </div>
    </div>
  );
};

export default TicTacToeApp;

