import React, { useState, useEffect, useRef, type SetStateAction, type Dispatch, use } from 'react';
import type { DataPoint } from '../types/SampleData';

// import { appendFile } from 'node:fs/promises';

const MAX_POINTS = 40;
const INTERVAL_MS = 500;
// const WEBSOCKETPORT = 3002;

interface StartStopButtonProps {
  data: DataPoint[];
  setData: Dispatch<SetStateAction<DataPoint[]>>;
  name: string;
  port: number
}

export function StartStopButton({ setData, name, port }: StartStopButtonProps) {
  const [running, setRunning] = useState(true);
  const valueRef = useRef(50);
  let num = useRef(0);
  useEffect(() => {
    const wss = new WebSocket(`ws://localhost:${port}`);

    wss.onmessage = (event) => {
      // const data = JSON.parse(event.data);
      const data = event.data;
      console.log(data);
      num.current = Number(data);
    };

    return () => {
      wss.close();
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(async () => {
      valueRef.current += (Math.random() - 0.5) * 10;
      valueRef.current = Math.max(0, Math.min(100, valueRef.current));

      // const point = {
      //   time: new Date().toLocaleTimeString(),
      //   value: Math.round(valueRef.current * 100) / 100,
      // };

      const point = {
        time: new Date().toLocaleTimeString(),
        value: port !== 0 ? num.current : Math.round(valueRef.current * 100) / 100,
      };

      // try {
      //   await appendFile(`${name}.txt`, `${point}`);
      //   console.log('File written successfully.');
      // } catch (error) {
      //   console.error('Error writing file:', error);
      // }

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