import React from 'react';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import App from '../App';
import MarleyAPI from "../MarleyAPI";

jest.mock('../MarleyAPI');
MarleyAPI.getEntries.mockResolvedValue({items:[]});

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

it('renders without crashing', () => {
  ReactDOM.render(<App />, container);
});
