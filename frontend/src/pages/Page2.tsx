import { useState } from 'react'
import ChartTemplate from '../templates/ChartTemplate';

function Page2() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const graphs = [
    {
      name: 'Coolant Temperature Motor Inlet',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]',
      type: 'running'
    },
    {
      name: 'Coolant Temperature Motor Outlet',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
      type: 'running'
    },
    {
      name: 'Battery Temperature',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
      type: 'running'
    },  
    {
      name: 'Battery Voltage',
      colour: '#280c47',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
      type: 'running'
    },  
  ];

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>
        <div className='min-h-screen flex justify-center items-center'>
          { expanded ? ( 
            <>
              <div className={`w-[87vw] h-[95vh] ${graphs.find((chart) => chart.name === expanded)!.style}`} onClick={() => setExpanded(null)}>
                <ChartTemplate graph={graphs.find((chart) => chart.name === expanded)!} port={0}></ChartTemplate>
              </div>
            </>
            ) : (
            <>
              <div className='grid grid-cols-2 gap-8'>
                {graphs.map((graph) => (
                  <div key={graph.name} className={`w-140 h-85 ${graph.style}`} onClick={() => setExpanded(graph.name)}>
                    <ChartTemplate graph={graph} port={0}></ChartTemplate>
                  </div>
                ))}
              </div>
            </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Page2;