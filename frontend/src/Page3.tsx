import { useState, useEffect } from 'react'
import ChartTemplate from './templates/ChartTemplate';

function Page3() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const graphs = [
    {
      key: 'Battery Current',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]'
    },
    {
      key: 'Inverter Temperature',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
    },
    {
      key: 'Brake Pressure',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
    },  
    {
      key: 'Suspension Travel',
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

export default Page3;

// Next work on Graphs and Making each grid box unique and in its separate file to be displayed on one page with all 12 eventually
// Could potentially also merge all 3 pages together somehow?