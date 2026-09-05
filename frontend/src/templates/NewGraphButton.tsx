function NewGraphButton({ onClick }: {onClick: () => void }) {
  return (
    <>
      <button onClick={onClick} className='transition-all duration-500 hover:bg-[#06f36f] rounded-md text-yellow-500 pl-1 pr-1'>
        New Graph
      </button>
    </>
  )
}

export default NewGraphButton