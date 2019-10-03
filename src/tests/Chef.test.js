import {React, act, render, unmountComponentAtNode, MarleyAPI} from "./testsCommonModules";

import Chef from "../Chef";
import chefData from "./mock_data/chef";

//mock API
jest.mock('../MarleyAPI');
MarleyAPI.getEntry.mockResolvedValue(chefData);

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
    render(<Chef />, container);
  });
  expect(container.textContent).toBe("Loading");
});

it('Loads data from API and renders the chef name',async ()=>{
  await act(async () => {
    render(<Chef id="foo" />, container);
  });
  expect(MarleyAPI.getEntry).toHaveBeenCalledTimes(1);
  expect(container.textContent).toContain(chefData.fields.name)
})