import React, { useState, useEffect, useRef, type SetStateAction, type Dispatch } from 'react';
import type { DataPoint } from '../types/SampleData';

const MAX_POINTS = 40;      // how many points stay visible on screen
const INTERVAL_MS = 500;    // how often a new point arrives

interface StartStopButtonProps {
  data: DataPoint[];
  setData: Dispatch<SetStateAction<DataPoint[]>>;
}

export function StartStopButton({ setData }: StartStopButtonProps) {
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
        <>      
          {/* <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${running ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}
              />
              <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
                {name}
              </h3>
            </div> */}
            <button
              onClick={() => setRunning(r => !r)}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold text-white transition-colors cursor-pointer
                ${running ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
            >
              {running ? 'Pause' : 'Resume'}
            </button>
          {/* </div> */}
        </>
    )
}