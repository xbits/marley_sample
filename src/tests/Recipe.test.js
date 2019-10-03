import {React, act, render, unmountComponentAtNode, MarleyAPI} from "./testsCommonModules";
import { BrowserRouter } from "react-router-dom";

import Recipe from "../Recipe";
import recipeData from "./mock_data/recipe";

//mock API and subcomponents
jest.mock('../MarleyAPI');
MarleyAPI.mockResolvedValue();
jest.mock('../ContentfulImage');
jest.mock('../Chef');
jest.mock('../TagList');

MarleyAPI.getEntry.mockResolvedValue(recipeData);

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  MarleyAPI.getEntry.mockClear();
});

it("Renders loading warning",  () => {
  act(() => {
    render(<BrowserRouter><Recipe match={{params: {id: 'foo'}}} /></BrowserRouter>, container);
  });
  expect(container.textContent).toBe("Loading");

});

it('Loads data from API and renders the recipe name',async ()=>{
  await act(async () => {
    render(<BrowserRouter><Recipe match={{params: {id: 'foo'}}} /></BrowserRouter>, container);
  });
  expect(MarleyAPI.getEntry).toHaveBeenCalledTimes(1);
  expect(container.textContent).toContain(recipeData.fields.title)
})