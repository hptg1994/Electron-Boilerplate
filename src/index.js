
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Link} from 'react-router-dom';

import Home from './pages/home';
import Series from './pages/series';
import Episode from "./pages/episode";

// render on page
ReactDOM.render(
  <HashRouter>
    <div className="container is-fluid">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/other">Other</Link></li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/series/:id" component={Series} />
        <Route path="/episode/:id" component={Episode} />
        <Route component={Home} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById('app')
);