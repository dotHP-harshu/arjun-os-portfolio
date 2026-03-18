import { useEffect, useState } from "react";

const SysMonApp = () => {
  const [stats, setStats] = useState({ cpu: 0, mem: 0, net: 0 });
  const [history, setHistory] = useState<{ cpu: number[], mem: number[] }>({ cpu: [], mem: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 40) + 10;
      const newMem = Math.floor(Math.random() * 20) + 60;
      setStats({ cpu: newCpu, mem: newMem, net: Math.floor(Math.random() * 100) });
      setHistory(prev => ({
        cpu: [...prev.cpu.slice(-19), newCpu],
        mem: [...prev.mem.slice(-19), newMem]
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 font-mono p-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="border-2 p-2" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[10px] font-bold uppercase mb-2">CPU Usage: {stats.cpu}%</p>
          <div className="h-16 flex items-end gap-1">
            {history.cpu.map((v, i) => (
              <div key={i} className="flex-1 bg-[var(--accent)]" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
        <div className="border-2 p-2" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[10px] font-bold uppercase mb-2">Memory: {stats.mem}%</p>
          <div className="h-16 flex items-end gap-1">
            {history.mem.map((v, i) => (
              <div key={i} className="flex-1 bg-[var(--accent)] opacity-60" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="border-2 p-3 space-y-2" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-bold uppercase">Active Processes</p>
        <div className="text-[9px] space-y-1 opacity-80">
          <div className="flex justify-between border-b pb-1" style={{ borderColor: 'var(--border)', opacity: 0.3 }}>
            <span>Process</span><span>PID</span><span>CPU</span>
          </div>
          <div className="flex justify-between"><span>kernel_task</span><span>0</span><span>0.1%</span></div>
          <div className="flex justify-between"><span>ArjunOS_Core</span><span>124</span><span>{stats.cpu / 2}%</span></div>
          <div className="flex justify-between"><span>WindowServer</span><span>88</span><span>4.2%</span></div>
          <div className="flex justify-between"><span>Snake.exe</span><span>442</span><span>1.5%</span></div>
        </div>
      </div>
    </div>
  );
};

export default SysMonApp