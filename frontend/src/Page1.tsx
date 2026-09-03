import { useState, useEffect } from 'react'
import ChartTemplate from './templates/ChartTemplate';

const WEBSOCKETPORT = 3002;

function Page1() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const graphs = [
    {
      key: 'Wheel Speed',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]'
    },
    {
      key: 'Throttle position',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
    },
    {
      key: 'RPM',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
    },  
    {
      key: 'Motor Temperature',
      colour: '#280c47',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
    },  
  ];

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>
        <div className='min-h-screen flex justify-center items-center'>
          { expanded ? ( 
            <>
              <div className={`w-[87vw] h-[95vh] ${graphs.find((chart) => chart.key === expanded)!.style}`} onClick={() => setExpanded(null)}>
                <ChartTemplate name={graphs.find((chart) => chart.key === expanded)!.key} port={0} colour={graphs.find((chart) => chart.key === expanded)!.colour}></ChartTemplate>
              </div>
            </>
            ) : (
            <>
              <div className='grid grid-cols-2 gap-8'>
                {graphs.map(({key, colour, style}) => (
                  <div key={key} className={`w-140 h-85 ${style}`} onClick={() => setExpanded(key)}>
                    <ChartTemplate name={key} port={0} colour={colour}></ChartTemplate>
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

export default Page1;