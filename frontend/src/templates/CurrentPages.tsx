import type { Page } from "../types/PageTypes";

export const pages: Page[] = [
  {
    graphs: [
      {
      name: 'Wheel Speed',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]',
      type: 'Running'
      },
      {
      name: 'Throttle position',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
      type: 'Running'
      },
      {
      name: 'RPM',
      colour: '#06f36f',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
      type: 'Running'
      },  
      {
      name: 'Motor Temperature',
      colour: '#280c47',
      style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
      type: 'Running'
      },
    ]
  },
  { 
    graphs: [
      {
        name: 'Coolant Temperature Motor Inlet',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]',
        type: 'Running'
      },
      {
        name: 'Coolant Temperature Motor Outlet',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
        type: 'Running'
      },
      {
        name: 'Battery Temperature',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
        type: 'Running'
      },  
      {
        name: 'Battery Voltage',
        colour: '#280c47',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
        type: 'Running'
      },
    ]
  },
  { 
    graphs: [
      {
        name: 'Battery Current',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]',
        type: 'Running'
      },
      {
        name: 'Inverter Temperature',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
        type: 'Running'
      },
      {
        name: 'Brake Pressure',
        colour: '#06f36f',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
        type: 'Running'
      },  
      {
        name: 'Suspension Travel',
        colour: '#280c47',
        style: 'p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]',
        type: 'Running'
      },
    ]
  },
];