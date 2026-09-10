import ChartTemplate from '../templates/ChartTemplate';
import type { Graph } from '../types/PageTypes';

function UltrasonicDemo() {
  let demo: Graph = {
    name: 'Ultrasonic Demo',
    colour: '#06f36f',
    style: 'p-2 rounded-lg bg-[#280c47] text-[#06f36f]',
    type: 'Running'
  } 
  return (
    <>
      {/* <div className="min-h-screen"> */}
        <div className="min-h-screen flex justify-center items-center">
          <div className='w-[85vw] h-[90vh] p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>
              <ChartTemplate graph={demo} port={3002}></ChartTemplate>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}

export default UltrasonicDemo;

// Next work on onClick for each onf the small charts to 'zoom in' when clicked so that only one is shown