import {React, act, render, unmountComponentAtNode, MarleyAPI} from "./testsCommonModules";
import {BrowserRouter} from "react-router-dom";

import Recipes from "../Recipes";
import recipesData from "./mock_data/recipes";

//mock api and sub components
jest.mock('../MarleyAPI');
MarleyAPI.mockResolvedValue();
jest.mock('../ContentfulImage');

//no need to declare it individually because we're only testing on correct data
MarleyAPI.getEntries.mockResolvedValue(recipesData);

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
    MarleyAPI.getEntries.mockClear();
});

it("Renders loading warning", () => {
    act(() => {
        render(<BrowserRouter><Recipes/></BrowserRouter>, container);
    });
    expect(container.textContent).toBe("Loading");
});

it('Loads data and renders recipes list with link to each', async () => {
    await act(async () => {
        render(<BrowserRouter><Recipes/></BrowserRouter>, container);
    });
    expect(MarleyAPI.getEntries).toHaveBeenCalledTimes(1);
    container.querySelectorAll('.recipe-card-container').forEach((node, index) => {
        expect(node.textContent).toContain(recipesData.items[index].fields.title);
        expect(node.getElementsByTagName('a')[0].getAttribute('href')).toContain(recipesData.items[index].sys.id);
    });
})

