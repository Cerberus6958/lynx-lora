import type { Page } from "../types/PageTypes";

export function loadPages(): Page[] {

  try {
    const graphs = localStorage.getItem('graphs');
    console.log(graphs);
    return graphs ? JSON.parse(graphs) : [];
  } catch (e) {
    console.log("Error,", e);
    return [];
  }
}

export function savePages(pages: Page[]) {
  localStorage.setItem('graphs', JSON.stringify(pages));
  console.log(pages);
}