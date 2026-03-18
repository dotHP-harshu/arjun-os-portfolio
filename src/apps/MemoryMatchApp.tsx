import React from "react";

type Card = {
  id: number;
  value: string;
  revealed: boolean;
  matched: boolean;
};

const EMOJIS = ["★", "◆", "●", "▲", "■", "✿", "☀", "☂"];

function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck(): Card[] {
  const values = shuffle(EMOJIS).slice(0, 6); // 12 cards total
  const deck = shuffle([...values, ...values]).map((v, idx) => ({
    id: idx,
    value: v,
    revealed: false,
    matched: false,
  }));
  return deck;
}

const MemoryMatchApp = () => {
  const [deck, setDeck] = React.useState<Card[]>(() => makeDeck());
  const [moves, setMoves] = React.useState(0);
  const [locked, setLocked] = React.useState(false);

  const revealed = deck.filter((c) => c.revealed && !c.matched);
  const done = deck.every((c) => c.matched);

  const reset = () => {
    setDeck(makeDeck());
    setMoves(0);
    setLocked(false);
  };

  const flip = (id: number) => {
    if (locked) return;
    setDeck((d) =>
      d.map((c) =>
        c.id === id && !c.matched && !c.revealed ? { ...c, revealed: true } : c,
      ),
    );
  };

  React.useEffect(() => {
    if (revealed.length !== 2) return;
    setMoves((m) => m + 1);
    const [a, b] = revealed;
    if (a.value === b.value) {
      setDeck((d) =>
        d.map((c) =>
          c.value === a.value ? { ...c, matched: true } : c,
        ),
      );
      return;
    }

    setLocked(true);
    const t = window.setTimeout(() => {
      setDeck((d) => d.map((c) => (c.matched ? c : { ...c, revealed: false })));
      setLocked(false);
    }, 650);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed.length]);

  return (
    <div className="h-full flex flex-col gap-4 p-4 font-mono">
      <div className="flex items-center justify-between text-[10px] uppercase opacity-70">
        <span>Moves: {moves}</span>
        <span>{done ? "Complete" : locked ? "Checking…" : "Match pairs"}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {deck.map((c) => {
          const faceUp = c.revealed || c.matched;
          return (
            <button
              key={c.id}
              onClick={() => flip(c.id)}
              className="h-14 border-2 flex items-center justify-center text-xl font-black transition-all active:translate-y-[2px]"
              style={{
                backgroundColor: faceUp ? "var(--accent)" : "var(--window-bg)",
                borderColor: "var(--border)",
                color: faceUp ? "#000" : "var(--text)",
                boxShadow: "2px 2px 0px 0px var(--border)",
                opacity: c.matched ? 0.65 : 1,
              }}
              aria-label={faceUp ? `Card ${c.value}` : "Hidden card"}
            >
              {faceUp ? c.value : "?"}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-bold uppercase">
          {done ? "All pairs matched" : "Find all pairs"}
        </div>
        <button
          onClick={reset}
          className="px-3 py-2 border-2 text-xs font-bold uppercase transition-all active:translate-y-[2px]"
          style={{
            backgroundColor: "var(--window-bg)",
            borderColor: "var(--border)",
            boxShadow: "2px 2px 0px 0px var(--border)",
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default MemoryMatchApp;

