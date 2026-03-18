import  { useEffect, useState } from "react";

export default function DesktopWidgets() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-8 right-8 flex flex-col items-end gap-6 pointer-events-none select-none opacity-40 hover:opacity-100 transition-opacity">
      
      {/* Clock */}
      <div className="text-right">
        <p
          className="text-6xl font-black uppercase italic tracking-tighter leading-none"
          style={{ color: "var(--accent)" }}
        >
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>

        <p
          className="text-xs font-bold uppercase tracking-widest mt-2"
          style={{ color: "var(--text)" }}
        >
          {time.toLocaleDateString([], {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Weather (static demo) */}
      <div
        className="border-r-4 pr-4 text-right"
        style={{ borderColor: "var(--accent)" }}
      >
        <p
          className="text-2xl font-black uppercase italic"
          style={{ color: "var(--text)" }}
        >
          24°C
        </p>
        <p
          className="text-[10px] font-bold uppercase tracking-widest opacity-60"
          style={{ color: "var(--text)" }}
        >
          Mostly Cloudy / Bangalore
        </p>
      </div>

      {/* System Status */}
      <div className="text-right space-y-1">
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          System Status
        </p>

        <div className="flex gap-1 justify-end">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1 h-3 bg-[var(--accent)]"
              style={{ opacity: i < 4 ? 1 : 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}