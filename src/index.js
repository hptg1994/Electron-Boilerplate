
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import Home from './pages/home';
import Other from './pages/other';

// render on page
ReactDOM.render(
  <BrowserRouter>
    <div className="container is-fluid">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/other">Other</Link></li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/other" component={Other} />
        <Route component={Home} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('app')
);