import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DataPoint } from './types/SampleData';
import { StartStopButton } from './templates/StartStopButton';

export default function LiveChart({name, colour}: { name: string, colour: string }) {
  const [data, setData] = useState<DataPoint[]>([]);

  return (
    <div className="w-full h-[320px] p-4 rounded-xl border shadow-sm font-sans">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* <span
                className={`h-2 w-2 rounded-full ${running ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}
              /> */}
              <h3 className="text-sm font-semibold text-[#06f36f] tracking-tight">
                {name}
              </h3>
            </div>
            {/* <button
              onClick={() => setRunning(r => !r)}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold text-white transition-colors cursor-pointer
                ${running ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
            >
              {running ? 'Pause' : 'Resume'}
            </button> */}
            <StartStopButton data={data} setData={setData} name={name}></StartStopButton>
          </div>
      {/* <StartStopButton data={data} setData={setData}></StartStopButton> */}
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
            stroke={colour}
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