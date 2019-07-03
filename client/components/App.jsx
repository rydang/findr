import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import FriendsPage from './pages/FriendsPage';
import LoginPage from './pages/LoginPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/friends" component={FriendsPage} />
        <Route
          path="/*"
          render={() => (
            <div className="lostPage">
              <p>
                This page does not exist.
                <br />
                <NavLink to="/">BACK TO LOGIN</NavLink>
              </p>
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default App;
