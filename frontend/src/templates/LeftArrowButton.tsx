function LeftArrowButton({onClick}: { onClick: () => void } ) {
  return (
    <>
      <button onClick={onClick} className='transition-all duration-500 hover:bg-[#06f36f] rounded-md'>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short fill-blue-500" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
        </svg>
      </button>
    </>
  ) 
}

export default LeftArrowButton