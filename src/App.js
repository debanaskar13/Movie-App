// api-key = "8265bd1679663a7ea12ac168da84d2e8"

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import MovieDetails from './MovieDetails';
import Search from './Search';
import Person from './Person';
import Tv from './Tv';

class App extends Component {
  state = {}
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/' component={Home} exact></Route>
          <Route path='/details/:id' component={MovieDetails}></Route>
          <Route path='/search/:term' component={Search}></Route>
          <Route path='/person/:id' component={Person}></Route>
          <Route path='/tv/:term' component={Tv}></Route>
        </Switch>

      </div>
    );
  }
}

export default App;