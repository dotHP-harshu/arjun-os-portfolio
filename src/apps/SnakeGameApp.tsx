import React from "react";

const SnakeGameApp = () => {
  const GRID = 20;
  const CELL = 10;

  const [snake, setSnake] = React.useState([{ x: 10, y: 10 }]);
  const [food, setFood] = React.useState({ x: 15, y: 15 });
  const [dir, setDir] = React.useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [speed, setSpeed] = React.useState<"slow" | "normal" | "fast">("normal");
  const [highScore, setHighScore] = React.useState(
    () => Number(localStorage.getItem("arjun-os-snake-hi")) || 0,
  );

  const tickMs = speed === "slow" ? 220 : speed === "fast" ? 90 : 150;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
      switch (e.key) {
        case " ":
          setPaused((p) => !p);
          break;
        case "ArrowUp":
          if (dir.y === 0) setDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (dir.y === 0) setDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (dir.x === 0) setDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (dir.x === 0) setDir({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dir]);

  React.useEffect(() => {
    if (gameOver || paused) return;
    const move = setInterval(() => {
      setSnake(prev => {
        const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (
          newHead.x < 0 ||
          newHead.x >= GRID ||
          newHead.y < 0 ||
          newHead.y >= GRID ||
          prev.some(s => s.x === newHead.x && s.y === newHead.y)
        ) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("arjun-os-snake-hi", score.toString());
          }
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, tickMs);
    return () => clearInterval(move);
  }, [dir, food, gameOver, paused, score, highScore, tickMs]);

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDir({ x: 0, y: -1 });
    setGameOver(false);
    setPaused(false);
    setScore(0);
  };

  return (
    <div
      className="flex flex-col items-center gap-4 p-4 h-full font-mono"
      style={{ backgroundColor: "var(--border)", color: "var(--accent)" }}
    >
      <div className="flex flex-wrap items-center justify-between w-full gap-2 text-[10px] uppercase">
        <span>Score: {score}</span>
        <span>High: {highScore}</span>
        <div className="flex items-center gap-2">
          <span className="opacity-70">Speed:</span>
          {(["slow", "normal", "fast"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className="px-2 py-1 border-2 font-bold uppercase"
              style={{
                borderColor: "var(--accent)",
                backgroundColor: speed === s ? "var(--accent)" : "transparent",
                color: speed === s ? "#000" : "var(--accent)",
              }}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => setPaused((p) => !p)}
            className="px-2 py-1 border-2 font-bold uppercase"
            style={{
              borderColor: "var(--accent)",
              backgroundColor: paused ? "var(--accent)" : "transparent",
              color: paused ? "#000" : "var(--accent)",
            }}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      <div
        className="relative border-2"
        style={{
          width: GRID * CELL,
          height: GRID * CELL,
          backgroundColor: "var(--window-bg)",
          borderColor: "var(--accent)",
        }}
      >
        {snake.map((s, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: s.x * CELL,
              top: s.y * CELL,
              width: CELL,
              height: CELL,
              backgroundColor: "var(--accent)",
            }}
          />
        ))}
        <div
          className="absolute"
          style={{
            left: food.x * CELL,
            top: food.y * CELL,
            width: CELL,
            height: CELL,
            backgroundColor: "#ff0000",
          }}
        />

        {paused && !gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
            <span className="text-white font-black uppercase">Paused</span>
            <span className="text-white/70 text-[10px] uppercase">Press Space to resume</span>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2">
            <span className="text-red-500 font-black">GAME OVER</span>
            <button onClick={reset} className="px-2 py-1 bg-white text-black text-[10px] font-bold uppercase">Retry</button>
          </div>
        )}
      </div>
      <div className="text-[10px] opacity-50 text-center">
        ARROWS: MOVE • SPACE: PAUSE
        <br />
        COLLECT BUGS TO SCORE
      </div>
    </div>
  );
};

export default SnakeGameApp