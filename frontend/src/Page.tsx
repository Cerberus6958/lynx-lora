import { useState, useEffect } from 'react'
import ChartTemplate from './templates/ChartTemplate';
import type { Page } from './types/PageTypes';
import LeftArrowButton from './templates/LeftArrowButton';
import RightArrowButton from './templates/RightArrowButton';

const WEBSOCKETPORT = 3002;

function MasterPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const pages: Page[] = [
    {
      graphs: [
        {
        name: 'Wheel Speed',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]'
        },
        {
        name: 'Throttle position',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },
        {
        name: 'RPM',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },  
        {
        name: 'Motor Temperature',
        colour: '#280c47',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },
      ]
    },
    { 
      graphs: [
        {
          name: 'Coolant Temperature Motor Inlet',
          colour: '#06f36f',
          style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]'
        },
        {
          name: 'Coolant Temperature Motor Outlet',
          colour: '#06f36f',
          style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },
        {
          name: 'Battery Temperature',
          colour: '#06f36f',
          style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },  
        {
          name: 'Battery Voltage',
          colour: '#280c47',
          style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },
      ]
    },
    { 
      graphs: [
        {
          name: 'Battery Current',
          colour: '#06f36f',
          style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]'
        },
        {
          name: 'Inverter Temperature',
          colour: '#06f36f',
          style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },
        {
          name: 'Brake Pressure',
          colour: '#06f36f',
          style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },  
        {
          name: 'Suspension Travel',
          colour: '#280c47',
          style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'
        },
      ]
    },
  ];

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>
        {(() => {
          let currentPage = pages[pageNumber].graphs;
          return expanded ? ( 
            <>
              <div className='min-h-screen flex justify-center items-center'>
                <div className={`w-[87vw] h-[95vh] ${currentPage.find((chart) => chart.name === expanded)!.style}`} onClick={() => setExpanded(null)}>
                  <ChartTemplate name={currentPage.find((chart) => chart.name === expanded)!.name} port={0} colour={currentPage.find((chart) => chart.name === expanded)!.colour}></ChartTemplate>
                </div>
              </div>
            </>
            ) : (
            <>
              <div className='h-[95vh] flex justify-center items-center'>
                <div className='grid grid-cols-2 gap-8'>
                  {currentPage.map(({name, colour, style}) => (
                    <div key={name} className={`w-140 h-80 ${style}`} onClick={() => setExpanded(name)}>
                      <ChartTemplate name={name} port={0} colour={colour}></ChartTemplate>
                    </div>
                  ))}
                </div>
              </div>
            </>
            )
        })()}
        { !expanded &&
          <div className='flex justify-center gap-2'>
            <LeftArrowButton onClick={() => {
              if (pageNumber > 0) {
                setPageNumber(pageNumber - 1);
              }
            }}></LeftArrowButton>
            <RightArrowButton onClick={() => {
              if (pageNumber + 1 < pages.length) {
                setPageNumber(pageNumber + 1);
              }
            }}></RightArrowButton>
          </div>
        }
      </div>
    </>
  )
}

export default MasterPage;