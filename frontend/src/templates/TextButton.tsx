function TextButton({ onClick, name }: {onClick: () => void, name: string }) {
  return (
    <>
      <button onClick={onClick} className='transition-all duration-500 hover:bg-[#06f36f] rounded-md text-yellow-500 pl-1 pr-1'>
        {name}
      </button>
    </>
  )
}

export default TextButton