import type { DataPoint } from "./SampleData"

export type Page = {
    graphs: Graph[]
}

export type Graph = {
    name: string
    colour: string,
    style: string
}