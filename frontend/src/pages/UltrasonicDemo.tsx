import ChartTemplate from '../templates/ChartTemplate';

function UltrasonicDemo() {
  return (
    <>
      {/* <div className="min-h-screen"> */}
        <div className="min-h-screen flex justify-center items-center">
          <div className='w-[85vw] h-[90vh] p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>
              <ChartTemplate name='Ultrasonic Demo' port={3002} colour='#06f36f'></ChartTemplate>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}

export default UltrasonicDemo;

// Next work on onClick for each onf the small charts to 'zoom in' when clicked so that only one is shown