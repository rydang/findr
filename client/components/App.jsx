import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import FriendsPage from './pages/FriendsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/friends" component={FriendsPage} />
    <Route path="/signup" component={SignupPage} />
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

export default App;
