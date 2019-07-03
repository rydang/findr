import React, { Component } from 'react';

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="loginPage">
          <h1>Findr</h1>
          <h3>Find new friends today!</h3>
        </div>
        <hr />
        <form action="/api/verify" method="post">
          {'Username:'}
          <input name="username" type="text" />
          {'Password:'}
          <input name="password" type="password" />
          <div />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default FriendsPage;
