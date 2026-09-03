import type { Page } from "../types/PageTypes";

export const pages: Page[] = [
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