import { useState } from "react";
import { pages } from '../templates/CurrentPages';
import type { Page, Graph } from "../types/PageTypes";
import { useNavigate } from "react-router";
import { options } from "../types/GraphTypes";

function NewGraphForm() {
  const [chosen, setChosen] = useState<string>('');
  const [file, setFile] = useState<FileList | null>(null);
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  function submitGraph() {
    let latestPage = pages.at(-1);
    const newGraph: Graph = {
      name: name,
      colour: "bg-[#280c47]",
      style: "",
      type: chosen
    }
    if (latestPage!.graphs.length >= 4) {
      const newPage: Page = {
        graphs: [
          newGraph
        ]
      }
      pages.push(newPage);
    } else {
      latestPage!.graphs.push(newGraph);
    }

    navigate('/master');
  }

  return (
    <>
      <form className="flex flex-col justify-center text-green-600 gap-10">
        <div>New Graph</div>
        <div>Name</div>
        <input onChange={(e) => setName(e.target.value)} type="text" className="w-auto self-center bg-[#280c47] text-red-500"></input>
        <div className="flex justify-center gap-5">
          { options.map(({type}) => (
            <button key={type} 
            onClick={(e) => {setChosen(type); e.preventDefault();}} 
            className={`${chosen === type ? "bg-red-800" : "bg-[#280c47]"} rounded-md w-20 h-10`}>{type}</button>
          ))
          }
        </div>
        <div>JSON File</div>
        <input type="file" className="self-center bg-[#280c47] w-[14vw] file:bg-purple-900" onChange={(e) => setFile(e.target.files)}></input>
        <button className="bg-[#06f36f] self-center rounded-md w-20 h-10" onClick={submitGraph}>Submit</button>
      </form>
    </>
  )
}

export default NewGraphForm;