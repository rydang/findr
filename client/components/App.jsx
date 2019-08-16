import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import FriendsPage from './pages/FriendsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ErrorPage from './pages/ErrorPage';

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/friends" component={FriendsPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/error" component={ErrorPage} />
    <Route
      path="/*"
      render={() => (
        <div className="lostPage">
          <Redirect to="/error?error=lost" />
        </div>
      )}
    />
  </Switch>
);

export default App;
