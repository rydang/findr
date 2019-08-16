import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginPage = () => (
  <div className="loginPage">
    <div className="loginHeader">
      <h1>Findr</h1>
      <h3>Find new friends today!</h3>
    </div>
    <div className="loginEntry">
      <form className="loginForm" action="/api/verify" method="post">
        {'Username:'}
        <input name="username" type="text" />
        {'Password:'}
        <input name="password" type="password" />
        <NavLink to="/signup">
          <button type="button">Signup</button>
        </NavLink>
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
);

export default LoginPage;
