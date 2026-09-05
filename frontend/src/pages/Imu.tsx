import ChartTemplate from "../templates/ChartTemplate";

function Imu() {
  return (
    <>
      {/* <div className="min-h-screen"> */}
        <div className="min-h-screen flex justify-center items-center">
          <div className='w-[85vw] h-[90vh] p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>
              <ChartTemplate name='IMU' port={0} colour='#06f36f'></ChartTemplate>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}

export default Imu;