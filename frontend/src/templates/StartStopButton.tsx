import { useState, useEffect, useRef, type SetStateAction, type Dispatch } from 'react';
import type { DataPoint } from '../types/SampleData';

// import { appendFile } from 'node:fs/promises';

const MAX_POINTS = 40;
const INTERVAL_MS = 500;
// const WEBSOCKETPORT = 3002;

interface StartStopButtonProps {
  data: DataPoint[];
  setData: Dispatch<SetStateAction<DataPoint[]>>;
  name: string;
  port: number;
  type: string
}

export function StartStopButton({ setData, port, type }: StartStopButtonProps) {
  const [running, setRunning] = useState(true);
  const valueRef = useRef(50);
  let num = useRef<DataPoint | undefined>(null);
  useEffect(() => {
    if (port === 0) return;
    const wss = new WebSocket(`ws://localhost:${port}`);

    wss.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // const data = event.data;
      console.log(data);
      num.current = data;
    };

    return () => {
      wss.close();
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    if (type === 'Still') return;
    const id = setInterval(async () => {
      valueRef.current += (Math.random() - 0.5) * 10;
      valueRef.current = Math.max(0, Math.min(100, valueRef.current));

      // So each sensor will have one point for each time (packet of data sent)
      const point = {
        time: port !== 0 ? num.current!.time : new Date().toLocaleTimeString(),
        value: port !== 0 ? num.current!.value : Math.round(valueRef.current * 100) / 100,
      };

      // Below is the logic for values that may have been originally missed, that should be reinserted
      // into the data properly at the matching timestamp
      setData(prev => {
        let next = [...prev, point];
        if (port !== 0) {
          for (let i = prev.length - 1; i >= 0; i --) {
            if (prev[i].time < point.time) {
              next = [...prev.slice(0, i + 1), point, ...prev.slice(i + 1)]
              break;
            }
          }
        } else {
          next = [...prev, point];
        }
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
              onClick={(e) => {setRunning(r => !r); e.stopPropagation()}}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold text-white transition-colors cursor-pointer
                ${running ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
            >
              {running ? 'Pause' : 'Resume'}
            </button>
          {/* </div> */}
        </>
    )
}