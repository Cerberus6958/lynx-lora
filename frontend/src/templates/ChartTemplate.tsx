import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DataPoint } from './SampleData';

const MAX_POINTS = 40;      // how many points stay visible on screen
const INTERVAL_MS = 500;    // how often a new point arrives

export default function LiveChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [running, setRunning] = useState(true);
  const valueRef = useRef(50); // last value, so new points random-walk instead of jumping around

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      // random walk step, clamped so it doesn't drift off screen
      valueRef.current += (Math.random() - 0.5) * 10;
      valueRef.current = Math.max(0, Math.min(100, valueRef.current));

      const point = {
        time: new Date().toLocaleTimeString(),
        value: Math.round(valueRef.current * 100) / 100,
      };

      setData(prev => {
        const next = [...prev, point];
        return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
      });
    }, INTERVAL_MS);

    return () => clearInterval(id); // cleanup on unmount or when paused
  }, [running]);

  return (
    <div className="w-full h-[300px] p-4 bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f] rounded-xl border border-slate-200 shadow-sm font-sans">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${running ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}
          />
          <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
            Live Data Stream
          </h3>
        </div>
        <button
          onClick={() => setRunning(r => !r)}
          className={`px-3.5 py-1.5 rounded-md text-sm font-semibold text-white transition-colors cursor-pointer
            ${running ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        >
          {running ? 'Pause' : 'Resume'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} minTickGap={30} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false} // avoids lag/flicker on rapid updates
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// export default LiveChart;