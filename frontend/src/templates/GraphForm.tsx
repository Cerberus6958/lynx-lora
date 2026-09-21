import { useState } from "react";
import { pages } from './CurrentPages';
import type { Page, Graph } from "../types/PageTypes";
import { useNavigate, useLocation } from "react-router";
import { options } from "../types/GraphTypes";
import type { DataPoint } from "../types/SampleData";
import { savePages } from "../customStore/dataStore";

function GraphForm() {
  const { state } = useLocation();
  const graph: Graph | undefined = state.graph;
  const typeName = state.name;
  const [chosen, setChosen] = useState<string>(graph?.type ?? "Running");
  const [file, setFile] = useState<FileList | null>(null);
  const [name, setName] = useState<string>(graph?.name ?? "");
  const [number, setNumber] = useState(graph?.maxNum ?? 0);
  const navigate = useNavigate();
  const [_, setData] = useState<DataPoint[]>([]);

  function submitGraph() {
    // Editing a graph
    if (!file || !file[0]) {
      if (state.name !== "Edit Graph") return;
      let page = pages.flatMap((page) => page.graphs).find((g) => g.name === graph!.name);
      page!.name = name;
      page!.maxNum = number;
      page!.type = chosen;
      navigate('/master');
      return;
    }

    // New Graph
    let latestPage = pages.at(-1);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        let newData = JSON.parse(event.target?.result as string);
        setData(newData);
        const newGraph: Graph = {
          name: name,
          colour: "#06f36f",
          style: "p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]",
          type: chosen,
          data: newData,
          maxNum: number
        }

        if (latestPage!.graphs.length >= 4) {
          const newPage: Page = {
            graphs: [
              newGraph
            ]
          }
          newGraph.style = "p-2 rounded-lg bg-[#280c47] text-[#06f36f]";
          pages.push(newPage);
        } else {
          if (latestPage!.graphs.length === 3) newGraph.colour = "#280c47";
          latestPage!.graphs.push(newGraph);
        }
        savePages(pages);
        navigate('/master');
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    }

    reader.onerror = () => {
      console.error("Failed to read file:");      
    }

    reader.readAsText(file[0]);
  }

  return (
    <>
      <form className="flex flex-col justify-center text-green-600 gap-10">
        <div>{typeName}</div>
        <div>Name</div>
        <input onChange={(e) => setName(e.target.value)} type="text" defaultValue={name} className="w-auto self-center bg-[#280c47] text-red-500"></input>
        <div className="flex justify-center gap-5">
          { options.map(({type}) => (
            <button key={type} 
            onClick={(e) => {setChosen(type); e.preventDefault();}} 
            className={`${chosen === type ? "bg-red-800" : "bg-[#280c47]"} rounded-md w-20 h-10`}>{type}</button>
          ))
          }
        </div>

        {/* Editing a graph with a different JSON file will jsut create a new graph displayed */}
        <div>JSON File</div>
        <input type="file" className="self-center bg-[#280c47] w-[14vw] file:bg-purple-900" onChange={(e) => setFile(e.target.files)}></input>
        <div>Desired number of points displayed</div>
        <input onChange={(e) => {setNumber(Number(e.target.value))}} type="text" defaultValue={number} className="w-auto self-center bg-[#06f36f] text-red-500"></input>
        <button className="bg-[#06f36f] self-center rounded-md w-20 h-10" onClick={(e) => {submitGraph(); e.preventDefault()}}>Submit</button>
      </form>
    </>
  )
}

export default GraphForm;