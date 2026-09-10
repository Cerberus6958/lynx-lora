import { useState } from 'react'
import ChartTemplate from '../templates/ChartTemplate';
import LeftArrowButton from '../templates/LeftArrowButton';
import RightArrowButton from '../templates/RightArrowButton';
import { pages } from '../templates/CurrentPages';
import NewGraphButton from '../templates/NewGraphButton';
import { useNavigate } from 'react-router';

// const WEBSOCKETPORT = 3002;

function MasterPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  // const [newGraphForm, setNewGraphForm] = useState<boolean>(false);
  let currentPage = pages[pageNumber].graphs;
  const navigate = useNavigate();

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>
        <div className={expanded ? `min-h-screen flex justify-center items-center` : `h-[95vh] flex justify-center items-center`}>
          <div className={expanded ? 'w-[87vw] h-[95vh]' : 'grid grid-cols-2 gap-8'}>
            {currentPage.map((graph) => (
              <div
                key={graph.name}
                className={
                  expanded
                    ? `${graph.style} ${graph.name === expanded ? 'block w-full h-full' : 'hidden'}`
                    : `w-140 h-80 ${graph.style}`
                }
                onClick={() => setExpanded(expanded ? null : graph.name)}
              >
                <ChartTemplate graph={graph} port={0} />
              </div>
            ))}
          </div>
        </div>
        { !expanded &&
          <div className='flex justify-center gap-2'>
            <NewGraphButton onClick={() => navigate('/new')}>
            </NewGraphButton>
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