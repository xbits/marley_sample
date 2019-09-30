import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Recipes from "./Recipes";
import Recipe from "./Recipe"
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="container">


            <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/recipes"/>
                )}/>
                 <Route exact path='/recipes' component={Recipes} />
                 <Route path={`/recipes/:id`} component={Recipe} />
            </Switch>


        </div>
      </Router>
  );
}

export default App;
