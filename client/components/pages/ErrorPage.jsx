import React from 'react';
import { NavLink } from 'react-router-dom';

const querystring = require('querystring');

const ErrorPage = props => {
  const { error } = querystring.parse(props.location.search.slice(1));
  let message = '';
  const easterEgg = [];
  switch (error) {
    case 'nouser':
      message = "That username doesn't exist.";
      break;
    case 'wrongpass':
      message = 'Wrong password.';
      break;
    case 'lost':
      message = "This page doesn't exist";
      easterEgg.push(
        <div className="errorSpins">
          <div />
          <img src="../../kyle.jpeg" alt="spinning kyle" />
          <div />
          <img src="../../phil.png" alt="spinning phil" />
          <div />
        </div>,
      );
      break;
    default:
      message = 'Unknown error.';
  }
  return (
    <div className="loginPage">
      <div className="loginHeader">
        <h1>Findr</h1>
        <h3>{"Looks like you won't be finding any friends just yet!"}</h3>
      </div>
      <div className="errorArea">
        {message}
        <NavLink to="/">
          <button type="button">Back to Login</button>
        </NavLink>
      </div>
      {easterEgg}
    </div>
  );
};

export default ErrorPage;
